"use client"

import * as React from "react"
import Link from "next/link"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import {
  LayoutDashboardIcon,
  BarChart3Icon,
  UsersIcon,
  SparklesIcon,
  MegaphoneIcon,
  ServerIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
} from "lucide-react"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-[#030303] text-zinc-100 selection:bg-purple-600 selection:text-white">
        <Navbar />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-3">
                <ShieldCheckIcon className="size-3.5 text-purple-400" />
                <span>Protected Account Workspace</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Dashboard Overview
              </h1>
              <p className="text-sm text-zinc-400 mt-1">
                Welcome back,{" "}
                <strong className="text-zinc-200">{user?.displayName || user?.email}</strong>. Here is your AI campaign yield.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/settings">
                <Button variant="outline" size="sm" className="rounded-xl border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:text-white">
                  Settings
                </Button>
              </Link>
              <Link href="/profile">
                <Button size="sm" className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-md">
                  Profile
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Active Campaigns", value: "14", change: "+2 this week", icon: MegaphoneIcon, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
              { label: "CAPI Match Rate", value: "98.6%", change: "+0.4% lift", icon: ServerIcon, color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
              { label: "Tracked Conversions", value: "4,892", change: "+18.2% vs last month", icon: UsersIcon, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
              { label: "AI Suggestions", value: "8 Ready", change: "3 high priority", icon: SparklesIcon, color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
            ].map((metric) => {
              const Icon = metric.icon
              return (
                <Card key={metric.label} className="rounded-2xl border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">{metric.label}</span>
                    <div className={`flex size-9 items-center justify-center rounded-xl border ${metric.color}`}>
                      <Icon className="size-4" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white tracking-tight">{metric.value}</div>
                    <div className="text-xs text-emerald-400 mt-1 font-medium">{metric.change}</div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Core Modules Card */}
          <Card className="rounded-2xl border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutDashboardIcon className="size-5 text-purple-400" />
                <span>Protected GrowthOS AI Stack</span>
              </CardTitle>
              <CardDescription className="text-sm text-zinc-400">
                You are securely authenticated as <code className="text-purple-300 font-mono">{user?.email}</code>.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  <BarChart3Icon className="size-4 text-purple-400" />
                  <span>Real-Time Analytics</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Live ROAS metrics and conversion data stream directly from your Meta Pixel and CAPI pipelines.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-zinc-200">
                  <SparklesIcon className="size-4 text-indigo-400" />
                  <span>AI Recommendations</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Automated budget reallocation alerts surface continuously to maximize your campaign yield.
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </ProtectedRoute>
  )
}
