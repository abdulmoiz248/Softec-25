"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Settings, User, LogOut, Heart, FileText, Calendar, Pill, Droplet } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"
import { useRouter } from "next/navigation"

type UserMenuOption = {
  id: string
  label: string
  icon: React.ElementType
  onClick: () => void
}

type NavItem = {
  id: string
  label: string
  icon: React.ElementType
  href: string
  color: string
}

export default function TopBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()
  const router=useRouter();
  const navItems: NavItem[] = [
    {
      id: "records",
      label: "Medical Records",
      icon: FileText,
      href: "/patient/records",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: Calendar,
      href: "/patient/appointments",
      color: "from-green-500 to-green-600",
    },
    {
      id: "pharmacy",
      label: "E-Pharmacy",
      icon: Pill,
      href: "/e-commerce",
      color: "from-cyan-500 to-cyan-600",
    },
    {
      id: "blood",
      label: "Blood Donation",
      icon: Droplet,
      href: "/patient/blood-donation",
      color: "from-red-500 to-red-600",
    },
  ]

  const userMenuOptions: UserMenuOption[] = [
    {
      id: "profile",
      label: "View Profile",
      icon: User,
      onClick: () => console.log("View Profile clicked"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      onClick: () => console.log("Settings clicked"),
    },
    {
      id: "logout",
      label: "Logout",
      icon: LogOut,
      onClick: () => console.log("Logout clicked"),
    },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleNotificationClick = () => {
    setHasNotifications(false)
    console.log("Notifications clicked")
  }

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gradient-to-r from-[#09203F]/80 to-[#537895]/80 border-b border-white/10">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 max-w-7xl mx-auto">
        {/* Left section - Logo */}
        <div className="flex items-center">
          <a href="/" className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-md shadow-lg shadow-blue-500/20">
              <Heart className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold text-white">Hygieia</span>
          </a>
        </div>

        {/* Center section - Navigation Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-gradient-to-r ${item.color} hover:shadow-lg`}
              onClick={(e) => {
                e.preventDefault()
                router.push(item.href)
              }} // Prevent any click behavior
            >
              <item.icon className="w-5 h-5" />
              <span className="mt-1 text-xs font-medium">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Right section - Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNotificationClick}
            className="relative p-2 text-white transition-colors rounded-full hover:bg-white/10 focus:outline-none"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
              />
            )}
          </motion.button>

          {/* User Avatar and Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleUserMenu}
              className="flex items-center justify-center w-8 h-8 overflow-hidden text-white bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg shadow-blue-500/20 focus:outline-none"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <span className="text-sm font-medium">SJ</span>
            </motion.button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 w-48 mt-2 origin-top-right bg-gradient-to-br from-[#09203F]/90 to-[#537895]/90 backdrop-blur-xl rounded-xl shadow-lg border border-white/10 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="py-1">
                    {userMenuOptions.map((option) => (
                      <motion.button
                        key={option.id}
                        whileHover={{ x: 5, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                        onClick={() => {
                          option.onClick()
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-white"
                        role="menuitem"
                      >
                        <option.icon className="w-4 h-4 mr-3" />
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
