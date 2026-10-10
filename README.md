# Velsa Digital

Website of Velsa Digital — technology and digital solutions by [Virgílio José](https://github.com/Lavieque).

Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, Motion and next-intl.
Fully bilingual (Portuguese and English) with translated routes and slugs.

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000> — it redirects to `/pt`.

### Windows: SWC native binding

`@swc/core` may fail to materialise its native binding when the default cache
directory under `%LOCALAPPDATA%` has restrictive permissions, which breaks
`next build` with `ERR_SWC_NATIVE_CACHE`. Point the cache somewhere writable:

```bash
SWC_NATIVE_BINDING_CACHE=./.swc-cache npm run build
```

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

## Internationalisation

Routes and slugs are translated, not just the copy:

```
/pt/servicos/automacao   ↔   /en/services/automation
/pt/produtos/tradeflow   ↔   /en/products/tradeflow
/pt/sobre                ↔   /en/about
```

- `i18n/routing.ts` maps internal, language-neutral pathnames (which match the
  folder names under `app/[locale]`) to what the visitor actually sees.
- `proxy.ts` handles locale detection and rewriting.
- Internal paths redirect to their localized form, so there is no duplicate
  content. `hreflang` and canonical tags are generated per page.

## Content

All copy lives in typed modules under `lib/content`, not in the components.

| File | Contains |
| --- | --- |
| `types.ts` | The `Content` shape — the compiler rejects a locale missing any key |
| `entities.ts` | Locale-invariant data: icons, images, palettes, tech stack, URLs |
| `slugs.ts` | Single source of truth for localized slugs |
| `pt.ts` / `en.ts` | The translated copy |
| `index.ts` | Merges base data, copy and slug into the view models |

Adding a language means adding a locale to `lib/content/types.ts` and
`i18n/routing.ts`, then writing one more content module — the type system lists
everything still untranslated.

## Project structure

```
app/[locale]/        Routes, one tree for every language
components/          UI components
i18n/                Routing, navigation and request config
lib/content/         All copy and entity data
lib/metadata.ts      Canonical URLs, hreflang and Open Graph
public/              Static assets
```

## Notes

The project demo video is not kept in the repository to avoid carrying tens of
megabytes in git history. See `lib/content/entities.ts` to point it at a hosted
URL; without it, the project page falls back to the screenshot.
