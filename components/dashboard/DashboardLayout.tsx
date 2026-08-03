"use client"

import * as React from "react"
import { Sidebar } from "./Sidebar"
import { TopNavbar } from "./TopNavbar"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

export interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Block scroll on page body when mobile menu is open
  React.useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [sidebarOpen])

  const pathname = usePathname()

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#030303] text-zinc-100 font-sans antialiased">
      
      {/* ── Desktop Sidebar (Fixed) ── */}
      <Sidebar className="hidden md:flex md:w-64 md:shrink-0" />

      {/* ── Mobile Sidebar Overlay Drawer ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden backdrop-blur-sm"
            />
            
            {/* Drawer Container */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden shadow-2xl"
            >
              <Sidebar onClose={() => setSidebarOpen(false)} className="w-full" />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Viewport Wrap (Navbar + Scrollable Body) ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Sticky top bar */}
        <TopNavbar onMenuClick={() => setSidebarOpen(true)} />

        {/* Content Viewport scrollable */}
        <main className="flex-1 overflow-y-auto focus:outline-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

    </div>
  )
}
