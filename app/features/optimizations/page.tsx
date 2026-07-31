"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CpuIcon, ArrowLeftIcon, ZapIcon, SparklesIcon, TrendingUpIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function OptimizationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10 flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-blue-500/30 bg-blue-500/10 text-blue-300 backdrop-blur-md shadow-xs">
            <CpuIcon className="size-3.5 text-blue-400 animate-pulse" />
            <span>Auto-Optimizations Suite</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            Auto-Optimizations
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Self-healing growth loops that adjust marketing yield parameters based on real-time server-side tracking values.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="sm" render={<Link href="/features" />} nativeButton={false} className="gap-2 cursor-pointer">
              <ArrowLeftIcon className="size-4" />
              <span>Back to Features</span>
            </Button>
            <Button size="sm" variant="outline" render={<Link href="/signup" />} nativeButton={false} className="cursor-pointer">
              Get Started Free
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ZapIcon className="size-5" />
              </div>
              <CardTitle className="text-sm font-semibold text-zinc-100">Self-Healing Loops</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400 leading-relaxed">
              Dynamically corrects tracking and mapping mismatches when browser cookies differ from server logs.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <SparklesIcon className="size-5" />
              </div>
              <CardTitle className="text-sm font-semibold text-zinc-100">AI Yield Management</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400 leading-relaxed">
              Monitors ad bids and CPC values, automatically shifting your resources to match segments showing the highest conversion rates.
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <TrendingUpIcon className="size-5" />
              </div>
              <CardTitle className="text-sm font-semibold text-zinc-100">Scale Triggers</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-zinc-400 leading-relaxed">
              Set customized triggers to automatically duplicate high-yield ad sets, scale daily budgets, or alert team slack channels.
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
