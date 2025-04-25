"use client"

import { motion } from "framer-motion"
import { MoreHorizontal } from "lucide-react"

const patients = [
  {
    id: 1,
    name: "Emma Thompson",
    age: 42,
    image: "/doctor.png",
    symptoms: ["Migraine", "Dizziness"],
    time: "09:30 AM",
    status: "Checked In",
  },
  {
    id: 2,
    name: "James Wilson",
    age: 65,
    image: "/doctor.png",
    symptoms: ["Chest Pain", "Fatigue"],
    time: "10:15 AM",
    status: "Waiting",
  },
  {
    id: 3,
    name: "Sophia Garcia",
    age: 28,
    image: "/doctor.png",
    symptoms: ["Fever", "Cough"],
    time: "11:00 AM",
    status: "Scheduled",
  },
  {
    id: 4,
    name: "Michael Chen",
    age: 51,
    image: "/doctor.png",
    symptoms: ["Back Pain"],
    time: "01:30 PM",
    status: "Scheduled",
  },
  {
    id: 5,
    name: "Olivia Johnson",
    age: 34,
    image: "/doctor.png",
    symptoms: ["Anxiety", "Insomnia"],
    time: "02:45 PM",
    status: "Scheduled",
  },
]

export default function PatientList() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20 h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Today's Patients</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs bg-teal-500 hover:bg-teal-600 text-navy-900 font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          View All
        </motion.button>
      </div>

      <motion.div className="space-y-4" variants={container} initial="hidden" animate="show">
        {patients.map((patient) => (
          <motion.div
            key={patient.id}
            variants={item}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 12px rgba(0, 168, 150, 0.3)",
            }}
            className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 cursor-pointer transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img
                    src={patient.image || "/placeholder.svg"}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-500/30"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-navy-700 
                    ${
                      patient.status === "Checked In"
                        ? "bg-teal-500"
                        : patient.status === "Waiting"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                    }`}
                  />
                </div>
                <div>
                  <p className="font-medium">{patient.name}</p>
                  <p className="text-xs text-white/60">
                    {patient.age} years • {patient.time}
                  </p>
                </div>
              </div>
              <button className="text-white/60 hover:text-teal-400 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {patient.symptoms.map((symptom) => (
                <span key={symptom} className="text-xs bg-teal-500/20 text-teal-300 px-2 py-1 rounded-md">
                  {symptom}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
