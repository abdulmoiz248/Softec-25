"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { z } from 'zod'
import axios from 'axios'
import { AlertCircle, CheckCircle2, X, Pill } from 'lucide-react'

const emailSchema = z.object({
  email: z.string().email("Invalid email format"),
})

const pharmacyQuotes = [
  "Health is the greatest wealth.",
  "Good health starts with trusted care.",
  "Your well-being, our priority.",
  "Because every dose matters.",
  "Where wellness meets convenience.",
]

export default function JoinUs() {
  const [email, setEmail] = useState('')
  const [isModalOpen, setModalOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [quote, setQuote] = useState('')

  useEffect(() => {
    setQuote(pharmacyQuotes[Math.floor(Math.random() * pharmacyQuotes.length)])
  }, [])

  const closeModal = () => setModalOpen(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage('')

    const validationResult = emailSchema.safeParse({ email })

    if (!validationResult.success) {
      setErrorMessage(validationResult.error.errors[0].message)
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.post('/api/subscribe', { email })
      if (res.data.success) {
        setModalOpen(true)
        setEmail('')
      } else {
        setErrorMessage("Email Already Exists.")
      }
    } catch (error) {
      console.error(error)
      setErrorMessage("Email Already Exists");
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div 
        className="w-full max-w-md bg-black"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="bg-black bg-opacity-5  backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 relative overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="absolute -top-16 -right-16 w-32 h-32 bg-[#1b03a3] rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1], rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#1b03a3] rounded-full opacity-20"
            animate={{ scale: [1, 1.2, 1], rotate: -360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-4xl font-bold mb-6 text-center text-white">Join the Health Circle</h2>
          <motion.p 
            className="text-lg mb-8 text-center text-gray-300 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
           &ldquo;{quote}&rdquo;
          </motion.p>
          <form onSubmit={submit} className="space-y-4">
            <div className="relative">
              <motion.input
                type="email"
                placeholder="Your Email for Wellness"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrorMessage('')
                }}
                className="w-full p-4 pr-12 rounded-lg border border-gray-700 bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1b03a3] transition"
                required
                whileFocus={{ scale: 1.02 }}
              />
              <motion.span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {errorMessage ? <AlertCircle className="text-red-500" /> : email && <CheckCircle2 className="text-[#1b03a3]" />}
              </motion.span>
            </div>
            <AnimatePresence>
              {errorMessage && (
                <motion.p 
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1b03a3] text-white font-semibold py-4 rounded-lg transition ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              whileHover={{ scale: 1.05, boxShadow: '0 0 15px #1b03a3' }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Pill className="w-6 h-6" />
                </motion.span>
              ) : (
                <>
                  Subscribe to Wellness
                  <Pill className="w-6 h-6 ml-2" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-md w-full relative overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <motion.div
                className="absolute -top-16 -right-16 w-32 h-32 bg-[#1b03a3] rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-16 -left-16 w-32 h-32 bg-[#1b03a3] rounded-full opacity-20"
                animate={{ scale: [1, 1.2, 1], rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
              <motion.h3 
                className="text-2xl font-bold mb-4 text-[#1b03a3]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome to the Circle!
              </motion.h3>
              <motion.p 
                className="text-gray-600"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You&apos;re officially part of our health-forward community. Expect expert insights, medicine deals, and more — straight to your inbox.
              </motion.p>
              <motion.div
                className="mt-6 text-center"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                <Pill className="w-12 h-12 mx-auto text-[#1b03a3]" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
