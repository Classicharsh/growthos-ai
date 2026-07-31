"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { 
  UsersIcon, 
  ServerIcon, 
  MegaphoneIcon, 
  SparklesIcon,
  ActivityIcon 
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DUMMY DATA FOR RECENT ACTIVITY TIMELINE
// ─────────────────────────────────────────────────────────────────────────────

interface ActivityItem {
  id: number
  type: "lead" | "pixel" | "campaign" | "ai"
  title: string
  description: string
  time: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

const activities: ActivityItem[] = [
  {
    id: 1,
    type: "lead",
    title: "New Lead Generated",
    description: "Sarah Jenkins completed 'Enterprise Purchase v2' via CAPI integration.",
    time: "2 mins ago",
    icon: UsersIcon,
    color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
  {
    id: 2,
    type: "pixel",
    title: "Meta Pixel Event Received",
    description: "Received 'AddToCart' pixel matching signal from Safari client agent.",
    time: "14 mins ago",
    icon: ServerIcon,
    color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: 3,
    type: "campaign",
    title: "Campaign Updated",
    description: "Budget on 'US/CA - AI Recommendations v4' automatically scaled up by +15%.",
    time: "1 hour ago",
    icon: MegaphoneIcon,
    color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 4,
    type: "ai",
    title: "AI Report Generated",
    description: "Weekly conversion mapping optimization proposal is ready for review.",
    time: "3 hours ago",
    icon: SparklesIcon,
    color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  },
]

export function RecentActivity() {
  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0">
        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
          <ActivityIcon className="size-4.5 text-purple-400" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription className="text-xs text-zinc-500">
          Real-time pipeline logs and AI model updates.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        {/* Timeline wrapper */}
        <div className="relative pl-6 space-y-6 after:absolute after:inset-y-0 after:left-2.5 after:w-px after:bg-zinc-900">
          {activities.map((act) => {
            const Icon = act.icon
            return (
              <div key={act.id} className="relative group">
                
                {/* Timeline node icon */}
                <div className={`absolute -left-6 top-0.5 z-10 flex size-6 items-center justify-center rounded-full border text-xs transition-transform duration-300 group-hover:scale-110 ${act.color}`}>
                  <Icon className="size-3" />
                </div>

                {/* Content card */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-semibold text-zinc-200 group-hover:text-purple-400 transition-colors">
                      {act.title}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium whitespace-nowrap">
                      {act.time}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {act.description}
                  </p>
                </div>

              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
