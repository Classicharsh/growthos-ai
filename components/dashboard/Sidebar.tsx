"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  LayoutDashboardIcon, 
  SettingsIcon, 
  UserIcon, 
  SparklesIcon, 
  TrendingUpIcon, 
  FolderIcon,
  ShieldCheckIcon,
  HelpCircleIcon
} from "lucide-react"

export interface SidebarProps {
  onClose?: () => void
  className?: string
}

export function Sidebar({ onClose, className = "" }: SidebarProps) {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUpIcon },
    { name: "Campaigns", href: "/dashboard/campaigns", icon: FolderIcon },
    { name: "AI Insights", href: "/dashboard/insights", icon: SparklesIcon },
    { name: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
    { name: "Profile", href: "/dashboard/profile", icon: UserIcon },
  ]

  return (
    <aside className={`flex flex-col h-full bg-zinc-950/80 border-r border-zinc-900 bg-linear-to-b from-zinc-950 via-zinc-950 to-zinc-900 text-zinc-100 ${className}`}>
      
      {/* ── Brand Logo Header ── */}
      <div className="flex h-16 shrink-0 items-center justify-between px-6 border-b border-zinc-900/60">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-lg shadow-lg">
            G
          </div>
          <span className="font-bold text-base tracking-tight text-white group-hover:text-purple-400 transition-colors">
            GrowthOS AI
          </span>
        </Link>
      </div>

      {/* ── Navigation Links ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-1">
          <span className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block mb-3">
            Core Engine
          </span>
          <nav className="space-y-1.5" aria-label="Sidebar navigation">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href} onClick={onClose}>
                  <span
                    className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-purple-500/10 text-purple-300 border-l-2 border-purple-500 font-semibold"
                        : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40"
                    }`}
                  >
                    <Icon className="size-4 shrink-0 transition-transform group-hover:scale-105" />
                    <span>{item.name}</span>
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* ── System Status Indicator ── */}
        <div className="p-3.5 rounded-xl border border-zinc-900 bg-zinc-950/40 space-y-2 mt-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400">
            <ShieldCheckIcon className="size-3.5" />
            <span>Secure Node</span>
          </div>
          <p className="text-[10px] text-zinc-500 leading-relaxed">
            All marketing pipeline logs and CAPI event integrations are fully encrypted.
          </p>
        </div>
      </div>

      {/* ── Sidebar Footer / Help ── */}
      <div className="p-4 border-t border-zinc-900/60 bg-zinc-950/20">
        <a 
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <HelpCircleIcon className="size-4" />
          <span>Support & Docs</span>
        </a>
      </div>
    </aside>
  )
}
