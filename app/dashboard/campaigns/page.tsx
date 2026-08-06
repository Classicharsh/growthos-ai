"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { CampaignTable } from "@/components/dashboard/campaigns/CampaignTable"
import { Button } from "@/components/ui/button"
import { ShieldCheckIcon, PlusIcon } from "lucide-react"

import { CampaignStatsGrid, CampaignStats } from "@/components/dashboard/campaigns/CampaignStatsGrid"
import { CampaignModal } from "@/components/dashboard/campaigns/CampaignModal"
import { CampaignForm, CampaignFormValues } from "@/components/dashboard/campaigns/CampaignForm"
import { campaignService } from "@/services/campaign.service"
import { toast } from "sonner"

export default function CampaignsPage() {
  const { user } = useAuth()
  const [stats, setStats] = React.useState<CampaignStats | null>(null)
  const [statsLoading, setStatsLoading] = React.useState(true)
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [refreshTrigger, setRefreshTrigger] = React.useState(0)

  const fetchStats = React.useCallback(async () => {
    setStatsLoading(true)
    try {
      const data = await campaignService.getCampaignStats()
      setStats(data)
    } catch (err) {
      console.error("Failed to fetch campaign stats:", err)
    } finally {
      setStatsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchStats()
  }, [fetchStats, refreshTrigger])

  const handleCreateSubmit = async (values: CampaignFormValues) => {
    setIsSubmitting(true)
    try {
      // Map form objective, platform, budget, status, name to service
      await campaignService.createCampaign({
        name: values.name,
        objective: values.objective as any,
        budget: values.budget,
        status: values.status as any,
      })
      toast.success("Campaign created successfully!")
      setIsCreateOpen(false)
      setRefreshTrigger((prev) => prev + 1)
    } catch (err: any) {
      toast.error(err?.message || "Failed to create campaign")
    } finally {
      setIsSubmitting(false)
    }
  }

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
              <Button 
                onClick={() => setIsCreateOpen(true)}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg text-xs gap-1.5 h-10 px-4 cursor-pointer transition-all duration-200"
              >
                <PlusIcon className="size-4" />
                <span>Create Campaign</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards Section */}
          <div className="w-full">
            <CampaignStatsGrid stats={stats} loading={statsLoading} />
          </div>

          {/* Below Header: Contains Search, Filters, Table and Pagination */}
          <div className="w-full">
            <CampaignTable 
              refreshTrigger={refreshTrigger} 
              onCampaignsChange={() => setRefreshTrigger((prev) => prev + 1)} 
            />
          </div>

        </div>

        {/* Create Campaign Modal */}
        <CampaignModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          title="Create New Campaign"
        >
          <CampaignForm 
            onSubmit={handleCreateSubmit}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={isSubmitting}
          />
        </CampaignModal>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
