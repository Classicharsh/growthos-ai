// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL UTILITY MODULE
// ─────────────────────────────────────────────────────────────────────────────

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Declare global properties on window for TypeScript compatibility
declare global {
  interface Window {
    fbq: ((...args: any[]) => void) & {
      queue?: any[]
      loaded?: boolean
      version?: string
    }
    _fbq: any
  }
}

/**
 * Triggers a standard PageView event.
 * Useful for tracking page transitions in client-side router events (like usePathname).
 */
export const pageview = () => {
  if (typeof window !== "undefined" && window.fbq && META_PIXEL_ID) {
    window.fbq("track", "PageView")
  }
}

/**
 * Triggers a standard Meta Pixel event.
 * @param name The name of the standard Meta Pixel event (e.g. Lead, CompleteRegistration)
 * @param options Event options (e.g. value, currency, content_name)
 */
export const event = (name: string, options = {}) => {
  if (typeof window !== "undefined" && window.fbq && META_PIXEL_ID) {
    window.fbq("track", name, options)
  }
}
