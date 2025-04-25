"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { scrollY } = useScroll()

  const backgroundColor = useTransform(scrollY, [0, 100], ["rgba(10, 37, 64, 0)", "rgba(10, 37, 64, 0.95)"])

  const textColor = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 1)", "rgba(255, 255, 255, 1)"])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ]
  const router=useRouter();

  return (
    <motion.header
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3 shadow-lg" : "py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="relative h-12 w-12 mr-3">
              <img src="/hygieia-logo.png" alt="Hygieia Logo" className="h-full w-full object-contain" />
            </div>
            <motion.span style={{ color: textColor }} className="text-2xl font-bold tracking-tight">
              HYGIEIA
            </motion.span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="px-4 py-2 text-white hover:text-blue-200 transition-colors rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.6 }}
          >
            <Button className="ml-4 bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-blue-900/95 backdrop-blur-sm"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-white hover:bg-blue-800/50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button onClick={()=>{
                
                router.push("/patient/login")
              }}
               className="bg-blue-500 hover:bg-blue-600 text-white">Get Started</Button>
            </nav>
          </div>
        </motion.div>
      )}
    </motion.header>
  )
}
