import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ServicesGrid } from "@/components/ServicesGrid";
import type { Locale } from "@/lib/content";
import { staticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "services", "/services");
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-16">
      <ServicesGrid locale={locale} />
    </div>
  );
}
