/**
 * Real brand mark for Domios (dark-background lockup): two overlapping
 * roof shapes reused from the product's own design system, teal/navy on
 * the accent colours the product itself uses — kept distinct from Velsa's
 * own amber palette on purpose, since this represents another product's
 * identity, not ours.
 */
export function DomiosLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <svg viewBox="0 0 120 120" className="h-[1em] w-[1em]" aria-hidden>
        <polyline
          points="26,76 26,48 58,18 90,48 90,76"
          fill="none"
          stroke="#6e9bc7"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="50,92 50,64 82,34 114,64 114,92"
          fill="none"
          stroke="#5fa9a0"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="text-[0.55em] font-semibold tracking-tight"
        style={{ fontFamily: '"Iowan Old Style", "Palatino Linotype", Georgia, serif' }}
      >
        <span style={{ color: "#f2f5f4" }}>Domi</span>
        <span style={{ color: "#9ec4e6" }}>OS</span>
      </span>
    </span>
  );
}
