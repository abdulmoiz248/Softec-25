"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Phone, Mail, Calendar, User, Heart, ExternalLink } from "lucide-react"

interface DonorDetailsModalProps {
  donor: any
  onClose: () => void
}

export default function DonorDetailsModal({ donor, onClose }: DonorDetailsModalProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl bg-gradient-to-br from-red-900/90 to-red-800/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-red-700/30 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient light effect */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-red-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-pink-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Donor Details</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Donor Profile */}
            <div className="flex items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 mr-6">
                <img
                  src={donor.profileImage || "/placeholder.svg"}
                  alt={donor.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-center">
                  <h3 className="text-2xl font-bold text-white">{donor.name}</h3>
                  <div className="ml-3 px-3 py-1 bg-red-500/20 rounded-full">
                    <span className="text-sm font-medium text-red-300">{donor.bloodGroup}</span>
                  </div>
                </div>
                <p className="text-red-200 mt-1">
                  {donor.gender}, {donor.age} years old
                </p>
                <div className="flex items-center mt-2">
                  <Heart className="w-4 h-4 text-red-400 mr-1" />
                  <span className="text-red-200">{donor.donationCount} donations made</span>
                </div>
              </div>
            </div>

            {/* Donor Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Contact Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-red-300" />
                    <div>
                      <p className="text-white">
                        {donor.location}, {donor.city}
                      </p>
                      <p className="text-sm text-red-200">{donor.distance} miles away</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-red-300" />
                    <p className="text-white">{donor.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 mr-3 text-red-300" />
                    <p className="text-white">{donor.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Donation Information</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-3 text-red-300" />
                    <div>
                      <p className="text-white">Last Donated</p>
                      <p className="text-sm text-red-200">{formatDate(donor.lastDonated)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3 text-red-300" />
                    <div>
                      <p className="text-white">Medical Information</p>
                      <p className="text-sm text-red-200">{donor.medicalInfo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 bg-red-500/30 hover:bg-red-500/50 text-white rounded-xl font-medium border border-red-500/50 transition-all flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Donor
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium border border-white/10 transition-all flex items-center justify-center"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 px-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium border border-white/10 transition-all flex items-center justify-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Profile
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
