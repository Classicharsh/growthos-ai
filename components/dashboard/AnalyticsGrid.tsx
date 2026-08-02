"use client"

import * as React from "react"
import { AnalyticsCard } from "./AnalyticsCard"
import { UsersIcon, ActivityIcon, MousePointerClickIcon, DollarSignIcon } from "lucide-react"

export interface AnalyticsGridProps {
  visitors: number;
  leads: number;
  conversionRate: number;
  revenue: number;
}

export function AnalyticsGrid({ visitors, leads, conversionRate, revenue }: AnalyticsGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <AnalyticsCard
        title="Total Visitors"
        value={visitors}
        change={12.4}
        icon={UsersIcon}
        colorScheme="blue"
      />
      <AnalyticsCard
        title="Total Leads"
        value={leads}
        change={8.2}
        icon={ActivityIcon}
        colorScheme="purple"
      />
      <AnalyticsCard
        title="Conversion Rate"
        value={conversionRate}
        suffix="%"
        decimals={2}
        change={0.4}
        icon={MousePointerClickIcon}
        colorScheme="amber"
      />
      <AnalyticsCard
        title="Revenue Yield"
        value={revenue}
        prefix="$"
        change={18.9}
        icon={DollarSignIcon}
        colorScheme="emerald"
      />
    </div>
  )
}
