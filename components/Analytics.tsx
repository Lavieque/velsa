import Script from "next/script";

/**
 * Cloudflare Web Analytics: cookieless and anonymous. Renders nothing until
 * NEXT_PUBLIC_CF_ANALYTICS_TOKEN is set, so local and preview builds stay out
 * of the statistics. The token is public by design (it ships in the page).
 */
export function Analytics() {
  const token = process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN;
  if (!token) return null;

  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="lazyOnload"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
