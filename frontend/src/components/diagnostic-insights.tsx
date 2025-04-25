"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

const vitalData = [
  { name: "Mon", heartRate: 72, bloodPressure: 120, temperature: 98.6 },
  { name: "Tue", heartRate: 74, bloodPressure: 118, temperature: 98.4 },
  { name: "Wed", heartRate: 76, bloodPressure: 122, temperature: 98.7 },
  { name: "Thu", heartRate: 73, bloodPressure: 119, temperature: 98.5 },
  { name: "Fri", heartRate: 75, bloodPressure: 121, temperature: 98.8 },
  { name: "Sat", heartRate: 71, bloodPressure: 117, temperature: 98.3 },
  { name: "Sun", heartRate: 70, bloodPressure: 116, temperature: 98.2 },
]

const diagnosisData = [
  { name: "Migraine", value: 28 },
  { name: "Hypertension", value: 22 },
  { name: "Diabetes", value: 16 },
  { name: "Anxiety", value: 12 },
  { name: "Arthritis", value: 8 },
]

export default function DiagnosticInsights() {
  const [activeTab, setActiveTab] = useState("vitals")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-navy-800/30 backdrop-blur-md rounded-xl p-6 border border-teal-500/20"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold">Diagnostic Insights</h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              activeTab === "vitals" ? "bg-teal-500/20 text-teal-300" : "bg-navy-700/50 hover:bg-navy-700/70"
            }`}
            onClick={() => setActiveTab("vitals")}
          >
            Patient Vitals
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-3 py-1 text-xs rounded-lg transition-colors ${
              activeTab === "diagnosis" ? "bg-teal-500/20 text-teal-300" : "bg-navy-700/50 hover:bg-navy-700/70"
            }`}
            onClick={() => setActiveTab("diagnosis")}
          >
            Top Diagnoses
          </motion.button>
        </div>
      </div>

      <div className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10 h-[300px]">
        <AnimatedChart activeTab={activeTab} />
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10"
        >
          <p className="text-white/60 text-sm">AI Diagnostic Accuracy</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-2xl font-bold">94.3%</p>
            <p className="text-xs text-teal-400">+2.1% this week</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10"
        >
          <p className="text-white/60 text-sm">Patient Recovery Rate</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-2xl font-bold">87.8%</p>
            <p className="text-xs text-teal-400">+1.4% this month</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-navy-700/50 rounded-xl p-4 border border-teal-500/10"
        >
          <p className="text-white/60 text-sm">Treatment Efficacy</p>
          <div className="flex items-end justify-between mt-2">
            <p className="text-2xl font-bold">91.2%</p>
            <p className="text-xs text-teal-400">+3.7% this quarter</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

function AnimatedChart({ activeTab }: { activeTab: string }) {
  return (
    <motion.div
      key={activeTab}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full"
    >
      {activeTab === "vitals" ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={vitalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" />
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(0, 168, 150, 0.2)",
                borderRadius: "8px",
              }}
            />
            <Line
              type="monotone"
              dataKey="heartRate"
              stroke="#00A896"
              strokeWidth={2}
              dot={{ fill: "#00A896", r: 4 }}
              activeDot={{ r: 6, fill: "#00A896", stroke: "#fff" }}
              animationDuration={1500}
            />
            <Line
              type="monotone"
              dataKey="bloodPressure"
              stroke="#38bdf8"
              strokeWidth={2}
              dot={{ fill: "#38bdf8", r: 4 }}
              activeDot={{ r: 6, fill: "#38bdf8", stroke: "#fff" }}
              animationDuration={1500}
              animationBegin={300}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={diagnosisData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a5f" horizontal={false} />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid rgba(0, 168, 150, 0.2)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="#00A896" radius={[0, 4, 4, 0]} animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.div>
  )
}
