"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Video, MapPin } from "lucide-react"

// Mock appointments data
const appointments = [
  {
    id: 1,
    doctor: "Dr. Michael Chen",
    specialty: "Allergist",
    date: "2023-05-22",
    time: "10:30 AM",
    isVirtual: true,
  },
  {
    id: 2,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Cardiologist",
    date: "2023-06-05",
    time: "2:15 PM",
    isVirtual: false,
  },
  {
    id: 3,
    doctor: "Dr. James Wilson",
    specialty: "Dermatologist",
    date: "2023-06-12",
    time: "9:00 AM",
    isVirtual: true,
  },
]

export default function AppointmentsMock() {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-3">Upcoming Appointments</h3>

      {appointments.map((appointment) => (
        <motion.div
          key={appointment.id}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 cursor-pointer"
        >
          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-green-500/20 rounded-lg text-green-300">
            <Calendar className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="font-medium text-white">{appointment.doctor}</h4>
            <p className="text-xs text-green-200">{appointment.specialty}</p>
            <div className="flex flex-wrap items-center gap-x-3 mt-1">
              <div className="flex items-center">
                <Clock className="w-3 h-3 mr-1 text-green-300" />
                <span className="text-xs text-green-200">
                  {formatDate(appointment.date)} at {appointment.time}
                </span>
              </div>
              <div className="flex items-center">
                {appointment.isVirtual ? (
                  <>
                    <Video className="w-3 h-3 mr-1 text-green-300" />
                    <span className="text-xs text-green-200">Virtual</span>
                  </>
                ) : (
                  <>
                    <MapPin className="w-3 h-3 mr-1 text-green-300" />
                    <span className="text-xs text-green-200">In-Person</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              appointment.isVirtual ? "bg-blue-500/20 text-blue-300" : "bg-purple-500/20 text-purple-300"
            }`}
          >
            {formatDate(appointment.date).split(",")[0]}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}
