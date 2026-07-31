"use client"

import * as React from "react"
import { ProtectedRoute } from "@/components/auth/protected-route"
import { useAuth } from "@/contexts/auth-context"
import { DashboardLayout } from "@/components/dashboard/DashboardLayout"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { KeyIcon, ShieldCheckIcon, LockIcon } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="border-b border-zinc-800/80 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border border-purple-500/30 bg-purple-500/10 text-purple-300 mb-3">
              <ShieldCheckIcon className="size-3.5 text-purple-400" />
              <span>Protected Settings Route</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-100 to-zinc-400">
              Workspace & Security Settings
            </h1>
            <p className="text-sm text-zinc-400 mt-1">
              Manage security preferences, API keys, and notification channels for{" "}
              <strong className="text-zinc-200">{user?.email}</strong>.
            </p>
          </div>

          {/* Settings Sections */}
          <div className="space-y-6">
            {/* Account Security */}
            <Card className="rounded-2xl border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <LockIcon className="size-5 text-purple-400" />
                  <span>Authentication & Security</span>
                </CardTitle>
                <CardDescription className="text-sm text-zinc-400">
                  Your session is authenticated via Firebase Auth.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-4 text-xs text-zinc-300">
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <div>
                    <p className="font-semibold text-zinc-200">Email Address</p>
                    <p className="text-zinc-400 mt-0.5">{user?.email}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <div>
                    <p className="font-semibold text-zinc-200">Sign-in Provider</p>
                    <p className="text-zinc-400 mt-0.5">
                      {user?.providerData[0]?.providerId || "Firebase Auth"}
                    </p>
                  </div>
                  <span className="text-zinc-500 font-mono text-[11px]">Active</span>
                </div>
              </CardContent>
            </Card>

            {/* API Access */}
            <Card className="rounded-2xl border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                  <KeyIcon className="size-5 text-indigo-400" />
                  <span>Meta Conversion API Keys</span>
                </CardTitle>
                <CardDescription className="text-sm text-zinc-400">
                  Manage CAPI tokens and server-side tracking webhooks.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-3">
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-zinc-200">Production CAPI Token</p>
                    <p className="text-xs font-mono text-zinc-500">capi_live_••••••••••••••••3a9b</p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-lg border-zinc-800 text-xs text-zinc-300">
                    Rotate Key
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  )
}
