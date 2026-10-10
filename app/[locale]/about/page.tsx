import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AboutBrand, AboutFounder } from "@/components/AboutContent";
import { Technologies } from "@/components/Technologies";
import { Timeline } from "@/components/Timeline";
import type { Locale } from "@/lib/content";
import { staticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "about", "/about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutBrand locale={locale} />
      <AboutFounder locale={locale} />
      <Timeline locale={locale} />
      <Technologies locale={locale} />
    </>
  );
}
