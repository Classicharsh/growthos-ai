"use client"

import * as React from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Card } from "@/components/ui/card"
import { ArrowUpRightIcon, ArrowDownRightIcon } from "lucide-react"

export interface AnalyticsCardProps {
  title: string
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  change: number
  icon: React.ComponentType<{ className?: string }>
  colorScheme: "purple" | "emerald" | "blue" | "amber"
}

export function AnalyticsCard({
  title,
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  change,
  icon: Icon,
  colorScheme,
}: AnalyticsCardProps) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    return prefix + latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix
  })

  React.useEffect(() => {
    const controls = animate(count, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1], // premium out-expo
    })
    return () => controls.stop()
  }, [value, count])

  const schemeStyles = {
    purple: {
      border: "hover:border-purple-500/30",
      glow: "group-hover:bg-purple-500/5",
      icon: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    emerald: {
      border: "hover:border-emerald-500/30",
      glow: "group-hover:bg-emerald-500/5",
      icon: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    blue: {
      border: "hover:border-blue-500/30",
      glow: "group-hover:bg-blue-500/5",
      icon: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    amber: {
      border: "hover:border-amber-500/30",
      glow: "group-hover:bg-amber-500/5",
      icon: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
  }

  const isPositive = change >= 0
  const styles = schemeStyles[colorScheme]

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group"
    >
      <Card className={`relative overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-5 space-y-4 shadow-lg transition-all duration-300 ${styles.border}`}>
        {/* Glow backdrop layer */}
        <div className={`absolute inset-0 -z-10 transition-colors duration-500 ${styles.glow}`} />

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
            {title}
          </span>
          <div className={`flex size-9 items-center justify-center rounded-xl border ${styles.icon}`}>
            <Icon className="size-4.5" />
          </div>
        </div>

        <div className="space-y-1">
          {/* Animated counter display */}
          <motion.div className="text-2xl font-extrabold text-white tracking-tight font-mono">
            {rounded}
          </motion.div>

          <div className="flex items-center gap-1">
            <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
              isPositive ? "text-emerald-400" : "text-rose-400"
            }`}>
              {isPositive ? (
                <ArrowUpRightIcon className="size-3" />
              ) : (
                <ArrowDownRightIcon className="size-3" />
              )}
              <span>{Math.abs(change)}%</span>
            </span>
            <span className="text-[9px] text-zinc-500 font-medium">vs last month</span>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
