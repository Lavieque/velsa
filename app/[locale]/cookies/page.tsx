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
  return staticPageMetadata(locale, "cookies", "/cookies");
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
    <div className="shell pb-28 pt-36 sm:pt-44">
      <article className="max-w-[68ch]">
        <h1 className="text-balance font-display text-4xl leading-[1.05] tracking-[-0.035em] text-parchment">
          {legal.cookiesTitle}
        </h1>
        <div className="mt-10 space-y-5 text-pretty leading-relaxed text-parchment-dim">
          {legal.cookiesParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
}
