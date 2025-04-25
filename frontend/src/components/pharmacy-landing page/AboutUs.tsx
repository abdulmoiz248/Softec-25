"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const phrases = [
  "PRECISION IS POWER",
  "HEALTH WITHOUT LIMITS",
  "BEYOND THE COUNTER",
  "CARE THAT NEVER STOPS",
  "REDEFINING PHARMACY",
  "Empower health, redefine care.",
  "Where medicine meets innovation.",
  "Heal smart. Live strong.",
  "Pharmacy with purpose.",
  "Precision. Passion. Pharmacy.",
  "Your health, our mission.",
  "Driven by science, guided by care.",
  "More than meds — it’s a movement.",
  "Delivering wellness fearlessly.",
];

export default function PharmacyManifesto() {
  const [currentPhrase, setCurrentPhrase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="text-white bg-black py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-6 md:px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-4 text-white">
            THE FUTURE OF PHARMACY STARTS HERE
          </h2>
          <p className="text-lg md:text-xl text-gray-300">
            Empowering care, one prescription at a time
          </p>
        </motion.div>

        <div className="relative h-32 md:h-40 mb-8 md:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPhrase}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <h3 className="text-2xl md:text-4xl font-bold text-[#1b03a3]">
                {phrases[currentPhrase]}
              </h3>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h4 className="text-xl md:text-2xl font-bold mb-4 text-white">
            Our Mission
          </h4>
          <p className="text-base md:text-lg text-white leading-relaxed">
            At Hygieia, the pharmacy isn’t just a counter—it’s the front line of better health. We fuse technology with trust to deliver fast, accurate, and accessible medication. Every dose, every interaction, every service is crafted to empower both pharmacists and patients. We’re here to revolutionize care—one prescription, one person, one fearless move at a time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
