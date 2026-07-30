"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  MenuIcon, 
  SunIcon, 
  MoonIcon, 
  ChevronDownIcon, 
  BellIcon, 
  SearchIcon, 
  SparklesIcon, 
  TrendingUpIcon, 
  CpuIcon, 
  BookOpenIcon, 
  TerminalIcon, 
  HelpCircleIcon,
  LaptopIcon
} from "lucide-react"

import { useAuth } from "@/contexts/auth-context"
import { UserMenu } from "@/components/auth/user-menu"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { 
  Sheet, 
  SheetTrigger, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// ─────────────────────────────────────────────────────────────────────────────
// TYPE DEFINITIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  isExternal?: boolean;
}

export interface FeatureItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
}

export interface ResourceItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<any>;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// Features mega-dropdown items with branded colors per capability.
// ─────────────────────────────────────────────────────────────────────────────

const features: FeatureItem[] = [
  {
    title: "AI Growth Engine",
    description: "Predictive scaling models powered by next-gen machine learning.",
    href: "/features/ai-engine",
    icon: SparklesIcon,
    color: "text-purple-500 bg-purple-500/10 dark:text-purple-400 dark:bg-purple-950/40",
  },
  {
    title: "Analytics Suite",
    description: "Deep-dive real-time analysis of conversion funnels and user churn.",
    href: "/features/analytics",
    icon: TrendingUpIcon,
    color: "text-emerald-500 bg-emerald-500/10 dark:text-emerald-400 dark:bg-emerald-950/40",
  },
  {
    title: "Auto-Optimizations",
    description: "Self-healing growth loops that adjust based on marketing yields.",
    href: "/features/optimizations",
    icon: CpuIcon,
    color: "text-blue-500 bg-blue-500/10 dark:text-blue-400 dark:bg-blue-950/40",
  },
];

const resources: ResourceItem[] = [
  {
    title: "Documentation",
    description: "Detailed step-by-step guides to integrate GrowthOS in minutes.",
    href: "/docs",
    icon: BookOpenIcon,
  },
  {
    title: "API Reference",
    description: "Robust, fully-typed REST and GraphQL endpoints for customization.",
    href: "/docs/api",
    icon: TerminalIcon,
  },
  {
    title: "Help Center",
    description: "24/7 dedicated engineering support and knowledge base.",
    href: "/help",
    icon: HelpCircleIcon,
  },
];

/**
 * Primary navigation links rendered in the desktop top-bar and mobile sheet.
 * "Features" is handled separately as a mega-dropdown trigger.
 */
const mainNavLinks: NavItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR COMPONENT
//
// Architecture decisions:
// • `sticky top-0 z-50` for persistent visibility without layout shift.
// • Glassmorphism achieved via `backdrop-blur-xl` + translucent `bg-background/60`
//   that activates on scroll through the `isScrolled` state.
// • Framer Motion `layoutId` powers the sliding hover pill and active indicator
//   across desktop nav links, creating the Vercel-style navigation feel.
// • Base UI `render` prop is used for polymorphic elements (DropdownMenuItem
//   rendered as `<a>`, SheetClose rendered as `<a>`) to preserve accessibility
//   semantics. Native `<a>` tags are used inside render props instead of
//   Next.js `<Link>` to avoid React 19 hydration boundary issues.
// • Mobile nav uses shadcn Sheet (right-sliding drawer) with grouped sections
//   for Features, Navigation, and Resources.
// ─────────────────────────────────────────────────────────────────────────────

export function Navbar() {
  const { user: authUser, logout, loading } = useAuth()
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [theme, setTheme] = React.useState<"light" | "dark" | "system">("system")
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  const user = authUser
    ? {
        name: authUser.displayName || authUser.email || "User",
        email: authUser.email || "",
        avatarUrl: authUser.photoURL || undefined,
      }
    : null

  // ── Scroll listener for glassmorphism activation ──
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // ── Theme persistence & initialization ──
  React.useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      applyTheme("system")
    }
  }, [])

  const applyTheme = (newTheme: "light" | "dark" | "system") => {
    const root = window.document.documentElement
    root.classList.remove("light", "dark")
    
    if (newTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }

  const cycleTheme = () => {
    let nextTheme: "light" | "dark" | "system" = "light"
    if (theme === "light") nextTheme = "dark"
    else if (theme === "dark") nextTheme = "system"
    else nextTheme = "light"

    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ease-out ${
        isScrolled
          ? "border-b border-white/[0.08] bg-background/60 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,0.08),0_8px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3),0_8px_20px_rgba(0,0,0,0.15)]"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* ── BRAND + DESKTOP NAV ── */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div 
              className="flex size-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-primary/70 text-primary-foreground shadow-md"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="font-heading text-lg font-bold">G</span>
            </motion.div>
            <span className="font-heading text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
              GrowthOS AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0.5" role="navigation" aria-label="Main navigation">
            
            {/* Features Mega Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <button
                    className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-all duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring cursor-pointer"
                  />
                }
              >
                Features
                <ChevronDownIcon className="size-3.5 opacity-50 transition-transform duration-200 group-aria-expanded:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[440px] p-4" align="start" sideOffset={12}>
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Growth Capabilities
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <div className="grid grid-cols-1 gap-1.5">
                  {features.map((feature) => {
                    const Icon = feature.icon
                    return (
                      <DropdownMenuItem
                        key={feature.title}
                        className="p-0"
                        render={
                          <a
                            href={feature.href}
                            className="flex items-start gap-4 rounded-xl p-3 hover:bg-muted/50 transition-colors"
                          />
                        }
                      >
                        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${feature.color}`}>
                          <Icon className="size-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm flex items-center gap-1.5">
                            {feature.title}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5 leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    )
                  })}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Standard Links with Framer Motion hover pill + active indicator */}
            {mainNavLinks.map((link, idx) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Sliding hover background pill */}
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 z-[-1] rounded-lg bg-muted/50"
                        layoutId="navHoverPill"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { duration: 0.15 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1, delay: 0.05 } }}
                      />
                    )}
                  </AnimatePresence>
                  <span className={isActive ? "text-foreground font-semibold" : ""}>
                    {link.label}
                  </span>
                  {/* Active bottom indicator bar */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary"
                      layoutId="activeNavIndicator"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* ── RIGHT-SIDE ACTIONS ── */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label="Search"
          >
            <SearchIcon className="size-[18px]" />
          </Button>

          {/* Notification Bell with live indicator dot */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors relative"
            aria-label="Notifications"
          >
            <BellIcon className="size-[18px]" />
            <span className="absolute top-2 right-2 size-2 rounded-full bg-indigo-500 ring-2 ring-background animate-pulse" />
          </Button>

          {/* Theme Cycler (Light → Dark → System) */}
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            aria-label={`Switch theme. Current: ${theme}`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.9 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {theme === "light" && <SunIcon className="size-[18px]" />}
                {theme === "dark" && <MoonIcon className="size-[18px]" />}
                {theme === "system" && <LaptopIcon className="size-[18px]" />}
              </motion.span>
            </AnimatePresence>
          </Button>

          {/* Divider */}
          <div className="hidden md:block h-5 w-px bg-border/60 mx-1" />

          {/* Auth Section: User Dropdown or Guest CTAs */}
          {user ? (
            <UserMenu />
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                render={<Link href="/login" />}
                className="text-muted-foreground hover:text-foreground font-medium cursor-pointer"
              >
                Login
              </Button>
              <Button 
                size="sm" 
                render={<Link href="/signup" />}
                className="shadow-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:shadow-md cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          )}

          {/* ── MOBILE HAMBURGER ── */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground" />
                }
              >
                <MenuIcon className="size-5" />
                <span className="sr-only">Open navigation menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col p-0">
                <SheetHeader className="p-4 border-b border-border/40">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <span className="font-heading text-sm font-bold">G</span>
                    </div>
                    <span className="font-heading text-base font-bold tracking-tight text-foreground">
                      GrowthOS AI
                    </span>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-4 px-4 space-y-6">
                  
                  {/* Features Section */}
                  <div>
                    <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Features
                    </h4>
                    <div className="space-y-1">
                      {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                          <SheetClose
                            key={feature.title}
                            render={
                              <a
                                href={feature.href}
                                className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                              />
                            }
                          >
                            <div className={`flex size-7 shrink-0 items-center justify-center rounded-md ${feature.color}`}>
                              <Icon className="size-3.5" />
                            </div>
                            <span className="font-medium text-foreground">{feature.title}</span>
                          </SheetClose>
                        )
                      })}
                    </div>
                  </div>

                  {/* Navigation Section */}
                  <div>
                    <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Navigation
                    </h4>
                    <div className="space-y-0.5">
                      {mainNavLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                          <SheetClose
                            key={link.label}
                            render={
                              <a
                                href={link.href}
                                className={`block rounded-lg px-2.5 py-2 text-sm font-medium transition-colors ${
                                  isActive 
                                    ? "bg-primary/5 text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                }`}
                              />
                            }
                          >
                            {link.label}
                          </SheetClose>
                        )
                      })}
                    </div>
                  </div>

                  {/* Resources Section */}
                  <div>
                    <h4 className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      Resources
                    </h4>
                    <div className="space-y-1">
                      {resources.map((res) => {
                        const Icon = res.icon
                        return (
                          <SheetClose
                            key={res.title}
                            render={
                              <a
                                href={res.href}
                                className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                              />
                            }
                          >
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/80 text-muted-foreground">
                              <Icon className="size-3.5" />
                            </div>
                            <span className="font-medium text-foreground">{res.title}</span>
                          </SheetClose>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Mobile Footer: Auth state */}
                <div className="p-4 border-t border-border/40 bg-muted/10">
                  {user ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-10">
                          <AvatarImage src={user.avatarUrl} alt={user.name} />
                          <AvatarFallback className="bg-primary/5 text-primary text-sm font-semibold">
                            {user.name.split(" ").map(n => n[0]).join("").toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{user.name}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <SheetClose
                          render={
                            <a href="/profile" className="w-full" />
                          }
                        >
                          <Button variant="outline" className="w-full text-xs font-semibold justify-center h-8" size="sm">
                            Profile
                          </Button>
                        </SheetClose>
                        <SheetClose
                          render={
                            <Button variant="destructive" className="w-full text-xs font-semibold justify-center h-8 cursor-pointer" size="sm" onClick={logout} />
                          }
                        >
                          Log Out
                        </SheetClose>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <SheetClose
                        render={
                          <a href="/login" className="w-full" />
                        }
                      >
                        <Button variant="outline" className="w-full justify-center cursor-pointer">
                          Login
                        </Button>
                      </SheetClose>
                      <SheetClose
                        render={
                          <a href="/signup" className="w-full" />
                        }
                      >
                        <Button className="w-full justify-center bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer">
                          Get Started
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>

      </div>
    </header>
  )
}
