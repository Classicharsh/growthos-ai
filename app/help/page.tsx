"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { HelpCircleIcon, ArrowLeftIcon, MessageSquareIcon, StarIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function HelpPage() {
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
            <HelpCircleIcon className="size-3.5 text-purple-400" />
            <span>Help Center</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            Dedicated 24/7 Engineering Support
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Need hands-on integration assistance or custom setup guidance? Our engineering team is standing by to help.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="sm" render={<Link href="/contact" />} nativeButton={false} className="gap-2 cursor-pointer">
              <MessageSquareIcon className="size-4" />
              <span>Contact Engineering</span>
            </Button>
            <Button size="sm" variant="outline" render={<Link href="/" />} nativeButton={false} className="cursor-pointer">
              Back to Home
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-2">How fast is onboarding?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              In under 5 minutes. You copy your client token from settings, paste it into your server application configuration block, and send a test payload event.
            </p>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-2">Can I route custom server-side payloads?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes. We support custom conversion mapping endpoints, letting you structure any telemetry parameters you wish to transmit to ad partners.
            </p>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-2">Does iOS 14.5 limit my CAPI matching?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              No. Since CAPI runs server-to-server and is first-party data communication, iOS browser tracking block restrictions do not apply to server-side routed events.
            </p>
          </Card>

          <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/30 backdrop-blur-md shadow-xs p-5">
            <h3 className="text-sm font-bold text-zinc-100 mb-2">Is there support for GDPR / HIPAA compliance?</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Yes, all personally identifiable information is hashed on the client or server prior to ingestion using SHA-256 formatting guidelines, keeping your user databases fully secure.
            </p>
          </Card>
        </motion.div>
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
