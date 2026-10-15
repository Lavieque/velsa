import type { ComponentPropsWithoutRef, ElementType } from "react";

type Tag = "article" | "div" | "form" | "h1" | "h2" | "li" | "p" | "section" | "ul";

type RevealProps<T extends Tag> = {
  as?: T;
  /**
   * - `default` rises into place, for blocks of content.
   * - `row` arrives from the left, for the rows of an index.
   * - `load` plays on a clock rather than on the scroll position, which is
   *   what the first screen needs: an element already inside the viewport is
   *   past its scroll range before the first paint, so it would simply
   *   appear.
   */
  reveal?: "default" | "row" | "load";
} & ComponentPropsWithoutRef<T>;

/**
 * Marks an element to reveal as it enters the viewport.
 *
 * The entrance itself is CSS, driven by the element's own `view()` timeline,
 * so this renders the tag and nothing else — no effect, no state, no script
 * shipped to the browser. See the reveal block in `globals.css`.
 */
export function Reveal<T extends Tag = "div">({
  children,
  as,
  reveal = "default",
  ...rest
}: RevealProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag data-reveal={reveal} {...rest}>
      {children}
    </Tag>
  );
}
