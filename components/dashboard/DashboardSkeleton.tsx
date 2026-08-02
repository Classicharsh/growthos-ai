import * as React from "react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 w-full animate-pulse">
      {/* 1. Header Skeleton */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="w-48 h-4.5 bg-zinc-900 rounded-full" />
          <div className="w-64 h-8 bg-zinc-900 rounded-2xl" />
          <div className="w-56 h-3 bg-zinc-900 rounded-full" />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-24 h-9 bg-zinc-900 rounded-xl" />
          <div className="w-32 h-9 bg-zinc-900 rounded-xl" />
        </div>
      </div>

      {/* 2. Stats Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-32 rounded-2xl border border-zinc-900 bg-zinc-950/20 p-5 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-24 h-4 bg-zinc-900 rounded-full" />
              <div className="w-8 h-8 bg-zinc-900 rounded-xl" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-7 bg-zinc-900 rounded-full" />
              <div className="w-36 h-3 bg-zinc-900 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Charts & Sources Grid Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 h-[350px] rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-48 h-5 bg-zinc-900 rounded-full" />
            <div className="w-64 h-3.5 bg-zinc-900 rounded-full" />
          </div>
          <div className="flex-1 w-full bg-zinc-900/50 rounded-xl my-4" />
        </div>
        <div className="h-[350px] rounded-2xl border border-zinc-900 bg-zinc-950/20 p-6 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-36 h-5 bg-zinc-900 rounded-full" />
            <div className="w-48 h-3.5 bg-zinc-900 rounded-full" />
          </div>
          <div className="flex-1 space-y-4 my-6">
            {[1, 2, 3].map((s) => (
              <div key={s} className="space-y-2">
                <div className="flex justify-between">
                  <div className="w-24 h-3 bg-zinc-900 rounded-full" />
                  <div className="w-12 h-3 bg-zinc-900 rounded-full" />
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
