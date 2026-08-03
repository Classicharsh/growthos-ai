"use client"

import * as React from "react"
import { ListFilterIcon, ArrowUpDownIcon } from "lucide-react"
import { CampaignStatus } from "./types"

interface CampaignFiltersProps {
  statusFilter: CampaignStatus | "All"
  onStatusChange: (status: CampaignStatus | "All") => void
  sortByDate: "newest" | "oldest"
  onSortChange: (sort: "newest" | "oldest") => void
}

export function CampaignFilters({
  statusFilter,
  onStatusChange,
  sortByDate,
  onSortChange
}: CampaignFiltersProps) {
  const statuses: (CampaignStatus | "All")[] = ["All", "Active", "Paused", "Draft"]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
      {/* Status filters */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-950/60 border border-zinc-900 backdrop-blur-md overflow-x-auto">
        {statuses.map((status) => {
          const isActive = statusFilter === status
          return (
            <button
              key={status}
              onClick={() => onStatusChange(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20"
                  : "text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              {status}
            </button>
          )
        })}
      </div>

      {/* Date Sort filter */}
      <button
        onClick={() => onSortChange(sortByDate === "newest" ? "oldest" : "newest")}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold bg-zinc-950/60 hover:bg-zinc-900/60 border border-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer backdrop-blur-md self-start sm:self-auto"
      >
        <ArrowUpDownIcon className="size-3.5 text-purple-400" />
        <span>{sortByDate === "newest" ? "Newest First" : "Oldest First"}</span>
      </button>
    </div>
  )
}
