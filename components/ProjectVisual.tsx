import type { Content } from "@/lib/content";

type VisualSpec = {
  slug: string;
  title: string;
  label: string;
  tag?: string;
  palette: [string, string];
  pattern: "grid" | "lines" | "dots" | "waves";
};

function PatternGrid({ id }: { id: string }) {
  return (
    <pattern id={id} width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(243,237,226,0.14)" strokeWidth="1" />
    </pattern>
  );
}

function PatternDots({ id }: { id: string }) {
  return (
    <pattern id={id} width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.4" fill="rgba(243,237,226,0.22)" />
    </pattern>
  );
}

function PatternLines({ id }: { id: string }) {
  return (
    <pattern id={id} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
      <line x1="0" y1="0" x2="0" y2="18" stroke="rgba(243,237,226,0.16)" strokeWidth="1" />
    </pattern>
  );
}

export function ProjectVisual({
  visual,
  alt,
}: {
  visual: VisualSpec;
  alt: Content["ui"]["alt"];
}) {
  const gradId = `grad-${visual.slug}`;
  const patternId = `pattern-${visual.slug}`;
  const [from, to] = visual.palette;

  return (
    <svg
      viewBox="0 0 480 320"
      className="h-full w-full"
      role="img"
      aria-label={alt.visualComposition(visual.title)}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        {visual.pattern === "grid" && <PatternGrid id={patternId} />}
        {visual.pattern === "dots" && <PatternDots id={patternId} />}
        {visual.pattern === "lines" && <PatternLines id={patternId} />}
      </defs>

      <rect width="480" height="320" fill={`url(#${gradId})`} />

      {visual.pattern === "waves" ? (
        <g opacity="0.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M -20 ${70 + i * 45} C 100 ${20 + i * 45}, 260 ${140 + i * 45}, 500 ${60 + i * 45}`}
              fill="none"
              stroke="rgba(243,237,226,0.25)"
              strokeWidth="1.5"
            />
          ))}
        </g>
      ) : (
        <rect width="480" height="320" fill={`url(#${patternId})`} />
      )}

      <circle cx="392" cy="72" r="46" fill="rgba(13,11,8,0.18)" />
      <circle cx="392" cy="72" r="46" fill="none" stroke="rgba(243,237,226,0.35)" strokeWidth="1" />
      <text
        x="32"
        y="270"
        fill="rgba(243,237,226,0.85)"
        fontSize="15"
        fontFamily="var(--font-sans)"
        letterSpacing="0.08em"
      >
        {visual.label.toUpperCase()}
        {visual.tag ? ` · ${visual.tag.toUpperCase()}` : ""}
      </text>
    </svg>
  );
}
