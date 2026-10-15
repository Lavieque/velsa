import { Fragment, type CSSProperties } from "react";

/**
 * Splits a line of display type into words, each inside its own mask, so the
 * headline rises a word at a time instead of as one block.
 *
 * Words rather than lines: where a line breaks depends on the viewport, so
 * authored line breaks would hold at one width and fight every other one.
 * The spaces stay as real text nodes, which keeps the heading a single
 * readable string for assistive technology and for selection.
 */
export function SplitWords({
  text,
  startIndex = 0,
}: {
  text: string;
  /** Offset into the shared delay sequence of the first screen. */
  startIndex?: number;
}) {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <>
      {words.map((word, index) => (
        <Fragment key={`${index}-${word}`}>
          <span className="word-mask">
            <span
              className="word-rise"
              style={{ "--word-index": startIndex + index } as CSSProperties}
            >
              {word}
            </span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
