"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { AIInsights } from "@/components/dashboard/AIInsights"
import { ShieldCheckIcon } from "lucide-react"

export default function InsightsPage() {
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
                <span>AI Insights Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                AI Optimization Insights
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Proactive optimization strategies generated automatically for <strong className="text-zinc-300">{user?.email}</strong>.
              </p>
            </div>
          </div>

          {/* AI Insights Card/List View */}
          <div className="max-w-4xl">
            <AIInsights />
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
