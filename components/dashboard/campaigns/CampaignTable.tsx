"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MegaphoneIcon, InboxIcon, AlertTriangleIcon, ArrowUpDownIcon } from "lucide-react"
import { Campaign } from "./types"
import { CampaignSearch } from "./CampaignSearch"
import { CampaignFilters } from "./CampaignFilters"
import { CampaignStatusBadge } from "./CampaignStatusBadge"
import { CampaignActions } from "./CampaignActions"
import { CampaignPagination } from "./CampaignPagination"
import { CampaignSkeleton } from "./CampaignSkeleton"
import { CampaignDetailsDrawer } from "./CampaignDetailsDrawer"
import { DeleteCampaignDialog } from "./DeleteCampaignDialog"
import { CampaignModal } from "./CampaignModal"
import { CampaignForm, CampaignFormValues } from "./CampaignForm"
import { campaignService } from "@/services/campaign.service"
import { toast } from "sonner"

interface CampaignTableProps {
  refreshTrigger?: number
  onCampaignsChange?: () => void
}

export function CampaignTable({ refreshTrigger = 0, onCampaignsChange }: CampaignTableProps) {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  
  // Search state with debouncing
  const [searchTerm, setSearchTerm] = React.useState("")
  const [debouncedSearch, setDebouncedSearch] = React.useState("")
  
  const [statusFilter, setStatusFilter] = React.useState<Campaign["status"] | "All">("All")
  
  // Sorting state
  const [sortColumn, setSortColumn] = React.useState<"budget" | "spend" | "roas" | "createdAt">("createdAt")
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">("desc")
  
  const [currentPage, setCurrentPage] = React.useState(1)
  const itemsPerPage = 5

  // Drawer / Modal states
  const [selectedCampaign, setSelectedCampaign] = React.useState<Campaign | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  
  const [editingCampaign, setEditingCampaign] = React.useState<Campaign | null>(null)
  const [isEditOpen, setIsEditOpen] = React.useState(false)
  const [isUpdating, setIsUpdating] = React.useState(false)
  
  const [campaignToDelete, setCampaignToDelete] = React.useState<Campaign | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false)
  const [isDeleting, setIsDeleting] = React.useState(false)

  const fetchCampaigns = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await campaignService.getCampaigns()
      setCampaigns(data)
    } catch (err: any) {
      setError(err?.message || "Failed to load campaigns. Please check your network connection.")
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch campaigns on mount and when external refresh trigger fires
  React.useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns, refreshTrigger])

  // Debouncing search term effect
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 300)
    return () => clearTimeout(handler)
  }, [searchTerm])

  // Handlers for campaign status toggle
  const handleStatusChange = async (id: string, newStatus: Campaign["status"]) => {
    // Optimistic UI update
    const previousCampaigns = [...campaigns]
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )

    try {
      await campaignService.updateCampaign(id, { status: newStatus })
      toast.success(`Campaign ${newStatus === "Active" ? "resumed" : "paused"} successfully.`)
      
      // Update local drawer state if open
      if (selectedCampaign && selectedCampaign.id === id) {
        setSelectedCampaign((prev) => (prev ? { ...prev, status: newStatus } : null))
      }
      onCampaignsChange?.()
    } catch (err: any) {
      // Rollback
      setCampaigns(previousCampaigns)
      toast.error(err?.message || "Failed to update campaign status.")
    }
  }

  // Edit details triggers
  const handleEditOpen = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setIsEditOpen(true)
  }

  const handleEditSubmit = async (values: CampaignFormValues) => {
    if (!editingCampaign) return
    setIsUpdating(true)
    try {
      const updated = await campaignService.updateCampaign(editingCampaign.id, {
        name: values.name,
        budget: values.budget,
        status: values.status as any,
        objective: values.objective as any,
        platform: values.platform as any,
        currency: values.currency as any,
        startDate: values.startDate,
        endDate: values.endDate,
      })
      toast.success("Campaign updated successfully.")
      setIsEditOpen(false)
      
      // Update state
      setCampaigns((prev) => prev.map((c) => (c.id === editingCampaign.id ? updated : c)))
      if (selectedCampaign && selectedCampaign.id === editingCampaign.id) {
        setSelectedCampaign(updated)
      }
      onCampaignsChange?.()
    } catch (err: any) {
      toast.error(err?.message || "Failed to update campaign details.")
    } finally {
      setIsUpdating(false)
      setEditingCampaign(null)
    }
  }

  // Delete flow triggers
  const handleDeleteOpen = (id: string) => {
    const campaign = campaigns.find((c) => c.id === id)
    if (campaign) {
      setCampaignToDelete(campaign)
      setIsDeleteOpen(true)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!campaignToDelete) return
    setIsDeleting(true)
    
    // Optimistic UI update
    const previousCampaigns = [...campaigns]
    setCampaigns((prev) => prev.filter((c) => c.id !== campaignToDelete.id))
    
    try {
      await campaignService.deleteCampaign(campaignToDelete.id)
      toast.success("Campaign deleted successfully.")
      setIsDeleteOpen(false)
      setIsDrawerOpen(false)
      onCampaignsChange?.()
    } catch (err: any) {
      // Rollback
      setCampaigns(previousCampaigns)
      toast.error(err?.message || "Failed to delete campaign.")
    } finally {
      setIsDeleting(false)
      setCampaignToDelete(null)
    }
  }

  // Fetch campaign details and open drawer
  const handleOpenDetails = async (campaign: Campaign) => {
    try {
      const details = await campaignService.getCampaign(campaign.id)
      setSelectedCampaign(details)
      setIsDrawerOpen(true)
    } catch (err: any) {
      toast.error(err?.message || "Failed to load campaign details.")
    }
  }

  // Click handler for column headers to trigger sorting
  const handleSort = (column: "budget" | "spend" | "roas" | "createdAt") => {
    if (sortColumn === column) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortColumn(column)
      setSortDirection("desc")
    }
  }

  // Filter, Search, and Sort computing
  const processedCampaigns = React.useMemo(() => {
    let result = [...campaigns]

    // 1. Live search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    // 2. Status filter
    if (statusFilter !== "All") {
      result = result.filter((c) => c.status === statusFilter)
    }

    // 3. Multi-field Sorting
    result.sort((a, b) => {
      let valA: any = a[sortColumn]
      let valB: any = b[sortColumn]

      if (sortColumn === "createdAt") {
        const dateA = new Date(valA).getTime()
        const dateB = new Date(valB).getTime()
        return sortDirection === "desc" ? dateB - dateA : dateA - dateB
      }

      return sortDirection === "desc" ? valB - valA : valA - valB
    })

    return result
  }, [campaigns, debouncedSearch, statusFilter, sortColumn, sortDirection])

  // Pagination logic
  const totalPages = Math.ceil(processedCampaigns.length / itemsPerPage)
  const paginatedCampaigns = React.useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return processedCampaigns.slice(startIdx, startIdx + itemsPerPage)
  }, [processedCampaigns, currentPage])

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [debouncedSearch, statusFilter, sortColumn, sortDirection])

  if (loading) {
    return <CampaignSkeleton />
  }

  // Compute helpers to pass date-sorting to CampaignFilters
  const sortByDate = sortColumn === "createdAt" && sortDirection === "asc" ? "oldest" : "newest"
  const handleSortByDateChange = (newSort: "newest" | "oldest") => {
    setSortColumn("createdAt")
    setSortDirection(newSort === "newest" ? "desc" : "asc")
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <CampaignSearch value={searchTerm} onChange={setSearchTerm} />
        
        <div className="flex items-center gap-3">
          <CampaignFilters
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            sortByDate={sortByDate}
            onSortChange={handleSortByDateChange}
          />
        </div>
      </div>

      {/* Campaigns Card / Table Grid */}
      <Card className="rounded-2xl border border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-xl space-y-6">
        <CardHeader className="p-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <MegaphoneIcon className="size-4.5 text-purple-400" />
                <span>Campaign performance overview</span>
              </CardTitle>
              <CardDescription className="text-xs text-zinc-500">
                Track optimization values, conversion rates, and spend efficiency. Click table headers to sort.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        {error ? (
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="rounded-full bg-rose-500/10 p-3.5 mb-4">
                <AlertTriangleIcon className="size-6 text-rose-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-semibold text-zinc-200 mb-1">Failed to load campaigns</h3>
              <p className="text-xs text-zinc-500 max-w-xs mb-4">
                {error}
              </p>
              <Button 
                onClick={fetchCampaigns}
                className="rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-300 text-xs px-4 h-9 cursor-pointer transition-all duration-200"
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        ) : (
          <>
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-900/65 text-zinc-500 font-medium">
                    <th className="pb-3 pr-4 font-semibold">Campaign Name</th>
                    <th className="pb-3 px-4 font-semibold">Status</th>
                    <th 
                      onClick={() => handleSort("budget")} 
                      className="pb-3 px-4 text-right font-semibold cursor-pointer hover:text-zinc-300 select-none group/hdr"
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Budget</span>
                        <ArrowUpDownIcon className="size-3 text-zinc-600 group-hover/hdr:text-zinc-400 transition-colors" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort("spend")} 
                      className="pb-3 px-4 text-right font-semibold cursor-pointer hover:text-zinc-300 select-none group/hdr"
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Spend</span>
                        <ArrowUpDownIcon className="size-3 text-zinc-600 group-hover/hdr:text-zinc-400 transition-colors" />
                      </div>
                    </th>
                    <th className="pb-3 px-4 text-right font-semibold">CTR</th>
                    <th className="pb-3 px-4 text-right font-semibold">CPC</th>
                    <th 
                      onClick={() => handleSort("roas")} 
                      className="pb-3 px-4 text-right font-semibold cursor-pointer hover:text-zinc-300 select-none group/hdr"
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>ROAS</span>
                        <ArrowUpDownIcon className="size-3 text-zinc-600 group-hover/hdr:text-zinc-400 transition-colors" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort("createdAt")} 
                      className="pb-3 px-4 text-right font-semibold cursor-pointer hover:text-zinc-300 select-none group/hdr"
                    >
                      <div className="flex items-center justify-end gap-1">
                        <span>Created Date</span>
                        <ArrowUpDownIcon className="size-3 text-zinc-600 group-hover/hdr:text-zinc-400 transition-colors" />
                      </div>
                    </th>
                    <th className="pb-3 pl-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/30">
                  <AnimatePresence mode="popLayout">
                    {paginatedCampaigns.length > 0 ? (
                      paginatedCampaigns.map((camp) => (
                        <motion.tr
                          key={camp.id}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="group border-b border-zinc-900/30 hover:bg-zinc-900/10 transition-colors"
                        >
                          <td 
                            onClick={() => handleOpenDetails(camp)}
                            className="py-4 pr-4 font-bold text-zinc-200 group-hover:text-purple-300 transition-colors cursor-pointer"
                          >
                            {camp.name}
                          </td>
                          <td className="py-4 px-4">
                            <CampaignStatusBadge status={camp.status} />
                          </td>
                          <td className="py-4 px-4 text-right text-zinc-400 font-mono font-medium">
                            ${camp.budget.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-zinc-400 font-mono font-medium">
                            ${camp.spend.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-zinc-400 font-mono font-medium">
                            {camp.ctr > 0 ? `${camp.ctr.toFixed(2)}%` : "—"}
                          </td>
                          <td className="py-4 px-4 text-right text-zinc-400 font-mono font-medium">
                            {camp.cpc > 0 ? `$${camp.cpc.toFixed(2)}` : "—"}
                          </td>
                          <td className="py-4 px-4 text-right text-purple-300 font-mono font-bold">
                            {camp.roas > 0 ? `${camp.roas.toFixed(1)}x` : "—"}
                          </td>
                          <td className="py-4 px-4 text-right text-zinc-500 font-mono font-semibold whitespace-nowrap">
                            {camp.createdAt}
                          </td>
                          <td className="py-4 pl-4 text-right">
                            <CampaignActions
                              campaign={camp}
                              onStatusChange={handleStatusChange}
                              onDelete={handleDeleteOpen}
                              onEdit={handleEditOpen}
                            />
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <motion.tr
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-48"
                      >
                        <td colSpan={9} className="text-center py-12 text-zinc-600 font-medium">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <InboxIcon className="size-8 text-zinc-700" />
                            <span>No campaigns match the selection criteria.</span>
                          </div>
                        </td>
                      </motion.tr>
                    )}
                  </AnimatePresence>
                </tbody>
              </table>
            </CardContent>

            <CampaignPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={processedCampaigns.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </Card>

      {/* Campaign Details Drawer */}
      <CampaignDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        campaign={selectedCampaign}
        onEdit={handleEditOpen}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteOpen}
      />

      {/* Delete Campaign Confirmation Dialog */}
      <DeleteCampaignDialog
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        campaignName={campaignToDelete?.name || ""}
        isLoading={isDeleting}
      />

      {/* Edit Details Modal */}
      <CampaignModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Campaign Details"
      >
        <CampaignForm
          initialValues={editingCampaign ? {
            name: editingCampaign.name,
            budget: editingCampaign.budget,
            status: editingCampaign.status,
            objective: editingCampaign.objective as any,
            platform: editingCampaign.platform as any,
            currency: editingCampaign.currency as any,
            startDate: editingCampaign.startDate,
            endDate: editingCampaign.endDate,
          } : undefined}
          onSubmit={handleEditSubmit}
          onCancel={() => setIsEditOpen(false)}
          isLoading={isUpdating}
        />
      </CampaignModal>
    </div>
  )
}
