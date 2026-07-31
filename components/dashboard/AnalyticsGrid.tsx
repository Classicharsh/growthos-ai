"use client"

import * as React from "react"
import { AnalyticsCard } from "./AnalyticsCard"
import { UsersIcon, ActivityIcon, MousePointerClickIcon, DollarSignIcon } from "lucide-react"

export function AnalyticsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      <AnalyticsCard
        title="Total Visitors"
        value={124892}
        change={12.4}
        icon={UsersIcon}
        colorScheme="blue"
      />
      <AnalyticsCard
        title="Total Leads"
        value={3104}
        change={8.2}
        icon={ActivityIcon}
        colorScheme="purple"
      />
      <AnalyticsCard
        title="Conversion Rate"
        value={2.48}
        suffix="%"
        decimals={2}
        change={0.4}
        icon={MousePointerClickIcon}
        colorScheme="amber"
      />
      <AnalyticsCard
        title="Revenue Yield"
        value={89400}
        prefix="$"
        change={18.9}
        icon={DollarSignIcon}
        colorScheme="emerald"
      />
    </div>
  )
}
