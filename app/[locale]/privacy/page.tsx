import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { getContent, type Locale } from "@/lib/content";
import { staticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "privacy", "/privacy");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { legal } = getContent(locale);

  return (
    <div className="mx-auto max-w-2xl px-6 pb-28 pt-32 sm:px-10 sm:pt-40">
      <h1 className="font-display text-4xl leading-tight text-parchment">
        {legal.privacyTitle}
      </h1>
      <div className="mt-8 space-y-5 leading-relaxed text-parchment-dim">
        {legal.privacyParagraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
