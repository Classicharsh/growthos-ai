"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { XIcon } from "lucide-react"

interface CampaignModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function CampaignModal({
  isOpen,
  onClose,
  title,
  children
}: CampaignModalProps) {
  // Lock document scroll on mount/open, support Escape key close
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto">
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-900 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-900 pb-4 mb-5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="size-7 rounded-lg border border-zinc-900 bg-zinc-950/60 flex items-center justify-center text-zinc-500 hover:text-zinc-300 hover:border-zinc-800 transition-colors cursor-pointer"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            {/* Form Content body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
