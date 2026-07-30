"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { useAuth } from "@/contexts/auth-context"
import { GoogleButton } from "@/components/auth/google-button"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import {
  EyeIcon,
  EyeOffIcon,
  Loader2Icon,
  AlertCircleIcon,
  CheckCircle2Icon,
  ArrowRightIcon,
  SparklesIcon,
  LockIcon,
  MailIcon,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// ZOD VALIDATION SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get("redirect") || "/"

  const { loginWithEmail, resetPassword, user, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isResetting, setIsResetting] = React.useState(false)
  const [resetSent, setResetSent] = React.useState(false)
  const [resetError, setResetError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  // If already logged in, redirect to requested target or home page
  React.useEffect(() => {
    if (user) {
      router.push(redirectTarget)
    }
  }, [user, router, redirectTarget])

  const onSubmit = async (data: LoginFormData) => {
    try {
      // Issue 1 Fix: Pass rememberMe to set the correct persistence before sign-in.
      // Issue 5 Fix: Do NOT call router.push here. The useEffect watching `user`
      // above handles the redirect once onAuthStateChanged fires with the new user.
      // Calling router.push here would race with onAuthStateChanged and cause
      // ProtectedRoute on the target page to see a null user momentarily.
      await loginWithEmail(data.email, data.password, data.rememberMe ?? true)
    } catch {
      // Error handled in AuthContext
    }
  }


  const handleForgotPassword = async () => {
    const email = getValues("email")
    if (!email || !z.string().email().safeParse(email).success) {
      setResetError("Please enter a valid email address in the field above to reset password.")
      return
    }

    setIsResetting(true)
    setResetError(null)
    setResetSent(false)

    try {
      await resetPassword(email)
      setResetSent(true)
    } catch (err: any) {
      setResetError(err.message || "Failed to send reset email.")
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] text-zinc-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[20%] left-[20%] size-[500px] rounded-full bg-purple-600/15 blur-[160px]" />
        <div className="absolute bottom-[20%] right-[20%] size-[500px] rounded-full bg-indigo-600/15 blur-[160px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl border-zinc-800/80 bg-zinc-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden p-2 sm:p-4">
          <CardHeader className="text-center space-y-2 pb-6">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center justify-center gap-2 mb-2 group">
              <div className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white font-extrabold text-xl shadow-lg">
                G
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-purple-400 transition-colors">
                GrowthOS AI
              </span>
            </Link>

            <CardTitle className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-zinc-100 to-zinc-400">
              Welcome back
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Sign in to your account to access your AI growth engine.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Global Error Banner */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                <AlertCircleIcon className="size-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Authentication Error</p>
                  <p className="opacity-90 mt-0.5">{error}</p>
                </div>
                <button
                  onClick={clearError}
                  className="text-rose-400 hover:text-white text-xs underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Reset Email Sent Success Banner */}
            {resetSent && (
              <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3.5 text-xs text-emerald-300">
                <CheckCircle2Icon className="size-4 shrink-0 text-emerald-400 mt-0.5" />
                <p className="flex-1">
                  Password reset link sent! Check your inbox to reset your password.
                </p>
              </div>
            )}

            {/* Reset Email Error Banner */}
            {resetError && (
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3.5 text-xs text-amber-300">
                <AlertCircleIcon className="size-4 shrink-0 text-amber-400 mt-0.5" />
                <p className="flex-1">{resetError}</p>
              </div>
            )}

            {/* Google Sign-In Button */}
            <GoogleButton label="Continue with Google" rememberMe={getValues("rememberMe")} />

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative bg-zinc-950 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Or continue with email
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Email address</span>
                </label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    {...register("email")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.email ? "border-rose-500/80" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-400 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-zinc-300">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isResetting}
                    className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium cursor-pointer"
                  >
                    {isResetting ? "Sending reset..." : "Forgot password?"}
                  </button>
                </div>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-10 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.password ? "border-rose-500/80" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-400 font-medium">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("rememberMe")}
                    className="size-4 rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500/30 accent-purple-600 cursor-pointer"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg cursor-pointer transition-all duration-200 mt-2"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2Icon className="size-4 animate-spin" />
                    <span>Signing in...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Sign in to Dashboard</span>
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/60 pt-4 pb-2">
            <p className="text-xs text-zinc-400">
              Don&apos;t have an account?{" "}
              <Link
                href={redirectTarget !== "/" ? `/signup?redirect=${encodeURIComponent(redirectTarget)}` : "/signup"}
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Create an account
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] text-zinc-400 text-sm">
          Loading sign in...
        </div>
      }
    >
      <LoginForm />
    </React.Suspense>
  )
}

