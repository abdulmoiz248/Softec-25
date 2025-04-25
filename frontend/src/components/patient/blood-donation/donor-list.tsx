"use client"

import { motion } from "framer-motion"
import { MapPin, Droplet, Calendar, Phone, Mail } from "lucide-react"

interface DonorListProps {
  donors: any[]
  onSelectDonor: (donor: any) => void
}

export default function DonorList({ donors, onSelectDonor }: DonorListProps) {
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
    <div>
      {donors.length > 0 ? (
        <div className="space-y-4">
          {donors.map((donor) => (
            <motion.div
              key={donor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onSelectDonor(donor)}
              className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-4 cursor-pointer"
            >
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 mr-4">
                  <img
                    src={donor.profileImage || "/placeholder.svg"}
                    alt={donor.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className="font-semibold text-white text-lg">{donor.name}</h3>
                    <div className="ml-3 px-2 py-1 bg-red-500/20 rounded-full">
                      <span className="text-xs font-medium text-red-300">{donor.bloodGroup}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <div className="flex items-center text-red-200 text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {donor.location}, {donor.city} ({donor.distance} miles)
                    </div>
                    <div className="flex items-center text-red-200 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Last donated: {formatDate(donor.lastDonated)}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                    <div className="flex items-center text-red-200 text-sm">
                      <Phone className="w-3 h-3 mr-1" />
                      {donor.phone}
                    </div>
                    <div className="flex items-center text-red-200 text-sm">
                      <Mail className="w-3 h-3 mr-1" />
                      {donor.email}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-1">
                    <Droplet className="w-6 h-6 text-red-400" />
                  </div>
                  <span className="text-xs text-red-200">{donor.donationCount} donations</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <Droplet className="w-12 h-12 text-red-400/50 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">No Donors Found</h3>
          <p className="text-red-200">
            No donors match your current filters. Try adjusting your search criteria or check back later.
          </p>
        </div>
      )}
    </div>
  )
}
