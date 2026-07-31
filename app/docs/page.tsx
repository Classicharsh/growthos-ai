"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { BookOpenIcon, ArrowRightIcon, TerminalIcon, CpuIcon, SparklesIcon, CheckCircle2Icon } from "lucide-react"
import { motion } from "framer-motion"

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10 flex flex-col gap-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md shadow-xs">
            <BookOpenIcon className="size-3.5 text-purple-400" />
            <span>Documentation</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            GrowthOS AI Knowledge Base
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Integrating server-side conversion tracking doesn't have to be complicated. Get up and running in under five minutes.
          </p>
        </motion.div>

        {/* Docs Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
          
          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/40 backdrop-blur-md shadow-xs p-6 hover:border-zinc-700/60 transition-all duration-300">
            <CardHeader className="p-0 pb-4 space-y-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                <SparklesIcon className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold text-zinc-100">Getting Started</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Learn how to configure your account, set up domains, and retrieve API credentials.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>Configuring your Firebase & Webhook connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>Obtaining client tokens for the Next.js SDK</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>Running test events through the developer dashboard</span>
                </li>
              </ul>
              <Button size="sm" className="w-full justify-between rounded-xl cursor-pointer" render={<Link href="/signup" />} nativeButton={false}>
                <span>Setup Guide</span>
                <ArrowRightIcon className="size-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/40 backdrop-blur-md shadow-xs p-6 hover:border-zinc-700/60 transition-all duration-300">
            <CardHeader className="p-0 pb-4 space-y-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <TerminalIcon className="size-5" />
              </div>
              <CardTitle className="text-lg font-bold text-zinc-100">API Reference</CardTitle>
              <CardDescription className="text-xs text-zinc-500">Robust, fully-typed endpoints for managing custom events and matching customer identities.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <ul className="space-y-2 text-xs text-zinc-400">
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>REST API schema endpoints for Node, Python and Go</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>Conversion event schemas (Purchase, Lead, PageView)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2Icon className="size-4 text-purple-400" />
                  <span>Error code lists and rate limit thresholds</span>
                </li>
              </ul>
              <Button size="sm" variant="outline" className="w-full justify-between rounded-xl cursor-pointer" render={<Link href="/docs/api" />} nativeButton={false}>
                <span>View API Docs</span>
                <ArrowRightIcon className="size-4" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
