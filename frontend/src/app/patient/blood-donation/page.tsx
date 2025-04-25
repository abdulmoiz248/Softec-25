"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Droplet, Users } from 'lucide-react'
import RequestBlood from "@/components/patient/blood-donation/request-blood"
import DonateBlood from "@/components/patient/blood-donation/donate-blood"
import BloodGroupStats from "@/components/patient/blood-donation/blood-group-stats"

export default function BloodDonationPage() {
  const [activeTab, setActiveTab] = useState<"request" | "donate">("request")

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
          <Droplet className="w-8 h-8 mr-3 text-red-400" />
          <div>
            <h1 className="text-3xl font-bold text-white md:text-4xl">Blood Donation</h1>
            <p className="mt-1 text-blue-100">Request or donate blood to save lives</p>
          </div>
        </motion.div>

        {/* Blood Group Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <BloodGroupStats />
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("request")}
              className={`flex-1 py-3 px-4 rounded-t-xl font-medium text-lg transition-all duration-300 ${
                activeTab === "request"
                  ? "bg-gradient-to-r from-red-900/80 to-red-800/80 text-white border-t border-l border-r border-red-700/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <div className="flex items-center justify-center">
                <Droplet className="w-5 h-5 mr-2" />
                Request Blood
              </div>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab("donate")}
              className={`flex-1 py-3 px-4 rounded-t-xl font-medium text-lg transition-all duration-300 ${
                activeTab === "donate"
                  ? "bg-gradient-to-r from-red-900/80 to-red-800/80 text-white border-t border-l border-r border-red-700/30"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              <div className="flex items-center justify-center">
                <Users className="w-5 h-5 mr-2" />
                Donate Blood
              </div>
            </motion.button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-[500px]"
        >
          {activeTab === "request" ? <RequestBlood /> : <DonateBlood />}
        </motion.div>
      </div>
    </div>
  )
}
