"use client"

import * as React from "react"
import { motion, type Variants } from "framer-motion"
import {
  Megaphone,
  Crosshair,
  Server,
  Users,
  BarChart3,
  BrainCircuit,
  Sparkles,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface FeatureCardData {
  id: string
  title: string
  description: string
  icon: LucideIcon
  badge?: string
  gradient: {
    /** Border gradient colors for hover highlight */
    border: string
    /** Background radial glow gradient */
    glow: string
    /** Icon container gradient background */
    iconBg: string
    /** Icon text color utility class */
    iconColor: string
    /** Badge styling */
    badgeStyle: string
  }
  stats?: {
    label: string
    value: string
  }
}

export interface FeaturesProps {
  /** Section main headline */
  title?: string
  /** Section subtitle / description */
  subtitle?: string
  /** Pill badge label above header */
  badgeText?: string
  /** List of feature items to render (defaults to 6 core features) */
  features?: FeatureCardData[]
  /** Optional custom class name for section wrapper */
  className?: string
}

// ─────────────────────────────────────────────────────────────────────────────
// DEFAULT FEATURE CARDS (6 PREMIUM MODULES)
// ─────────────────────────────────────────────────────────────────────────────

export const DEFAULT_FEATURES: FeatureCardData[] = [
  {
    id: "meta-ads-manager",
    title: "Meta Ads Manager",
    description:
      "Create, launch, and optimize Meta ad campaigns with AI-driven budget allocation, automated creative variation testing, and real-time ROAS scaling.",
    icon: Megaphone,
    badge: "AI Campaign Suite",
    gradient: {
      border: "from-purple-500 via-pink-500 to-indigo-500",
      glow: "from-purple-500/20 via-pink-500/10 to-transparent",
      iconBg: "from-purple-500/20 to-pink-500/20 border-purple-500/30",
      iconColor: "text-purple-400",
      badgeStyle: "bg-purple-500/10 text-purple-300 border-purple-500/25",
    },
    stats: {
      label: "Avg. ROAS Lift",
      value: "+34.8%",
    },
  },
  {
    id: "meta-pixel",
    title: "Meta Pixel",
    description:
      "One-click pixel integration with automatic client-side event tracking. Track PageViews, Leads, AddToCart, and Purchases without writing code.",
    icon: Crosshair,
    badge: "Zero Code Setup",
    gradient: {
      border: "from-blue-500 via-cyan-400 to-teal-500",
      glow: "from-blue-500/20 via-cyan-500/10 to-transparent",
      iconBg: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
      iconColor: "text-blue-400",
      badgeStyle: "bg-blue-500/10 text-blue-300 border-blue-500/25",
    },
    stats: {
      label: "Event Accuracy",
      value: "99.9%",
    },
  },
  {
    id: "conversion-api",
    title: "Conversion API",
    description:
      "Direct server-to-server Meta CAPI integration bypassing ad blockers and iOS 14+ tracking limits. Deliver verified conversion telemetry.",
    icon: Server,
    badge: "Server-Side CAPI",
    gradient: {
      border: "from-emerald-400 via-teal-500 to-cyan-500",
      glow: "from-emerald-500/20 via-teal-500/10 to-transparent",
      iconBg: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
      iconColor: "text-emerald-400",
      badgeStyle: "bg-emerald-500/10 text-emerald-300 border-emerald-500/25",
    },
    stats: {
      label: "Match Rate Quality",
      value: "98.4%",
    },
  },
  {
    id: "crm",
    title: "CRM",
    description:
      "Unified customer data engine connecting ad touchpoints, pixel triggers, CAPI conversions, and customer lifetime value into automated CRM profiles.",
    icon: Users,
    badge: "Unified Data Stack",
    gradient: {
      border: "from-amber-400 via-orange-500 to-rose-500",
      glow: "from-amber-500/20 via-orange-500/10 to-transparent",
      iconBg: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
      iconColor: "text-amber-400",
      badgeStyle: "bg-amber-500/10 text-amber-300 border-amber-500/25",
    },
    stats: {
      label: "Lead Enrichment",
      value: "Real-time",
    },
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Interactive real-time intelligence hub featuring live ROAS tracking, multi-touch attribution modeling, CPA benchmarks, and custom visual charts.",
    icon: BarChart3,
    badge: "Real-time BI",
    gradient: {
      border: "from-pink-500 via-rose-500 to-purple-500",
      glow: "from-pink-500/20 via-rose-500/10 to-transparent",
      iconBg: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
      iconColor: "text-pink-400",
      badgeStyle: "bg-pink-500/10 text-pink-300 border-pink-500/25",
    },
    stats: {
      label: "Attribution Funnel",
      value: "Multi-Touch",
    },
  },
  {
    id: "ai-insights",
    title: "AI Insights",
    description:
      "Continuous GPT-powered diagnostic engine surfacing ad fatigue, spend anomalies, creative recommendations, and automated executive briefs.",
    icon: BrainCircuit,
    badge: "GPT Intelligence",
    gradient: {
      border: "from-violet-500 via-indigo-500 to-purple-500",
      glow: "from-violet-500/20 via-indigo-500/10 to-transparent",
      iconBg: "from-violet-500/20 to-indigo-500/20 border-violet-500/30",
      iconColor: "text-violet-400",
      badgeStyle: "bg-violet-500/10 text-violet-300 border-violet-500/25",
    },
    stats: {
      label: "Automated Briefs",
      value: "24/7 Monitoring",
    },
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function Features({
  title = "Powering Next-Gen Growth",
  subtitle = "Six essential AI modules engineered to supercharge your Meta marketing engine, maximize conversion match rates, and automate growth.",
  badgeText = "Modular Intelligence Platform",
  features = DEFAULT_FEATURES,
  className = "",
}: FeaturesProps) {
  return (
    <motion.section
      className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={containerVariants}
    >
      {/* Background Ambient Glow for Section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ─── SECTION HEADER ─── */}
      <div className="flex flex-col items-center text-center mb-12 sm:mb-20">
        {badgeText && (
          <motion.div variants={headerVariants}>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md mb-6 shadow-sm">
              <Sparkles className="size-3.5 text-purple-400 animate-pulse" />
              <span>{badgeText}</span>
            </div>
          </motion.div>
        )}

        <motion.h2
          variants={headerVariants}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-heading mb-5"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            {title}
          </span>
        </motion.h2>

        {subtitle && (
          <motion.p
            variants={headerVariants}
            className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* ─── CARDS GRID (RESPONSIVE: 1 COL MOBILE, 2 COL TABLET, 3 COL DESKTOP) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature) => {
          const Icon = feature.icon

          return (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group relative rounded-2xl p-[1px] transition-all duration-500 cursor-pointer"
            >
              {/* Outer Ambient Glow Effect on Hover */}
              <div
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${feature.gradient.border} opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-xl pointer-events-none`}
              />

              {/* Gradient Border (revealed on hover) */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient.border} opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-[1px] pointer-events-none`}
              />

              {/* Static Resting Border */}
              <div className="absolute inset-0 rounded-2xl border border-zinc-800/80 group-hover:border-transparent transition-colors duration-500 pointer-events-none" />

              {/* Glassmorphic Container Layer */}
              <div className="relative h-full rounded-[15px] bg-zinc-950/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-500 group-hover:bg-zinc-950/90">
                {/* Radial Glow Highlight inside Card */}
                <div
                  className={`absolute -right-12 -top-12 size-44 rounded-full bg-gradient-to-br ${feature.gradient.glow} opacity-30 group-hover:opacity-80 transition-opacity duration-500 blur-2xl pointer-events-none`}
                />

                {/* Top Subtle Lighting Accent Line */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-white/20 transition-all duration-500" />

                <div>
                  {/* Top Row: Icon + Badge */}
                  <div className="flex items-center justify-between mb-6">
                    {/* Lucide Icon with Animated Glow */}
                    <div
                      className={`relative flex size-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient.iconBg} border shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className={`size-6 ${feature.gradient.iconColor} transition-transform duration-300`} />
                    </div>

                    {/* Pill Badge */}
                    {feature.badge && (
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold border ${feature.gradient.badgeStyle} backdrop-blur-sm shadow-xs`}
                      >
                        {feature.badge}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <div className="flex items-center justify-between group/title mb-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-zinc-100 tracking-tight group-hover:text-white transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <ArrowUpRight className="size-4 text-zinc-600 opacity-0 group-hover:opacity-100 group-hover:text-zinc-300 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                    {feature.description}
                  </p>
                </div>

                {/* Footer Stats / Metric Tag */}
                {feature.stats && (
                  <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs">
                    <span className="text-zinc-500 font-medium">{feature.stats.label}</span>
                    <span className={`font-bold tracking-wide ${feature.gradient.iconColor}`}>
                      {feature.stats.value}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.section>
  )
}

export default Features
