"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, Video, MapPin, MoreVertical, User, Phone } from "lucide-react"
import { useState } from "react"

// Mock appointments data
const appointments = [
  {
    id: 1,
    doctor: "Dr. Michael Chen",
    specialty: "Allergist",
    date: "2023-05-22",
    time: "10:30 AM",
    isVirtual: true,
    location: "Virtual Consultation",
    phone: "+1 (555) 123-4567",
    email: "dr.chen@hygieia.com",
    status: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Cardiologist",
    date: "2023-06-05",
    time: "2:15 PM",
    isVirtual: false,
    location: "City Hospital, Room 305",
    phone: "+1 (555) 987-6543",
    email: "dr.rodriguez@hygieia.com",
    status: "confirmed",
  },
  {
    id: 3,
    doctor: "Dr. James Wilson",
    specialty: "Dermatologist",
    date: "2023-06-12",
    time: "9:00 AM",
    isVirtual: true,
    location: "Virtual Consultation",
    phone: "+1 (555) 456-7890",
    email: "dr.wilson@hygieia.com",
    status: "pending",
  },
]

export default function AppointmentsList() {
  const [expandedAppointment, setExpandedAppointment] = useState<number | null>(null)

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  const toggleExpand = (id: number) => {
    setExpandedAppointment(expandedAppointment === id ? null : id)
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-blue-700/30 overflow-hidden">
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] right-[-30%] w-[100%] h-[100%] bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Upcoming Appointments</h2>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              layout
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-3 ${
                        appointment.status === "confirmed" ? "bg-green-400" : "bg-yellow-400"
                      }`}
                    ></div>
                    <h3 className="font-semibold text-white">{appointment.doctor}</h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleExpand(appointment.id)}
                    className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="mt-2 text-sm text-blue-200">{appointment.specialty}</div>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <div className="flex items-center text-blue-100">
                    <Calendar className="w-4 h-4 mr-1 text-blue-300" />
                    <span>{formatDate(appointment.date)}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    <Clock className="w-4 h-4 mr-1 text-blue-300" />
                    <span>{appointment.time}</span>
                  </div>
                  <div className="flex items-center text-blue-100">
                    {appointment.isVirtual ? (
                      <>
                        <Video className="w-4 h-4 mr-1 text-blue-300" />
                        <span>Virtual</span>
                      </>
                    ) : (
                      <>
                        <MapPin className="w-4 h-4 mr-1 text-blue-300" />
                        <span>In-Person</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {expandedAppointment === appointment.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-blue-100">
                        <MapPin className="w-4 h-4 mr-2 text-blue-300" />
                        <span>{appointment.location}</span>
                      </div>
                      <div className="flex items-center text-blue-100">
                        <Phone className="w-4 h-4 mr-2 text-blue-300" />
                        <span>{appointment.phone}</span>
                      </div>
                      <div className="flex items-center text-blue-100">
                        <User className="w-4 h-4 mr-2 text-blue-300" />
                        <span>{appointment.email}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 py-2 text-sm font-medium text-white bg-blue-500/20 hover:bg-blue-500/30 rounded-xl backdrop-blur-sm border border-blue-500/30 transition-colors"
                      >
                        Reschedule
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="flex-1 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 rounded-xl backdrop-blur-sm border border-red-500/30 transition-colors"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
