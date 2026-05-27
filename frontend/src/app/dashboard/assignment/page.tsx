"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth.store"

export default function DashboardPage() {
  const router = useRouter()

  const {
  user,
  isAuthenticated,
  isCheckingAuth,
} = useAuthStore()

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isCheckingAuth, router])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-4xl border border-border bg-card p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-[-0.04em] text-foreground">
                Welcome back, {user?.name}
              </h1>

              <p className="text-muted-foreground mt-2">
                Ready to generate AI-powered assignments.
              </p>
            </div>

            <button
              className="h-11 px-6 rounded-full bg-black text-white border border-[#ff7a45] shadow-[0_0_20px_rgba(255,122,69,0.18)] hover:bg-black/90 transition-all"
            >
              Create Assignment
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="rounded-3xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">
                Total Assignments
              </h2>

              <p className="text-4xl font-bold mt-5">
                0
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">
                Generated Papers
              </h2>

              <p className="text-4xl font-bold mt-5">
                0
              </p>
            </div>

            <div className="rounded-3xl border border-border bg-muted/30 p-6">
              <h2 className="text-lg font-semibold">
                School
              </h2>

              <p className="text-xl font-semibold mt-5">
                {user?.schoolName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}