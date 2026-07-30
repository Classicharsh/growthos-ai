"use client"

import * as React from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2Icon } from "lucide-react"

export interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (!loading && !user) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`
      router.replace(redirectUrl)
    }
  }, [user, loading, router, pathname])

  // Show full-screen loading state while initializing Firebase Auth state
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#030303] text-zinc-100 p-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative flex size-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-2xl shadow-xl animate-pulse">
            G
          </div>
          <div className="flex items-center gap-2.5 text-sm text-zinc-400 font-medium">
            <Loader2Icon className="size-4 animate-spin text-purple-400" />
            <span>Verifying authentication...</span>
          </div>
        </div>
      </div>
    )
  }

  // Prevent flash of unauthenticated content
  if (!user) {
    return null
  }

  return <>{children}</>
}
