"use client"

import { motion } from "framer-motion"
import { Droplet, Users, MapPin, ArrowRight } from "lucide-react"

// Mock blood donation data
const bloodTypes = [
  { type: "A+", available: 12, needed: false },
  { type: "A-", available: 5, needed: true },
  { type: "B+", available: 8, needed: false },
  { type: "B-", available: 3, needed: true },
  { type: "AB+", available: 7, needed: false },
  { type: "AB-", available: 2, needed: true },
  { type: "O+", available: 15, needed: false },
  { type: "O-", available: 4, needed: true },
]

export default function BloodDonationCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative overflow-hidden bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-700/30"
    >
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Droplet className="w-5 h-5 mr-2 text-red-400" />
            <h2 className="text-xl font-bold text-white">Blood Donation</h2>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-red-300" />
            <span className="text-xs font-medium text-red-200">25 Donors Nearby</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center mb-6 p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
          <MapPin className="w-4 h-4 mr-2 text-red-300" />
          <span className="text-sm text-white">City Hospital Blood Bank, 2.5 miles away</span>
        </div>

        {/* Blood types grid */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          {bloodTypes.map((blood) => (
            <motion.div
              key={blood.type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-3 rounded-xl backdrop-blur-sm cursor-pointer ${
                blood.needed ? "bg-red-500/30 border border-red-500/50" : "bg-white/10 border border-white/10"
              }`}
            >
              <span className="text-lg font-bold text-white">{blood.type}</span>
              <div className="flex items-center mt-1">
                <span className="text-xs text-red-200">{blood.available} units</span>
                {blood.needed && (
                  <motion.span
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      repeat: Number.POSITIVE_INFINITY,
                      duration: 2,
                    }}
                    className="ml-1 px-1 text-[10px] bg-red-500/50 rounded text-white"
                  >
                    NEEDED
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex space-x-3 mb-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 text-sm font-medium text-white bg-red-500/20 hover:bg-red-500/30 rounded-xl backdrop-blur-sm border border-red-500/30 transition-colors"
          >
            Donate Blood
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-2 text-sm font-medium text-white bg-white/10 hover:bg-white/20 rounded-xl backdrop-blur-sm border border-white/10 transition-colors"
          >
            Request Blood
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm font-medium text-red-300 transition-colors hover:text-red-100"
        >
          View donation centers
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
