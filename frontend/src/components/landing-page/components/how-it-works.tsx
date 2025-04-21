"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Camera, Brain, Pill } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    id: 1,
    title: "Snap Symptom Photo",
    description: "Take a photo of your symptoms or affected area using your smartphone camera.",
    icon: <Camera className="w-12 h-12" />,
    color: "#2A5C82",
  },
  {
    id: 2,
    title: "AI Diagnosis",
    description: "Our advanced AI analyzes your symptoms and provides a preliminary diagnosis.",
    icon: <Brain className="w-12 h-12" />,
    color: "#8A2BE2",
  },
  {
    id: 3,
    title: "Get Treatment",
    description: "Receive personalized treatment recommendations or connect with a specialist.",
    icon: <Pill className="w-12 h-12" />,
    color: "#34C759",
  },
]

export default function HowItWorks() {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = () => {
    setCurrentStep((prev) => (prev === steps.length ? 1 : prev + 1))
  }

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 1 ? steps.length : prev - 1))
  }

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c2842] mb-4">How Hygieia Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Three simple steps to better health with AI-powered diagnostics
          </p>
        </motion.div>

        <div className="relative">
          {/* Step indicators */}
          <div className="flex justify-center mb-12">
            {steps.map((step) => (
              <motion.button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`w-12 h-12 rounded-full flex items-center justify-center mx-2 transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-gradient-to-r from-[#2A5C82] to-[#34C759] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.id}
              </motion.button>
            ))}
          </div>

          {/* Step content */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden min-h-[400px]">
            <AnimatePresence mode="wait">
              {steps.map(
                (step) =>
                  currentStep === step.id && (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col md:flex-row items-center"
                    >
                      <div className="w-full md:w-1/2 mb-8 md:mb-0">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="w-32 h-32 rounded-full flex items-center justify-center mx-auto"
                          style={{ backgroundColor: `${step.color}20` }}
                        >
                          <div className="text-[#2A5C82]">{step.icon}</div>
                        </motion.div>
                      </div>

                      <div className="w-full md:w-1/2 text-center md:text-left">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="text-2xl font-bold text-[#0c2842] mb-4"
                        >
                          {step.title}
                        </motion.h3>

                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4, duration: 0.5 }}
                          className="text-lg text-gray-600 mb-6"
                        >
                          {step.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <Button className="bg-[#2A5C82] hover:bg-[#1a3a5f] text-white">Learn More</Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            <div className="absolute bottom-8 right-8 flex space-x-4">
              <Button
                variant="outline"
                onClick={prevStep}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                ←
              </Button>
              <Button
                variant="outline"
                onClick={nextStep}
                className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
