import Image from "next/image";
import type { Content, Product } from "@/lib/content";
import { DomiosLogo } from "./logos/DomiosLogo";
import { ProjectVisual } from "./ProjectVisual";

const logos: Partial<Record<NonNullable<Product["logoKey"]>, typeof DomiosLogo>> = {
  domios: DomiosLogo,
};

export function ProductVisual({
  product,
  alt,
}: {
  product: Product;
  alt: Content["ui"]["alt"];
}) {
  if (product.logoImage) {
    return (
      <div className="relative h-full w-full">
        <Image
          src={product.logoImage}
          alt={alt.productLogo(product.name)}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  const Logo = product.logoKey && logos[product.logoKey];
  if (Logo) {
    return (
      <div
        className="flex h-full w-full items-center justify-center"
        style={{ backgroundColor: product.logoBg }}
      >
        <Logo className="text-3xl sm:text-4xl" />
      </div>
    );
  }

  return (
    <ProjectVisual
      visual={{
        slug: product.slug,
        title: product.name,
        label: product.category,
        tag: product.tags[0],
        palette: product.palette,
        pattern: product.pattern,
      }}
      alt={alt}
    />
  );
}
