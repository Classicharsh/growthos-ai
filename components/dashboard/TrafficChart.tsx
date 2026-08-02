"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from "recharts"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ActivityIcon } from "lucide-react"

const chartData = [
  { time: "09:00", browserTraffic: 4200, serverCapi: 4180 },
  { time: "10:00", browserTraffic: 4800, serverCapi: 4790 },
  { time: "11:00", browserTraffic: 6100, serverCapi: 6095 },
  { time: "12:00", browserTraffic: 5800, serverCapi: 5810 },
  { time: "13:00", browserTraffic: 7200, serverCapi: 7215 },
  { time: "14:00", browserTraffic: 8100, serverCapi: 8130 },
  { time: "15:00", browserTraffic: 9400, serverCapi: 9410 },
  { time: "16:00", browserTraffic: 8900, serverCapi: 8895 },
  { time: "17:00", browserTraffic: 9900, serverCapi: 9920 },
]

export function TrafficChart() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 h-[350px] flex items-center justify-center">
        <span className="text-xs text-zinc-500 font-medium tracking-tight animate-pulse">
          Loading system signals chart...
        </span>
      </Card>
    )
  }

  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <ActivityIcon className="size-4 text-purple-400" />
            <span>Deduplication & Real-Time Sync</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Comparing client-side Browser Pixel events against Server-side CAPI events.
          </CardDescription>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500/20 border border-indigo-500" />
            <span className="text-zinc-400">Browser Pixel</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500/20 border border-purple-500" />
            <span className="text-zinc-400">Server CAPI</span>
          </div>
        </div>
      </CardHeader>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBrowser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorCapi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#18181b" />
            <XAxis 
              dataKey="time" 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <YAxis 
              stroke="#52525b" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: "#09090b", 
                borderColor: "#27272a", 
                borderRadius: "12px",
                fontSize: "11px",
                color: "#fff"
              }} 
              labelClassName="text-zinc-400 font-semibold"
            />
            <Area 
              type="monotone" 
              dataKey="browserTraffic" 
              stroke="#6366f1" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorBrowser)" 
            />
            <Area 
              type="monotone" 
              dataKey="serverCapi" 
              stroke="#a855f7" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorCapi)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
