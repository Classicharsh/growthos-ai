"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { Loader2Icon, AlertCircleIcon } from "lucide-react"

function GoogleSvgIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

export interface GoogleButtonProps {
  variant?: "default" | "outline" | "secondary"
  size?: "default" | "sm" | "lg"
  className?: string
  label?: string
  rememberMe?: boolean
}

export function GoogleButton({
  variant = "outline",
  size = "default",
  className = "",
  label = "Sign in with Google",
  rememberMe = true,
}: GoogleButtonProps) {
  const { loginWithGoogle, loading, error, clearError } = useAuth()

  return (
    <div className="flex flex-col gap-2 w-full">
      <Button
        variant={variant}
        size={size}
        onClick={() => loginWithGoogle(rememberMe)}
        disabled={loading}
        className={`relative flex items-center justify-center gap-2.5 font-medium cursor-pointer transition-all duration-200 ${className}`}
      >
        {loading ? (
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        ) : (
          <GoogleSvgIcon className="size-4 shrink-0" />
        )}
        <span>{loading ? "Signing in..." : label}</span>
      </Button>

      {error && (
        <div className="flex items-center gap-2 text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-2">
          <AlertCircleIcon className="size-3.5 shrink-0" />
          <span className="flex-1">{error}</span>
          <button
            onClick={clearError}
            className="text-xs underline hover:no-underline cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}
