"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Search, MapPin, Droplet, User, Clock } from "lucide-react"
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

  const resetFilters = () => {
    setLocation("")
    setBloodGroup("")
    setGender("")
    setAgeRange([18, 65])
    setSearchQuery("")
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
          <h2 className="text-2xl font-bold text-white mb-6">Find Blood Donors</h2>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300 w-4 h-4" />
            <input
              type="text"
              placeholder="Search donors by name, blood group, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
            />
          </div>

          {/* Filters Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Filters</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetFilters}
                className="text-sm font-medium text-red-200 hover:text-white"
              >
                Reset All
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-red-300" />
                  <label className="text-sm font-medium text-red-200">Location</label>
                </div>
                <LocationFilter onSelectLocation={setLocation} />
              </div>

              {/* Blood Group Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <Droplet className="w-4 h-4 mr-2 text-red-300" />
                  <label className="text-sm font-medium text-red-200">Blood Group</label>
                </div>
                <BloodGroupSelector onSelectBloodGroup={setBloodGroup} selectedBloodGroup={bloodGroup} />
              </div>

              {/* Gender Filter */}
              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-red-300" />
                  <label className="text-sm font-medium text-red-200">Gender</label>
                </div>
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
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-red-300" />
                  <label className="text-sm font-medium text-red-200">
                    Age Range: {ageRange[0]} - {ageRange[1]}
                  </label>
                </div>

                {/* Prettier Age Range Selector */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="relative mb-6 pt-2">
                    <div className="h-1 w-full bg-red-900/50 rounded-full">
                      <div
                        className="absolute h-1 bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                        style={{
                          left: `${((ageRange[0] - 18) / (65 - 18)) * 100}%`,
                          width: `${((ageRange[1] - ageRange[0]) / (65 - 18)) * 100}%`,
                        }}
                      ></div>
                    </div>

                    {/* Min Thumb */}
                    <div
                      className="absolute top-0 -mt-1 -ml-2"
                      style={{ left: `${((ageRange[0] - 18) / (65 - 18)) * 100}%` }}
                    >
                      <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg border border-white/20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>

                    {/* Max Thumb */}
                    <div
                      className="absolute top-0 -mt-1 -ml-2"
                      style={{ left: `${((ageRange[1] - 18) / (65 - 18)) * 100}%` }}
                    >
                      <div className="w-4 h-4 bg-gradient-to-br from-red-400 to-red-500 rounded-full shadow-lg border border-white/20 flex items-center justify-center">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-red-200 mb-1 block">Min Age</label>
                      <input
                        type="range"
                        min={18}
                        max={65}
                        value={ageRange[0]}
                        onChange={(e) => setAgeRange([Math.min(Number(e.target.value), ageRange[1] - 1), ageRange[1]])}
                        className="w-full h-1 bg-red-900/50 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                      <div className="text-center mt-1 text-sm text-white font-medium">{ageRange[0]}</div>
                    </div>
                    <div>
                      <label className="text-xs text-red-200 mb-1 block">Max Age</label>
                      <input
                        type="range"
                        min={18}
                        max={65}
                        value={ageRange[1]}
                        onChange={(e) => setAgeRange([ageRange[0], Math.max(Number(e.target.value), ageRange[0] + 1)])}
                        className="w-full h-1 bg-red-900/50 rounded-lg appearance-none cursor-pointer accent-red-500"
                      />
                      <div className="text-center mt-1 text-sm text-white font-medium">{ageRange[1]}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Donors List */}
          <div>
            <h3 className="text-xl font-medium text-white mb-4">
              {filteredDonors.length} Donor{filteredDonors.length !== 1 && "s"} Available
            </h3>
            <DonorList donors={filteredDonors} onSelectDonor={handleDonorSelect} />
          </div>
        </div>
      </div>

      {/* Donor Details Modal */}
      {selectedDonor && <DonorDetailsModal donor={selectedDonor} onClose={handleCloseModal} />}
    </div>
  )
}
