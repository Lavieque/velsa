import type { Metadata } from "next";
import { Fraunces, Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { routing } from "@/i18n/routing";
import { getContent, profile, type Locale } from "@/lib/content";
import { absoluteUrl, baseUrl, languageAlternates } from "@/lib/site";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

const archivo = Archivo({
  variable: "--font-sans",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const { meta } = getContent(locale);

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: meta.home.title,
      template: `%s — ${profile.brand}`,
    },
    description: meta.home.description,
    alternates: {
      canonical: absoluteUrl(`/${locale}`),
      languages: languageAlternates({ pt: "/pt", en: "/en" }),
    },
    openGraph: {
      type: "website",
      siteName: profile.brand,
      locale: locale === "pt" ? "pt_PT" : "en_GB",
      title: meta.home.title,
      description: meta.home.description,
      url: absoluteUrl(`/${locale}`),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const typedLocale = locale as Locale;
  const content = getContent(typedLocale);

  return (
    <html
      lang={typedLocale === "pt" ? "pt-PT" : "en"}
      className={`${fraunces.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="grain ambient-glow relative min-h-full flex flex-col bg-ink text-parchment font-sans">
        <NextIntlClientProvider>
          <a
            href="#conteudo"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-amber focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
          >
            {typedLocale === "pt" ? "Saltar para o conteúdo" : "Skip to content"}
          </a>
          <Navbar
            locale={typedLocale}
            nav={content.nav}
            ctaLabel={content.ctaLabel}
            ui={{
              openMenu: content.ui.openMenu,
              closeMenu: content.ui.closeMenu,
              switchLanguage: content.ui.switchLanguage,
            }}
          />
          <main id="conteudo" className="flex-1">
            {children}
          </main>
          <Footer locale={typedLocale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
