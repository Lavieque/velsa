import { NextResponse } from "next/server";
import { profile } from "@/lib/content";
import { contactSchema, type ContactErrorCode } from "@/lib/contact-schema";

export const runtime = "nodejs";

// Cloudflare's published always-pass test secret. Only used outside production
// so `npm run dev` works without real keys.
const TURNSTILE_TEST_SECRET = "1x0000000000000000000000000000000AA";

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

/** Best-effort, per-instance limiter. Turnstile is the real spam barrier. */
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function fail(code: ContactErrorCode, status: number) {
  return NextResponse.json({ ok: false, error: code }, { status });
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Strip line breaks so user input can never inject mail headers. */
function oneLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret =
    process.env.TURNSTILE_SECRET_KEY ??
    (process.env.NODE_ENV === "production" ? undefined : TURNSTILE_TEST_SECRET);
  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (ip !== "unknown") body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, signal: AbortSignal.timeout(8000) },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification failed", error);
    return false;
  }
}

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) return fail("rateLimit", 429);

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail("invalid", 400);
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) return fail("invalid", 400);
  const data = parsed.data;

  // Honeypot filled: pretend success so bots get no signal to adapt to.
  if (data.website !== "") return NextResponse.json({ ok: true });

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return fail("captcha", 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return fail("server", 500);
  }

  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;
  const from =
    process.env.CONTACT_FROM_EMAIL ?? `${profile.brand} <no-reply@velsadigital.com>`;

  const rows: [string, string][] = [
    ["Nome / Name", data.name],
    ["Empresa / Company", data.company || "—"],
    ["Email", data.email],
    ["Telefone / Phone", data.phone || "—"],
    ["Tipo de projeto / Project type", data.projectType],
    ["Idioma / Language", data.locale.toUpperCase()],
  ];

  const html = `
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td style="color:#666;vertical-align:top"><b>${escapeHtml(label)}</b></td><td>${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap;margin-top:16px">${escapeHtml(data.message)}</p>
  `;

  const text = [
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    data.message,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: oneLine(`Novo pedido — ${data.company || data.name}`),
        html,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error("Resend rejected the email", res.status, await res.text());
      return fail("server", 502);
    }
  } catch (error) {
    console.error("Resend request failed", error);
    return fail("server", 502);
  }

  return NextResponse.json({ ok: true });
}
