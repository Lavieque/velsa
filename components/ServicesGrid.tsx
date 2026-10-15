import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getContent, getServices, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ServiceIcon } from "./ServiceIcon";

export function ServicesGrid({
  locale,
  limit,
  showIntro = true,
  showCta = false,
  headingLevel = "h2",
}: {
  locale: Locale;
  limit?: number;
  showIntro?: boolean;
  showCta?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const { services } = getContent(locale);
  const all = getServices(locale);
  const items = limit ? all.slice(0, limit) : all;
  const Heading = headingLevel;

  return (
    <section className="shell py-24 sm:py-32">
      <Reveal className="max-w-3xl">
        <Heading className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
          {services.headline}
        </Heading>
        {showIntro && (
          <p className="mt-5 max-w-[58ch] text-pretty leading-relaxed text-parchment-dim">
            {services.intro}
          </p>
        )}
      </Reveal>

      {/*
        An index rather than a card wall: seven equally sized boxes would say
        the services are interchangeable, and the row keeps the title, the
        description and the target on one readable line.
      */}
      <ul className="mt-14 border-t border-line">
        {items.map((service) => (
          <Reveal as="li" key={service.id} reveal="row" className="relative">
            <Link
              href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
              className="group relative grid items-baseline gap-x-8 gap-y-3 py-7 transition-colors duration-300 md:grid-cols-[auto_minmax(0,22rem)_minmax(0,1fr)_auto]"
            >
              <ServiceIcon
                icon={service.icon}
                className="h-6 w-6 shrink-0 translate-y-1 text-amber-soft transition-colors duration-300 group-hover:text-amber"
              />

              <h3 className="font-display text-xl text-parchment transition-colors duration-300 group-hover:text-amber-soft sm:text-2xl">
                {service.title}
              </h3>

              <p className="max-w-[62ch] text-pretty text-sm leading-relaxed text-parchment-dim">
                {service.description}
              </p>

              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="hidden h-5 w-5 translate-y-1 text-parchment-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber md:block"
              />

              {/* The divider is drawn as the row arrives rather than being
                  there to meet it, and the amber rule is drawn again over it
                  on hover: the whole line responds, not only the words under
                  the cursor. */}
              <span
                aria-hidden
                className="rule-draw absolute inset-x-0 bottom-0 h-px bg-line"
              />
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100"
              />
            </Link>
          </Reveal>
        ))}
      </ul>

      {showCta && (
        <Reveal className="mt-10">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-parchment"
          >
            <span className="underline-draw">{services.cta}</span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      )}
    </section>
  );
}
