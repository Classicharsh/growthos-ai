"use client"

import * as React from "react"
import { SearchIcon, XIcon } from "lucide-react"

interface CampaignSearchProps {
  value: string
  onChange: (value: string) => void
}

export function CampaignSearch({ value, onChange }: CampaignSearchProps) {
  return (
    <div className="relative w-full md:max-w-xs">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
      <input
        type="text"
        placeholder="Search by campaign name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 pl-9 pr-8 py-2.5 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all backdrop-blur-md"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 flex items-center justify-center text-zinc-500 hover:text-zinc-300 rounded-full hover:bg-zinc-900 transition-colors"
        >
          <XIcon className="size-3" />
        </button>
      )}
    </div>
  )
}
