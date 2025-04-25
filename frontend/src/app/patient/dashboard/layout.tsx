import type React from "react"
import TopBar from "@/components/patient/dashboard/top-bar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <main className="pb-20 md:pb-0 md:pl-24">{children}</main>
    </div>
  )
}
