import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import {
  getContent,
  getProducts,
  getProjects,
  getServices,
  profile,
  type Locale,
} from "@/lib/content";

type FooterLink =
  | { label: string; href: AppPathname; params?: Record<string, string> }
  | { label: string; href: string; external: true };

export function Footer({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  const columns: { title: string; links: FooterLink[] }[] = [
    {
      title: content.nav.find((n) => n.key === "services")!.label,
      links: getServices(locale).map((item) => ({
        label: item.title,
        href: "/services/[slug]" as const,
        params: { slug: item.slug },
      })),
    },
    {
      title: content.nav.find((n) => n.key === "products")!.label,
      links: getProducts(locale).map((product) => ({
        label: product.name,
        href: "/products/[slug]" as const,
        params: { slug: product.slug },
      })),
    },
    {
      title: content.nav.find((n) => n.key === "projects")!.label,
      links: getProjects(locale).map((project) => ({
        label: project.title,
        href: "/projects/[slug]" as const,
        params: { slug: project.slug },
      })),
    },
    {
      title: content.ui.footerCompany,
      links: [
        { label: content.nav.find((n) => n.key === "about")!.label, href: "/about" },
        { label: content.nav.find((n) => n.key === "contact")!.label, href: "/contact" },
        { label: content.legal.privacyTitle, href: "/privacy" },
        { label: content.legal.cookiesTitle, href: "/cookies" },
      ],
    },
    {
      title: content.ui.footerSocials,
      links: profile.socials.map((social) => ({
        label: social.label,
        href: social.href,
        external: true as const,
      })),
    },
  ];

  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[100rem] px-6 py-16 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr]">
          <div>
            <span className="font-display text-xl text-parchment">
              {profile.brandShort}
              <span className="text-amber">.</span>
            </span>
            <p className="mt-2 max-w-xs text-sm text-parchment-dim">
              {content.profile.tagline}
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-sm text-parchment">{column.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-parchment-dim">
                {column.links.map((link) =>
                  "external" in link ? (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-parchment"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={`${link.href}-${link.params?.slug ?? ""}`}>
                      <Link
                        href={
                          link.params
                            ? /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                              ({ pathname: link.href, params: link.params } as any)
                            : link.href
                        }
                        className="hover:text-parchment"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-14 text-xs text-parchment-dim">
          © {new Date().getFullYear()} {profile.brand}.
        </p>
      </div>
    </footer>
  );
}
