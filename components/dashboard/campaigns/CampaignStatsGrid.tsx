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
