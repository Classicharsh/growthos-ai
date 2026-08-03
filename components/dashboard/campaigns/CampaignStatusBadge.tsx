"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { CheckCircle2Icon, PlayCircleIcon, PauseCircleIcon, FileEditIcon } from "lucide-react"
import { CampaignStatus } from "./types"

interface CampaignStatusBadgeProps {
  status: CampaignStatus
}

export function CampaignStatusBadge({ status }: CampaignStatusBadgeProps) {
  const config = {
    Active: {
      bg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
      icon: PlayCircleIcon,
      label: "Active"
    },
    Paused: {
      bg: "bg-amber-500/10 border-amber-500/20 text-amber-400",
      icon: PauseCircleIcon,
      label: "Paused"
    },
    Draft: {
      bg: "bg-zinc-500/10 border-zinc-500/20 text-zinc-400",
      icon: FileEditIcon,
      label: "Draft"
    }
  }

  const { bg, icon: Icon, label } = config[status]

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide border ${bg} transition-all duration-200`}
    >
      <Icon className="size-3.5" />
      <span>{label}</span>
    </motion.span>
  )
}
