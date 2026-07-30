"use client"

import * as React from "react"
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
  type AuthError,
} from "firebase/auth"
import {
  auth,
  googleProvider,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "@/lib/firebase"
import { toast } from "sonner"

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  loginWithGoogle: (rememberMe?: boolean) => Promise<void>
  loginWithEmail: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  signupWithEmail: (name: string, email: string, password: string) => Promise<void>
  resetPassword: (email: string) => Promise<void>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined)

// ─────────────────────────────────────────────────────────────────────────────
// AUTH PROVIDER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<string | null>(null)

  // Session persistence observer
  // This is the SOLE source of truth for user state and loading state after
  // initial hydration. Auth methods do NOT manipulate loading — they set errors
  // only. The observer fires on every sign-in, sign-out, and token refresh.
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser)
        setLoading(false)

        // Sync a session indicator cookie for the server-side proxy (proxy.ts).
        // This cookie is NOT a security token — it's an optimistic hint so the
        // proxy can redirect unauthenticated users before the page JS loads.
        // The client-side <ProtectedRoute> remains the authoritative check.
        if (currentUser) {
          document.cookie = `__session=1; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`
        } else {
          document.cookie = "__session=; path=/; max-age=0; SameSite=Lax"
        }
      },
      (err) => {
        console.error("[Auth] Session observer error:", err)
        setError("Failed to synchronize authentication session.")
        toast.error("Authentication Error: Session sync failed.")
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  // Google Sign-In via Popup
  const loginWithGoogle = React.useCallback(async (rememberMe: boolean = true) => {
    setError(null)
    try {
      // Set persistence before sign-in based on rememberMe flag.
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
      await signInWithPopup(auth, googleProvider)
      toast.success("Successfully signed in with Google!")
    } catch (err) {
      const authErr = err as AuthError
      console.error("[Auth] Google Sign-in error:", authErr.code, authErr.message)

      let errorMessage = "Failed to sign in with Google."
      if (authErr.code === "auth/popup-closed-by-user") {
        errorMessage = "Sign-in popup was closed before completing authentication."
        toast.error("Authentication Error: Popup closed by user.")
      } else if (authErr.code === "auth/popup-blocked") {
        errorMessage = "Sign-in popup was blocked by your browser. Please allow popups."
        toast.error("Authentication Error: Popup blocked by browser.")
      } else if (authErr.code === "auth/cancelled-popup-request") {
        // Silently ignore rapid clicks
        return
      } else if (authErr.code === "auth/account-exists-with-different-credential") {
        errorMessage = "An account already exists with this email using a different sign-in method. Please sign in with your original method."
        toast.error("Authentication Error: Account exists with different sign-in method.")
      } else if (authErr.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection."
        toast.error("Network Error: Please check your internet connection.")
      } else {
        errorMessage = authErr.message || errorMessage
        toast.error(`Authentication Error: ${errorMessage}`)
      }
      setError(errorMessage)
    }
  }, [])

  // Email & Password Login
  const loginWithEmail = React.useCallback(
    async (email: string, password: string, rememberMe: boolean = true) => {
      setError(null)
      try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
        await signInWithEmailAndPassword(auth, email, password)
        toast.success("Successfully signed in!")
      } catch (err) {
        const authErr = err as AuthError
        console.error("[Auth] Email login error:", authErr.code, authErr.message)

        let errorMessage = "Failed to log in."
        if (
          authErr.code === "auth/invalid-credential" ||
          authErr.code === "auth/user-not-found" ||
          authErr.code === "auth/wrong-password"
        ) {
          errorMessage = "Invalid email or password. Please try again."
          toast.error("Authentication Error: Invalid credentials.")
        } else if (authErr.code === "auth/too-many-requests") {
          errorMessage = "Too many failed attempts. Please reset your password or try again later."
          toast.error("Authentication Error: Too many requests.")
        } else if (authErr.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your internet connection."
          toast.error("Network Error: Please check your internet connection.")
        } else {
          errorMessage = authErr.message || errorMessage
          toast.error(`Authentication Error: ${errorMessage}`)
        }
        setError(errorMessage)
        throw err
      }
    },
    []
  )

  // Email & Password Registration
  const signupWithEmail = React.useCallback(
    async (name: string, email: string, password: string) => {
      setError(null)
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        if (userCredential.user) {
          await updateProfile(userCredential.user, {
            displayName: name,
          })
          await userCredential.user.reload()
          setUser(auth.currentUser)
          toast.success("Account created successfully!")
        }
      } catch (err) {
        const authErr = err as AuthError
        console.error("[Auth] Registration error:", authErr.code, authErr.message)

        let errorMessage = "Failed to create account."
        if (authErr.code === "auth/email-already-in-use") {
          errorMessage = "An account with this email address already exists."
          toast.error("Authentication Error: Email already in use.")
        } else if (authErr.code === "auth/weak-password") {
          errorMessage = "Password is too weak. Please use a stronger password."
          toast.error("Authentication Error: Weak password.")
        } else if (authErr.code === "auth/network-request-failed") {
          errorMessage = "Network error. Please check your internet connection."
          toast.error("Network Error: Please check your internet connection.")
        } else {
          errorMessage = authErr.message || errorMessage
          toast.error(`Authentication Error: ${errorMessage}`)
        }
        setError(errorMessage)
        throw err
      }
    },
    []
  )

  // Password Reset
  const resetPassword = React.useCallback(async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("Password reset email sent!")
    } catch (err) {
      const authErr = err as AuthError
      console.error("[Auth] Reset password error:", authErr.code, authErr.message)
      let errorMessage = "Failed to send password reset email."
      if (authErr.code === "auth/user-not-found") {
        errorMessage = "No account found with this email address."
        toast.error("Authentication Error: User not found.")
      } else if (authErr.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection."
        toast.error("Network Error: Please check your internet connection.")
      } else {
        errorMessage = authErr.message || errorMessage
        toast.error(`Authentication Error: ${errorMessage}`)
      }
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Sign-Out
  const logout = React.useCallback(async () => {
    setError(null)
    try {
      await firebaseSignOut(auth)
      toast.success("Successfully logged out!")
    } catch (err) {
      const authErr = err as AuthError
      console.error("[Auth] Sign-out error:", authErr)
      toast.error("Failed to log out. Please try again.")
      setError("Failed to log out. Please try again.")
    }
  }, [])

  const clearError = React.useCallback(() => {
    setError(null)
  }, [])

  const value = React.useMemo(
    () => ({
      user,
      loading,
      error,
      loginWithGoogle,
      loginWithEmail,
      signupWithEmail,
      resetPassword,
      logout,
      clearError,
    }),
    [user, loading, error, loginWithGoogle, loginWithEmail, signupWithEmail, resetPassword, logout, clearError]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM HOOK
// ─────────────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextType {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
