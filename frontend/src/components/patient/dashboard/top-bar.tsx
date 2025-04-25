"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell, Settings, User, LogOut, Heart } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

type UserMenuOption = {
  id: string
  label: string
  icon: React.ElementType
  onClick: () => void
}

export default function TopBar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [hasNotifications, setHasNotifications] = useState(true)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Mock user menu options
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

  // Handle click outside to close the user menu
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
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left section - Logo */}
        <div className="flex items-center">
          <a href="/dashboard" className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 mr-2 text-white bg-sky-600 rounded-md">
              <Heart className="w-4 h-4" />
            </div>
            {!isMobile && <span className="text-xl font-semibold text-sky-700">Hygieia</span>}
          </a>
        </div>

        {/* Right section - Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <button
            onClick={handleNotificationClick}
            className="relative p-2 text-gray-500 transition-colors rounded-full hover:bg-gray-100 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {hasNotifications && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>}
          </button>

          {/* User Avatar and Dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className="flex items-center justify-center w-8 h-8 overflow-hidden text-white bg-sky-600 rounded-full hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2"
              aria-label="User menu"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <span className="text-sm font-medium">JD</span>
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <div className="py-1">
                    {userMenuOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          option.onClick()
                          setIsUserMenuOpen(false)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 hover:text-sky-600"
                        role="menuitem"
                      >
                        <option.icon className="w-4 h-4 mr-3" />
                        {option.label}
                      </button>
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
