"use client"

import * as React from "react"
import { motion } from "framer-motion"

// ─────────────────────────────────────────────────────────────────────────────
// TRUSTED COMPANIES COMPONENT
//
// Social-proof logo strip designed to sit between Hero and Features sections.
// Every logo is an inline SVG — zero external image dependencies.
//
// Design:
//  • Logos render in grayscale (zinc-600 at 40% opacity) on dark backgrounds.
//  • On hover they transition to their brand color + scale 1.1.
//  • Outer section has a soft gradient background + glassmorphic inner card.
//  • Framer Motion orchestrates staggered scroll-triggered entrance.
//
// Usage:
//   import { TrustedCompanies } from "@/components/landing/TrustedCompanies"
//   <TrustedCompanies />
// ─────────────────────────────────────────────────────────────────────────────

// ─── Props ──────────────────────────────────────────────────────────────────

interface TrustedCompaniesProps {
  title?: string
  subtitle?: string
  className?: string
}

// ─── SVG Logo Components ────────────────────────────────────────────────────

function MetaLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 512 512" fill="currentColor" className={className} {...props}>
      <path d="M480 256c0-17.1-3.3-34.6-9.8-52.2C449 152.1 410.2 120 370 120c-27.4 0-52.3 14.3-73.8 36.4-7.8 8-14.9 17-21.4 26.8L256 212l-18.8-28.8c-6.5-9.8-13.6-18.8-21.4-26.8C194.3 134.3 169.4 120 142 120c-40.2 0-79 32.1-100.2 83.8C35.3 221.4 32 238.9 32 256c0 57.5 27.9 93.8 49.4 118.2 7.8 8.9 15.5 16.2 21.6 21.5 3 2.7 5.6 4.7 7.4 6.1.9.7 1.7 1.3 2.2 1.6l.7.5.2.1C131.4 416.6 142 424 142 424c15.2 0 42.4-23.4 69.8-63.2l24.8-38.2c5-7.8 9.8-15.8 14.4-24.2l5-8.4 5 8.4c4.6 8.4 9.4 16.4 14.4 24.2l24.8 38.2C327.6 400.6 354.8 424 370 424s28.6-7.4 46.5-20.1l.2-.1.7-.5c.5-.3 1.3-.9 2.2-1.6 1.8-1.4 4.4-3.4 7.4-6.1 6.1-5.3 13.8-12.6 21.6-21.5C469.1 349.8 480 313.5 480 256zm-141-88c14.9 0 31.4 8.7 47.6 28.5 13.3 16.3 24.2 37.6 31.4 58.5 4.7 13.7 7 26.3 7 41 0 42.4-18.4 72.2-38.6 95.2-6.8 7.7-13.5 14-19 18.7-2.7 2.4-4.9 4.1-6.4 5.3-.6.4-1 .8-1.3 1l-.2.2c-5.4 3.8-7.4 4.6-8.5 4.6-5.4 0-28.2-17.6-56-56.8l-24.8-38.2c-7.2-11.2-13.8-22.4-19.4-33l-11.2-21.4c18.8-39.8 42.6-72.8 64.2-88.8C316.2 172.6 327.2 168 339 168zM173 168c11.8 0 22.8 4.6 35.2 15.6 21.6 16 45.4 49 64.2 88.8l-11.2 21.4c-5.6 10.6-12.2 21.8-19.4 33l-24.8 38.2c-27.8 39.2-50.6 56.8-56 56.8-1.1 0-3.1-.8-8.5-4.6l-.2-.2c-.3-.2-.7-.6-1.3-1-1.5-1.2-3.7-2.9-6.4-5.3-5.5-4.7-12.2-11-19-18.7-20.2-23-38.6-52.8-38.6-95.2 0-14.7 2.3-27.3 7-41 7.2-20.9 18.1-42.2 31.4-58.5C141.6 176.7 158.1 168 173 168z" />
    </svg>
  )
}

function GoogleLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function ShopifyLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 448 512" fill="currentColor" className={className} {...props}>
      <path d="M388.32 104.1a4.66 4.66 0 0 0-4.4-4c-2 0-37.23-.8-37.23-.8s-21.61-20.82-29.62-28.83V503.2L442.76 472S388.72 106.5 388.32 104.1zM288.65 70.47a116.67 116.67 0 0 0-7.21-17.61C271 32 256.44 22 240 22c-1 0-2 .09-3 .17l-4-5.25C225.07 7.67 214.75 3 204 3c-40.1 0-79.44 30-110.43 84.47-21.77 38.33-38.25 86.58-42.92 123.83-43.76 13.55-74.36 23.05-75.26 23.35C-40.4 239.48-41 243.63-41.22 248L.55 503.2l284.2-42.63s-1.62-1.5-14.28-15.6c-14.66-16.3 28.22-52.34 21.82-66.82-6.68-15.07 25-51.74 25-51.74L288.65 70.47zm-163.73 79.41c0-9.18 7.58-16.76 16.85-16.76s16.76 7.58 16.76 16.76a16.77 16.77 0 0 1-16.76 16.76c-9.27.01-16.85-7.49-16.85-16.76z" />
    </svg>
  )
}

function StripeLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 640 268" fill="currentColor" className={className} {...props}>
      <path d="M414 134.6c0-45.5-22-81.4-64.2-81.4-42.4 0-67.8 35.9-67.8 81 0 53.5 30.2 80.5 73.4 80.5 21.2 0 37.2-4.8 49.2-11.5v-35.6c-12 6-25.8 9.8-43.4 9.8-17.2 0-32.4-6-34.4-27h86.6c0-2.4.6-11.8.6-15.8zm-87.6-17c0-20 12.2-28.4 23.4-28.4 10.8 0 22.4 8.4 22.4 28.4h-45.8zM233.4 53.2c-17.2 0-28.4 8.2-34.6 13.8l-2.2-11h-39v211.2l44.2-9.4.2-51.2c6.2 4.6 15.6 11 31 11 31.4 0 60-25.2 60-81-.2-51-29.2-83.4-59.6-83.4zm-10.4 128.4c-10.4 0-16.4-3.6-20.6-8.2l-.2-64.4c4.6-5 10.8-8.6 20.8-8.6 16 0 27 17.8 27 40.4 0 23.2-10.8 40.8-27 40.8zM106 0L61.4 9.4l-.2 193.4c0 35.6 26.8 62 62.4 62 19.8 0 34.2-3.6 42.2-8V221c-7.8 3-46.2 14.2-46.2-21.4V98h46.2V62H119.6l-.2-47.4L106 0zM48.6 104c0-7 5.8-9.6 15.2-9.6 13.6 0 30.6 4.2 44.2 11.4V65.4c-14.8-5.8-29.4-8.2-44.2-8.2-36.2 0-60.2 19-60.2 50.6 0 49.4 68.2 41.6 68.2 63 0 8.2-7.2 10.8-17.2 10.8-14.8 0-33.8-6-48.8-14.2v41c16.6 7.2 33.4 10.2 48.8 10.2 37.2 0 63.2-18.4 63.2-50.6C118 119.6 48.6 129.2 48.6 104z" />
    </svg>
  )
}

function VercelLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 284 65" fill="currentColor" className={className} {...props}>
      <path d="M141.68 16.25c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.46 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm117.14-14.5c-11.04 0-19 7.2-19 18s8.96 18 20 18c6.67 0 12.55-2.64 16.19-7.09l-7.65-4.42c-2.02 2.21-5.09 3.5-8.54 3.5-4.79 0-8.86-2.5-10.37-6.5h28.02c.22-1.12.35-2.28.35-3.5 0-10.79-7.96-17.99-19-17.99zm-9.45 14.5c1.25-3.99 4.67-6.5 9.45-6.5 4.79 0 8.21 2.51 9.45 6.5h-18.9zm-39.03 3.5c0 6 3.92 10 10 10 4.12 0 7.21-1.87 8.8-4.92l7.68 4.43c-3.18 5.3-9.14 8.49-16.48 8.49-11.05 0-19-7.2-19-18s7.96-18 19-18c7.34 0 13.29 3.19 16.48 8.49l-7.68 4.43c-1.59-3.05-4.68-4.92-8.8-4.92-6.07 0-10 4-10 10zm82.48-29v46h-9v-46h9zM37.59.25l36.95 64H.64l36.95-64zm92.38 5l-27.71 48-27.71-48H184l-18.46 32-18.47-32h9.75z" />
    </svg>
  )
}

function NotionLogo({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 120 126" fill="currentColor" className={className} {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M20.6927 21.9646C24.5836 25.1383 26.1418 24.7628 33.5236 24.2002L103.252 19.6998C104.818 19.6998 103.44 18.1323 102.877 17.944L91.5127 9.77459C89.1927 7.90837 86.1127 5.85485 80.3218 6.41743L12.7473 11.2935C10.2382 11.4817 9.67272 12.8621 10.8018 14.0543L20.6927 21.9646ZM24.7709 36.3196V111.468C24.7709 115.018 26.5164 116.211 30.5945 115.961L107.33 111.468C111.408 111.218 111.784 108.789 111.784 105.802V31.0296C111.784 28.0485 110.654 26.3932 108.084 26.5809L27.9545 31.409C25.3854 31.5971 24.7709 33.0651 24.7709 36.3196ZM100.546 39.1184C100.921 40.8737 100.546 42.6285 98.7854 42.8161L95.3309 43.3787V101.502C92.2636 103.18 89.3709 104.185 86.8582 104.185C82.7836 104.185 81.6582 102.881 78.5764 99.08L54.2527 61.1577V97.7633L61.4527 99.3308C61.4527 99.3308 61.4527 104.185 54.8145 104.185L36.2182 105.315C35.8436 104.185 36.2182 101.314 38.3454 100.75L43.2945 99.3684V50.7548L36.2218 50.192C35.8473 48.4371 36.7873 45.8318 39.4691 45.6437L59.3836 44.3259L84.5382 82.8113V49.0068L78.5764 48.2573C78.2018 46.1277 79.7036 44.5655 81.6545 44.3787L100.546 39.1184ZM7.41818 5.29349L78.0182 0.0387817C86.1236 -0.524009 88.2473 0.0387817 93.2836 3.77627L117.044 20.4501C120.548 23.0601 121.864 23.8101 121.864 26.7959V111.468C121.864 117.594 119.544 121.144 111.408 121.706L30.03 126.77C23.7673 127.145 20.8782 126.395 17.5964 122.286L4.33818 105.05C0.860001 100.383 -0.652726 96.8288 -0.652726 92.7149V14.0543C-0.652726 8.86622 1.66727 4.73106 7.41818 5.29349Z" />
    </svg>
  )
}

// ─── Company Data ───────────────────────────────────────────────────────────

interface CompanyData {
  name: string
  Logo: React.ComponentType<React.ComponentProps<"svg">>
  /** Brand color applied on hover via inline style */
  brandColor: string
}

const companies: CompanyData[] = [
  { name: "Meta",    Logo: MetaLogo,    brandColor: "#0081FB" },
  { name: "Google",  Logo: GoogleLogo,  brandColor: "#4285F4" },
  { name: "Shopify", Logo: ShopifyLogo, brandColor: "#95BF47" },
  { name: "Stripe",  Logo: StripeLogo,  brandColor: "#635BFF" },
  { name: "Vercel",  Logo: VercelLogo,  brandColor: "#ffffff" },
  { name: "Notion",  Logo: NotionLogo,  brandColor: "#ffffff" },
]

// ─── Animation Variants ─────────────────────────────────────────────────────

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const textVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const logoVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

// ─── Component ──────────────────────────────────────────────────────────────

export function TrustedCompanies({
  title = "Trusted by modern marketing teams",
  subtitle = "Helping businesses scale with Meta Ads, AI, Analytics and Conversion Tracking.",
  className = "",
}: TrustedCompaniesProps) {
  return (
    <motion.section
      className={`relative w-full py-16 sm:py-20 lg:py-24 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {/* Soft gradient background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/[0.08] via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-purple-600/[0.04] blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading + Subheading */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.p
            variants={textVariants}
            className="text-sm sm:text-base font-semibold text-zinc-400 uppercase tracking-widest mb-3"
          >
            {title}
          </motion.p>
          <motion.p
            variants={textVariants}
            className="text-xs sm:text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Glass card */}
        <motion.div
          variants={textVariants}
          className="relative rounded-2xl border border-zinc-800/50 bg-zinc-950/50 backdrop-blur-2xl px-6 py-8 sm:px-10 sm:py-10 overflow-hidden"
        >
          {/* Inner gradient shimmer */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/[0.015] via-transparent to-white/[0.01] pointer-events-none" />
          
          {/* Top edge highlight */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent" />

          {/* Logo grid — 3 cols mobile, 6 cols desktop */}
          <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-y-10 gap-x-6 sm:gap-x-8 items-center justify-items-center">
            {companies.map(({ name, Logo, brandColor }) => (
              <motion.div
                key={name}
                variants={logoVariants}
                className="group relative flex flex-col items-center gap-3 cursor-default"
              >
                {/* Glow behind logo on hover */}
                <div
                  className="absolute inset-0 -m-4 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: brandColor, opacity: 0 }}
                />

                <motion.div
                  whileHover={{ scale: 1.15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="relative"
                >
                  <Logo
                    className="h-6 sm:h-7 w-auto transition-all duration-400 text-zinc-600 opacity-40 group-hover:opacity-100"
                    style={{ 
                      // On hover, CSS handles the color transition via the group class
                      // We set a CSS custom property that the transition picks up
                    }}
                    aria-label={`${name} logo`}
                  />
                  {/* Colored overlay that fades in on hover */}
                  <Logo
                    className="absolute inset-0 h-6 sm:h-7 w-auto opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                    style={{ color: brandColor }}
                    aria-hidden="true"
                  />
                </motion.div>

                {/* Company name tooltip */}
                <span className="text-[10px] font-medium text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                  {name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
