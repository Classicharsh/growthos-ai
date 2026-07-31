"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts"
import { DollarSignIcon, SparklesIcon, UsersIcon } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DUMMY DATA FOR THE REVENUE CHART
// ─────────────────────────────────────────────────────────────────────────────

const monthlyData = [
  { month: "Jan", revenue: 4500, spend: 2100, leads: 120 },
  { month: "Feb", revenue: 5200, spend: 2400, leads: 180 },
  { month: "Mar", revenue: 8900, spend: 3100, leads: 310 },
  { month: "Apr", revenue: 9100, spend: 3800, leads: 290 },
  { month: "May", revenue: 12500, spend: 4200, leads: 430 },
  { month: "Jun", revenue: 16800, spend: 5100, leads: 610 },
  { month: "Jul", revenue: 19400, spend: 6200, leads: 690 },
]

export function RevenueChart() {
  const [activeTab, setActiveTab] = React.useState<"revenue" | "leads">("revenue")
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return (
      <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 h-[400px] flex items-center justify-center">
        <span className="text-xs text-zinc-500 font-medium">Loading Interactive Charts...</span>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <SparklesIcon className="size-4.5 text-purple-400" />
            <span>Growth Yield Analysis</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Compare monthly revenue generated against conversions tracked.
          </CardDescription>
        </div>

        {/* Tab switcher */}
        <div className="flex p-0.5 rounded-xl bg-zinc-950/80 border border-zinc-900 self-start sm:self-center">
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setActiveTab("revenue")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              activeTab === "revenue" 
                ? "bg-purple-500/10 text-purple-300 font-bold" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <DollarSignIcon className="size-3 mr-1" />
            <span>Revenue</span>
          </Button>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => setActiveTab("leads")}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              activeTab === "leads" 
                ? "bg-purple-500/10 text-purple-300 font-bold" 
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            <UsersIcon className="size-3 mr-1" />
            <span>Leads</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === "revenue" ? (
            <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis 
                stroke="#71717a" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(val) => `$${val}`}
              />
              <Tooltip 
                contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }} 
                labelStyle={{ color: "#a1a1aa" }}
                formatter={(value) => [`$${value}`, undefined]}
              />
              <Area type="monotone" dataKey="revenue" name="Revenue Yield" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              <Area type="monotone" dataKey="spend" name="Ad Spend" stroke="#6366f1" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSpend)" />
            </AreaChart>
          ) : (
            <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#18181b" vertical={false} />
              <XAxis dataKey="month" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#09090b", borderColor: "#27272a", borderRadius: "12px", fontSize: "11px" }} 
                labelStyle={{ color: "#a1a1aa" }}
              />
              <Bar dataKey="leads" name="Conversions Tracked" fill="url(#colorLeads)" radius={[6, 6, 0, 0]} maxBarSize={45} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
