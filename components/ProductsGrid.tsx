import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getContent, getProducts, type Locale } from "@/lib/content";
import { Reveal } from "./Reveal";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({
  locale,
  showIntro = true,
  showCta = false,
  headingLevel = "h2",
}: {
  locale: Locale;
  showIntro?: boolean;
  showCta?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const content = getContent(locale);
  const products = getProducts(locale);
  const Heading = headingLevel;

  return (
    <section className="border-y border-line bg-ink-soft/50">
      <div className="shell py-24 sm:py-32">
        <Reveal className="max-w-3xl">
          <Heading className="text-balance font-display text-3xl leading-tight tracking-[-0.02em] text-parchment sm:text-4xl">
            {content.products.headline}
          </Heading>
          {showIntro && (
            <p className="mt-5 max-w-[58ch] text-pretty leading-relaxed text-parchment-dim">
              {content.products.intro}
            </p>
          )}
        </Reveal>

        <div className="mt-10 border-t border-line">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              discoverLabel={content.ui.discover(product.name)}
              alt={content.ui.alt}
            />
          ))}
        </div>

        {showCta && (
          <Reveal className="mt-10">
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm text-parchment"
            >
              <span className="underline-draw">{content.products.cta}</span>
              <ArrowRight
                aria-hidden
                strokeWidth={1.5}
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
