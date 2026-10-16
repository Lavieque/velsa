"use client";

import { ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import Script from "next/script";
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { contactLimits, type ContactErrorCode } from "@/lib/contact-schema";
import type { Content } from "@/lib/content";
import { Reveal } from "./Reveal";
import { Select } from "./Select";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

// Cloudflare's always-pass test key, used only when no real key is configured
// outside production. In production a missing key fails closed (no widget).
const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "production" ? undefined : "1x00000000000000000000AA");

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "success" }
  | { state: "error"; code: ContactErrorCode | "network" };

const fieldClass =
  "rounded-lg border border-line bg-transparent px-4 py-3 text-parchment outline-none transition-colors focus:border-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber";

export function Contact({
  contact,
  email,
  phone: phoneContact,
  socials,
}: {
  contact: Content["contact"];
  email: string;
  phone: { display: string; tel: string; whatsapp: string };
  socials: { label: string; href: string }[];
}) {
  const { form } = contact;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState(contact.projectTypes[0]);
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [token, setToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const locale = useLocale();
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string>(undefined);

  // next/script calls onReady on every mount, also when the script is cached.
  useEffect(() => {
    if (!scriptReady || !turnstileSiteKey || !widgetRef.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(widgetRef.current, {
      sitekey: turnstileSiteKey,
      theme: "dark",
      language: locale,
      callback: (value: string) => setToken(value),
      "expired-callback": () => setToken(""),
      "error-callback": () => setToken(""),
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = undefined;
    };
  }, [scriptReady, locale]);

  const resetCaptcha = useCallback(() => {
    setToken("");
    if (widgetId.current) window.turnstile?.reset(widgetId.current);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.state === "sending") return;
    if (!token) {
      setStatus({ state: "error", code: "captcha" });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email: emailValue,
          phone,
          projectType,
          message,
          locale,
          website,
          turnstileToken: token,
        }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok: true }
        | { ok: false; error: ContactErrorCode }
        | null;

      if (res.ok && data?.ok) {
        setStatus({ state: "success" });
        setName("");
        setCompany("");
        setEmailValue("");
        setPhone("");
        setMessage("");
        setProjectType(contact.projectTypes[0]);
      } else {
        setStatus({ state: "error", code: data && !data.ok ? data.error : "server" });
      }
    } catch {
      setStatus({ state: "error", code: "network" });
    }
    // Turnstile tokens are single-use: always fetch a fresh one.
    resetCaptcha();
  }

  return (
    <section className="shell pb-28 sm:pb-36">
      {turnstileSiteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onReady={() => setScriptReady(true)}
        />
      ) : null}
      <div className="grid gap-16 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="max-w-[48ch] text-pretty leading-relaxed text-parchment-dim">{contact.subhead}</p>

          <a
            href={`mailto:${email}`}
            className="underline-draw mt-8 inline-block font-display text-2xl text-amber-soft sm:text-3xl"
          >
            {email}
          </a>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-parchment">
            <a href={`tel:${phoneContact.tel}`} className="underline-draw tnum">
              {phoneContact.display}
            </a>
            <a
              href={phoneContact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-draw"
            >
              WhatsApp
            </a>
          </div>

          <div className="mt-10 flex gap-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-draw text-sm text-parchment-dim hover:text-parchment"
              >
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="form"
          onSubmit={handleSubmit}
          className="relative flex flex-col gap-5 rounded-2xl border border-line bg-ink-soft/40 p-6 sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.name}
              <input
                required
                name="name"
                autoComplete="name"
                maxLength={contactLimits.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.company}
              <input
                name="organization"
                autoComplete="organization"
                maxLength={contactLimits.company}
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.email}
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                maxLength={contactLimits.email}
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
                className={fieldClass}
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-parchment-dim">
              {form.phone}
              <input
                type="tel"
                name="tel"
                autoComplete="tel"
                maxLength={contactLimits.phone}
                pattern="[0-9+()\-.\s]*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
              />
            </label>
          </div>

          <Select
            label={form.projectType}
            options={contact.projectTypes}
            value={projectType}
            onChange={setProjectType}
          />

          <label className="flex flex-col gap-2 text-sm text-parchment-dim">
            {form.message}
            <textarea
              required
              minLength={10}
              maxLength={contactLimits.message}
              rows={5}
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`${fieldClass} resize-none`}
              placeholder={form.messagePlaceholder}
            />
          </label>

          {/* Honeypot: invisible to people and assistive tech, bots fill it in. */}
          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </label>
          </div>

          <div ref={widgetRef} className="min-h-[65px]" />

          <div role="status" aria-live="polite" className="text-sm">
            {status.state === "success" ? (
              <p className="text-amber-soft">{form.success}</p>
            ) : null}
            {status.state === "error" ? (
              <p role="alert" className="text-red-400">
                {status.code === "server" ? (
                  <>
                    {form.errors.server}{" "}
                    <a href={`mailto:${email}`} className="underline">
                      {email}
                    </a>
                  </>
                ) : (
                  form.errors[status.code]
                )}
              </p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={status.state === "sending"}
            className="btn-glow group mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
          >
            {status.state === "sending" ? form.sending : form.submit}
            <ArrowRight
              aria-hidden
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
