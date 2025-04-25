"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Pill, Check, Clock, AlertCircle, ArrowRight } from "lucide-react"

// Mock medication data
const medicationData = [
  {
    id: 1,
    name: "Loratadine",
    dosage: "10mg",
    time: "08:00 AM",
    instructions: "Take with water",
    taken: true,
    important: false,
  },
  {
    id: 2,
    name: "Fluticasone Nasal Spray",
    dosage: "50mcg",
    time: "08:00 AM",
    instructions: "Two sprays in each nostril",
    taken: true,
    important: false,
  },
  {
    id: 3,
    name: "Montelukast",
    dosage: "10mg",
    time: "10:00 PM",
    instructions: "Take before bedtime",
    taken: false,
    important: true,
  },
  {
    id: 4,
    name: "Vitamin D3",
    dosage: "1000 IU",
    time: "12:00 PM",
    instructions: "Take with food",
    taken: false,
    important: false,
  },
]

export default function DailyMedication() {
  const [medications, setMedications] = useState(medicationData)

  // Calculate medication progress
  const takenCount = medications.filter((med) => med.taken).length
  const totalMeds = medications.length
  const progressPercentage = (takenCount / totalMeds) * 100

  const handleToggleTaken = (id: number) => {
    setMedications((meds) => meds.map((med) => (med.id === id ? { ...med, taken: !med.taken } : med)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden bg-gradient-to-br from-green-900/80 to-green-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-green-700/30"
    >
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-green-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Pill className="w-5 h-5 mr-2 text-green-400" />
            <h2 className="text-xl font-bold text-white">Daily Medication</h2>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            className="px-3 py-1 text-xs font-medium text-green-200 bg-green-500/20 rounded-full"
          >
            {takenCount}/{totalMeds} Taken
          </motion.div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 mb-6 overflow-hidden bg-green-900/50 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-400"
          />
        </div>

        {/* Medication list */}
        <div className="space-y-3 mb-4">
          <AnimatePresence>
            {medications.map((med) => (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`flex items-center justify-between p-4 backdrop-blur-sm rounded-2xl border ${
                  med.taken ? "bg-green-500/10 border-green-500/30" : "bg-white/10 border-white/10"
                }`}
              >
                <div className="flex items-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleToggleTaken(med.id)}
                    className={`flex items-center justify-center w-6 h-6 mr-3 rounded-full ${
                      med.taken ? "bg-green-500 text-white" : "bg-white/20 text-transparent hover:bg-white/30"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </motion.button>

                  <div>
                    <div className="flex items-center">
                      <h3 className={`font-medium ${med.taken ? "text-green-300 line-through" : "text-white"}`}>
                        {med.name}
                      </h3>
                      {med.important && (
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            repeat: Number.POSITIVE_INFINITY,
                            duration: 2,
                          }}
                          className="ml-2"
                        >
                          <AlertCircle className="w-3 h-3 text-amber-400" />
                        </motion.div>
                      )}
                    </div>
                    <div className="flex items-center mt-1 space-x-3">
                      <span className="text-xs text-blue-200">{med.dosage}</span>
                      <span className="text-xs text-blue-200">{med.instructions}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center text-xs text-blue-200">
                  <Clock className="w-3 h-3 mr-1" />
                  {med.time}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm font-medium text-green-300 transition-colors hover:text-green-100"
        >
          View all medications
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
