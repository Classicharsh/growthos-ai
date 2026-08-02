"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { CompassIcon } from "lucide-react"

export interface TrafficSourceItem {
  name: string
  value: number
}

export interface TrafficSourcesProps {
  sources?: TrafficSourceItem[]
}

export function TrafficSources({ sources = [] }: TrafficSourcesProps) {
  // Helper to map colors dynamically
  const getBarColor = (name: string) => {
    switch (name.toLowerCase()) {
      case "facebook":
        return "bg-purple-500"
      case "instagram":
        return "bg-pink-500"
      case "google":
        return "bg-blue-500"
      default:
        return "bg-zinc-500"
    }
  }

  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <CompassIcon className="size-4.5 text-purple-400" />
          <span>Attribution Sources</span>
        </CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          Conversion share breakdown by marketing channel.
        </CardDescription>
      </CardHeader>

      <div className="space-y-4">
        {sources.length === 0 ? (
          <div className="text-xs text-zinc-500 font-medium py-4 text-center">
            No attribution sources found.
          </div>
        ) : (
          sources.map((item, idx) => (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-300">{item.name}</span>
                <span className="text-white font-bold">{item.value}% Share</span>
              </div>

              {/* Custom linear-styled progress bar */}
              <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                  className={`h-full rounded-full ${getBarColor(item.name)} opacity-80`}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
