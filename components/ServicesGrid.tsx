import { Link } from "@/i18n/navigation";
import { getContent, getServices, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { ServiceIcon } from "./ServiceIcon";

export function ServicesGrid({
  locale,
  limit,
  showIntro = true,
  showCta = false,
}: {
  locale: Locale;
  limit?: number;
  showIntro?: boolean;
  showCta?: boolean;
}) {
  const { services } = getContent(locale);
  const all = getServices(locale);
  const items = limit ? all.slice(0, limit) : all;

  return (
    <AnimatedSection className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32" stagger={0.1}>
      <AnimatedItem className="max-w-xl">
        <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
          {services.eyebrow}
        </span>
        <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
          {services.headline}
        </h2>
        {showIntro && (
          <p className="mt-4 leading-relaxed text-parchment-dim">{services.intro}</p>
        )}
      </AnimatedItem>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((service, i) => (
          <AnimatedItem key={service.id}>
            <Link
              href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
              className="group flex h-full flex-col rounded-2xl border border-line bg-ink-soft/40 p-8 transition-colors duration-300 hover:bg-ink-soft"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-parchment-dim/70">
                  {String(i + 1).padStart(2, "0")}.
                </span>
                <span className="h-px flex-1 bg-line" />
              </div>

              <ServiceIcon
                icon={service.icon}
                className="mt-6 h-8 w-8 text-amber-soft transition-transform duration-300 group-hover:scale-110"
              />

              <h3 className="mt-6 font-display text-xl text-parchment transition-colors group-hover:text-amber-soft">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-parchment-dim">
                {service.description}
              </p>
            </Link>
          </AnimatedItem>
        ))}
      </div>

      {showCta && (
        <AnimatedItem className="mt-10">
          <Link href="/services" className="underline-draw text-sm text-parchment">
            {services.cta} →
          </Link>
        </AnimatedItem>
      )}
    </AnimatedSection>
  );
}
