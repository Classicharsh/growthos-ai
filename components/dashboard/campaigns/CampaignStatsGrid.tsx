"use client"

import * as React from "react"
import { AnalyticsCard } from "../AnalyticsCard"
import { MegaphoneIcon, PlayCircleIcon, DollarSignIcon, BarChart3Icon } from "lucide-react"

export interface CampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  totalSpend: number
  averageRoas: number
}

interface CampaignStatsGridProps {
  stats: CampaignStats | null
  loading?: boolean
}

export function CampaignStatsGrid({ stats, loading = false }: CampaignStatsGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="h-28 rounded-2xl border border-zinc-900 bg-zinc-950/20 animate-pulse flex flex-col justify-between p-5">
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-24 bg-zinc-900 rounded-md" />
              <div className="size-9 bg-zinc-900 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="h-7 w-28 bg-zinc-900 rounded-md" />
              <div className="h-3 w-16 bg-zinc-900 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const currentStats = stats || {
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalSpend: 0,
    averageRoas: 0
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <AnalyticsCard
        title="Total Campaigns"
        value={currentStats.totalCampaigns}
        change={12.4}
        icon={MegaphoneIcon}
        colorScheme="blue"
      />
      <AnalyticsCard
        title="Active Campaigns"
        value={currentStats.activeCampaigns}
        change={8.2}
        icon={PlayCircleIcon}
        colorScheme="purple"
      />
      <AnalyticsCard
        title="Total Spend"
        value={currentStats.totalSpend}
        prefix="$"
        change={14.3}
        icon={DollarSignIcon}
        colorScheme="amber"
      />
      <AnalyticsCard
        title="Average ROAS"
        value={currentStats.averageRoas}
        suffix="x"
        decimals={2}
        change={5.6}
        icon={BarChart3Icon}
        colorScheme="emerald"
      />
    </div>
  )
}
