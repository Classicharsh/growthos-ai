"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { TerminalIcon, ArrowLeftIcon, SparklesIcon, CheckCircle2Icon } from "lucide-react"
import { motion } from "framer-motion"

export default function APIDocsPage() {
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
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md shadow-xs">
            <TerminalIcon className="size-3.5 text-purple-400" />
            <span>Developer Reference</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            REST & Event APIs
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Integrate server-side conversions into your own backend application using our fully-typed event structures.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="sm" render={<Link href="/docs" />} nativeButton={false} className="gap-2 cursor-pointer">
              <ArrowLeftIcon className="size-4" />
              <span>Back to Docs</span>
            </Button>
            <Button size="sm" variant="outline" render={<Link href="/signup" />} nativeButton={false} className="cursor-pointer">
              Create Developer Account
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-6"
        >
          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs p-6">
            <h3 className="text-base font-bold text-zinc-100 mb-4 flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400 text-xs font-semibold">POST</span>
              <span>/v1/events</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              Dispatches conversion events directly to GrowthOS AI. The engine will match individual client characteristics (IP, agent, email hash) and forward the matched metadata to the Meta API.
            </p>
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800 font-mono text-[11px] text-zinc-300 overflow-x-auto space-y-1">
              <p className="text-zinc-500">// Header Authentication required</p>
              <p>Authorization: Bearer <span className="text-purple-400">YOUR_API_TOKEN</span></p>
              <br />
              <p className="text-zinc-500">// Request Payload Example</p>
              <p>{"{"}</p>
              <p className="pl-4">"event_name": <span className="text-emerald-400">"Purchase"</span>,</p>
              <p className="pl-4">"event_time": 1722428581,</p>
              <p className="pl-4">"user_data": {"{"}</p>
              <p className="pl-8">"em": <span className="text-emerald-400">"f660ab912ec121d1b1e928a0bb4bc61b15f5ad44d5efdc4e1c92a25e99b8e44a"</span>,</p>
              <p className="pl-8">"ph": <span className="text-emerald-400">"45a91e56a1b2b8c9d4e..."</span></p>
              <p className="pl-4">{"}"},</p>
              <p className="pl-4">"custom_data": {"{"}</p>
              <p className="pl-8">"currency": <span className="text-emerald-400">"USD"</span>,</p>
              <p className="pl-8">"value": 149.00</p>
              <p className="pl-4">{"}"}</p>
              <p>{"}"}</p>
            </div>
          </Card>
        </motion.div>
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
