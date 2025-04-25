"use client"

import { motion } from "framer-motion"
import { Pill, Search, ShoppingCart, ArrowRight, Star } from "lucide-react"

// Mock medicine data
const medicines = [
  {
    id: 1,
    name: "Paracetamol",
    category: "Painkillers",
    price: 5.99,
    rating: 4.8,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    name: "Vitamin C",
    category: "Vitamins",
    price: 12.5,
    rating: 4.6,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    name: "Amoxicillin",
    category: "Antibiotics",
    price: 15.75,
    rating: 4.9,
    image: "/placeholder.svg?height=60&width=60",
  },
]

export default function EPharmacyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-cyan-900/80 to-cyan-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-cyan-700/30"
    >
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] right-[-30%] w-[100%] h-[100%] bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Pill className="w-5 h-5 mr-2 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">E-Pharmacy</h2>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center px-3 py-1 text-xs font-medium text-cyan-200 bg-cyan-500/20 rounded-full cursor-pointer"
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            Cart (0)
          </motion.div>
        </div>

        {/* Search bar */}
        <div className="relative mb-6">
          <div className="flex items-center w-full px-4 py-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
            <Search className="w-4 h-4 mr-2 text-cyan-300" />
            <input
              type="text"
              placeholder="Search medicines..."
              className="w-full bg-transparent border-none text-white placeholder-cyan-300/70 focus:outline-none"
            />
          </div>
        </div>

        {/* Medicine list */}
        <div className="space-y-3 mb-4">
          {medicines.map((medicine) => (
            <motion.div
              key={medicine.id}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex items-center p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10 cursor-pointer"
            >
              <div className="flex items-center justify-center w-12 h-12 mr-4 bg-white/20 rounded-lg">
                <img src={medicine.image || "/placeholder.svg"} alt={medicine.name} className="w-8 h-8" />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-white">{medicine.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-cyan-200">{medicine.category}</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs text-cyan-200">{medicine.rating}</span>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <span className="font-medium text-white">${medicine.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-100"
        >
          Browse all medicines
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
