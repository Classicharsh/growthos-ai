// ─────────────────────────────────────────────────────────────────────────────
// META PIXEL UTILITY MODULE
// Meta Pixel Event tracking helper for GrowthOS AI
// ─────────────────────────────────────────────────────────────────────────────

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

// Define standard Meta Pixel event names for type safety and reusability
export type MetaPixelStandardEvent =
  | "PageView"
  | "Lead"
  | "CompleteRegistration"
  | "Purchase"
  | "Contact"
  | "AddToCart"

// Define options interface to structure event tracking properties
export interface MetaPixelEventOptions {
  value?: number
  currency?: string
  content_name?: string
  content_category?: string
  content_ids?: string[]
  content_type?: string
  [key: string]: unknown
}

// Declare global properties on window for TypeScript compatibility without using 'any'
declare global {
  interface Window {
    fbq: {
      (command: "track" | "trackCustom" | "init", eventName: string, options?: MetaPixelEventOptions): void
      queue?: unknown[]
      loaded?: boolean
      version?: string
    }
    _fbq?: unknown
  }
}

/**
 * Triggers a standard PageView event.
 * Useful for tracking page transitions in client-side router events.
 */
export const pageview = (): void => {
  if (typeof window !== "undefined" && window.fbq && META_PIXEL_ID) {
    window.fbq("track", "PageView")
  }
}

/**
 * Triggers a standard or custom Meta Pixel event.
 * @param name The name of the Meta Pixel event
 * @param options Event options (e.g. value, currency, content_name)
 */
export const event = (
  name: MetaPixelStandardEvent | string,
  options: MetaPixelEventOptions = {}
): void => {
  if (typeof window !== "undefined" && window.fbq && META_PIXEL_ID) {
    window.fbq("track", name, options)
  }
}

