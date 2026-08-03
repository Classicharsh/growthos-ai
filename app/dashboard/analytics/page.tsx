"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { useDashboard } from "@/hooks/useDashboard"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { AnalyticsGrid } from "@/components/dashboard/AnalyticsGrid"
import { RevenueChart } from "@/components/dashboard/RevenueChart"
import { TrafficChart } from "@/components/dashboard/TrafficChart"
import { TrafficSources } from "@/components/dashboard/TrafficSources"
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ShieldCheckIcon, AlertCircleIcon, RefreshCwIcon, DatabaseZapIcon } from "lucide-react"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { data, loading, error, isEmpty, refetch } = useDashboard()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          
          {/* Header Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-2">
                <ShieldCheckIcon className="size-3 text-purple-400" />
                <span>Analytics Engine Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Performance Analytics
              </h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Real-time attribution and traffic metrics for <strong className="text-zinc-300">{user?.email}</strong>.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refetch}
                className="rounded-xl border-zinc-800 text-zinc-400 hover:text-white"
                disabled={loading}
              >
                <RefreshCwIcon className={`size-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Reload</span>
              </Button>
            </div>
          </div>

          {/* Render Loading State */}
          {loading && <DashboardSkeleton />}

          {/* Render Error State */}
          {!loading && error && (
            <Card className="rounded-2xl border-rose-500/20 bg-rose-500/5 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
              <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <AlertCircleIcon className="size-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-md font-bold text-white">Metrics Synchronization Failed</h3>
                <p className="text-xs text-zinc-400 max-w-sm">{error}</p>
              </div>
              <Button size="sm" onClick={refetch} className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold gap-1.5">
                <RefreshCwIcon className="size-3.5" />
                <span>Retry Connection</span>
              </Button>
            </Card>
          )}

          {/* Render Empty State */}
          {!loading && !error && isEmpty && (
            <Card className="rounded-2xl border-zinc-850 bg-zinc-950/20 backdrop-blur-xl p-8 flex flex-col items-center justify-center text-center space-y-4 max-w-lg mx-auto">
              <div className="p-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <DatabaseZapIcon className="size-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-md font-bold text-white">No Growth Signals Found</h3>
                <p className="text-xs text-zinc-400 max-w-sm">
                  Active connection to Meta Graph conversion triggers is established, but no events have been tracked yet.
                </p>
              </div>
              <Button size="sm" onClick={refetch} className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold gap-1.5">
                <RefreshCwIcon className="size-3.5" />
                <span>Refresh Logs</span>
              </Button>
            </Card>
          )}

          {/* Render Active Data Views */}
          {!loading && !error && !isEmpty && data && (
            <>
              {/* Analytics Cards */}
              <AnalyticsGrid 
                visitors={data.visitors} 
                leads={data.leads} 
                conversionRate={data.conversionRate} 
                revenue={data.revenue} 
              />

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <RevenueChart />
                  <TrafficChart />
                </div>
                <div>
                  <TrafficSources sources={data.trafficSources} />
                </div>
              </div>
            </>
          )}

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
