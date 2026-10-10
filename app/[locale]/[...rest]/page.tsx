import { notFound } from "next/navigation";

/**
 * Without this catch-all, an unmatched path never enters the `[locale]`
 * segment and Next falls back to its own bare 404 instead of the branded one.
 */
export default function CatchAllPage() {
  notFound();
}
