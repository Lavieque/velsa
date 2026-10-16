"use client";

import { Check, ChevronDown } from "lucide-react";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

/**
 * Styled replacement for the native <select>, whose popup the browser draws
 * and CSS cannot theme. Follows the ARIA select-only combobox pattern.
 */
export function Select({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!open) return;
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  function openList() {
    setActive(selectedIndex);
    setOpen(true);
  }

  function choose(index: number) {
    onChange(options[index]);
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault();
        if (!open) return openList();
        const step = event.key === "ArrowDown" ? 1 : -1;
        setActive((i) => (i + step + options.length) % options.length);
        break;
      }
      case "Home":
        if (open) {
          event.preventDefault();
          setActive(0);
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          setActive(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) choose(active);
        else openList();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          setOpen(false);
        }
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div ref={rootRef} className={`relative flex flex-col gap-2 text-sm text-parchment-dim ${className}`}>
      <span id={`${id}-label`}>{label}</span>

      <button
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={`${id}-label ${id}-value`}
        aria-activedescendant={open ? `${id}-opt-${active}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className="flex items-center justify-between gap-3 rounded-lg border border-line bg-transparent px-4 py-3 text-left text-parchment outline-none transition-colors hover:border-parchment-dim/60 focus:border-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber aria-expanded:border-amber"
      >
        <span id={`${id}-value`}>{value}</span>
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`h-4 w-4 shrink-0 text-parchment-dim transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="absolute left-0 right-0 top-full z-20 mt-2 max-h-[22rem] overflow-auto rounded-xl border border-line bg-ink-soft p-1.5 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.7)]"
        >
          {options.map((option, index) => {
            const selected = option === value;
            return (
              <li
                key={option}
                id={`${id}-opt-${index}`}
                role="option"
                aria-selected={selected}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(index)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                  index === active ? "bg-amber/15 text-parchment" : "text-parchment-dim"
                } ${selected ? "text-amber-soft" : ""}`}
              >
                {option}
                {selected ? <Check aria-hidden strokeWidth={2} className="h-4 w-4 shrink-0" /> : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
