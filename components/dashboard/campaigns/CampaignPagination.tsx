"use client"

import * as React from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface CampaignPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export function CampaignPagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}: CampaignPaginationProps) {
  if (totalPages <= 1) return null

  const startIndex = (currentPage - 1) * itemsPerPage + 1
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-900/60 text-xs text-zinc-500">
      <div>
        Showing <span className="font-semibold text-zinc-300">{startIndex}</span> to{" "}
        <span className="font-semibold text-zinc-300">{endIndex}</span> of{" "}
        <span className="font-semibold text-zinc-300">{totalItems}</span> campaigns
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:text-white disabled:opacity-40 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
        >
          <ChevronLeftIcon className="size-4" />
        </button>

        {Array.from({ length: totalPages }, (_, idx) => {
          const page = idx + 1
          const isActive = currentPage === page
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`size-8 rounded-lg text-xs font-semibold cursor-pointer border transition-all duration-200 ${
                isActive
                  ? "bg-purple-500/10 border-purple-500/20 text-purple-300"
                  : "border-zinc-900 bg-zinc-950/40 text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-zinc-900 bg-zinc-950/60 text-zinc-400 hover:text-white disabled:opacity-40 disabled:hover:text-zinc-400 transition-colors cursor-pointer"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>
    </div>
  )
}
