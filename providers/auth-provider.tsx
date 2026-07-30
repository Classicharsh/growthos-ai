"use client"

import * as React from "react"
import { AuthProvider as BaseAuthProvider } from "@/contexts/auth-context"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <BaseAuthProvider>{children}</BaseAuthProvider>
}
