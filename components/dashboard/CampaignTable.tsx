"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { SearchIcon, MegaphoneIcon, PlusIcon } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DUMMY DATA FOR THE CAMPAIGN PERFORMANCE TABLE
// ─────────────────────────────────────────────────────────────────────────────

interface Campaign {
  id: number
  name: string
  status: "Scaling" | "Active" | "Optimal" | "Paused"
  spend: number
  clicks: number
  ctr: number
  conversions: number
  roas: number
}

const campaignsData: Campaign[] = [
  { id: 1, name: "US - Lookalike Purchases 2%", status: "Scaling", spend: 2450, clicks: 12400, ctr: 2.14, conversions: 240, roas: 4.8 },
  { id: 2, name: "EU - Retargeting Mid-Funnel", status: "Active", spend: 1120, clicks: 8900, ctr: 1.82, conversions: 110, roas: 3.2 },
  { id: 3, name: "Global - Broad Conversion API", status: "Optimal", spend: 4800, clicks: 31200, ctr: 2.48, conversions: 580, roas: 5.1 },
  { id: 4, name: "US/CA - AI Recommendations v4", status: "Optimal", spend: 1890, clicks: 14200, ctr: 2.89, conversions: 290, roas: 6.2 },
  { id: 5, name: "LATAM - Interest Broad Reach", status: "Paused", spend: 0, clicks: 0, ctr: 0, conversions: 0, roas: 0 },
]

export function CampaignTable() {
  const [searchTerm, setSearchTerm] = React.useState("")

  const filteredCampaigns = campaignsData.filter((camp) =>
    camp.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const statusColors = {
    Scaling: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    Optimal: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    Active: "bg-blue-500/10 text-blue-300 border-blue-500/20",
    Paused: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
  }

  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <MegaphoneIcon className="size-4.5 text-purple-400" />
            <span>Campaign Performance</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Monitor spend efficiency and ROAS benchmarks in real time.
          </CardDescription>
        </div>

        {/* Search input */}
        <div className="relative max-w-xs w-full self-start md:self-center">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/50 pl-9 pr-3 py-2 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50"
          />
        </div>
      </CardHeader>

      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-900/60 text-zinc-500 font-medium">
              <th className="pb-3 pr-4">Campaign Name</th>
              <th className="pb-3 px-4">Status</th>
              <th className="pb-3 px-4 text-right">Spend</th>
              <th className="pb-3 px-4 text-right">Clicks</th>
              <th className="pb-3 px-4 text-right">CTR</th>
              <th className="pb-3 px-4 text-right">Conversions</th>
              <th className="pb-3 pl-4 text-right">ROAS</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((camp) => (
                <tr key={camp.id} className="border-b border-zinc-900/40 hover:bg-zinc-900/25 transition-colors">
                  <td className="py-3.5 pr-4 font-semibold text-zinc-200">{camp.name}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-semibold border ${statusColors[camp.status]}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                    ${camp.spend.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                    {camp.clicks.toLocaleString()}
                  </td>
                  <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                    {camp.ctr > 0 ? `${camp.ctr}%` : "—"}
                  </td>
                  <td className="py-3.5 px-4 text-right text-zinc-400 font-mono">
                    {camp.conversions > 0 ? camp.conversions.toLocaleString() : "—"}
                  </td>
                  <td className="py-3.5 pl-4 text-right text-purple-300 font-mono font-bold">
                    {camp.roas > 0 ? `${camp.roas}x` : "—"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="py-8 text-center text-zinc-600 font-medium">
                  No matching campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}
