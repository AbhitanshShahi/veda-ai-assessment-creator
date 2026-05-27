"use client"

import { useEffect } from "react"

import { useAuthStore } from "@/store/auth.store"

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const fetchCurrentUser =
    useAuthStore((state) => state.fetchCurrentUser)

  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return <>{children}</>
}