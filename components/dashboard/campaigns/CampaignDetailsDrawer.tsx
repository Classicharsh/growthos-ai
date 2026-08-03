"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  XIcon, 
  PlayIcon, 
  PauseIcon, 
  Trash2Icon, 
  Edit3Icon, 
  BarChart3Icon, 
  CalendarIcon, 
  DollarSignIcon, 
  LayersIcon,
  ShieldCheckIcon
} from "lucide-react"
import { Campaign } from "./types"
import { CampaignStatusBadge } from "./CampaignStatusBadge"

interface CampaignDetailsDrawerProps {
  isOpen: boolean
  onClose: () => void
  campaign: Campaign | null
  onEdit?: (campaign: Campaign) => void
  onStatusChange?: (id: string, newStatus: Campaign["status"]) => void
  onDelete?: (id: string) => void
}

export function CampaignDetailsDrawer({
  isOpen,
  onClose,
  campaign,
  onEdit,
  onStatusChange,
  onDelete
}: CampaignDetailsDrawerProps) {
  // Lock scroll and handle Escape key to close drawer
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!campaign) return null

  // Calculate dummy CPC/Spend details if needed
  const cpcText = campaign.cpc > 0 ? `$${campaign.cpc.toFixed(2)}` : "—"
  const ctrText = campaign.ctr > 0 ? `${campaign.ctr.toFixed(2)}%` : "—"
  const roasText = campaign.roas > 0 ? `${campaign.roas.toFixed(1)}x` : "—"

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.55 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs"
          />

          {/* Slide-over Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-md h-full border-l border-zinc-900 bg-zinc-950/85 backdrop-blur-2xl shadow-2xl p-6 flex flex-col overflow-hidden z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4 mb-6 shrink-0">
              <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 tracking-wider uppercase">
                <ShieldCheckIcon className="size-4 text-purple-400" />
                <span>Campaign Details</span>
              </div>
              <button
                onClick={onClose}
                className="size-7 rounded-lg border border-zinc-900 bg-zinc-950/40 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-800 transition-colors cursor-pointer"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            {/* Scrollable Body Container */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-6">
              {/* Title Section */}
              <div className="space-y-2">
                <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                  {campaign.name}
                </h2>
                <div className="flex items-center gap-3">
                  <CampaignStatusBadge status={campaign.status} />
                  <span className="text-[10px] font-mono text-zinc-500 font-semibold uppercase">
                    ID: {campaign.id}
                  </span>
                </div>
              </div>

              {/* Information Sections */}
              <div className="space-y-6">
                
                {/* 1. Overview Section */}
                <div className="space-y-2.5">
                  <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <LayersIcon className="size-3.5" />
                    <span>Overview</span>
                  </h3>
                  <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Objective</span>
                      <span className="font-semibold text-zinc-300">Conversions (CAPI)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Primary Channel</span>
                      <span className="font-semibold text-zinc-300">Facebook Meta Network</span>
                    </div>
                  </div>
                </div>

                {/* 2. Budget Details */}
                <div className="space-y-2.5">
                  <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <DollarSignIcon className="size-3.5" />
                    <span>Budget & Spend</span>
                  </h3>
                  <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/40 grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-zinc-500 mb-0.5">Daily Budget</p>
                      <p className="font-mono text-sm font-bold text-zinc-200">
                        ${campaign.budget?.toLocaleString() || "2,500"}
                      </p>
                    </div>
                    <div>
                      <p className="text-zinc-500 mb-0.5">Total Spend</p>
                      <p className="font-mono text-sm font-bold text-zinc-200">
                        ${campaign.spend?.toLocaleString() || "0"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Performance Metrics */}
                <div className="space-y-2.5">
                  <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BarChart3Icon className="size-3.5" />
                    <span>Performance Metrics</span>
                  </h3>
                  <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/40 grid grid-cols-3 gap-2.5 text-center text-xs">
                    <div className="border-r border-zinc-900/60 pr-1.5">
                      <p className="text-zinc-500 mb-0.5">CTR</p>
                      <p className="font-mono font-bold text-zinc-200 text-sm">{ctrText}</p>
                    </div>
                    <div className="border-r border-zinc-900/60 px-1.5">
                      <p className="text-zinc-500 mb-0.5">CPC</p>
                      <p className="font-mono font-bold text-zinc-200 text-sm">{cpcText}</p>
                    </div>
                    <div className="pl-1.5">
                      <p className="text-zinc-500 mb-0.5">ROAS</p>
                      <p className="font-mono font-extrabold text-emerald-400 text-sm">{roasText}</p>
                    </div>
                  </div>
                </div>

                {/* 4. Dates */}
                <div className="space-y-2.5">
                  <h3 className="text-[11px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                    <CalendarIcon className="size-3.5" />
                    <span>Pipeline Dates</span>
                  </h3>
                  <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Created Date</span>
                      <span className="font-medium text-zinc-300">{campaign.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Last Synced</span>
                      <span className="font-medium text-zinc-300">{campaign.createdAt}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Action Footer Buttons (Sticky) */}
            <div className="border-t border-zinc-900/60 pt-6 mt-6 shrink-0 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onEdit?.(campaign)}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-zinc-900 hover:border-zinc-800 bg-zinc-950/40 hover:bg-zinc-900/40 text-xs font-bold text-zinc-200 transition-colors cursor-pointer"
                >
                  <Edit3Icon className="size-3.5 text-purple-400" />
                  <span>Edit Details</span>
                </button>

                {campaign.status === "Active" ? (
                  <button
                    onClick={() => onStatusChange?.(campaign.id, "Paused")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-xs font-bold text-amber-400 transition-all cursor-pointer"
                  >
                    <PauseIcon className="size-3.5" />
                    <span>Pause Delivery</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onStatusChange?.(campaign.id, "Active")}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 text-xs font-bold text-emerald-400 transition-all cursor-pointer"
                  >
                    <PlayIcon className="size-3.5" />
                    <span>Resume Delivery</span>
                  </button>
                )}
              </div>

              <button
                onClick={() => onDelete?.(campaign.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-bold text-rose-400 transition-all cursor-pointer"
              >
                <Trash2Icon className="size-3.5" />
                <span>Delete Campaign</span>
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
