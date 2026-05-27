"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useAuthStore } from "@/store/auth.store"

export default function HomePage() {
  const router = useRouter()

  const {
    isAuthenticated,
    isCheckingAuth,
  } = useAuthStore()

  useEffect(() => {
    if (isCheckingAuth) return

    if (isAuthenticated) {
      router.replace("/dashboard/assignment")
    } else {
      router.replace("/login")
    }
  }, [isAuthenticated, isCheckingAuth, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-10 h-10 rounded-full border-4 border-black/10 border-t-black animate-spin" />
    </div>
  )
}