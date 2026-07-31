"use client"

import * as React from "react"
import { UserMenu } from "@/components/auth/user-menu"
import { Button } from "@/components/ui/button"
import { MenuIcon, BellIcon, SearchIcon } from "lucide-react"

export interface TopNavbarProps {
  onMenuClick: () => void
}

export function TopNavbar({ onMenuClick }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b border-zinc-900 bg-zinc-950/60 backdrop-blur-xl px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      
      {/* Left section: Hamburger (Mobile) + Search Bar */}
      <div className="flex items-center gap-4 flex-1">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          <MenuIcon className="size-5" />
        </Button>
        
        {/* Decorative Search Input */}
        <div className="relative hidden sm:block max-w-xs w-64">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search campaigns, ads, signals..."
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/40 pl-9 pr-3 py-2 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-200"
          />
        </div>
      </div>

      {/* Right section: System notifications + User profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-zinc-400 hover:text-white relative"
          aria-label="View notifications"
        >
          <BellIcon className="size-4.5" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-purple-500 animate-pulse" />
        </Button>

        {/* Vertical divider */}
        <div className="h-4 w-px bg-zinc-800" />

        {/* User profile dropdown */}
        <UserMenu />
      </div>
    </header>
  )
}
