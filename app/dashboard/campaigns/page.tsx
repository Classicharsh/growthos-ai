"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { CampaignTable } from "@/components/dashboard/campaigns/CampaignTable"
import { Button } from "@/components/ui/button"
import { ShieldCheckIcon, PlusIcon } from "lucide-react"

export default function CampaignsPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          
          {/* Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[10px] font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-2.5">
                <ShieldCheckIcon className="size-3 text-purple-400" />
                <span>Campaign Control Center</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
                Campaign Management
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                Manage all your Meta advertising campaigns from one dashboard for <strong className="text-zinc-300">{user?.email}</strong>.
              </p>
            </div>

            <div className="flex items-center self-start md:self-center">
              <Button className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg text-xs gap-1.5 h-10 px-4 cursor-pointer transition-all duration-200">
                <PlusIcon className="size-4" />
                <span>Create Campaign</span>
              </Button>
            </div>
          </div>

          {/* Below Header: Contains Search, Filters, Table and Pagination */}
          <div className="w-full">
            <CampaignTable />
          </div>

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
