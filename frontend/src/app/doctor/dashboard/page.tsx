"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Bell,
  Calendar,
  ChevronLeft,
  ClipboardList,
  Home,
  Menu,
  MessageSquare,
  Search,
  Settings,
  Users,
} from "lucide-react"
import PatientList from "@/components/patient-list"
import DiagnosticInsights from "@/components/diagnostic-insights"
import NotificationPanel from "@/components/notification-panel"
import HygieiaLogo from "@/components/hygieia-logo"

export default function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("Dashboard")

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-navy-900 to-teal-900 text-white overflow-hidden">
      {/* Sidebar */}
      <motion.div
        className="h-full bg-navy-800/80 backdrop-blur-md border-r border-teal-500/20 z-20"
        initial={{ width: sidebarOpen ? 240 : 80 }}
        animate={{ width: sidebarOpen ? 240 : 80 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between">
            {sidebarOpen ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <HygieiaLogo />
              </motion.div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                <span className="text-navy-900 font-bold text-lg">H</span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-white/80 hover:text-teal-400 transition-colors"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>

          <div className="mt-8 flex flex-col space-y-2 px-3">
            {[
              { icon: Home, label: "Dashboard" },
              { icon: Users, label: "Patients" },
              { icon: Calendar, label: "Appointments" },
              { icon: ClipboardList, label: "Records" },
              { icon: MessageSquare, label: "Messages" },
              { icon: Settings, label: "Settings" },
            ].map((item, index) => (
              <motion.button
                key={item.label}
                className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-teal-500/20 transition-colors ${
                  item.label === activeSection ? "bg-teal-500/20 border-l-4 border-teal-500" : ""
                }`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 8px rgba(0, 168, 150, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 300,
                  damping: 24,
                }}
                onClick={() => setActiveSection(item.label)}
              >
                <item.icon size={20} className="text-teal-400" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="font-medium"
                  >
                    {item.label}
                  </motion.span>
                )}
              </motion.button>
            ))}
          </div>

          <div className="mt-auto p-4">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-navy-700/50 p-4 rounded-xl border border-teal-500/20"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-navy-900 font-bold">DR</span>
                  </div>
                  <div>
                    <p className="font-medium">Dr. Sarah Chen</p>
                    <p className="text-xs text-white/60">Neurologist</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <motion.header
          className="h-16 bg-navy-800/30 backdrop-blur-md border-b border-teal-500/20 flex items-center justify-between px-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Doctor Dashboard</h1>
            <div className="hidden md:flex items-center space-x-2 bg-navy-700/50 rounded-full px-4 py-2 border border-teal-500/20">
              <Search size={16} className="text-teal-400" />
              <input
                type="text"
                placeholder="Search patients, records..."
                className="bg-transparent border-none outline-none text-sm w-64"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <Bell size={20} className="text-white/80 hover:text-teal-400 transition-colors" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-500 rounded-full text-[10px] flex items-center justify-center">
                3
              </span>
            </motion.button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
              <span className="text-navy-900 font-bold text-sm">SC</span>
            </div>
          </div>
        </motion.header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {activeSection === "Dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold">Today's Overview</h2>
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                      >
                        Today
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-navy-700/50 hover:bg-navy-700/70 rounded-lg transition-colors"
                      >
                        Week
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-navy-700/50 hover:bg-navy-700/70 rounded-lg transition-colors"
                      >
                        Month
                      </motion.button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { label: "Appointments", value: "12", change: "+2" },
                      { label: "Patients Seen", value: "8", change: "+3" },
                      { label: "Pending Reports", value: "4", change: "-1" },
                    ].map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10"
                      >
                        <p className="text-white/60 text-sm">{stat.label}</p>
                        <div className="flex items-end justify-between mt-2">
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className={`text-xs ${stat.change.startsWith("+") ? "text-teal-400" : "text-red-400"}`}>
                            {stat.change} today
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <DiagnosticInsights />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <PatientList />
              </div>
            </div>
          )}

          {activeSection === "Patients" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
            >
              <h2 className="text-xl font-bold mb-6">Patient Management</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 h-40 flex flex-col items-center justify-center">
                  <Users size={32} className="text-teal-400 mb-2" />
                  <p className="font-medium">All Patients</p>
                  <p className="text-sm text-white/60">View and manage all patients</p>
                </div>
                <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 h-40 flex flex-col items-center justify-center">
                  <Users size={32} className="text-teal-400 mb-2" />
                  <p className="font-medium">New Patients</p>
                  <p className="text-sm text-white/60">Register new patients</p>
                </div>
                <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 h-40 flex flex-col items-center justify-center">
                  <Users size={32} className="text-teal-400 mb-2" />
                  <p className="font-medium">Patient Analytics</p>
                  <p className="text-sm text-white/60">View patient statistics</p>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "Appointments" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
            >
              <h2 className="text-xl font-bold mb-6">Appointment Calendar</h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center font-medium text-white/70">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const day = i - 2 // Offset to start from previous month
                  const isCurrentMonth = day > 0 && day <= 30
                  const hasAppointment = isCurrentMonth && [3, 8, 12, 15, 22, 27].includes(day)

                  return (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className={`aspect-square rounded-lg flex flex-col items-center justify-center ${
                        isCurrentMonth
                          ? hasAppointment
                            ? "bg-teal-500/20 border border-teal-500/40"
                            : "bg-navy-700/50 border border-teal-500/10"
                          : "bg-navy-800/30 text-white/30"
                      }`}
                    >
                      <span>{isCurrentMonth ? day : day <= 0 ? 30 + day : day - 30}</span>
                      {hasAppointment && <div className="w-1.5 h-1.5 bg-teal-400 rounded-full mt-1"></div>}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}

          {activeSection === "Records" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
            >
              <h2 className="text-xl font-bold mb-6">Medical Records</h2>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 8px rgba(0, 168, 150, 0.3)" }}
                    className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">Medical Record #{1000 + i}</p>
                      <p className="text-sm text-white/60">
                        Patient:{" "}
                        {["Emma Thompson", "James Wilson", "Sophia Garcia", "Michael Chen", "Olivia Johnson"][i - 1]}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 text-xs bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                    >
                      View
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "Messages" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
            >
              <h2 className="text-xl font-bold mb-6">Messages</h2>
              <div className="space-y-4">
                {[
                  {
                    sender: "Dr. Johnson",
                    message: "Can you review the lab results for patient #4392?",
                    time: "10:30 AM",
                    unread: true,
                  },
                  {
                    sender: "Nurse Williams",
                    message: "Patient in Room 302 needs assistance",
                    time: "09:45 AM",
                    unread: true,
                  },
                  { sender: "Dr. Martinez", message: "Meeting rescheduled to 3 PM", time: "Yesterday", unread: false },
                  { sender: "Admin", message: "New protocol documents available", time: "Yesterday", unread: false },
                  { sender: "Dr. Thompson", message: "Thanks for the consultation", time: "2 days ago", unread: false },
                ].map((message, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01, boxShadow: "0 0 8px rgba(0, 168, 150, 0.3)" }}
                    className={`${message.unread ? "bg-teal-500/10" : "bg-navy-700/50"} rounded-xl p-4 border border-teal-500/10 relative`}
                  >
                    {message.unread && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-400" />}
                    <p className="font-medium">{message.sender}</p>
                    <p className="text-sm text-white/70 mt-1">{message.message}</p>
                    <p className="text-xs text-white/50 mt-2">{message.time}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === "Settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
            >
              <h2 className="text-xl font-bold mb-6">Settings</h2>
              <div className="space-y-6">
                <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10">
                  <h3 className="font-medium mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-white/70">Profile Information</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                      >
                        Edit
                      </motion.button>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-white/70">Change Password</p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 text-xs bg-teal-500/20 hover:bg-teal-500/30 rounded-lg transition-colors"
                      >
                        Update
                      </motion.button>
                    </div>
                  </div>
                </div>

                <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10">
                  <h3 className="font-medium mb-4">System Settings</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-white/70">Notifications</p>
                      <div className="w-12 h-6 bg-teal-500 rounded-full flex items-center p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-white/70">Dark Mode</p>
                      <div className="w-12 h-6 bg-teal-500 rounded-full flex items-center p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-white/70">AI Suggestions</p>
                      <div className="w-12 h-6 bg-teal-500 rounded-full flex items-center p-1">
                        <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Notification Panel */}
      <AnimatePresence>
        {notificationsOpen && <NotificationPanel onClose={() => setNotificationsOpen(false)} />}
      </AnimatePresence>
    </div>
  )
}
