import type { ReactNode } from "react";

/**
 * `<html>` and `<body>` live in `app/[locale]/layout.tsx`, where the locale is
 * known. This root layout only exists so Next has one above the locale segment.
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
