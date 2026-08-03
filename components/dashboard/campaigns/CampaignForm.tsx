"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2Icon, CheckIcon } from "lucide-react"

// Zod Validation Schema
export const campaignFormSchema = z.object({
  name: z.string().min(3, "Campaign name must be at least 3 characters"),
  objective: z.enum(["Conversions", "Traffic", "Lead Generation", "Brand Awareness"]),
  budget: z.number({ message: "Daily budget is required" }).min(1, "Daily budget must be at least $1"),
  currency: z.enum(["USD", "EUR", "GBP"]),
  platform: z.enum(["Facebook", "Instagram", "Messenger", "Audience Network"]),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  status: z.enum(["Active", "Paused", "Draft"]),
}).refine((data) => {
  if (data.endDate && new Date(data.endDate) < new Date(data.startDate)) {
    return false
  }
  return true
}, {
  message: "End date must be after start date",
  path: ["endDate"]
})

export type CampaignFormValues = z.infer<typeof campaignFormSchema>

interface CampaignFormProps {
  initialValues?: Partial<CampaignFormValues>
  onSubmit: (values: CampaignFormValues) => void
  onCancel: () => void
  isLoading?: boolean
}

export function CampaignForm({
  initialValues,
  onSubmit,
  onCancel,
  isLoading = false
}: CampaignFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: "",
      objective: "Conversions",
      budget: undefined,
      currency: "USD",
      platform: "Facebook",
      startDate: new Date().toISOString().split("T")[0],
      status: "Active",
      ...initialValues
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-zinc-200">
      {/* Campaign Name */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
          Campaign Name
        </label>
        <input
          type="text"
          placeholder="e.g. Q3 Conversions Peak Season"
          {...register("name")}
          className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3.5 py-2.5 text-zinc-200 placeholder:text-zinc-650 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        />
        {errors.name && (
          <p className="text-[10px] text-rose-400 font-semibold mt-0.5">{errors.name.message}</p>
        )}
      </div>

      {/* Objective & Platform Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Objective
          </label>
          <select
            {...register("objective")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          >
            <option value="Conversions">Conversions (CAPI)</option>
            <option value="Traffic">Traffic Boost</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Brand Awareness">Brand Awareness</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Primary Platform
          </label>
          <select
            {...register("platform")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          >
            <option value="Facebook">Facebook Ads</option>
            <option value="Instagram">Instagram Stories & Feed</option>
            <option value="Messenger">Messenger Placements</option>
            <option value="Audience Network">Audience Network</option>
          </select>
        </div>
      </div>

      {/* Budget, Currency & Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Daily Budget
          </label>
          <input
            type="number"
            placeholder="500"
            {...register("budget", { valueAsNumber: true })}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3.5 py-2.5 text-zinc-200 placeholder:text-zinc-650 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
          {errors.budget && (
            <p className="text-[10px] text-rose-400 font-semibold mt-0.5">{errors.budget.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Currency
          </label>
          <select
            {...register("currency")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Initial Status
          </label>
          <select
            {...register("status")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Start Date & End Date Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            Start Date
          </label>
          <input
            type="date"
            {...register("startDate")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3.5 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
          {errors.startDate && (
            <p className="text-[10px] text-rose-400 font-semibold mt-0.5">{errors.startDate.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
            End Date (Optional)
          </label>
          <input
            type="date"
            {...register("endDate")}
            className="w-full text-xs rounded-xl border border-zinc-900 bg-zinc-950/60 px-3.5 py-2.5 text-zinc-200 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
          {errors.endDate && (
            <p className="text-[10px] text-rose-400 font-semibold mt-0.5">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center sm:justify-end gap-3 pt-3 border-t border-zinc-900/60 mt-6">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/40 text-xs font-semibold text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white shadow-lg cursor-pointer transition-all duration-200 disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <CheckIcon className="size-3.5" />
              <span>Save Campaign</span>
            </>
          )}
        </button>
      </div>
    </form>
  )
}
