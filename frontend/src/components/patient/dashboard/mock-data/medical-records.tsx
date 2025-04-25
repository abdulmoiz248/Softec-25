"use client"

import { motion } from "framer-motion"
import { FileText, Calendar, User, Download } from "lucide-react"

// Mock medical records data
const medicalRecords = [
  {
    id: 1,
    title: "Annual Physical Examination",
    doctor: "Dr. Michael Chen",
    date: "2023-04-15",
    type: "Examination",
  },
  {
    id: 2,
    title: "Blood Test Results",
    doctor: "Dr. Sarah Williams",
    date: "2023-03-22",
    type: "Lab Results",
  },
  {
    id: 3,
    title: "Allergy Test Report",
    doctor: "Dr. Michael Chen",
    date: "2023-02-10",
    type: "Lab Results",
  },
]

export default function MedicalRecordsMock() {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-3">Recent Records</h3>

      {medicalRecords.map((record) => (
        <motion.div
          key={record.id}
          whileHover={{ scale: 1.02, x: 5 }}
          className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 cursor-pointer"
        >
          <div className="flex items-center justify-center w-10 h-10 mr-3 bg-blue-500/20 rounded-lg text-blue-300">
            <FileText className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="font-medium text-white">{record.title}</h4>
            <div className="flex flex-wrap items-center gap-x-3 mt-1">
              <div className="flex items-center">
                <User className="w-3 h-3 mr-1 text-blue-300" />
                <span className="text-xs text-blue-200">{record.doctor}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1 text-blue-300" />
                <span className="text-xs text-blue-200">{formatDate(record.date)}</span>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-blue-300 hover:text-white hover:bg-blue-500/20 rounded-full"
          >
            <Download className="w-4 h-4" />
          </motion.button>
        </motion.div>
      ))}
    </div>
  )
}
