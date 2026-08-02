"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { StatsCards } from "./StatsCards"
import { TrafficChart } from "./TrafficChart"
import { TrafficSources } from "./TrafficSources"
import { RecentEvents } from "./RecentEvents"
import { AIInsights } from "./AIInsights"

export function PremiumDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 w-full"
    >
      {/* Top Section: Key Stats grid */}
      <StatsCards />

      {/* Middle Section: Chart & Traffic Source Comparisons */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        <div className="lg:col-span-2 flex flex-col">
          <TrafficChart />
        </div>
        <div className="flex flex-col">
          <TrafficSources />
        </div>
      </div>

      {/* Bottom Section: Signals Log & AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <div className="flex flex-col">
          <RecentEvents />
        </div>
        <div className="flex flex-col">
          <AIInsights />
        </div>
      </div>
    </motion.div>
  )
}
