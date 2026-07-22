import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";

/**
 * Privacy-friendly, env-gated analytics. Renders nothing unless configured.
 *  - Google Analytics 4:  set NEXT_PUBLIC_GA_MEASUREMENT_ID (e.g. G-XXXXXXXXXX)
 *  - Plausible:           set NEXT_PUBLIC_PLAUSIBLE_DOMAIN (e.g. othmaneaoubid.com)
 *
 * GA4 loads in production only when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
export default function Analytics() {
  const isProd = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!isProd) return null;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}
      {plausible && (
        <Script
          defer
          data-domain={plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}
