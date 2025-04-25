"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Home, Calendar, FileText, Pill, Activity, Droplet, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useMobile } from "@/hooks/use-mobile"

type MenuItem = {
  id: string
  label: string
  icon: React.ElementType
  href: string
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: Home,
    href: "/dashboard",
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: Calendar,
    href: "/appointments",
  },
  {
    id: "records",
    label: "Medical Records",
    icon: FileText,
    href: "/records",
  },
  {
    id: "pharmacy",
    label: "E-Pharmacy",
    icon: Pill,
    href: "/pharmacy",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Activity,
    href: "/fitness",
  },
  {
    id: "blood",
    label: "Blood Donation",
    icon: Droplet,
    href: "/blood-donation",
  },
]

export default function DockMenu() {
  const [activeItem, setActiveItem] = useState("dashboard")
  const isMobile = useMobile()

  const handleItemClick = (id: string) => {
    setActiveItem(id)
  }

  const handleAddShortcut = () => {
    // This would open a modal to add shortcuts
    console.log("Open add shortcut modal")
  }

  return (
    <TooltipProvider delayDuration={300}>
      <motion.div
        className={cn(
          "fixed bg-white rounded-lg shadow-lg z-50 flex items-center",
          "transition-all duration-300 ease-in-out",
          isMobile
            ? "bottom-4 left-4 right-4 h-16 px-2 justify-between"
            : "top-24 left-4 bottom-24 w-20 flex-col py-6 gap-6",
        )}
        initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {menuItems.map((item) => (
          <DockMenuItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={() => handleItemClick(item.id)}
          />
        ))}

        <div className={cn(isMobile ? "ml-1" : "mt-6")}>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={handleAddShortcut}
                className={cn(
                  "flex items-center justify-center rounded-full bg-sky-100 text-sky-600",
                  "hover:bg-sky-200 transition-colors duration-200",
                  "focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2",
                  isMobile ? "w-12 h-12" : "w-14 h-14 mx-auto",
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Add Shortcut"
              >
                <Plus className="w-6 h-6" />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side={isMobile ? "top" : "right"}>
              <p>Add Shortcut</p>
            </TooltipContent>
          </Tooltip>
          {!isMobile && <p className="text-xs text-center mt-1 text-gray-500">Add Shortcut</p>}
        </div>
      </motion.div>
    </TooltipProvider>
  )
}

function DockMenuItem({
  item,
  isActive,
  onClick,
}: {
  item: MenuItem
  isActive: boolean
  onClick: () => void
}) {
  const isMobile = useMobile()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={item.href}
          className={cn(
            "flex items-center justify-center rounded-lg transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2",
            isActive ? "bg-sky-100 text-sky-600" : "text-gray-500 hover:text-sky-600 hover:bg-sky-50",
            isMobile ? "flex-col p-1 h-full" : "w-14 h-14 mx-auto flex-col",
          )}
          onClick={(e) => {
            e.preventDefault()
            onClick()
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.label}
          aria-current={isActive ? "page" : undefined}
        >
          <item.icon className={cn("transition-colors", isMobile ? "w-5 h-5" : "w-6 h-6 mb-1")} />
          {!isMobile && <span className="text-xs font-medium text-center">{item.label}</span>}
        </motion.a>
      </TooltipTrigger>
      {isMobile && (
        <TooltipContent side="top">
          <p>{item.label}</p>
        </TooltipContent>
      )}
    </Tooltip>
  )
}
