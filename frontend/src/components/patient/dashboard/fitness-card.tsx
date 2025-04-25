"use client"

import { motion } from "framer-motion"
import { Activity, Heart, Footprints, Moon, Flame, ArrowRight } from "lucide-react"

// Mock fitness data
const fitnessData = {
  steps: 8742,
  stepsGoal: 10000,
  heartRate: 72,
  heartRateRange: { min: 60, max: 100 },
  sleep: 7.5,
  sleepGoal: 8,
  calories: 1840,
  caloriesGoal: 2200,
}

export default function FitnessCard() {
  // Calculate percentages for progress indicators
  const stepsPercentage = Math.min(100, (fitnessData.steps / fitnessData.stepsGoal) * 100)
  const sleepPercentage = Math.min(100, (fitnessData.sleep / fitnessData.sleepGoal) * 100)
  const caloriesPercentage = Math.min(100, (fitnessData.calories / fitnessData.caloriesGoal) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-blue-900/80 to-blue-800/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-blue-700/30"
    >
      {/* Ambient light effect */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-30%] right-[-30%] w-[100%] h-[100%] bg-green-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Fitness Tracker</h2>
          </div>
          <span className="px-3 py-1 text-xs font-medium text-blue-200 bg-blue-500/20 rounded-full">Today</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Steps */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Footprints className="w-4 h-4 mr-2 text-blue-300" />
                <span className="text-sm font-medium text-blue-100">Steps</span>
              </div>
              <span className="text-xs text-blue-200">{Math.round(stepsPercentage)}%</span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-white">{fitnessData.steps.toLocaleString()}</h3>

            <div className="w-full h-2 mb-1 overflow-hidden bg-blue-900/50 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${stepsPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-blue-400 to-green-400"
              />
            </div>
            <span className="text-xs text-blue-200">Goal: {fitnessData.stepsGoal.toLocaleString()}</span>
          </motion.div>

          {/* Heart Rate */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center mb-2">
              <Heart className="w-4 h-4 mr-2 text-red-400" />
              <span className="text-sm font-medium text-blue-100">Heart Rate</span>
            </div>

            <div className="flex items-end justify-between">
              <h3 className="text-2xl font-bold text-white">{fitnessData.heartRate}</h3>
              <span className="text-sm text-blue-200">BPM</span>
            </div>

            <div className="relative w-full h-12 mt-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-0 left-0 w-full h-8"
              >
                <svg width="100%" height="100%" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 0,10 Q 10,5 15,10 T 30,10 T 45,10 T 60,10 T 75,10 T 90,10 T 100,10"
                    fill="none"
                    stroke="rgba(248, 113, 113, 0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <motion.div
                  animate={{
                    x: [0, 5, 0, -5, 0],
                    y: [0, -5, 0, -5, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 left-1/2 w-2 h-2 bg-red-400 rounded-full shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                />
              </motion.div>
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-blue-300">
                <span>{fitnessData.heartRateRange.min}</span>
                <span>{fitnessData.heartRateRange.max}</span>
              </div>
            </div>
          </motion.div>

          {/* Sleep */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Moon className="w-4 h-4 mr-2 text-indigo-300" />
                <span className="text-sm font-medium text-blue-100">Sleep</span>
              </div>
              <span className="text-xs text-blue-200">{Math.round(sleepPercentage)}%</span>
            </div>

            <div className="flex items-end">
              <h3 className="text-2xl font-bold text-white">{fitnessData.sleep}</h3>
              <span className="ml-1 text-sm text-blue-200">hrs</span>
            </div>

            <div className="w-full h-2 mt-2 mb-1 overflow-hidden bg-blue-900/50 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${sleepPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-indigo-400 to-purple-400"
              />
            </div>
            <span className="text-xs text-blue-200">Goal: {fitnessData.sleepGoal} hrs</span>
          </motion.div>

          {/* Calories */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Flame className="w-4 h-4 mr-2 text-orange-400" />
                <span className="text-sm font-medium text-blue-100">Calories</span>
              </div>
              <span className="text-xs text-blue-200">{Math.round(caloriesPercentage)}%</span>
            </div>

            <h3 className="mb-2 text-2xl font-bold text-white">{fitnessData.calories.toLocaleString()}</h3>

            <div className="w-full h-2 mb-1 overflow-hidden bg-blue-900/50 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${caloriesPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-orange-400 to-red-400"
              />
            </div>
            <span className="text-xs text-blue-200">Goal: {fitnessData.caloriesGoal.toLocaleString()}</span>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05, x: 5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center mt-4 text-sm font-medium text-blue-300 transition-colors hover:text-blue-100"
        >
          View full fitness record
          <ArrowRight className="w-4 h-4 ml-1" />
        </motion.button>
      </div>
    </motion.div>
  )
}
