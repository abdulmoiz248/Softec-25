"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import confetti from "canvas-confetti"

const questions = [
  {
    id: 1,
    question: "How many hours of sleep do you get per night?",
    options: ["😴 < 5 hours", "😐 5-6 hours", "🙂 7-8 hours", "😊 > 8 hours"],
    type: "emoji",
  },
  {
    id: 2,
    question: "How would you rate your stress level?",
    type: "slider",
    min: 0,
    max: 10,
    step: 1,
    labels: ["Very Low", "Moderate", "Very High"],
  },
  {
    id: 3,
    question: "How many servings of fruits and vegetables do you eat daily?",
    options: ["🍎 0-1", "🥗 2-3", "🥦 4-5", "🍓 > 5"],
    type: "emoji",
  },
  {
    id: 4,
    question: "How often do you exercise per week?",
    options: ["🧘 Never", "🚶 1-2 times", "🏃 3-4 times", "💪 5+ times"],
    type: "emoji",
  },
]

export default function HealthScoreQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<any[]>([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleEmojiAnswer = (index: number) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = index
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      calculateScore(newAnswers)
    }
  }

  const handleSliderAnswer = (value: number[]) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = value[0]
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScore(answers)
    }
  }

  const calculateScore = (allAnswers: any[]) => {
    // Simple scoring algorithm
    let totalScore = 0

    allAnswers.forEach((answer, index) => {
      const question = questions[index]

      if (question.type === "emoji") {
        // For emoji questions, higher index = better health habit
        totalScore += answer * 25
      } else if (question.type === "slider") {
        // For stress slider, lower is better (reverse score)
        totalScore += (10 - answer) * 10
      }
    })

    // Normalize score to 0-100
    const normalizedScore = Math.min(100, Math.max(0, totalScore / allAnswers.length))
    setScore(Math.round(normalizedScore))
    setShowResults(true)

    // Trigger confetti effect
    if (normalizedScore > 70) {
      triggerConfetti()
    }
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  return (
    <section className="py-20 px-4 md:px-10 bg-gradient-to-br from-[#f0f9ff] to-[#e0f2fe]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#0c2842] mb-4">What's Your Health Score?</h2>
          <p className="text-lg text-gray-600">
            Take our quick quiz to discover your personal health score and get customized recommendations
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-8">
                  <div className="flex justify-between mb-2 text-sm text-gray-500">
                    <span>
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full">
                    <div
                      className="h-full bg-gradient-to-r from-[#2A5C82] to-[#34C759] rounded-full transition-all duration-500"
                      style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#0c2842] mb-8">
                  {questions[currentQuestion].question}
                </h3>

                {questions[currentQuestion].type === "emoji" && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {questions[currentQuestion].options?.map((option, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleEmojiAnswer(index)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                          answers[currentQuestion] === index
                            ? "border-[#34C759] bg-[#34C759]/10"
                            : "border-gray-200 hover:border-[#2A5C82]"
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.split(" ")[0]}</div>
                        <div className="text-sm text-gray-600">{option.split(" ")[1]}</div>
                      </motion.button>
                    ))}
                  </div>
                )}

                {questions[currentQuestion].type === "slider" && (
                  <div className="py-8">
                    <Slider
                      defaultValue={[answers[currentQuestion] || 5]}
                      max={questions[currentQuestion].max}
                      min={questions[currentQuestion].min}
                      step={questions[currentQuestion].step}
                      onValueChange={handleSliderAnswer}
                      className="mb-8"
                    />

                    <div className="flex justify-between text-sm text-gray-500">
                      {questions[currentQuestion].labels?.map((label, index) => (
                        <span key={index}>{label}</span>
                      ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button onClick={handleNext} className="bg-[#2A5C82] hover:bg-[#1a3a5f] text-white">
                        {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                      </Button>
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-2xl font-bold text-[#0c2842] mb-6">Your Health Score</h3>

                <div className="relative w-64 h-64 mx-auto mb-8">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f0f0f0" strokeWidth="10" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={score > 70 ? "#34C759" : score > 40 ? "#FFD60A" : "#FF3B30"}
                      strokeWidth="10"
                      strokeDasharray={`${score * 2.83} 283`}
                      strokeDashoffset="0"
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000 ease-out"
                    />
                    <text
                      x="50"
                      y="50"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontSize="24"
                      fontWeight="bold"
                      fill="#0c2842"
                    >
                      {score}
                    </text>
                    <text x="50" y="65" dominantBaseline="middle" textAnchor="middle" fontSize="12" fill="#666">
                      out of 100
                    </text>
                  </svg>
                </div>

                <div className="mb-8">
                  <h4 className="text-xl font-bold mb-2 text-[#0c2842]">
                    {score > 70
                      ? "Excellent Health Habits!"
                      : score > 40
                        ? "Good Progress, Room to Improve"
                        : "Time to Focus on Your Health"}
                  </h4>
                  <p className="text-gray-600">
                    {score > 70
                      ? "You're doing great! Keep up these healthy habits for long-term wellness."
                      : score > 40
                        ? "You have some good habits, but could benefit from a few lifestyle adjustments."
                        : "Your current habits may be impacting your health. Let's work together to improve them."}
                  </p>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button onClick={resetQuiz} variant="outline" className="border-[#2A5C82] text-[#2A5C82]">
                    Retake Quiz
                  </Button>
                  <Button className="bg-[#34C759] hover:bg-[#2DC653] text-white">Get Personalized Plan</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
