"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserIcon, SettingsIcon, Loader2Icon, ChevronDownIcon } from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// USER PROFILE DROPDOWN
//
// Premium dropdown anchored to the user's avatar in the navbar. Displays:
//   • Avatar + Name + Email in a profile header
//   • Profile link
//   • Settings link
//   • Logout action with loading state
//
// The trigger uses a pill-style button on desktop (avatar + name + chevron)
// and collapses to an avatar-only trigger on mobile via the `compact` prop.
// ─────────────────────────────────────────────────────────────────────────────

export interface UserMenuProps {
  /** When true, renders only the avatar (no name/chevron). Used in narrow layouts. */
  compact?: boolean
}

export function UserMenu({ compact = false }: UserMenuProps) {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  if (!user) return null

  const displayName = user.displayName || user.email?.split("@")[0] || "User"
  const userEmail = user.email || ""
  const photoUrl = user.photoURL || undefined

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            className="flex items-center gap-2 rounded-full ring-offset-background transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:opacity-90 cursor-pointer"
            aria-label="Open user menu"
          />
        }
      >
        <Avatar className="size-8 ring-2 ring-transparent hover:ring-primary/20 transition-all duration-200">
          {photoUrl && <AvatarImage src={photoUrl} alt={displayName} />}
          <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-300 text-xs font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>

        {/* Desktop: Show name + chevron beside avatar */}
        {!compact && (
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
              {displayName}
            </span>
            <ChevronDownIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-aria-expanded:rotate-180" />
          </div>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-0 overflow-hidden" align="end" sideOffset={12}>

        {/* ── Profile Header ── */}
        <div className="px-4 py-4 bg-gradient-to-b from-purple-500/[0.06] to-transparent">
          <div className="flex items-center gap-3">
            <Avatar className="size-11 ring-2 ring-purple-500/20 shadow-lg">
              {photoUrl && <AvatarImage src={photoUrl} alt={displayName} />}
              <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-300 text-sm font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate leading-tight">
                {displayName}
              </p>
              {userEmail && (
                <p className="text-xs text-muted-foreground truncate mt-0.5 leading-tight">
                  {userEmail}
                </p>
              )}
              <div className="mt-1.5">
                <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 leading-none">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* ── Navigation Items ── */}
        <div className="p-1.5">
          <DropdownMenuGroup>
            <DropdownMenuItem
              render={
                <a href="/profile" className="flex w-full items-center gap-2.5 cursor-pointer" />
              }
              className="rounded-lg px-2.5 py-2"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-purple-500/10 text-purple-400">
                <UserIcon className="size-3.5" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Profile</span>
                <p className="text-[11px] text-muted-foreground leading-tight mt-px">
                  View and edit your profile
                </p>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem
              render={
                <a href="/settings" className="flex w-full items-center gap-2.5 cursor-pointer" />
              }
              className="rounded-lg px-2.5 py-2"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-400">
                <SettingsIcon className="size-3.5" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Settings</span>
                <p className="text-[11px] text-muted-foreground leading-tight mt-px">
                  Security and preferences
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* ── Logout ── */}
        <div className="p-1.5">
          <DropdownMenuItem
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg px-2.5 py-2 text-destructive focus:bg-destructive/10 focus:text-destructive gap-2.5 cursor-pointer"
          >
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-destructive/10 text-destructive">
              {loading ? (
                <Loader2Icon className="size-3.5 animate-spin" />
              ) : (
                <LogOutIcon className="size-3.5" />
              )}
            </div>
            <span className="text-sm font-medium">Log Out</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
