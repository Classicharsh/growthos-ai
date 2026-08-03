"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { UserIcon, MailIcon, CalendarIcon, ShieldCheckIcon, LogOutIcon } from "lucide-react"

export default function ProfilePage() {
  const { user, logout } = useAuth()

  const displayName = user?.displayName || user?.email || "User"
  const userEmail = user?.email || ""
  const photoUrl = user?.photoURL || undefined
  const createdAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "Recently"

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8 max-w-3xl">
          {/* Header */}
          <div className="border-b border-zinc-800/80 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-3">
              <ShieldCheckIcon className="size-3.5 text-purple-400" />
              <span>Protected Profile Route</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              User Profile
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage your personal account details and session.
            </p>
          </div>

          {/* Profile Card */}
          <Card className="rounded-2xl border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-zinc-800/60">
              <Avatar className="size-20 border-2 border-purple-500/30 shadow-xl">
                {photoUrl && <AvatarImage src={photoUrl} alt={displayName} />}
                <AvatarFallback className="bg-purple-500/20 text-purple-300 text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="text-center sm:text-left space-y-1.5 flex-1">
                <h2 className="text-2xl font-bold text-white tracking-tight">{displayName}</h2>
                <p className="text-sm text-zinc-400">{userEmail}</p>
                <div className="inline-flex items-center gap-1.5 text-xs text-zinc-500 mt-1">
                  <CalendarIcon className="size-3.5" />
                  <span>Member since {createdAt}</span>
                </div>
              </div>

              <Button
                variant="destructive"
                onClick={logout}
                className="gap-2 rounded-xl text-xs font-semibold px-4 cursor-pointer"
              >
                <LogOutIcon className="size-4" />
                <span>Log Out</span>
              </Button>
            </div>

            {/* Profile Details List */}
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <UserIcon className="size-4 text-purple-400" />
                  <span className="font-semibold text-zinc-300">Display Name</span>
                </div>
                <span className="text-zinc-200 font-medium">{displayName}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <MailIcon className="size-4 text-indigo-400" />
                  <span className="font-semibold text-zinc-300">Email Address</span>
                </div>
                <span className="text-zinc-200 font-medium">{userEmail}</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                <div className="flex items-center gap-3">
                  <ShieldCheckIcon className="size-4 text-emerald-400" />
                  <span className="font-semibold text-zinc-300">Account ID</span>
                </div>
                <span className="text-zinc-500 font-mono text-[11px]">{user?.uid}</span>
              </div>
            </div>
          </Card>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
