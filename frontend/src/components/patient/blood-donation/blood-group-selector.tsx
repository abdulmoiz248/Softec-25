"use client"

import { motion } from "framer-motion"

interface BloodGroupSelectorProps {
  onSelectBloodGroup: (bloodGroup: string) => void
  selectedBloodGroup: string
}

export default function BloodGroupSelector({ onSelectBloodGroup, selectedBloodGroup }: BloodGroupSelectorProps) {
  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

  return (
    <div className="grid grid-cols-4 gap-2">
      {bloodGroups.map((group) => (
        <motion.button
          key={group}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelectBloodGroup(group === selectedBloodGroup ? "" : group)}
          className={`py-3 px-4 rounded-xl text-center transition-all duration-200 ${
            selectedBloodGroup === group
              ? "bg-red-500/30 text-white border border-red-500/50"
              : "bg-white/10 text-white border border-white/10"
          }`}
        >
          {group}
        </motion.button>
      ))}
    </div>
  )
}
