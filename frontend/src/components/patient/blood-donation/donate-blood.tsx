"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Droplet, User, MapPin, Check, AlertCircle, Heart, Edit, Clock } from "lucide-react"
import BloodGroupSelector from "./blood-group-selector"

export default function DonateBlood() {
  const [formStep, setFormStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    city: "",
    gender: "",
    age: "",
    lastDonated: "",
    medicalInfo: "",
  })
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [editingField, setEditingField] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBloodGroupSelect = (bloodGroup: string) => {
    setFormData((prev) => ({ ...prev, bloodGroup }))
  }

  const handleGenderSelect = (gender: string) => {
    setFormData((prev) => ({ ...prev, gender }))
  }

  const handleNextStep = () => {
    setFormStep((prev) => prev + 1)
    setEditingField(null)
  }

  const handlePrevStep = () => {
    setFormStep((prev) => prev - 1)
    setEditingField(null)
  }

  const handleEditField = (field: string) => {
    setEditingField(field)
  }

  const handleEditInfo = () => {
    setFormStep(1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmissionStatus("loading")

    // Simulate API call
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate for demo
      setSubmissionStatus(success ? "success" : "error")
    }, 1500)
  }

  // Fix the issue with the Next button in the second phase
  // Update the isStepComplete function to properly validate the second step
  const isStepComplete = () => {
    if (formStep === 1) {
      return formData.name && formData.email && formData.phone
    } else if (formStep === 2) {
      return formData.bloodGroup && formData.city
    } else if (formStep === 3) {
      return formData.gender && formData.age
    }
    return true
  }

  return (
    <div className="bg-gradient-to-br from-red-900/80 to-red-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-red-700/30 overflow-hidden">
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] right-[-50%] w-[200%] h-[200%] bg-red-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] left-[-30%] w-[100%] h-[100%] bg-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <h2 className="text-2xl font-bold text-white mb-6">Become a Blood Donor</h2>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep >= 1 ? "bg-red-500 text-white" : "bg-white/20 text-white/50"
                }`}
              >
                {formStep > 1 ? <Check className="w-5 h-5" /> : "1"}
              </div>
              <span className={`ml-2 text-sm font-medium ${formStep >= 1 ? "text-white" : "text-white/50"}`}>
                Personal Info
              </span>
            </div>

            <div className="w-16 h-1 bg-white/20 mx-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: formStep >= 2 ? "100%" : "0%" }}
                className="h-full bg-red-500"
              />
            </div>

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep >= 2 ? "bg-red-500 text-white" : "bg-white/20 text-white/50"
                }`}
              >
                {formStep > 2 ? <Check className="w-5 h-5" /> : "2"}
              </div>
              <span className={`ml-2 text-sm font-medium ${formStep >= 2 ? "text-white" : "text-white/50"}`}>
                Blood & Location
              </span>
            </div>

            <div className="w-16 h-1 bg-white/20 mx-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: formStep >= 3 ? "100%" : "0%" }}
                className="h-full bg-red-500"
              />
            </div>

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep >= 3 ? "bg-red-500 text-white" : "bg-white/20 text-white/50"
                }`}
              >
                {formStep > 3 ? <Check className="w-5 h-5" /> : "3"}
              </div>
              <span className={`ml-2 text-sm font-medium ${formStep >= 3 ? "text-white" : "text-white/50"}`}>
                Medical Info
              </span>
            </div>

            <div className="w-16 h-1 bg-white/20 mx-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: formStep >= 4 ? "100%" : "0%" }}
                className="h-full bg-red-500"
              />
            </div>

            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  formStep >= 4 ? "bg-red-500 text-white" : "bg-white/20 text-white/50"
                }`}
              >
                {formStep > 4 ? <Check className="w-5 h-5" /> : "4"}
              </div>
              <span className={`ml-2 text-sm font-medium ${formStep >= 4 ? "text-white" : "text-white/50"}`}>
                Confirm
              </span>
            </div>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Information */}
          {formStep === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-red-300" />
                <h3 className="text-lg font-medium text-white">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-red-200 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-red-200 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-red-200 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 mt-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Privacy Notice</h4>
                    <p className="text-sm text-amber-200">
                      Your contact information will only be shared with verified blood recipients who match your blood
                      type and location. You can opt out at any time.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Blood Group and Location */}
          {formStep === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center mb-4">
                <Droplet className="w-5 h-5 mr-2 text-red-300" />
                <h3 className="text-lg font-medium text-white">Blood Group & Location</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-200 mb-2">Blood Group</label>
                <BloodGroupSelector
                  onSelectBloodGroup={handleBloodGroupSelect}
                  selectedBloodGroup={formData.bloodGroup}
                />
              </div>

              <div className="mt-4">
                <label htmlFor="city" className="block text-sm font-medium text-red-200 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                  placeholder="Enter your city"
                  required
                />
              </div>

              <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30 mt-6">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Location Information</h4>
                    <p className="text-sm text-red-200">
                      Your location helps us connect you with nearby blood recipients. You'll be notified when someone
                      in your area needs your blood type.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Gender and Age */}
          {formStep === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center mb-4">
                <User className="w-5 h-5 mr-2 text-red-300" />
                <h3 className="text-lg font-medium text-white">Gender & Age</h3>
              </div>

              <div>
                <label className="block text-sm font-medium text-red-200 mb-2">Gender</label>
                <div className="flex space-x-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGenderSelect("Male")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium ${
                      formData.gender === "Male"
                        ? "bg-red-500/30 text-white border border-red-500/50"
                        : "bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    Male
                  </motion.button>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleGenderSelect("Female")}
                    className={`flex-1 py-3 px-4 rounded-xl text-sm font-medium ${
                      formData.gender === "Female"
                        ? "bg-red-500/30 text-white border border-red-500/50"
                        : "bg-white/10 text-white border border-white/10"
                    }`}
                  >
                    Female
                  </motion.button>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center mb-2">
                  <Clock className="w-4 h-4 mr-2 text-red-300" />
                  <label htmlFor="age" className="text-sm font-medium text-red-200">
                    Age
                  </label>
                </div>

                {/* Prettier Age Input */}
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          strokeDasharray={`${(Number(formData.age) || 0) * 2.83} 283`}
                          strokeDashoffset="0"
                          transform="rotate(-90 50 50)"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#f87171" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <input
                          type="number"
                          id="age"
                          name="age"
                          min="18"
                          max="65"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="w-16 text-center text-2xl font-bold bg-transparent border-none text-white focus:outline-none focus:ring-0"
                          required
                        />
                        <span className="text-xs text-red-300">years</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <input
                      type="range"
                      min="18"
                      max="65"
                      value={formData.age || 18}
                      onChange={handleInputChange}
                      name="age"
                      className="w-full h-1 bg-red-900/50 rounded-lg appearance-none cursor-pointer accent-red-500"
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-red-300">18</span>
                      <span className="text-xs text-red-300">65</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="lastDonated" className="block text-sm font-medium text-red-200 mb-1">
                    Last Donation Date (if any)
                  </label>
                  <input
                    type="date"
                    id="lastDonated"
                    name="lastDonated"
                    value={formData.lastDonated}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                  />
                </div>
              </div>

              <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 mt-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-white mb-1">Eligibility Information</h4>
                    <p className="text-sm text-amber-200">
                      You must be between 18-65 years old and in good health to donate blood. If you've donated
                      recently, you must wait at least 8 weeks before donating again.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Medical Information and Confirmation */}
          {formStep === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Check className="w-5 h-5 mr-2 text-red-300" />
                  <h3 className="text-lg font-medium text-white">Confirm Information</h3>
                </div>
              </div>

              <div>
                <label htmlFor="medicalInfo" className="block text-sm font-medium text-red-200 mb-1">
                  Medical Information (Optional)
                </label>
                <textarea
                  id="medicalInfo"
                  name="medicalInfo"
                  value={formData.medicalInfo}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-red-300/70 focus:outline-none focus:border-red-400/50"
                  placeholder="Any medical conditions or medications we should know about?"
                  rows={3}
                />
              </div>

              <div className="p-4 bg-white/10 rounded-xl border border-white/10 mt-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Review Your Information</h4>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleEditInfo}
                    className="flex items-center text-sm font-medium text-red-300 hover:text-white"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit Info
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Name:</span>
                      <span className="text-white">{formData.name}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Email:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Phone:</span>
                      <span className="text-white">{formData.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Blood Group:</span>
                      <span className="text-white">{formData.bloodGroup || "Not specified"}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">City:</span>
                      <span className="text-white">{formData.city}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Gender:</span>
                      <span className="text-white">{formData.gender}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-sm text-red-200">Age:</span>
                      <span className="text-white">{formData.age}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <input
                    type="checkbox"
                    id="consent"
                    className="w-4 h-4 rounded border-white/30 bg-white/10 text-red-500 focus:ring-red-500"
                    required
                  />
                  <label htmlFor="consent" className="ml-2 text-sm text-white">
                    I confirm that all information provided is accurate and I consent to be contacted by blood
                    recipients.
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Success/Error Message - Only shown after submission */}
          {submissionStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-green-900/95 to-green-800/95 backdrop-blur-xl rounded-xl border border-green-700/50 shadow-xl mt-6"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <Heart className="w-10 h-10 text-green-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">Thank You for Registering!</h3>
                <p className="text-green-200 mb-6">
                  Your information has been successfully submitted. You are now registered as a blood donor.
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setSubmissionStatus("idle")}
                  className="py-3 px-6 rounded-xl font-medium bg-green-500/50 hover:bg-green-500/70 text-white border border-green-500/50 transition-all"
                >
                  Done
                </motion.button>
              </div>
            </motion.div>
          )}

          {submissionStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-gradient-to-br from-red-900/95 to-red-800/95 backdrop-blur-xl rounded-xl border border-red-700/50 shadow-xl mt-6"
            >
              <div className="flex flex-col items-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 10, stiffness: 100 }}
                  className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6"
                >
                  <AlertCircle className="w-10 h-10 text-red-400" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-2">Submission Failed</h3>
                <p className="text-red-200 mb-6">
                  We couldn't process your registration at this time. Please try again or contact support for
                  assistance.
                </p>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setSubmissionStatus("idle")}
                    className="py-3 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
                  >
                    Try Again
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          {submissionStatus === "idle" && (
            <div className="mt-8 flex justify-between">
              {formStep > 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handlePrevStep}
                  className="py-3 px-6 rounded-xl font-medium bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all"
                >
                  Back
                </motion.button>
              ) : (
                <div></div>
              )}

              {formStep < 4 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isStepComplete()}
                  className={`py-3 px-6 rounded-xl font-medium transition-all ${
                    isStepComplete()
                      ? "bg-red-500/50 hover:bg-red-500/70 text-white border border-red-500/50"
                      : "bg-white/10 text-white/50 cursor-not-allowed border border-white/10"
                  }`}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={submissionStatus === "loading"}
                  className={`py-3 px-6 rounded-xl font-medium transition-all ${
                    submissionStatus === "loading" ? "bg-red-500/30 cursor-wait" : "bg-red-500/50 hover:bg-red-500/70"
                  } text-white border border-red-500/50`}
                >
                  {submissionStatus === "loading" ? (
                    <span className="flex items-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Processing...
                    </span>
                  ) : (
                    "Register as Donor"
                  )}
                </motion.button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
