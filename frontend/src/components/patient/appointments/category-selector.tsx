"use client"

import { motion } from "framer-motion"
import { Heart, Brain, SmileIcon as Tooth, Stethoscope, Pill, Activity, Eye, Ear } from "lucide-react"
import { useState } from "react"

// Medical specialties categories
const categories = [
  { id: "cardiac", name: "Cardiac", icon: Heart, color: "from-red-500 to-red-600" },
  { id: "neurological", name: "Neurological", icon: Brain, color: "from-purple-500 to-purple-600" },
  { id: "dental", name: "Dental", icon: Tooth, color: "from-blue-500 to-blue-600" },
  { id: "general", name: "General", icon: Stethoscope, color: "from-green-500 to-green-600" },
  { id: "mental", name: "Mental Health", icon: Brain, color: "from-indigo-500 to-indigo-600" },
  { id: "pharmacy", name: "Pharmacy", icon: Pill, color: "from-cyan-500 to-cyan-600" },
  { id: "physiotherapy", name: "Physiotherapy", icon: Activity, color: "from-orange-500 to-orange-600" },
  { id: "ophthalmology", name: "Ophthalmology", icon: Eye, color: "from-teal-500 to-teal-600" },
  { id: "ent", name: "ENT", icon: Ear, color: "from-amber-500 to-amber-600" },
]

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void
  selectedCategory: string | null
}

export default function CategorySelector({ onSelectCategory, selectedCategory }: CategorySelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-4">Select Specialty</h3>

      {/* Search input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search specialties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 text-white placeholder-green-300/70 focus:outline-none focus:border-green-400/50"
        />
      </div>

      {/* Categories grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filteredCategories.map((category) => (
          <motion.button
            key={category.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelectCategory(category.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} border-white/20 shadow-lg`
                : "bg-white/10 border-white/10 hover:bg-white/20"
            }`}
          >
            <category.icon
              className={`w-8 h-8 mb-2 ${selectedCategory === category.id ? "text-white" : "text-green-300"}`}
            />
            <span
              className={`text-sm font-medium ${selectedCategory === category.id ? "text-white" : "text-green-100"}`}
            >
              {category.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
