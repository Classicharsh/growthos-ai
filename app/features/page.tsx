"use client"

import * as React from "react"
import { Navbar } from "@/components/layout/navbar"
import { HeroBackground } from "@/components/landing/HeroBackground"
import { Features } from "@/components/landing/features"

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-50 font-sans selection:bg-purple-600 selection:text-white relative overflow-hidden">
      <HeroBackground />
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-24 pb-16 lg:pb-28 relative z-10">
        <Features />
      </main>
      <footer className="border-t border-zinc-800/40 bg-zinc-950/30 py-8 mt-8 text-center text-xs text-zinc-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} GrowthOS AI. All rights reserved. Created for premium SaaS architectures.</p>
      </footer>
    </div>
  )
}
