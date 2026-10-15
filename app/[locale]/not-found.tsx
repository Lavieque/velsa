import { ArrowRight } from "lucide-react";
import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getContent, type Locale } from "@/lib/content";

const copy = {
  pt: {
    title: "Página não encontrada",
    body: "A página que procura não existe ou foi movida.",
    home: "Voltar ao início",
  },
  en: {
    title: "Page not found",
    body: "The page you're looking for doesn't exist or has moved.",
    home: "Back to home",
  },
} satisfies Record<Locale, { title: string; body: string; home: string }>;

export default async function NotFound() {
  const locale = (await getLocale()) as Locale;
  const text = copy[locale] ?? copy.pt;
  const { ctaLabel } = getContent(locale);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-32 text-center sm:px-10">
      <span className="tnum font-display text-6xl tracking-[-0.04em] text-amber-soft sm:text-7xl">404</span>
      <h1 className="mt-6 text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
        {text.title}
      </h1>
      <p className="mt-4 leading-relaxed text-parchment-dim">{text.body}</p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
        <Link
          href="/"
          className="btn-glow group inline-flex items-center gap-2 rounded-full bg-amber px-6 py-3 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          {text.home}
          <ArrowRight
              aria-hidden
              strokeWidth={2}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
        </Link>
        <Link href="/contact" className="underline-draw text-sm text-parchment">
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}
