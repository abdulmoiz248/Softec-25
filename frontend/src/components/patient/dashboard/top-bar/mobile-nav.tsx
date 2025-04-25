"use client"

import type React from "react"
import { motion } from "framer-motion"
import { FileText, Calendar, Pill, Droplet } from "lucide-react"

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  href: string
  color: string
}

export default function MobileNav() {
  // Navigation items
  const navItems: NavItem[] = [
    {
      id: "records",
      label: "Records",
      icon: FileText,
      href: "/records",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/appointments",
      color: "from-green-500 to-green-600",
    },
    {
      id: "pharmacy",
      label: "Pharmacy",
      icon: Pill,
      href: "/pharmacy",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "blood",
      label: "Blood",
      icon: Droplet,
      href: "/blood-donation",
      color: "from-red-500 to-red-600",
    },
  ]

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-2 py-2 bg-gradient-to-r from-[#09203F]/80 to-[#537895]/80 backdrop-blur-xl rounded-2xl border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
      <div className="flex items-center justify-between">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`relative flex flex-col items-center justify-center p-2 mx-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-gradient-to-r ${item.color} hover:shadow-lg`}
          >
            <item.icon className="w-5 h-5" />
            <span className="mt-1 text-[10px] font-medium">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
