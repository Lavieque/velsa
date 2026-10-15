import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Content, Product } from "@/lib/content";
import { Reveal } from "./Reveal";
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
    <Reveal
      as="article"
      className="group grid items-center gap-8 border-b border-line py-16 last:border-b-0 md:grid-cols-2 md:gap-16"
    >
      <Link
        href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[3/2] overflow-hidden rounded-xl border border-line"
      >
        <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
          <ProductVisual product={product} alt={alt} />
        </div>
      </Link>

      <div>
        <h3 className="font-display text-2xl tracking-[-0.02em] text-parchment transition-colors duration-300 group-hover:text-amber-soft sm:text-3xl">
          {product.name}
        </h3>
        <p className="mt-4 max-w-[58ch] text-pretty text-parchment-dim">{product.headline}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          <li className="rounded-full border border-amber/40 px-3 py-1 text-xs uppercase tracking-[0.1em] text-amber-soft">
            {product.category}
          </li>
          {product.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line px-3 py-1 text-xs text-parchment-dim"
            >
              {tag}
            </li>
          ))}
        </ul>

        <Link
          href={{ pathname: "/products/[slug]", params: { slug: product.slug } }}
          className="mt-7 inline-flex items-center gap-2 text-sm text-parchment"
        >
          <span className="underline-draw">{discoverLabel}</span>
          <ArrowRight
            aria-hidden
            strokeWidth={1.5}
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </Reveal>
  );
}
