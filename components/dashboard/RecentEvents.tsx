"use client"

import * as React from "react"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioIcon, CheckCircle2Icon, ShieldAlertIcon } from "lucide-react"

export interface CapiLogEvent {
  id: string
  eventName: string
  source: string
  timestamp: string
  status: "matched" | "deduplicated" | "partial"
  payloadSummary: string
}

const mockEvents: CapiLogEvent[] = [
  {
    id: "evt_18302",
    eventName: "Purchase",
    source: "Server CAPI",
    timestamp: "2 mins ago",
    status: "deduplicated",
    payloadSummary: "value: $128.00, currency: USD"
  },
  {
    id: "evt_18301",
    eventName: "PageView",
    source: "Browser Pixel",
    timestamp: "5 mins ago",
    status: "matched",
    payloadSummary: "url: /pricing, matches fbp: true"
  },
  {
    id: "evt_18299",
    eventName: "Lead",
    source: "Server CAPI",
    timestamp: "12 mins ago",
    status: "matched",
    payloadSummary: "email: hashed, zip: hashed"
  },
  {
    id: "evt_18295",
    eventName: "AddToCart",
    source: "Server CAPI",
    timestamp: "24 mins ago",
    status: "partial",
    payloadSummary: "fbc missing, standard match rate: 82%"
  }
]

export function RecentEvents() {
  return (
    <Card className="rounded-2xl border-zinc-900 bg-zinc-950/40 backdrop-blur-xl p-6 shadow-lg space-y-6">
      <CardHeader className="p-0 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
            <RadioIcon className="size-4.5 text-purple-400 animate-pulse" />
            <span>Conversion Signals Log</span>
          </CardTitle>
          <CardDescription className="text-xs text-zinc-500">
            Real-time feed of server-side and browser matched events.
          </CardDescription>
        </div>
      </CardHeader>

      <div className="divide-y divide-zinc-900/60">
        {mockEvents.map((evt) => (
          <div key={evt.id} className="py-3.5 flex items-start justify-between gap-4 first:pt-0 last:pb-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold text-white">{evt.eventName}</span>
                <span className="text-[10px] text-zinc-500 font-semibold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                  {evt.source}
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-medium font-mono">{evt.payloadSummary}</p>
            </div>

            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] text-zinc-500 font-semibold">{evt.timestamp}</span>
              
              <div className="flex items-center gap-1">
                {evt.status === "matched" && (
                  <>
                    <CheckCircle2Icon className="size-3 text-emerald-400" />
                    <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider">Matched</span>
                  </>
                )}
                {evt.status === "deduplicated" && (
                  <>
                    <CheckCircle2Icon className="size-3 text-blue-400" />
                    <span className="text-[9px] text-blue-400 font-bold uppercase tracking-wider">Deduplicated</span>
                  </>
                )}
                {evt.status === "partial" && (
                  <>
                    <ShieldAlertIcon className="size-3 text-amber-400" />
                    <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider">Low Match</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
