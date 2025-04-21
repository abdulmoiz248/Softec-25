"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"

const symptoms = [
  { emoji: "🥵", name: "Fever" },
  { emoji: "🤒", name: "Headache" },
  { emoji: "🤧", name: "Runny Nose" },
  { emoji: "😷", name: "Cough" },
  { emoji: "🤢", name: "Nausea" },
  { emoji: "🤮", name: "Vomiting" },
]

const diagnoses = {
  "🥵+🤒": "You may have a common cold or flu. Rest, stay hydrated, and monitor your symptoms.",
  "🤧+😷": "These symptoms suggest an upper respiratory infection. Rest and fluids are recommended.",
  "🤢+🤮": "You might have food poisoning or a stomach virus. Stay hydrated and eat bland foods.",
  "🥵+😷": "These symptoms could indicate a respiratory infection. Monitor for worsening symptoms.",
  "🤒+🤢": "This combination could be related to several conditions. Consider consulting a doctor.",
  "🥵+🤧": "Likely a common cold or seasonal allergies. Over-the-counter medications may help.",
}

export default function DoctorQuiz() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [diagnosis, setDiagnosis] = useState<string>("")
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [typedText, setTypedText] = useState<string>("")
  const [showPraise, setShowPraise] = useState<boolean>(false)

  const toggleSymptom = (emoji: string) => {
    if (selectedSymptoms.includes(emoji)) {
      setSelectedSymptoms(selectedSymptoms.filter((s) => s !== emoji))
    } else {
      if (selectedSymptoms.length < 2) {
        setSelectedSymptoms([...selectedSymptoms, emoji])
      }
    }
  }

  const getDiagnosis = () => {
    if (selectedSymptoms.length !== 2) return

    setDiagnosis("")
    setTypedText("")
    setIsTyping(true)

    const key = selectedSymptoms.sort().join("+")
    const result =
      diagnoses[key as keyof typeof diagnoses] ||
      "I need more information to provide an accurate assessment. Please consult a healthcare professional."

    // Simulate typing effect
    let i = 0
    const typingInterval = setInterval(() => {
      if (i < result.length) {
        setTypedText((prev) => prev + result.charAt(i))
        i++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setDiagnosis(result)

        // Show praise after diagnosis
        setTimeout(() => {
          setShowPraise(true)
        }, 500)
      }
    }, 30)

    return () => clearInterval(typingInterval)
  }

  const resetQuiz = () => {
    setSelectedSymptoms([])
    setDiagnosis("")
    setTypedText("")
    setIsTyping(false)
    setShowPraise(false)
  }

  return (
    <section className="py-20 px-4 md:px-10 bg-white">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c2842] mb-4">AI Doctor Quiz</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select your symptoms and get a preliminary assessment from our AI
          </p>
        </motion.div>

        <Card className="p-8 shadow-lg border-0">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-[#0c2842] mb-4">Select up to 2 symptoms:</h3>

            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {symptoms.map((symptom, index) => (
                <motion.button
                  key={index}
                  onClick={() => toggleSymptom(symptom.emoji)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl flex flex-col items-center transition-all duration-300 ${
                    selectedSymptoms.includes(symptom.emoji)
                      ? "bg-[#34C759]/20 border-2 border-[#34C759]"
                      : "bg-gray-100 border-2 border-transparent hover:border-[#2A5C82]/30"
                  }`}
                >
                  <span className="text-3xl mb-2">{symptom.emoji}</span>
                  <span className="text-sm text-gray-600">{symptom.name}</span>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <Button
              onClick={getDiagnosis}
              disabled={selectedSymptoms.length !== 2 || isTyping}
              className="bg-[#2A5C82] hover:bg-[#1a3a5f] text-white px-8"
            >
              Get Assessment
            </Button>
          </div>

          {(isTyping || diagnosis) && (
            <div className="bg-gray-50 rounded-xl p-6 relative">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[#2A5C82] flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <Bot className="w-6 h-6" />
                </div>

                <div>
                  <div className="font-semibold text-[#0c2842] mb-2">AI Doctor</div>

                  {isTyping ? (
                    <div>
                      <p className="text-gray-700">{typedText}</p>
                      <div className="flex space-x-1 mt-2">
                        <div className="w-2 h-2 rounded-full bg-[#2A5C82] animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-[#2A5C82] animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-[#2A5C82] animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700">{diagnosis}</p>
                  )}
                </div>
              </div>

              <AnimatePresence>
                {showPraise && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="mt-6 p-4 bg-[#34C759]/10 rounded-lg border border-[#34C759]/30"
                  >
                    <div className="flex items-center">
                      <div className="text-2xl mr-2">✨</div>
                      <div>
                        <h4 className="font-bold text-[#0c2842]">Great job using the AI Doctor!</h4>
                        <p className="text-sm text-gray-600">
                          Remember, this is just a preliminary assessment. Always consult with a healthcare professional
                          for medical advice.
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button onClick={resetQuiz} variant="outline" className="border-[#34C759] text-[#34C759]">
                        Try Another Combination
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Card>
      </div>
    </section>
  )
}
