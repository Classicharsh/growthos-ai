"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { SparklesIcon, ArrowRightIcon } from "lucide-react"

export interface InsightItem {
  id: string
  title: string
  description: string
  impact: "critical" | "high" | "info"
  impactText: string
  suggestion: string
}

const insightsData: InsightItem[] = [
  {
    id: "ins_01",
    title: "Pixel-to-Server Deduplication Conflict",
    description: "Detected missing event_id parameters on 2.4% of client AddToCart triggers, causing duplicate records on Meta Ads Manager.",
    impact: "critical",
    impactText: "High Loss Risk",
    suggestion: "Apply eventId correlation helper to window.fbq call."
  },
  {
    id: "ins_02",
    title: "Enhance Match Rate Quality via FBP/FBC",
    description: "Server CAPI event matching rate can be optimized by 8.4% by mapping client browser cookies directly to the request payloads.",
    impact: "high",
    impactText: "ROAS Lift Potential",
    suggestion: "Enable automatic cookie harvesting middleware."
  },
  {
    id: "ins_03",
    title: "Safari Browser Signal Attenuation",
    description: "Due to Apple's standard ITP update policies, direct Pixel tracking on Safari shows a 14% drop. CAPI server redundancy is fully operational.",
    impact: "info",
    impactText: "System Insight",
    suggestion: "Review server routing redundancy configs."
  }
]

export function AIInsights() {
  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <SparklesIcon className="size-4.5 text-purple-400" />
          <span>AI Growth Recommendations</span>
        </CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          Proactive recommendations to maximize event match scores and lower acquisition costs.
        </CardDescription>
      </CardHeader>

      <div className="space-y-4">
        {insightsData.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/60 flex flex-col justify-between gap-3 group hover:border-zinc-800/80 transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-extrabold text-zinc-200 group-hover:text-white transition-colors duration-200">
                  {item.title}
                </h4>
                <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">
                  {item.description}
                </p>
              </div>

              <span className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                item.impact === "critical" 
                  ? "bg-rose-500/10 text-rose-400 border border-rose-500/20" 
                  : item.impact === "high"
                    ? "bg-purple-500/10 text-purple-400 border border-purple-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              }`}>
                {item.impactText}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-900/60 pt-2 text-[10px] font-semibold">
              <span className="text-purple-400/90 font-medium italic">
                Suggestion: {item.suggestion}
              </span>
              <button className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer">
                <span>Apply</span>
                <ArrowRightIcon className="size-3 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
