"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  ShieldCheckIcon, 
  CpuIcon, 
  TrendingUpIcon, 
  ZapIcon, 
  ArrowUpRightIcon, 
  ArrowDownRightIcon 
} from "lucide-react"

export interface StatItem {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  description: string
  icon: React.ComponentType<any>
  glowColor: string
}

const statsData: StatItem[] = [
  {
    title: "Meta CAPI Match Rate",
    value: "98.4%",
    change: "+2.1%",
    trend: "up",
    description: "Average customer data match quality",
    icon: ShieldCheckIcon,
    glowColor: "from-emerald-500/10 to-transparent"
  },
  {
    title: "Conversion Latency",
    value: "42ms",
    change: "-18%",
    trend: "up", // Less latency is good (upwards trend in efficiency)
    description: "Mean server-to-graph API response",
    icon: ZapIcon,
    glowColor: "from-amber-500/10 to-transparent"
  },
  {
    title: "Tracked Signals",
    value: "1.24M",
    change: "+14.3%",
    trend: "up",
    description: "Deduplicated web & server conversion events",
    icon: CpuIcon,
    glowColor: "from-purple-500/10 to-transparent"
  },
  {
    title: "Attribution Lift",
    value: "+34.2%",
    change: "+5.6%",
    trend: "up",
    description: "Incremental ROAS improvement",
    icon: TrendingUpIcon,
    glowColor: "from-blue-500/10 to-transparent"
  }
]

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-5 shadow-lg flex flex-col justify-between group"
          >
            {/* Ambient background glow */}
            <div className={`absolute -right-10 -top-10 w-28 h-28 bg-gradient-to-br ${stat.glowColor} rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500`} />

            <div className="flex items-start justify-between">
              <span className="text-xs text-zinc-500 font-semibold tracking-tight">{stat.title}</span>
              <div className="p-2 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-zinc-400 group-hover:text-white transition-colors duration-300">
                <Icon className="size-4.5" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.trend === "up" 
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                    : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                }`}>
                  {stat.trend === "up" ? <ArrowUpRightIcon className="size-3" /> : <ArrowDownRightIcon className="size-3" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 font-medium">
                {stat.description}
              </p>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
