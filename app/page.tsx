"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { HeroBackground } from "@/components/landing/HeroBackground"
import {
  SparklesIcon,
  TrendingUpIcon,
  CpuIcon,
  ArrowRightIcon,
  CheckCircle2Icon,
  ZapIcon,
  ShieldCheckIcon,
  PlusIcon,
  StarIcon
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// Custom SVG icons not in lucide-react
// ─────────────────────────────────────────────────────────────────────────────

function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface CRMFeedItem {
  id: string;
  event: string;
  source: string;
  value: string;
  timestamp: string;
  color: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Stagger animation variants for fade-in orchestration
// ─────────────────────────────────────────────────────────────────────────────

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
}

const fadeScale = {
  hidden: { opacity: 0, scale: 0.94, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const }
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [conversionCount, setConversionCount] = React.useState(1824)
  const [mrr, setMrr] = React.useState(14892.40)
  const [conversionRate, setConversionRate] = React.useState(3.82)
  const [crmFeed, setCrmFeed] = React.useState<CRMFeedItem[]>([
    { id: "1", event: "Purchase API Tracked", source: "Meta CAPI", value: "+$240.00", timestamp: "Just now", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
    { id: "2", event: "Lead Generated", source: "AI Assistant", value: "Jane Doe", timestamp: "2m ago", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
    { id: "3", event: "Pixel Event Matched", source: "Meta Pixel", value: "PageView", timestamp: "5m ago", color: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
  ])

  const handleSimulateConversion = () => {
    const values = ["+$180.00", "+$450.00", "+$99.00", "+$299.00", "+$59.00"]
    const randomVal = values[Math.floor(Math.random() * values.length)]

    const newItem: CRMFeedItem = {
      id: Math.random().toString(),
      event: Math.random() > 0.5 ? "Purchase API Tracked" : "Lead Generated",
      source: Math.random() > 0.4 ? "Meta CAPI" : "Meta Pixel",
      value: randomVal,
      timestamp: "Just now",
      color: randomVal.includes("+")
        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        : "bg-purple-500/10 text-purple-400 border-purple-500/20"
    }

    setCrmFeed(prev => [newItem, ...prev.slice(0, 4)])
    setConversionCount(prev => prev + 1)
    if (randomVal.includes("+")) {
      const parsedVal = parseFloat(randomVal.replace("+$", ""))
      setMrr(prev => prev + parsedVal)
    }
    setConversionRate(prev => Math.min(6.5, +(prev + 0.04).toFixed(2)))
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* BACKGROUND LAYER                                                  */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <HeroBackground />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* NAVBAR                                                            */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <Navbar />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* HERO SECTION                                                      */}
      {/* Two-column: Left = Copy + CTAs, Right = Dashboard Preview         */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16 lg:pb-28 relative z-10 flex flex-col gap-28">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* ─── LEFT COLUMN: Copy & Actions ─── */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Pill Badge */}
            <motion.div variants={fadeUp}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium border border-purple-500/25 bg-purple-500/[0.07] text-purple-300 backdrop-blur-sm mb-8">
                <SparklesIcon className="size-3.5 text-purple-400 animate-pulse" />
                <span>Next-Gen Conversion API (CAPI) Integration</span>
              </div>
            </motion.div>

            {/* Headline with animated gradient shimmer */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold sm:text-5xl lg:text-[3.5rem] xl:text-6xl tracking-tight leading-[1.06] font-heading mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-br from-white via-zinc-100 to-zinc-400">
                Turn Clicks Into{" "}
              </span>
              <span
                className="bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_4s_ease-in-out_infinite]"
                style={{
                  backgroundImage: "linear-gradient(135deg, #a855f7 0%, #ec4899 25%, #818cf8 50%, #a855f7 75%, #ec4899 100%)",
                }}
              >
                Customers with AI
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg text-zinc-400 max-w-lg leading-relaxed mb-10"
            >
              All-in-one AI Marketing Platform with Meta Ads, Meta Pixel, Conversion API, CRM, Analytics, Landing Pages and AI Reports.
            </motion.p>

            {/* CTA Buttons with glow + scale + arrow animation */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4 w-full sm:w-auto mb-8">

              {/* Primary: Start Free */}
              <motion.div
                className="relative group rounded-xl"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Glow layer */}
                <div className="absolute -inset-[3px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-xl blur-lg opacity-40 group-hover:opacity-75 transition-all duration-500 group-hover:blur-xl" />
                <Button
                  size="lg"
                  onClick={handleSimulateConversion}
                  className="relative rounded-xl px-8 bg-white text-zinc-950 hover:bg-zinc-50 font-semibold border-0 h-12 shadow-lg cursor-pointer"
                >
                  Start Free
                  <motion.span
                    className="inline-flex ml-2"
                    initial={{ x: 0 }}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <ArrowRightIcon className="size-4" />
                  </motion.span>
                </Button>
              </motion.div>

              {/* Secondary: Book Demo */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleSimulateConversion}
                  className="rounded-xl px-8 border-zinc-700/80 bg-zinc-900/50 hover:bg-zinc-800/70 hover:border-zinc-600 hover:text-white text-zinc-300 font-medium h-12 cursor-pointer transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                >
                  Book Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Social Proof Strip: Stars + Trusted + CAPI Verified */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="size-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-zinc-400 text-xs font-medium">4.9/5 Rating</span>
              </div>

              <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

              {/* Trusted by */}
              <div className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full size-2 bg-emerald-500" />
                </span>
                <span className="text-zinc-400 text-xs font-medium">
                  Trusted by <strong className="text-zinc-200">10,000+</strong> marketers
                </span>
              </div>

              <div className="h-4 w-px bg-zinc-800 hidden sm:block" />

              {/* Meta CAPI Verified */}
              <div className="flex items-center gap-1.5">
                <ShieldCheckIcon className="size-4 text-purple-400" />
                <span className="text-zinc-400 text-xs font-medium">Meta CAPI Verified</span>
              </div>
            </motion.div>

          </motion.div>

          {/* ─── RIGHT COLUMN: Floating Dashboard Preview ─── */}
          <motion.div
            className="lg:col-span-6 relative"
            variants={fadeScale}
            initial="hidden"
            animate="visible"
          >
            {/* Purple glow behind dashboard — pulsating */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-tr from-purple-600/25 via-indigo-500/15 to-pink-500/10 rounded-3xl blur-3xl pointer-events-none"
              animate={{
                opacity: [0.4, 0.6, 0.4],
                scale: [1, 1.02, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating animation wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Window Container */}
              <div className="relative border border-zinc-800/80 rounded-2xl bg-zinc-950/70 backdrop-blur-2xl shadow-[0_20px_60px_-12px_rgba(168,85,247,0.15),0_0_0_1px_rgba(255,255,255,0.03)] overflow-hidden">

                {/* Window Title Bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800/60">
                  <div className="flex items-center gap-1.5">
                    <div className="size-2.5 rounded-full bg-red-500/50" />
                    <div className="size-2.5 rounded-full bg-yellow-500/50" />
                    <div className="size-2.5 rounded-full bg-green-500/50" />
                    <span className="text-[10px] font-mono text-zinc-500 ml-3">growthos.ai/dashboard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="rounded-full px-2.5 py-0.5 bg-purple-500/10 border border-purple-500/20 text-[9px] font-medium text-purple-300 flex items-center gap-1">
                      <FacebookIcon className="size-2.5" />
                      <span>Meta Connected</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard Inner Content */}
                <div className="p-5 sm:p-6 space-y-5">

                  {/* Stats Row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 space-y-1.5">
                      <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">MRR</span>
                      <span className="text-sm sm:text-base font-bold tracking-tight block">
                        ${mrr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 space-y-1.5">
                      <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Conversions</span>
                      <span className="text-sm sm:text-base font-bold tracking-tight text-purple-400 block">
                        {conversionCount.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl border border-zinc-800/60 bg-zinc-900/30 space-y-1.5">
                      <span className="text-[9px] font-semibold text-zinc-500 uppercase tracking-wider block">Conv. Rate</span>
                      <span className="text-sm sm:text-base font-bold tracking-tight text-emerald-400 block">
                        {conversionRate}%
                      </span>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-900/20 space-y-3">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500">
                      <span className="font-semibold text-zinc-400">Real-Time Funnel Scaling</span>
                      <span className="flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-purple-500" />
                        CAPI Matches
                      </span>
                    </div>
                    <div className="h-28 w-full">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="hero-chart-gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d="M0 25 C 20 22, 40 12, 60 18 C 80 8, 90 4, 100 2 L 100 30 L 0 30 Z" fill="url(#hero-chart-gradient)" />
                        <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
                        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.025)" strokeWidth="0.5" />
                        <path d="M0 25 C 20 22, 40 12, 60 18 C 80 8, 90 4, 100 2" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="60" cy="18" r="2" fill="#a855f7" className="animate-pulse" />
                        <circle cx="100" cy="2" r="2" fill="#a855f7" />
                      </svg>
                    </div>
                  </div>

                  {/* CRM Live Feed */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 px-0.5">
                      <span className="font-semibold text-zinc-400">Live API Inflow (CRM)</span>
                      <span>Match Rate: <strong className="text-emerald-400">98.4%</strong></span>
                    </div>

                    <div className="space-y-1.5 min-h-[120px] flex flex-col justify-start">
                      <AnimatePresence initial={false}>
                        {crmFeed.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: -8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className={`flex items-center justify-between border rounded-lg px-3 py-2 text-xs bg-zinc-950/50 backdrop-blur-sm ${item.color}`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="size-1.5 rounded-full bg-current animate-pulse" />
                              <div className="space-y-0.5">
                                <p className="font-medium text-[11px] text-zinc-100">{item.event}</p>
                                <p className="text-[9px] opacity-70">{item.source}</p>
                              </div>
                            </div>
                            <div className="text-right space-y-0.5">
                              <p className="font-semibold text-[11px]">{item.value}</p>
                              <p className="text-[8px] opacity-50">{item.timestamp}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Simulator button */}
            <div className="mt-5 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSimulateConversion}
                  className="rounded-lg text-[11px] gap-1.5 px-4 border-zinc-800 bg-zinc-900/30 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800/40 transition-all duration-300 cursor-pointer"
                >
                  <PlusIcon className="size-3" />
                  <span>Trigger Live CAPI Event</span>
                </Button>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* ═══════════════════════════════════════════════════════════════════ */}
        {/* FEATURE CARDS                                                    */}
        {/* ═══════════════════════════════════════════════════════════════════ */}
        <motion.section
          className="space-y-8 pt-16 border-t border-zinc-800/40"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">
              Integrations Platform Features
            </h2>
            <p className="text-sm text-zinc-500 max-w-md mx-auto">Premium design details crafted for top-tier user experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { icon: FacebookIcon, title: "Meta CAPI & Pixel", desc: "Zero data loss tracking", body: "Connect your pixel and Conversion API in under 2 minutes. GrowthOS dynamically routes server-side actions, lifting custom match rates automatically.", color: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
              { icon: CpuIcon, title: "AI Ads Manager", desc: "Self-healing growth loops", body: "Automatically adjusts budget, targets, and ad copy configurations based on yield data returned from your server-side conversion funnels.", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
              { icon: TrendingUpIcon, title: "Real-Time CRM & Reports", desc: "End-to-end user journeys", body: "View your customer lifetimes from direct click, CAPI match, lead ingestion, custom sales close, to automated monthly recurring income checks.", color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20" },
            ].map((card, idx) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs hover:border-zinc-700/60 hover:bg-zinc-900/30 transition-all duration-300 h-full">
                    <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-2">
                      <div className={`flex size-10 items-center justify-center rounded-xl border ${card.color}`}>
                        <Icon className="size-5" />
                      </div>
                      <div>
                        <CardTitle className="text-sm font-semibold text-zinc-100">{card.title}</CardTitle>
                        <CardDescription className="text-xs text-zinc-500">{card.desc}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs text-zinc-400 leading-relaxed">
                      {card.body}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.section>

      </main>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* FOOTER                                                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
