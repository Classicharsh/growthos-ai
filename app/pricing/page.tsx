"use client"

import * as React from "react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { CheckCircle2Icon, StarIcon, ShieldCheckIcon, SparklesIcon } from "lucide-react"
import { motion } from "framer-motion"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10 flex flex-col gap-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/10 text-purple-300 backdrop-blur-md shadow-xs">
            <StarIcon className="size-3.5 text-purple-400 fill-purple-400" />
            <span>Pricing Plans</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
            Predictable Plans for Ambitious Teams
          </h1>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            Choose the tier that best fits your scale. All plans include direct Meta Conversion API routing, automated user profiles, and real-time CRM updates.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Starter Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex"
          >
            <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/40 backdrop-blur-md shadow-xs flex flex-col justify-between w-full h-full hover:border-zinc-700/60 transition-all duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-bold text-zinc-100">Starter</CardTitle>
                <CardDescription className="text-xs text-zinc-500">Perfect for indie builders and small projects.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-extrabold tracking-tight text-white">$49</span>
                  <span className="text-xs text-zinc-500 font-medium"> / mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="h-px bg-zinc-800/60" />
                <ul className="space-y-2.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Up to 10k monthly matched events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Meta Pixel & CAPI integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>1 Custom Conversion Loop</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Next.js Client SDK integration</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full justify-center rounded-xl cursor-pointer" render={<Link href="/signup" />} nativeButton={false}>
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Growth Plan (Most Popular) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex relative"
          >
            <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 rounded-2xl blur-md opacity-35" />
            <Card className="rounded-2xl border-purple-500/30 bg-zinc-950/80 backdrop-blur-md shadow-2xl flex flex-col justify-between w-full h-full relative z-10">
              <CardHeader className="space-y-2 relative">
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[9px] font-semibold tracking-wide uppercase border border-purple-500/30 bg-purple-500/20 text-purple-300">
                  <SparklesIcon className="size-2 text-purple-400" />
                  <span>Popular</span>
                </div>
                <CardTitle className="text-lg font-bold text-zinc-100">Growth</CardTitle>
                <CardDescription className="text-xs text-zinc-500">For scaling startups wanting direct API optimization.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-extrabold tracking-tight text-white">$149</span>
                  <span className="text-xs text-zinc-500 font-medium"> / mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="h-px bg-zinc-800/60" />
                <ul className="space-y-2.5 text-xs text-zinc-300">
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Up to 100k monthly matched events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Meta Pixel & CAPI integration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Unlimited Conversion Loops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>AI Yield Autopilot manager</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Real-time slack and webhook reports</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button className="w-full justify-center bg-white text-zinc-950 hover:bg-zinc-100 rounded-xl cursor-pointer" render={<Link href="/signup" />} nativeButton={false}>
                  Start Free Trial
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex"
          >
            <Card className="rounded-2xl border-zinc-800/60 bg-zinc-950/40 backdrop-blur-md shadow-xs flex flex-col justify-between w-full h-full hover:border-zinc-700/60 transition-all duration-300">
              <CardHeader className="space-y-2">
                <CardTitle className="text-lg font-bold text-zinc-100">Enterprise</CardTitle>
                <CardDescription className="text-xs text-zinc-500">For large organizations requiring bespoke solutions.</CardDescription>
                <div className="pt-4">
                  <span className="text-4xl font-extrabold tracking-tight text-white">$499</span>
                  <span className="text-xs text-zinc-500 font-medium"> / mo</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <div className="h-px bg-zinc-800/60" />
                <ul className="space-y-2.5 text-xs text-zinc-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Over 1M monthly matched events</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Dedicated server instances</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>99.9% uptime SLA guarantee</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Custom CRM syncing schedules</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2Icon className="size-4 text-purple-400" />
                    <span>Direct engineering line (24/7 support)</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Button variant="outline" className="w-full justify-center rounded-xl cursor-pointer" render={<Link href="/signup" />} nativeButton={false}>
                  Contact Sales
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

        </div>

        {/* Security / FAQ hint */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-zinc-500 border-t border-zinc-800/40 pt-8">
          <div className="flex items-center gap-1.5">
            <ShieldCheckIcon className="size-4 text-purple-400" />
            <span>Secure 256-bit SSL checkout encryption</span>
          </div>
          <span className="hidden sm:block text-zinc-700">|</span>
          <div>Cancel, upgrade or downgrade any time you choose.</div>
        </div>

      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
