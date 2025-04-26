"use client"

import { motion } from "framer-motion"
import FitnessCard from "@/components/patient/dashboard/fitness-card"
import DailyMedication from "@/components/patient/dashboard/daily-medication"
import Folder from "@/components/patient/dashboard/folder"
import EPharmacyCard from "@/components/patient/dashboard/cards/e-pharmacy-card"
import BloodDonationCard from "@/components/patient/dashboard/cards/blood-donation-card"
import MedicalRecordsMock from "@/components/patient/dashboard/mock-data/medical-records"
import AppointmentsMock from "@/components/patient/dashboard/mock-data/appointments"
import TopBar from "@/components/patient/dashboard/top-bar/top-bar"
import MobileNav from "@/components/patient/dashboard/top-bar/mobile-nav"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#09203F] to-[#537895]">
      <TopBar />
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 pt-4"
        >
          <h1 className="text-3xl font-bold text-white md:text-4xl">Welcome back, Sarah</h1>
          <p className="mt-2 text-blue-100">Here's your health dashboard for today</p>
        </motion.div>

        {/* Fitness and Medication Cards */}
        <div className="grid grid-cols-1 gap-6 mb-20 md:grid-cols-2">
          <FitnessCard />
          <DailyMedication />
        </div>

        {/* Folders Row */}
        <div className="py-24">
          <div className="flex flex-col md:flex-row justify-center md:gap-40">
            <Folder
              color="#3b82f6"
              size={1.5}
              label="Medical Records"
              className="mb-32 md:mb-0"
              mockContent={<MedicalRecordsMock />}
              viewAllLabel="View all medical records"
            />
            <Folder
              color="#10b981"
              size={1.5}
              label="Appointments"
              mockContent={<AppointmentsMock />}
              viewAllLabel="View all appointments"
            />
          </div>
        </div>

        {/* E-Pharmacy and Blood Donation Cards */}
        <div className="grid grid-cols-1 gap-6 mb-8 mt-20 md:grid-cols-2">
          <EPharmacyCard />
          <BloodDonationCard />
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  )
}
