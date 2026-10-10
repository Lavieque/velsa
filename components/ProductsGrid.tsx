import { Link } from "@/i18n/navigation";
import { getContent, getProducts, type Locale } from "@/lib/content";
import { AnimatedItem, AnimatedSection } from "./AnimatedSection";
import { ProductCard } from "./ProductCard";

export function ProductsGrid({
  locale,
  showIntro = true,
  showCta = false,
}: {
  locale: Locale;
  showIntro?: boolean;
  showCta?: boolean;
}) {
  const content = getContent(locale);
  const products = getProducts(locale);

  return (
    <AnimatedSection className="border-y border-line bg-ink-soft/50" stagger={0.1}>
      <div className="mx-auto max-w-[100rem] px-6 py-24 sm:px-10 sm:py-32">
        <AnimatedItem className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.16em] text-amber-soft">
            {content.products.eyebrow}
          </span>
          <h2 className="mt-5 font-display text-3xl leading-tight text-parchment sm:text-4xl">
            {content.products.headline}
          </h2>
          {showIntro && (
            <p className="mt-4 leading-relaxed text-parchment-dim">{content.products.intro}</p>
          )}
        </AnimatedItem>

        <div className="mt-8">
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
          <AnimatedItem className="mt-10">
            <Link href="/products" className="underline-draw text-sm text-parchment">
              {content.products.cta} →
            </Link>
          </AnimatedItem>
        )}
      </div>
    </AnimatedSection>
  );
}
