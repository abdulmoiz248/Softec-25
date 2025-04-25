"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Star, MapPin, Calendar, Clock, X, Phone, Mail, ExternalLink } from "lucide-react"
import DoctorSchedule from "./doctor-schedule"

// Mock doctors data by category
const doctorsByCategory = {
  cardiac: [
    {
      id: 1,
      name: "Dr. Emily Rodriguez",
      specialty: "Cardiologist",
      hospital: "City Hospital",
      address: "123 Medical Center Dr, City",
      rating: 4.8,
      availability: "Mon, Wed, Fri",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 987-6543",
      email: "dr.rodriguez@hygieia.com",
      experience: "15 years",
      education: "Harvard Medical School",
      about: "Dr. Rodriguez specializes in interventional cardiology and has performed over 1,000 cardiac procedures.",
      schedule: [
        { day: "Monday", slots: ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"] },
        { day: "Wednesday", slots: ["10:00 AM", "11:00 AM", "1:00 PM", "4:00 PM"] },
        { day: "Friday", slots: ["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"] },
      ],
    },
    {
      id: 2,
      name: "Dr. Robert Johnson",
      specialty: "Cardiac Surgeon",
      hospital: "Heart Institute",
      address: "456 Cardiology Pkwy, City",
      rating: 4.9,
      availability: "Tue, Thu",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 123-4567",
      email: "dr.johnson@hygieia.com",
      experience: "20 years",
      education: "Johns Hopkins University",
      about: "Dr. Johnson is a renowned cardiac surgeon specializing in minimally invasive procedures.",
      schedule: [
        { day: "Tuesday", slots: ["8:00 AM", "10:00 AM", "1:00 PM", "3:00 PM"] },
        { day: "Thursday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
      ],
    },
  ],
  neurological: [
    {
      id: 3,
      name: "Dr. Sarah Williams",
      specialty: "Neurologist",
      hospital: "Neuro Center",
      address: "789 Brain Ave, City",
      rating: 4.7,
      availability: "Mon, Tue, Thu",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 456-7890",
      email: "dr.williams@hygieia.com",
      experience: "12 years",
      education: "Stanford Medical School",
      about: "Dr. Williams specializes in treating neurological disorders and has published numerous research papers.",
      schedule: [
        { day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"] },
        { day: "Tuesday", slots: ["10:00 AM", "1:00 PM", "3:00 PM"] },
        { day: "Thursday", slots: ["9:00 AM", "12:00 PM", "3:00 PM", "5:00 PM"] },
      ],
    },
  ],
  dental: [
    {
      id: 4,
      name: "Dr. Michael Chen",
      specialty: "Dentist",
      hospital: "Smile Dental Clinic",
      address: "321 Tooth St, City",
      rating: 4.9,
      availability: "Mon-Fri",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 789-0123",
      email: "dr.chen@hygieia.com",
      experience: "10 years",
      education: "University of Pennsylvania",
      about: "Dr. Chen specializes in cosmetic dentistry and provides comprehensive dental care for all ages.",
      schedule: [
        { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", '3:  "4:00 PM'] },
        { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Thursday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
      ],
    },
  ],
  general: [
    {
      id: 5,
      name: "Dr. James Wilson",
      specialty: "General Physician",
      hospital: "Community Medical Center",
      address: "555 Health Blvd, City",
      rating: 4.6,
      availability: "Mon, Wed, Fri",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 234-5678",
      email: "dr.wilson@hygieia.com",
      experience: "18 years",
      education: "Yale School of Medicine",
      about: "Dr. Wilson provides comprehensive primary care services for patients of all ages.",
      schedule: [
        { day: "Monday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Wednesday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Friday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
      ],
    },
  ],
  mental: [
    {
      id: 6,
      name: "Dr. Lisa Thompson",
      specialty: "Psychiatrist",
      hospital: "Mental Wellness Center",
      address: "777 Mind St, City",
      rating: 4.8,
      availability: "Tue, Thu, Sat",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 345-6789",
      email: "dr.thompson@hygieia.com",
      experience: "14 years",
      education: "Columbia University",
      about: "Dr. Thompson specializes in mood disorders and cognitive behavioral therapy.",
      schedule: [
        { day: "Tuesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Thursday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Saturday", slots: ["10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM"] },
      ],
    },
  ],
  physiotherapy: [
    {
      id: 7,
      name: "Dr. David Brown",
      specialty: "Physiotherapist",
      hospital: "Physical Rehabilitation Center",
      address: "888 Motion Ave, City",
      rating: 4.7,
      availability: "Mon-Fri",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 456-7890",
      email: "dr.brown@hygieia.com",
      experience: "9 years",
      education: "Northwestern University",
      about: "Dr. Brown specializes in sports injuries and post-surgical rehabilitation.",
      schedule: [
        { day: "Monday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Tuesday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Wednesday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Thursday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
        { day: "Friday", slots: ["8:00 AM", "9:00 AM", "10:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"] },
      ],
    },
  ],
  ophthalmology: [
    {
      id: 8,
      name: "Dr. Jennifer Lee",
      specialty: "Ophthalmologist",
      hospital: "Vision Care Center",
      address: "999 Eye Blvd, City",
      rating: 4.9,
      availability: "Mon, Wed, Fri",
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 567-8901",
      email: "dr.lee@hygieia.com",
      experience: "16 years",
      education: "Johns Hopkins University",
      about: "Dr. Lee specializes in cataract surgery and treatment of retinal diseases.",
      schedule: [
        { day: "Monday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Wednesday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
        { day: "Friday", slots: ["9:00 AM", "10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"] },
      ],
    },
  ],
}

interface DoctorsListProps {
  category: string
  onSelectDoctor: (doctor: any) => void
  selectedDoctor: any | null
}

export default function DoctorsList({ category, onSelectDoctor, selectedDoctor }: DoctorsListProps) {
  const [viewingSchedule, setViewingSchedule] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  // Get doctors for the selected category
  const doctors = doctorsByCategory[category as keyof typeof doctorsByCategory] || []

  // Filter doctors based on search term
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.hospital.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleScheduleClick = (doctorId: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setViewingSchedule(viewingSchedule === doctorId ? null : doctorId)
  }

  const handleDoctorClick = (doctor: any) => {
    onSelectDoctor(doctor)
    setViewingSchedule(null)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Select Doctor</h3>

      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search doctors by name, specialty, or hospital..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-green-300/70 focus:outline-none focus:border-green-400/50"
        />
      </div>

      {/* Doctors list */}
      <div className="space-y-4">
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleDoctorClick(doctor)}
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl border cursor-pointer transition-all duration-300 ${
                selectedDoctor?.id === doctor.id
                  ? "border-green-500/50 shadow-lg shadow-green-500/20"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/20 mr-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-white text-lg">{doctor.name}</h4>
                    <p className="text-green-200">{doctor.specialty}</p>

                    <div className="flex items-center mt-1">
                      <div className="flex items-center mr-4">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="ml-1 text-sm text-green-100">{doctor.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-green-300" />
                        <span className="ml-1 text-sm text-green-100">{doctor.hospital}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => handleScheduleClick(doctor.id, e)}
                      className="px-3 py-1 text-xs font-medium text-green-200 bg-green-500/20 hover:bg-green-500/30 rounded-full transition-colors mb-2"
                    >
                      <Calendar className="w-3 h-3 inline mr-1" />
                      Schedule
                    </motion.button>

                    <span className="text-xs text-green-200">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {doctor.availability}
                    </span>
                  </div>
                </div>

                {/* Doctor details (only shown when selected) */}
                {selectedDoctor?.id === doctor.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">About</h5>
                        <p className="text-sm text-green-100">{doctor.about}</p>

                        <div className="mt-3 space-y-2">
                          <div className="flex items-center text-sm text-green-100">
                            <span className="font-medium text-green-200 mr-2">Experience:</span>
                            {doctor.experience}
                          </div>
                          <div className="flex items-center text-sm text-green-100">
                            <span className="font-medium text-green-200 mr-2">Education:</span>
                            {doctor.education}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-white mb-2">Contact Information</h5>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-green-100">
                            <MapPin className="w-4 h-4 mr-2 text-green-300" />
                            {doctor.address}
                          </div>
                          <div className="flex items-center text-sm text-green-100">
                            <Phone className="w-4 h-4 mr-2 text-green-300" />
                            {doctor.phone}
                          </div>
                          <div className="flex items-center text-sm text-green-100">
                            <Mail className="w-4 h-4 mr-2 text-green-300" />
                            {doctor.email}
                          </div>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="mt-4 flex items-center py-2 px-4 text-sm font-medium text-white bg-green-500/20 hover:bg-green-500/30 rounded-xl backdrop-blur-sm border border-green-500/30 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Full Profile
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Schedule popup */}
              <AnimatePresence>
                {viewingSchedule === doctor.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-20 top-0 left-0 right-0 p-4 bg-gradient-to-br from-green-900/95 to-green-800/95 backdrop-blur-xl rounded-2xl border border-green-700/50 shadow-xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-white">Dr. {doctor.name.split(" ")[1]}'s Schedule</h4>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleScheduleClick(doctor.id, e)}
                        className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <DoctorSchedule schedule={doctor.schedule} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-green-200">No doctors found for this category. Please try another specialty.</p>
          </div>
        )}
      </div>

      {/* Floating Schedule Modal */}
      <AnimatePresence>
        {viewingSchedule !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={(e) => {
              e.stopPropagation()
              setViewingSchedule(null)
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-gradient-to-br from-green-900/90 to-green-800/90 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-green-700/30 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient light effect */}
              <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-green-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10 p-6">
                {viewingSchedule !== null && (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">
                        Dr. {doctors.find((d) => d.id === viewingSchedule)?.name.split(" ")[1]}'s Schedule
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setViewingSchedule(null)
                        }}
                        className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                    </div>

                    <DoctorSchedule schedule={doctors.find((d) => d.id === viewingSchedule)?.schedule || []} />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
