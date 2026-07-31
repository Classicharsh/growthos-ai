"use client"

import * as React from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Script from "next/script"
import { META_PIXEL_ID, pageview } from "@/lib/meta-pixel"

/**
 * MetaPixelTracker
 * Sub-component wrapped in Suspense to safely consume useSearchParams
 * without de-optimizing parent static layouts during build-time rendering.
 */
function MetaPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  React.useEffect(() => {
    if (!META_PIXEL_ID) return
    pageview()
  }, [pathname, searchParams])

  return null
}

/**
 * MetaPixel Component
 * Dynamically loads the Meta Pixel SDK and initializes pageview tracking
 * using environment variables. Integrates standard fallback for browsers
 * without JavaScript support.
 */
export function MetaPixel() {
  if (!META_PIXEL_ID) {
    return null
  }

  return (
    <>
      {/* Load Meta Pixel base SDK */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
          `,
        }}
      />
      {/* Standard non-JS fallback tracking image pixel */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      {/* Track page changes safely under Suspense */}
      <React.Suspense fallback={null}>
        <MetaPixelTracker />
      </React.Suspense>
    </>
  )
}
