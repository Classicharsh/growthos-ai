"use client"

import * as React from "react"

export function CampaignSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="h-9 w-48 bg-zinc-900 rounded-xl" />
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="h-9 w-full md:w-48 bg-zinc-900 rounded-xl" />
          <div className="h-9 w-28 bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 space-y-4">
        <div className="grid grid-cols-9 gap-4 border-b border-zinc-900/60 pb-3">
          {Array.from({ length: 9 }).map((_, idx) => (
            <div key={idx} className="h-4 bg-zinc-900 rounded-md" />
          ))}
        </div>

        {Array.from({ length: 5 }).map((_, rowIdx) => (
          <div key={rowIdx} className="grid grid-cols-9 gap-4 py-3 border-b border-zinc-900/40">
            <div className="col-span-2 h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
            <div className="h-4 bg-zinc-900 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
