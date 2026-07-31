"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { AnalyticsGrid } from "@/components/dashboard/AnalyticsGrid"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { CampaignTable } from "@/components/dashboard/CampaignTable"
import { RecentActivity } from "@/components/dashboard/RecentActivity"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  ShieldCheckIcon,
  PlusIcon,
  SparklesIcon,
  ZapIcon
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DUMMY DATA FOR PREMIUM DASHBOARD VISUALS
// ─────────────────────────────────────────────────────────────────────────────

const aiInsights = [
  {
    id: 1,
    title: "Reallocate Meta Ad Spend",
    description: "Shift 15% budget from 'EU - Retargeting' to 'US/CA - AI Recommendations'. Predicted lift of +$1,400 in yield.",
    impact: "High Impact",
    color: "border-purple-500/30 bg-purple-500/5 text-purple-300",
  },
  {
    id: 2,
    title: "CAPI Signal Match Rate Drop",
    description: "Your match rate fell to 94.2% on Safari browser agents. Update external ID hash mapping payload parameters.",
    impact: "Action Required",
    color: "border-amber-500/30 bg-amber-500/5 text-amber-300",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// DASHBOARD COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-2">
                <ShieldCheckIcon className="size-3 text-purple-400" />
                <span>GrowthOS System Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Protected Growth Workspace
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Securely viewing system metrics for <strong className="text-zinc-300">{user?.email}</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="rounded-xl border-zinc-800 text-zinc-400 hover:text-white">
                Export CSV
              </Button>
              <Button size="sm" className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md animate-pulse">
                <PlusIcon className="size-3.5 mr-1.5" />
                Create Campaign
              </Button>
            </div>
          </div>

          {/* 1. Analytics Cards (Visitors | Leads | Conversion | Revenue) */}
          <AnalyticsGrid />

          {/* 2. Revenue Chart & AI Insights side by side */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>

            {/* AI Insights Card */}
            <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg flex flex-col justify-between">
              <div className="space-y-4">
                <CardHeader className="p-0">
                  <CardTitle className="text-md font-bold text-white flex items-center gap-2">
                    <SparklesIcon className="size-4.5 text-purple-400" />
                    <span>AI Insights & Recs</span>
                  </CardTitle>
                  <CardDescription className="text-xs text-zinc-500">Proactive actions from the scaling engine.</CardDescription>
                </CardHeader>

                <div className="space-y-3">
                  {aiInsights.map((rec) => (
                    <div key={rec.id} className={`p-3 rounded-xl border ${rec.color} space-y-1.5`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider">{rec.title}</span>
                        <span className="text-[9px] font-medium bg-white/10 px-2 py-0.5 rounded-full">{rec.impact}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-normal">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full text-xs font-semibold rounded-lg mt-4 h-9 gap-1.5 border-purple-500/20 bg-purple-500/5 text-purple-300 hover:bg-purple-500/15">
                <ZapIcon className="size-3.5" />
                <span>Execute Recommendations</span>
              </Button>
            </Card>
          </div>

          {/* 3. Campaign Table */}
          <div className="w-full">
            <CampaignTable />
          </div>

          {/* 4. Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
