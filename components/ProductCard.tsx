import { Link } from "@/i18n/navigation";
import type { Content, Product } from "@/lib/content";
import { AnimatedItem } from "./AnimatedSection";
import { ProductVisual } from "./ProductVisual";

export function ProductCard({
  product,
  discoverLabel,
  alt,
}: {
  product: Product;
  discoverLabel: string;
  alt: Content["ui"]["alt"];
}) {
  return (
    <AnimatedItem
      as="article"
      className="grid items-center gap-8 border-b border-line py-14 last:border-b-0 md:grid-cols-2 md:gap-14"
    >
      <Link
        href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
        className="relative block aspect-[3/2] overflow-hidden rounded-xl border border-line transition-opacity hover:opacity-90"
      >
        <ProductVisual product={product} alt={alt} />
      </Link>

      <div>
        <span className="text-xs uppercase tracking-[0.14em] text-amber-soft">
          {product.category}
        </span>
        <h3 className="mt-2 font-display text-2xl text-parchment sm:text-3xl">
          {product.name}
        </h3>
        <p className="mt-3 text-parchment-dim">{product.headline}</p>

        <Link
          href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
          className="underline-draw mt-5 inline-flex items-center gap-2 text-sm text-parchment"
        >
          {discoverLabel} <span aria-hidden>→</span>
        </Link>
      </div>
    </AnimatedItem>
  );
}
