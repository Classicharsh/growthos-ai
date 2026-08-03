"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { AlertTriangleIcon, Trash2Icon, Loader2Icon } from "lucide-react"

interface DeleteCampaignDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  campaignName: string
  isLoading?: boolean
}

export function DeleteCampaignDialog({
  isOpen,
  onClose,
  onConfirm,
  campaignName,
  isLoading = false
}: DeleteCampaignDialogProps) {
  // Lock body scroll when dialog is active, support Escape key close
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Dialog Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-rose-500/20 bg-zinc-950/80 p-6 shadow-2xl backdrop-blur-xl z-10 text-center"
          >
            {/* Warning Icon Banner */}
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-450 mb-4 animate-pulse">
              <AlertTriangleIcon className="size-6 text-rose-400" />
            </div>

            {/* Dialog Content */}
            <div className="space-y-2">
              <h3 
                id="delete-dialog-title"
                className="text-base font-bold text-white tracking-tight"
              >
                Delete Campaign?
              </h3>
              <p 
                id="delete-dialog-description"
                className="text-xs text-zinc-400 leading-relaxed"
              >
                Are you sure you want to permanently delete the campaign <strong className="text-zinc-200">"{campaignName}"</strong>? This action cannot be undone and all active CAPI tracking signals will terminate immediately.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 mt-6 pt-4 border-t border-zinc-900/60">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={isLoading}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold text-white shadow-lg cursor-pointer transition-all duration-200 disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2Icon className="size-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2Icon className="size-3.5" />
                    <span>Delete Campaign</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
