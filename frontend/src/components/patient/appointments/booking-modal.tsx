"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { X, Calendar, Clock, Check, AlertCircle } from "lucide-react"

interface BookingModalProps {
  doctor: any
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ doctor, isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1)
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingStatus, setBookingStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  // Get the next 14 days for booking
  const getNextTwoWeeks = () => {
    const days = []
    const today = new Date()

    for (let i = 0; i < 14; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" })
      const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

      days.push({
        date: date.toISOString().split("T")[0],
        display: `${dayName}, ${monthDay}`,
        isAvailable: Math.random() > 0.3, // Randomly mark some days as unavailable
      })
    }

    return days
  }

  // Generate time slots
  const getTimeSlots = () => {
    const slots = []
    const startHour = 8 // 8 AM
    const endHour = 17 // 5 PM

    for (let hour = startHour; hour <= endHour; hour++) {
      const hourStr = hour > 12 ? hour - 12 : hour
      const amPm = hour >= 12 ? "PM" : "AM"

      slots.push({
        time: `${hourStr}:00 ${amPm}`,
        isAvailable: Math.random() > 0.4, // Randomly mark some slots as unavailable
      })

      if (hour < endHour) {
        slots.push({
          time: `${hourStr}:30 ${amPm}`,
          isAvailable: Math.random() > 0.4, // Randomly mark some slots as unavailable
        })
      }
    }

    return slots
  }

  const days = getNextTwoWeeks()
  const timeSlots = getTimeSlots()

  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
    setStep(2)
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleBookAppointment = () => {
    setBookingStatus("loading")

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo
      setBookingStatus(success ? "success" : "error")
    }, 1500)
  }

  const handleClose = () => {
    onClose()
    // Reset state after animation completes
    setTimeout(() => {
      setStep(1)
      setSelectedDay("")
      setSelectedTime("")
      setBookingStatus("idle")
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-green-900/90 to-green-800/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-green-700/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient light effect */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-green-400/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Book Appointment</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Doctor info */}
              <div className="flex items-center mb-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white/20 mr-4">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-white">{doctor.name}</h3>
                  <p className="text-green-200">
                    {doctor.specialty} • {doctor.hospital}
                  </p>
                </div>
              </div>

              {/* Booking steps */}
              <div className="mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 1 ? "bg-green-500 text-white" : "bg-white/20 text-white/50"
                      }`}
                    >
                      {step > 1 ? <Check className="w-5 h-5" /> : "1"}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 1 ? "text-white" : "text-white/50"}`}>
                      Select Day
                    </span>
                  </div>

                  <div className="w-16 h-1 bg-white/20 mx-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step >= 2 ? "100%" : "0%" }}
                      className="h-full bg-green-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 2 ? "bg-green-500 text-white" : "bg-white/20 text-white/50"
                      }`}
                    >
                      {step > 2 ? <Check className="w-5 h-5" /> : "2"}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 2 ? "text-white" : "text-white/50"}`}>
                      Select Time
                    </span>
                  </div>

                  <div className="w-16 h-1 bg-white/20 mx-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: step >= 3 ? "100%" : "0%" }}
                      className="h-full bg-green-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full ${
                        step >= 3 ? "bg-green-500 text-white" : "bg-white/20 text-white/50"
                      }`}
                    >
                      {step > 3 ? <Check className="w-5 h-5" /> : "3"}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${step >= 3 ? "text-white" : "text-white/50"}`}>
                      Confirm
                    </span>
                  </div>
                </div>
              </div>

              {/* Step content */}
              <div className="min-h-[300px]">
                {/* Step 1: Select Day */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center mb-4">
                      <Calendar className="w-5 h-5 mr-2 text-green-300" />
                      <h3 className="text-lg font-medium text-white">Select Day</h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {days.map((day) => (
                        <motion.button
                          key={day.date}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => day.isAvailable && handleDaySelect(day.date)}
                          disabled={!day.isAvailable}
                          className={`p-3 text-left rounded-xl border ${
                            day.isAvailable
                              ? "bg-white/10 border-white/10 hover:bg-white/20 cursor-pointer"
                              : "bg-white/5 border-white/5 cursor-not-allowed opacity-50"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white font-medium">{day.display}</span>
                            {!day.isAvailable && (
                              <span className="text-xs bg-red-500/20 text-red-300 px-2 py-1 rounded">Unavailable</span>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Time */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-green-300" />
                        <h3 className="text-lg font-medium text-white">Select Time</h3>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(1)}
                        className="text-sm text-green-300 hover:text-green-100"
                      >
                        Change Date
                      </motion.button>
                    </div>

                    <div className="p-3 bg-white/10 rounded-xl border border-white/10 mb-4">
                      <span className="text-green-200">Selected Date:</span>
                      <span className="ml-2 text-white font-medium">
                        {new Date(selectedDay).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {timeSlots.map((slot, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => slot.isAvailable && handleTimeSelect(slot.time)}
                          disabled={!slot.isAvailable}
                          className={`p-3 text-center rounded-xl border transition-all ${
                            !slot.isAvailable
                              ? "bg-white/5 border-white/5 cursor-not-allowed opacity-50"
                              : selectedTime === slot.time
                                ? "bg-green-500/30 border-green-500/50 text-white"
                                : "bg-white/10 border-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          {slot.time}
                        </motion.button>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => selectedTime && setStep(3)}
                        disabled={!selectedTime}
                        className={`py-3 px-6 rounded-xl font-medium transition-all ${
                          selectedTime
                            ? "bg-green-500/50 hover:bg-green-500/70 text-white border border-green-500/50"
                            : "bg-white/10 text-white/50 cursor-not-allowed border border-white/10"
                        }`}
                      >
                        Continue
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Confirm Booking */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center mb-4">
                      <Check className="w-5 h-5 mr-2 text-green-300" />
                      <h3 className="text-lg font-medium text-white">Confirm Appointment</h3>
                    </div>

                    <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                      <h4 className="font-medium text-white mb-3">Appointment Details</h4>

                      <div className="space-y-3">
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-green-200">Doctor:</span>
                          <span className="text-white">{doctor.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-green-200">Specialty:</span>
                          <span className="text-white">{doctor.specialty}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-green-200">Location:</span>
                          <span className="text-white">{doctor.hospital}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-green-200">Date:</span>
                          <span className="text-white">
                            {new Date(selectedDay).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="w-24 text-sm text-green-200">Time:</span>
                          <span className="text-white">{selectedTime}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30">
                      <div className="flex items-start">
                        <AlertCircle className="w-5 h-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-white mb-1">Important Information</h4>
                          <p className="text-sm text-amber-200">
                            Please arrive 15 minutes before your appointment time. Bring your insurance card and any
                            relevant medical records.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setStep(2)}
                        className="py-3 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
                      >
                        Back
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleBookAppointment}
                        disabled={bookingStatus === "loading"}
                        className={`py-3 px-6 rounded-xl font-medium transition-all ${
                          bookingStatus === "loading"
                            ? "bg-green-500/30 cursor-wait"
                            : "bg-green-500/50 hover:bg-green-500/70"
                        } text-white border border-green-500/50`}
                      >
                        {bookingStatus === "loading" ? (
                          <span className="flex items-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                              className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                            />
                            Processing...
                          </span>
                        ) : (
                          "Confirm Booking"
                        )}
                      </motion.button>
                    </div>
                  </motion.div>
                )}

                {/* Success/Error Message */}
                {bookingStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-900/95 to-green-800/95 backdrop-blur-xl p-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <Check className="w-10 h-10 text-green-400" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">Appointment Booked!</h3>
                    <p className="text-green-200 text-center mb-6">
                      Your appointment has been successfully scheduled. A confirmation email has been sent to your
                      registered email address.
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleClose}
                      className="py-3 px-6 rounded-xl font-medium bg-green-500/50 hover:bg-green-500/70 text-white border border-green-500/50 transition-all"
                    >
                      Done
                    </motion.button>
                  </motion.div>
                )}

                {bookingStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-900/95 to-red-800/95 backdrop-blur-xl p-6"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", damping: 10, stiffness: 100 }}
                      className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
                    >
                      <X className="w-10 h-10 text-red-400" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">Booking Failed</h3>
                    <p className="text-red-200 text-center mb-6">
                      We couldn't complete your booking at this time. Please try again or contact support for
                      assistance.
                    </p>

                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setBookingStatus("idle")}
                        className="py-3 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
                      >
                        Try Again
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClose}
                        className="py-3 px-6 rounded-xl font-medium bg-red-500/30 hover:bg-red-500/50 text-white border border-red-500/30 transition-all"
                      >
                        Close
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
