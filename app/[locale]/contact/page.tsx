import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { AnimatedItem, AnimatedSection } from "@/components/AnimatedSection";
import { Contact } from "@/components/Contact";
import { getContent, profile, type Locale } from "@/lib/content";
import { staticPageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return staticPageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { contact } = getContent(locale);

  return (
    <>
      <AnimatedSection
        className="mx-auto max-w-3xl px-6 pb-8 pt-32 sm:px-10 sm:pt-40"
        stagger={0.1}
      >
        <AnimatedItem>
          <h1 className="text-balance font-display text-4xl leading-tight text-parchment sm:text-5xl">
            {contact.headline}
          </h1>
        </AnimatedItem>
      </AnimatedSection>
      <Contact contact={contact} email={profile.email} socials={profile.socials} />
    </>
  );
}
