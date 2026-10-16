import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/Reveal";
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
      <section
        className="shell pb-10 pt-36 sm:pt-44"
      >
        <Reveal>
          <h1 className="max-w-[20ch] text-balance font-display text-4xl leading-[1.05] tracking-[-0.035em] text-parchment sm:text-5xl lg:text-6xl">
            {contact.headline}
          </h1>
        </Reveal>
      </section>
      <Contact
        contact={contact}
        email={profile.email}
        phone={profile.phone}
        socials={profile.socials}
      />
    </>
  );
}
