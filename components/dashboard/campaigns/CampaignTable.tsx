"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MegaphoneIcon, PlusIcon, InboxIcon } from "lucide-react"
import { Campaign, dummyCampaigns } from "./types"
import { CampaignSearch } from "./CampaignSearch"
import { CampaignFilters } from "./CampaignFilters"
import { CampaignStatusBadge } from "./CampaignStatusBadge"
import { CampaignActions } from "./CampaignActions"
import { CampaignPagination } from "./CampaignPagination"
import { CampaignSkeleton } from "./CampaignSkeleton"

export function CampaignTable() {
  const [campaigns, setCampaigns] = React.useState<Campaign[]>([])
  const [loading, setLoading] = React.useState(true)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState<Campaign["status"] | "All">("All")
  const [sortByDate, setSortByDate] = React.useState<"newest" | "oldest">("newest")
  const [currentPage, setCurrentPage] = React.useState(1)
  
  const itemsPerPage = 5

  // Simulate data fetch on mount
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCampaigns(dummyCampaigns)
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Handlers
  const handleStatusChange = (id: string, newStatus: Campaign["status"]) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
  }

  const handleDelete = (id: string) => {
    setCampaigns((prev) => prev.filter((c) => c.id !== id))
  }

  // Filter, Search, and Sort
  const processedCampaigns = React.useMemo(() => {
    let result = [...campaigns]

    // 1. Search filter
    if (searchTerm) {
      const query = searchTerm.toLowerCase()
      result = result.filter((c) => c.name.toLowerCase().includes(query))
    }

    // 2. Status filter
    if (statusFilter !== "All") {
      result = result.filter((c) => c.status === statusFilter)
    }

    // 3. Sort by Created Date
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime()
      const dateB = new Date(b.createdAt).getTime()
      return sortByDate === "newest" ? dateB - dateA : dateA - dateB
    })

    return result
  }, [campaigns, searchTerm, statusFilter, sortByDate])

  // Pagination logic
  const totalPages = Math.ceil(processedCampaigns.length / itemsPerPage)
  const paginatedCampaigns = React.useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage
    return processedCampaigns.slice(startIdx, startIdx + itemsPerPage)
  }, [processedCampaigns, currentPage])

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, sortByDate])

  if (loading) {
    return <CampaignSkeleton />
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
            onSortChange={setSortByDate}
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
                Track optimization values, conversion rates, and spend efficiency.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-zinc-900/65 text-zinc-500 font-medium">
                <th className="pb-3 pr-4 font-semibold">Campaign Name</th>
                <th className="pb-3 px-4 font-semibold">Status</th>
                <th className="pb-3 px-4 text-right font-semibold">Budget</th>
                <th className="pb-3 px-4 text-right font-semibold">Spend</th>
                <th className="pb-3 px-4 text-right font-semibold">CTR</th>
                <th className="pb-3 px-4 text-right font-semibold">CPC</th>
                <th className="pb-3 px-4 text-right font-semibold">ROAS</th>
                <th className="pb-3 px-4 text-right font-semibold">Created Date</th>
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
                      <td className="py-4 pr-4 font-bold text-zinc-200 group-hover:text-white transition-colors">
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
                          onDelete={handleDelete}
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
      </Card>
    </div>
  )
}
