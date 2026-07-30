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
  ArrowRightIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  CheckCircle2Icon,
} from "lucide-react"

// ─────────────────────────────────────────────────────────────────────────────
// ZOD VALIDATION SCHEMA
// ─────────────────────────────────────────────────────────────────────────────

const signupSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the Terms of Service and Privacy Policy",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignupFormData = z.infer<typeof signupSchema>

// ─────────────────────────────────────────────────────────────────────────────
// SIGNUP PAGE
// ─────────────────────────────────────────────────────────────────────────────

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTarget = searchParams.get("redirect") || "/"

  const { signupWithEmail, user, error, clearError } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  })

  // If already logged in, redirect to requested target or home page
  React.useEffect(() => {
    if (user) {
      router.push(redirectTarget)
    }
  }, [user, router, redirectTarget])

  const onSubmit = async (data: SignupFormData) => {
    try {
      // Issue 5 pattern: Do NOT call router.push here.
      // The useEffect watching `user` handles the redirect once
      // onAuthStateChanged fires with the new user.
      await signupWithEmail(data.name, data.email, data.password)
    } catch {
      // Error handled in AuthContext
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] text-zinc-100 p-4 sm:p-6 lg:p-8 relative overflow-hidden selection:bg-purple-600 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[15%] right-[15%] size-[500px] rounded-full bg-purple-600/15 blur-[160px]" />
        <div className="absolute bottom-[15%] left-[15%] size-[500px] rounded-full bg-indigo-600/15 blur-[160px]" />
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
              Create your account
            </CardTitle>
            <CardDescription className="text-sm text-zinc-400">
              Start your 14-day free trial. No credit card required.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Global Error Banner */}
            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-500/20 bg-rose-500/10 p-3.5 text-xs text-rose-300">
                <AlertCircleIcon className="size-4 shrink-0 text-rose-400 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Registration Error</p>
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

            {/* Google Sign-In Button */}
            <GoogleButton label="Sign up with Google" />

            {/* Divider */}
            <div className="relative flex items-center justify-center my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-800" />
              </div>
              <div className="relative bg-zinc-950 px-3 text-xs uppercase tracking-wider text-zinc-500 font-medium">
                Or sign up with email
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5" noValidate>
              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Alex Morgan"
                    {...register("name")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.name ? "border-rose-500/80" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-rose-400 font-medium">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Work Email</label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type="email"
                    placeholder="alex@company.com"
                    {...register("email")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
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
                <label className="text-xs font-semibold text-zinc-300">Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    {...register("password")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-10 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
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

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-300">Confirm Password</label>
                <div className="relative">
                  <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter password"
                    {...register("confirmPassword")}
                    className={`w-full rounded-xl border bg-zinc-900/60 pl-9 pr-10 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all ${
                      errors.confirmPassword ? "border-rose-500/80" : "border-zinc-800 hover:border-zinc-700"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-rose-400 font-medium">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms & Privacy Checkbox */}
              <div className="space-y-1 pt-1">
                <label className="flex items-start gap-2 text-xs text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register("terms")}
                    className="size-4 rounded border-zinc-800 bg-zinc-900 text-purple-600 focus:ring-purple-500/30 accent-purple-600 cursor-pointer mt-0.5"
                  />
                  <span className="leading-tight">
                    I agree to the{" "}
                    <a href="/terms" className="text-purple-400 hover:underline">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-purple-400 hover:underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                {errors.terms && (
                  <p className="text-xs text-rose-400 font-medium">{errors.terms.message}</p>
                )}
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
                    <span>Creating account...</span>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span>Create GrowthOS Account</span>
                    <ArrowRightIcon className="size-4" />
                  </span>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-zinc-800/60 pt-4 pb-2">
            <p className="text-xs text-zinc-400">
              Already have an account?{" "}
              <Link
                href={redirectTarget !== "/" ? `/login?redirect=${encodeURIComponent(redirectTarget)}` : "/login"}
                className="font-semibold text-purple-400 hover:text-purple-300 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#030303] text-zinc-400 text-sm">
          Loading sign up...
        </div>
      }
    >
      <SignupForm />
    </React.Suspense>
  )
}
