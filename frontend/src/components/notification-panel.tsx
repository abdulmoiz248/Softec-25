"use client"

import { motion } from "framer-motion"
import { Bell, Check, X } from "lucide-react"

const notifications = [
  {
    id: 1,
    title: "New Test Results",
    message: "Emma Thompson's blood work results are ready for review.",
    time: "10 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Appointment Request",
    message: "Dr. Johnson requested a consultation for patient #4392.",
    time: "25 mins ago",
    unread: true,
  },
  {
    id: 3,
    title: "System Update",
    message: "HYGIEIA AI diagnostic module has been updated to v2.4.1.",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 4,
    title: "Meeting Reminder",
    message: "Weekly staff meeting in 30 minutes in Conference Room A.",
    time: "2 hours ago",
    unread: false,
  },
  {
    id: 5,
    title: "Patient Note",
    message: "James Wilson reported increased discomfort after medication change.",
    time: "3 hours ago",
    unread: false,
  },
]

export default function NotificationPanel({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 w-full sm:w-96 h-full bg-navy-800/95 backdrop-blur-md border-l border-teal-500/20 z-50 overflow-hidden"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex items-center justify-between border-b border-teal-500/20">
          <div className="flex items-center space-x-2">
            <Bell size={18} className="text-teal-400" />
            <h2 className="text-lg font-bold">Notifications</h2>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="text-white/80 hover:text-teal-400 transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <motion.div
            className="space-y-4"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { type: "spring", stiffness: 300, damping: 24 },
                  },
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 0 12px rgba(0, 168, 150, 0.2)",
                }}
                className={`${
                  notification.unread ? "bg-teal-500/10" : "bg-navy-700/50"
                } rounded-xl p-4 border border-teal-500/10 relative overflow  : 'bg-navy-700/50'
                } rounded-xl p-4 border border-teal-500/10 relative overflow-hidden`}
              >
                {notification.unread && <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-teal-400" />}
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-white/70 mt-1">{notification.message}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-white/50">{notification.time}</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-white/60 hover:text-teal-400 transition-colors"
                  >
                    <Check size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="p-4 border-t border-teal-500/20">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2 bg-teal-500 hover:bg-teal-600 text-navy-900 font-medium rounded-lg transition-colors"
          >
            Mark All as Read
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
