"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import AppointmentsList from "@/components/patient/appointments/appointments-list"
import CategorySelector from "@/components/patient/appointments/category-selector"
import DoctorsList from "@/components/patient/appointments/doctors-list"
import BookingModal from "@/components/patient/appointments/booking-modal"
import AppointmentReminder from "@/components/patient/appointments/appointment-reminder"
import { Calendar } from "lucide-react"

export default function AppointmentPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setSelectedDoctor(null)
  }

  const handleDoctorSelect = (doctor: any) => {
    setSelectedDoctor(doctor)
  }

  const handleBookingClick = () => {
    setIsBookingModalOpen(true)
  }

  const handleBookingClose = () => {
    setIsBookingModalOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09203F] to-[#537895]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 pt-4 flex items-center"
        >
          <Calendar className="w-8 h-8 mr-3 text-green-400" />
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Appointments</h1>
            <p className="mt-1 text-blue-100">Manage and schedule your medical appointments</p>
          </div>
        </motion.div>

        {/* Appointment Reminder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <AppointmentReminder />
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <AppointmentsList />
        </motion.div>

        {/* Book New Appointment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-green-900/80 to-green-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-green-700/30 overflow-hidden">
            {/* Ambient light effect */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-green-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Book New Appointment</h2>

              {/* Step 1: Select Category */}
              <CategorySelector onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />

              {/* Step 2: Select Doctor (only shown if category is selected) */}
              {selectedCategory && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                  className="mt-6"
                >
                  <DoctorsList
                    category={selectedCategory}
                    onSelectDoctor={handleDoctorSelect}
                    selectedDoctor={selectedDoctor}
                  />
                </motion.div>
              )}

              {/* Book Appointment Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`py-3 px-6 text-white font-medium rounded-xl backdrop-blur-sm transition-all duration-300 ${
                    selectedDoctor
                      ? "bg-green-500/50 hover:bg-green-500/70 border border-green-500/50 shadow-lg shadow-green-500/20"
                      : "bg-gray-500/30 cursor-not-allowed border border-gray-500/30"
                  }`}
                  onClick={handleBookingClick}
                  disabled={!selectedDoctor}
                >
                  Book Appointment
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Booking Modal */}
        {isBookingModalOpen && (
          <BookingModal doctor={selectedDoctor} isOpen={isBookingModalOpen} onClose={handleBookingClose} />
        )}
      </div>
    </div>
  )
}
