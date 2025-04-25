"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Search, MapPin, Filter, Droplet, User, Calendar, Phone, Mail, X } from 'lucide-react'
import DonorList from "./donor-list"
import DonorDetailsModal from "./donor-details-modal"
import LocationFilter from "./location-filter"
import BloodGroupSelector from "./blood-group-selector"

// Mock data for blood donors
const mockDonors = [
  {
    id: 1,
    name: "John Smith",
    bloodGroup: "A+",
    age: 28,
    gender: "Male",
    location: "Downtown",
    city: "New York",
    distance: 2.5,
    lastDonated: "2023-03-15",
    phone: "+1 (555) 123-4567",
    email: "john.smith@example.com",
    donationCount: 12,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    bloodGroup: "O-",
    age: 35,
    gender: "Female",
    location: "Midtown",
    city: "New York",
    distance: 3.8,
    lastDonated: "2023-04-20",
    phone: "+1 (555) 987-6543",
    email: "sarah.johnson@example.com",
    donationCount: 8,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Michael Chen",
    bloodGroup: "B+",
    age: 42,
    gender: "Male",
    location: "Uptown",
    city: "New York",
    distance: 5.2,
    lastDonated: "2023-02-10",
    phone: "+1 (555) 234-5678",
    email: "michael.chen@example.com",
    donationCount: 15,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Emily Rodriguez",
    bloodGroup: "AB+",
    age: 31,
    gender: "Female",
    location: "West Side",
    city: "New York",
    distance: 4.1,
    lastDonated: "2023-05-05",
    phone: "+1 (555) 345-6789",
    email: "emily.rodriguez@example.com",
    donationCount: 6,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "David Wilson",
    bloodGroup: "A-",
    age: 27,
    gender: "Male",
    location: "East Side",
    city: "New York",
    distance: 3.3,
    lastDonated: "2023-04-12",
    phone: "+1 (555) 456-7890",
    email: "david.wilson@example.com",
    donationCount: 4,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Jessica Brown",
    bloodGroup: "O+",
    age: 39,
    gender: "Female",
    location: "North End",
    city: "New York",
    distance: 6.7,
    lastDonated: "2023-03-28",
    phone: "+1 (555) 567-8901",
    email: "jessica.brown@example.com",
    donationCount: 10,
    available: true,
    medicalInfo: "No known medical conditions",
    profileImage: "/placeholder.svg?height=100&width=100",
  },
]

export default function RequestBlood() {
  const [location, setLocation] = useState<string>("")
  const [bloodGroup, setBloodGroup] = useState<string>("")
  const [gender, setGender] = useState<string>("")
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 65])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<any | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  // Filter donors based on selected criteria
  const filteredDonors = mockDonors.filter((donor) => {
    const matchesLocation = location === "" || donor.city.toLowerCase().includes(location.toLowerCase())
    const matchesBloodGroup = bloodGroup === "" || donor.bloodGroup === bloodGroup
    const matchesGender = gender === "" || donor.gender === gender
    const matchesAge = donor.age >= ageRange[0] && donor.age <= ageRange[1]
    const matchesSearch =
      searchQuery === "" ||
      donor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donor.location.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesLocation && matchesBloodGroup && matchesGender && matchesAge && matchesSearch
  })

  const handleDonorSelect = (donor: any) => {
    setSelectedDonor(donor)
  }

  const handleCloseModal = () => {
    setSelectedDonor(null)
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-700/30 overflow-hidden">
        {/* Ambient light effect */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-red-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-pink-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-white">Find Blood Donors</h2>

            {/* Search and Filter */}
            <div className="flex space-x-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search donors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleFilter}
                className={`p-2 rounded-xl ${
                  isFilterOpen
                    ? "bg-red-500/30 text-white border border-red-500/50"
                    : "bg-white/10 text-white border border-white/10"
                }`}
              >
                <Filter className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Filters */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Location Filter */}
                    <div>
                      <label className="block text-sm font-medium text-red-200 mb-2">Location</label>
                      <LocationFilter onSelectLocation={setLocation} />
                    </div>

                    {/* Blood Group Filter */}
                    <div>
                      <label className="block text-sm font-medium text-red-200 mb-2">Blood Group</label>
                      <BloodGroupSelector onSelectBloodGroup={setBloodGroup} selectedBloodGroup={bloodGroup} />
                    </div>

                    {/* Gender Filter */}
                    <div>
                      <label className="block text-sm font-medium text-red-200 mb-2">Gender</label>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGender(gender === "Male" ? "" : "Male")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                            gender === "Male"
                              ? "bg-red-500/30 text-white border border-red-500/50"
                              : "bg-white/10 text-white border border-white/10"
                          }`}
                        >
                          Male
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setGender(gender === "Female" ? "" : "Female")}
                          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium ${
                            gender === "Female"
                              ? "bg-red-500/30 text-white border border-red-500/50"
                              : "bg-white/10 text-white border border-white/10"
                          }`}
                        >
                          Female
                        </motion.button>
                      </div>
                    </div>

                    {/* Age Range Filter */}
                    <div>
                      <label className="block text-sm font-medium text-red-200 mb-2">
                        Age Range: {ageRange[0]} - {ageRange[1]}
                      </label>
                      <div className="px-2">
                        <input
                          type="range"
                          min={18}
                          max={65}
                          value={ageRange[0]}
                          onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min={18}
                          max={65}
                          value={ageRange[1]}
                          onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setLocation("")
                        setBloodGroup("")
                        setGender("")
                        setAgeRange([18, 65])
                      }}
                      className="py-2 px-4 text-sm font-medium text-red-200 hover:text-white"
                    >
                      Reset Filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Donors List */}
          <DonorList donors={filteredDonors} onSelectDonor={handleDonorSelect} />
        </div>
      </div>

      {/* Donor Details Modal */}
      {selectedDonor && <DonorDetailsModal donor={selectedDonor} onClose={handleCloseModal} />}
    </div>
  )
}
