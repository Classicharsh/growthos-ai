"use client"

import * as React from "react"
import { motion } from "framer-motion"

// ─────────────────────────────────────────────────────────────────────────────
// TRUSTED COMPANIES COMPONENT
//
// A reusable social-proof logo strip. Each logo is an inline SVG so there are
// zero external image dependencies — the component works offline, in SSR, and
// in any color-scheme context.
//
// Design system:
//  • Logos render at 50% white opacity (grayscale feel on dark backgrounds).
//  • On hover they transition to full white + slight scale — giving the
//    "lights up" effect popular on Linear / Vercel marketing pages.
//  • The outer container uses a glassy card with subtle border and blur.
//  • Framer Motion handles the staggered fade-in entrance.
//
// Usage:
//   import { TrustedCompanies } from "@/components/landing/trusted-companies"
//   <TrustedCompanies />
//   <TrustedCompanies title="Custom title" />
// ─────────────────────────────────────────────────────────────────────────────

interface TrustedCompaniesProps {
  /** Override the default section title. */
  title?: string
  /** Additional CSS classes on the outer wrapper. */
  className?: string
}

// ─── SVG Logo Components ────────────────────────────────────────────────────
// Each logo is sized to a consistent visual weight via viewBox + className.

function MetaLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" {...props}>
      <path d="M480 256c0-17.1-3.3-34.6-9.8-52.2C449 152.1 410.2 120 370 120c-27.4 0-52.3 14.3-73.8 36.4-7.8 8-14.9 17-21.4 26.8L256 212l-18.8-28.8c-6.5-9.8-13.6-18.8-21.4-26.8C194.3 134.3 169.4 120 142 120c-40.2 0-79 32.1-100.2 83.8C35.3 221.4 32 238.9 32 256c0 57.5 27.9 93.8 49.4 118.2 7.8 8.9 15.5 16.2 21.6 21.5 3 2.7 5.6 4.7 7.4 6.1.9.7 1.7 1.3 2.2 1.6l.7.5.2.1C131.4 416.6 142 424 142 424c15.2 0 42.4-23.4 69.8-63.2l24.8-38.2c5-7.8 9.8-15.8 14.4-24.2l5-8.4 5 8.4c4.6 8.4 9.4 16.4 14.4 24.2l24.8 38.2C327.6 400.6 354.8 424 370 424s28.6-7.4 46.5-20.1l.2-.1.7-.5c.5-.3 1.3-.9 2.2-1.6 1.8-1.4 4.4-3.4 7.4-6.1 6.1-5.3 13.8-12.6 21.6-21.5C469.1 349.8 480 313.5 480 256zm-141-88c14.9 0 31.4 8.7 47.6 28.5 13.3 16.3 24.2 37.6 31.4 58.5 4.7 13.7 7 26.3 7 41 0 42.4-18.4 72.2-38.6 95.2-6.8 7.7-13.5 14-19 18.7-2.7 2.4-4.9 4.1-6.4 5.3-.6.4-1 .8-1.3 1l-.2.2c-5.4 3.8-7.4 4.6-8.5 4.6-5.4 0-28.2-17.6-56-56.8l-24.8-38.2c-7.2-11.2-13.8-22.4-19.4-33l-11.2-21.4c18.8-39.8 42.6-72.8 64.2-88.8C316.2 172.6 327.2 168 339 168zM173 168c11.8 0 22.8 4.6 35.2 15.6 21.6 16 45.4 49 64.2 88.8l-11.2 21.4c-5.6 10.6-12.2 21.8-19.4 33l-24.8 38.2c-27.8 39.2-50.6 56.8-56 56.8-1.1 0-3.1-.8-8.5-4.6l-.2-.2c-.3-.2-.7-.6-1.3-1-1.5-1.2-3.7-2.9-6.4-5.3-5.5-4.7-12.2-11-19-18.7-20.2-23-38.6-52.8-38.6-95.2 0-14.7 2.3-27.3 7-41 7.2-20.9 18.1-42.2 31.4-58.5C141.6 176.7 158.1 168 173 168z" />
    </svg>
  )
}

function GoogleLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function StripeLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 512 214" fill="currentColor" {...props}>
      <path d="M512 110.08c0-36.41-17.64-65.18-51.4-65.18-33.93 0-54.33 28.77-54.33 64.85 0 42.81 24.18 64.42 58.88 64.42 16.93 0 29.72-3.84 39.37-9.24v-28.48c-9.65 4.82-20.74 7.82-34.77 7.82-13.77 0-26-4.82-27.56-21.58h69.44c0-1.84.37-9.21.37-12.61zm-70.19-13.56c0-16.04 9.82-22.73 18.77-22.73 8.7 0 17.94 6.69 17.94 22.73H441.81zM374.66 44.9c-13.85 0-22.73 6.52-27.69 11.05l-1.83-8.77h-31.22v168.99l35.45-7.51.09-41.02c5.04 3.67 12.52 8.86 24.87 8.86 25.12 0 48-20.24 48-64.85-.17-40.79-23.37-66.75-47.67-66.75zm-8.36 102.75c-8.28 0-13.19-2.93-16.56-6.52l-.17-51.48c3.67-4.04 8.7-6.86 16.73-6.86 12.78 0 21.63 14.36 21.63 32.34 0 18.56-8.68 32.52-21.63 32.52zM246.04 38.38l35.63-7.6V0l-35.63 7.52v30.86zM246.04 47.18h35.63v125.05h-35.63V47.18zM199.27 57.07l-2.25-9.89h-30.72v125.05h35.45V87.07c8.37-10.9 22.56-8.95 26.97-7.36V47.18c-4.57-1.75-21.21-5.03-29.45 9.89zM131.83 15.07l-34.61 7.36-.17 114.48c0 21.12 15.87 36.72 36.99 36.72 11.72 0 20.24-2.17 24.96-4.75V141c-4.57 1.83-27.14 8.37-27.14-12.61V75.83h27.14V47.18h-27.14l-.03-32.11zM35.12 83.44c0-5.54 4.57-7.69 12.11-7.69 10.82 0 24.46 3.3 35.28 9.14V52.29C71.17 47.62 59.94 45.07 48.79 45.07 19.49 45.07 0 60.3 0 85.95c0 39.71 54.67 33.35 54.67 50.48 0 6.53-5.71 8.7-13.68 8.7-11.81 0-26.97-4.87-38.95-11.38v32.85c13.27 5.71 26.68 8.15 38.95 8.15 30.05 0 50.73-14.86 50.73-40.93-.08-42.89-54.6-35.2-54.6-51.38z" />
    </svg>
  )
}

function ShopifyLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" {...props}>
      <path d="M388.32 104.1a4.66 4.66 0 0 0-4.4-4c-2 0-37.23-.8-37.23-.8s-21.61-20.82-29.62-28.83V503.2L442.76 472S388.72 106.5 388.32 104.1zM288.65 70.47a116.67 116.67 0 0 0-7.21-17.61C271 32 256.44 22 240 22c-1 0-2 .09-3 .17l-4-5.25C225.07 7.67 214.75 3 204 3c-40.1 0-79.44 30-110.43 84.47-21.77 38.33-38.25 86.58-42.92 123.83-43.76 13.55-74.36 23.05-75.26 23.35C-40.4 239.48-41 243.63-41.22 248L.55 503.2l284.2-42.63s-1.62-1.5-14.28-15.6c-14.66-16.3 28.22-52.34 21.82-66.82-6.68-15.07 25-51.74 25-51.74L288.65 70.47zm-163.73 79.41c0-9.18 7.58-16.76 16.85-16.76s16.76 7.58 16.76 16.76a16.77 16.77 0 0 1-16.76 16.76c-9.27.01-16.85-7.49-16.85-16.76z" />
    </svg>
  )
}

function NotionLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 100 100" fill="currentColor" {...props}>
      <path d="M6.017 4.313l55.333-4.087c6.797-.583 8.543-.19 12.817 2.917l17.663 12.443c2.913 2.14 3.883 2.723 3.883 5.053v68.243c0 4.277-1.553 6.807-6.99 7.193L24.467 99.967c-4.08.193-6.023-.39-8.16-3.113L3.3 79.94c-2.333-3.113-3.3-5.443-3.3-8.167V11.113c0-3.497 1.553-6.413 6.017-6.8z" />
      <path d="M61.35.227L6.017 4.313C1.553 4.7 0 7.617 0 11.113v60.66c0 2.723.967 5.053 3.3 8.167l12.007 16.913c2.137 2.723 4.08 3.307 8.16 3.113L88.723 96.08c5.437-.387 6.99-2.917 6.99-7.193V17.64c0-2.14-.583-2.72-2.627-4.28L76.387 1.067C72.113-2.04 70.367-2.623 63.57-2.04L61.35.227z" fillOpacity="0" stroke="currentColor" strokeWidth="4" />
      <path d="M27.997 19.483l-.19 60.27 14.24-1.16V28.89l8.54-.583c.387 0 .58.193.58.583l-.193 51.45 7.96-.583V27.133c0-3.11-1.747-4.857-4.853-4.663l-26.084 2.013v-5z" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  )
}

function VercelLogo(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 284 65" fill="currentColor" {...props}>
      <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48H184l-18.46 32-18.47-32h9.75z" />
    </svg>
  )
}

// ─── Company data array ─────────────────────────────────────────────────────

const companies = [
  { name: "Meta", Logo: MetaLogo },
  { name: "Google", Logo: GoogleLogo },
  { name: "Stripe", Logo: StripeLogo },
  { name: "Shopify", Logo: ShopifyLogo },
  { name: "Notion", Logo: NotionLogo },
  { name: "Vercel", Logo: VercelLogo },
] as const

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Component ──────────────────────────────────────────────────────────────

export function TrustedCompanies({
  title = "Trusted by modern marketing teams",
  className = "",
}: TrustedCompaniesProps) {
  return (
    <motion.section
      className={`w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Section title */}
      <motion.p
        variants={itemVariants}
        className="text-center text-xs sm:text-sm font-medium text-zinc-500 uppercase tracking-widest mb-8 sm:mb-10"
      >
        {title}
      </motion.p>

      {/* Glass card container */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-2xl border border-zinc-800/60 bg-zinc-950/40 backdrop-blur-xl p-6 sm:p-8 overflow-hidden"
      >
        {/* Subtle inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-2xl" />

        {/* Logo grid */}
        <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-8 sm:gap-10 items-center justify-items-center">
          {companies.map(({ name, Logo }) => (
            <motion.div
              key={name}
              variants={itemVariants}
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="group flex items-center justify-center"
            >
              <Logo
                className="h-6 sm:h-7 w-auto text-zinc-500 opacity-50 transition-all duration-300 group-hover:text-white group-hover:opacity-100"
                aria-label={`${name} logo`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  )
}
