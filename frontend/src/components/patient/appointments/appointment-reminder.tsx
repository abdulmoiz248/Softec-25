"use client"

import { motion } from "framer-motion"
import { Bell, Calendar, Clock, MapPin, Video } from "lucide-react"

// Get the next upcoming appointment
const getNextAppointment = () => {
  // This would normally come from your API or state management
  return {
    id: 1,
    doctor: "Dr. Michael Chen",
    specialty: "Allergist",
    date: "2023-05-22",
    time: "10:30 AM",
    isVirtual: true,
    daysUntil: 3,
    hoursUntil: 72,
  }
}

export default function AppointmentReminder() {
  const nextAppointment = getNextAppointment()

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-amber-900/80 to-amber-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-amber-700/30"
    >
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-amber-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-red-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Bell className="w-5 h-5 mr-2 text-amber-400" />
            <h2 className="text-xl font-bold text-white">Appointment Reminder</h2>
          </div>
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
            }}
            className="px-3 py-1 text-xs font-medium text-amber-200 bg-amber-500/20 rounded-full"
          >
            In {nextAppointment.daysUntil} days
          </motion.div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 p-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h3 className="font-semibold text-white text-lg">{nextAppointment.doctor}</h3>
              <p className="text-amber-200 mt-1">{nextAppointment.specialty}</p>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                <div className="flex items-center text-amber-100">
                  <Calendar className="w-4 h-4 mr-1 text-amber-300" />
                  <span>{formatDate(nextAppointment.date)}</span>
                </div>
                <div className="flex items-center text-amber-100">
                  <Clock className="w-4 h-4 mr-1 text-amber-300" />
                  <span>{nextAppointment.time}</span>
                </div>
                <div className="flex items-center text-amber-100">
                  {nextAppointment.isVirtual ? (
                    <>
                      <Video className="w-4 h-4 mr-1 text-amber-300" />
                      <span>Virtual Appointment</span>
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 mr-1 text-amber-300" />
                      <span>In-Person Appointment</span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-2 px-4 text-sm font-medium text-white bg-amber-500/20 hover:bg-amber-500/30 rounded-xl backdrop-blur-sm border border-amber-500/30 transition-colors"
              >
                Set Reminder
              </motion.button>
              {nextAppointment.isVirtual && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-4 text-sm font-medium text-white bg-green-500/20 hover:bg-green-500/30 rounded-xl backdrop-blur-sm border border-green-500/30 transition-colors"
                >
                  Join Virtual
                </motion.button>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-full bg-amber-900/50 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${100 - (nextAppointment.hoursUntil / 168) * 100}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-amber-400 to-red-400"
              />
            </div>
          </div>
          <span className="ml-4 text-xs text-amber-200">{nextAppointment.hoursUntil} hours left</span>
        </div>
      </div>
    </motion.div>
  )
}
