"use client"

import * as React from "react"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon, PlayIcon, PauseIcon, Trash2Icon, Edit3Icon } from "lucide-react"
import { Campaign } from "./types"

interface CampaignActionsProps {
  campaign: Campaign
  onStatusChange?: (id: string, newStatus: Campaign["status"]) => void
  onDelete?: (id: string) => void
  onEdit?: (campaign: Campaign) => void
}

export function CampaignActions({ campaign, onStatusChange, onDelete, onEdit }: CampaignActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button 
            className="flex items-center justify-center size-8 rounded-lg border border-zinc-900 hover:border-zinc-850 bg-zinc-950/40 hover:bg-zinc-900/40 text-zinc-400 hover:text-white transition-all cursor-pointer"
            aria-label="Open campaign actions menu"
          />
        }
      >
        <MoreHorizontalIcon className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 bg-zinc-950/95 border-zinc-900 text-zinc-200 rounded-xl backdrop-blur-xl">
        <DropdownMenuItem 
          onClick={() => onEdit?.(campaign)}
          className="gap-2 focus:bg-zinc-900 focus:text-white cursor-pointer py-2 rounded-lg text-xs"
        >
          <Edit3Icon className="size-3.5" />
          <span>Edit Details</span>
        </DropdownMenuItem>

        {campaign.status === "Active" ? (
          <DropdownMenuItem 
            onClick={() => onStatusChange?.(campaign.id, "Paused")}
            className="gap-2 focus:bg-zinc-900 focus:text-amber-400 text-amber-500/90 cursor-pointer py-2 rounded-lg text-xs"
          >
            <PauseIcon className="size-3.5" />
            <span>Pause Delivery</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem 
            onClick={() => onStatusChange?.(campaign.id, "Active")}
            className="gap-2 focus:bg-zinc-900 focus:text-emerald-400 text-emerald-500/90 cursor-pointer py-2 rounded-lg text-xs"
          >
            <PlayIcon className="size-3.5" />
            <span>Activate Campaign</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="bg-zinc-900" />
        
        <DropdownMenuItem 
          onClick={() => onDelete?.(campaign.id)}
          className="gap-2 focus:bg-rose-500/10 focus:text-rose-400 text-rose-500/80 cursor-pointer py-2 rounded-lg text-xs"
        >
          <Trash2Icon className="size-3.5" />
          <span>Delete Campaign</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
