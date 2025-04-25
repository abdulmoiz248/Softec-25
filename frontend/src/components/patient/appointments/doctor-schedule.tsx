"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface ScheduleDay {
  day: string
  slots: string[]
}

interface DoctorScheduleProps {
  schedule: ScheduleDay[]
}

export default function DoctorSchedule({ schedule }: DoctorScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(schedule[0]?.day || "")

  const handleDayClick = (day: string) => {
    setSelectedDay(day)
  }

  // Get slots for the selected day
  const selectedDaySlots = schedule.find((day) => day.day === selectedDay)?.slots || []

  return (
    <div>
      {/* Days tabs */}
      <div className="flex overflow-x-auto pb-2 mb-4 space-x-2">
        {schedule.map((day) => (
          <motion.button
            key={day.day}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleDayClick(day.day)}
            className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap ${
              selectedDay === day.day ? "bg-green-500/50 text-white" : "bg-white/10 text-green-200 hover:bg-white/20"
            }`}
          >
            {day.day}
          </motion.button>
        ))}
      </div>

      {/* Time slots grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {selectedDaySlots.map((slot) => (
          <motion.button
            key={slot}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 text-sm font-medium text-green-100 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10"
          >
            {slot}
          </motion.button>
        ))}
      </div>

      {selectedDaySlots.length === 0 && (
        <p className="text-center py-4 text-green-200">No available slots for this day.</p>
      )}

      <div className="mt-4 text-xs text-green-200 text-center">
        Click on a time slot to select it for your appointment
      </div>
    </div>
  )
}
