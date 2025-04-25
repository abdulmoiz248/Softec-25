"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FolderProps {
  color?: string
  size?: number
  items?: React.ReactNode[]
  className?: string
  label: string
  mockContent?: React.ReactNode
  viewAllLabel?: string
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith("#") ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("")
  }
  const num = Number.parseInt(color, 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const Folder: React.FC<FolderProps> = ({
  color = "#00d8ff",
  size = 1,
  items = [],
  className = "",
  label,
  mockContent,
  viewAllLabel = "View All",
}) => {
  const maxItems = 3
  const papers = items.slice(0, maxItems)
  while (papers.length < maxItems) {
    papers.push(null)
  }

  const [open, setOpen] = useState(false)
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })),
  )

  const folderBackColor = darkenColor(color, 0.08)
  const paper1 = darkenColor("#ffffff", 0.1)
  const paper2 = darkenColor("#ffffff", 0.05)
  const paper3 = "#ffffff"

  const handleClick = () => {
    setOpen((prev) => !prev)
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
    }
  }

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.15
    const offsetY = (e.clientY - centerY) * 0.15
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: offsetX, y: offsetY }
      return newOffsets
    })
  }

  const handlePaperMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets((prev) => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: 0, y: 0 }
      return newOffsets
    })
  }

  const folderStyle: React.CSSProperties = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as React.CSSProperties

  // Outer scale style
  const scaleStyle = { transform: `scale(${size})` }

  const getOpenTransform = (index: number) => {
    if (index === 0) return "translate(-120%, -70%) rotate(-15deg)"
    if (index === 1) return "translate(10%, -70%) rotate(15deg)"
    if (index === 2) return "translate(-50%, -100%) rotate(5deg)"
    return ""
  }

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div style={scaleStyle}>
        <div
          className={`group relative transition-all duration-200 ease-in cursor-pointer ${
            !open ? "hover:-translate-y-2" : ""
          }`}
          style={{
            ...folderStyle,
            transform: open ? "translateY(-8px)" : undefined,
          }}
          onClick={handleClick}
        >
          <div
            className="relative w-[150px] h-[120px] rounded-tl-0 rounded-tr-[15px] rounded-br-[15px] rounded-bl-[15px]"
            style={{ backgroundColor: folderBackColor }}
          >
            <span
              className="absolute z-0 bottom-[98%] left-0 w-[45px] h-[15px] rounded-tl-[7px] rounded-tr-[7px] rounded-bl-0 rounded-br-0"
              style={{ backgroundColor: folderBackColor }}
            ></span>
            {/* Render papers */}
            {papers.map((item, i) => {
              let sizeClasses = ""
              if (i === 0) sizeClasses = open ? "w-[70%] h-[80%]" : "w-[70%] h-[80%]"
              if (i === 1) sizeClasses = open ? "w-[80%] h-[80%]" : "w-[80%] h-[70%]"
              if (i === 2) sizeClasses = open ? "w-[90%] h-[80%]" : "w-[90%] h-[60%]"

              const transformStyle = open
                ? `${getOpenTransform(i)} translate(${paperOffsets[i].x}px, ${paperOffsets[i].y}px)`
                : undefined

              return (
                <div
                  key={i}
                  onMouseMove={(e) => handlePaperMouseMove(e, i)}
                  onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                  className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                    !open ? "transform -translate-x-1/2 translate-y-[10%] group-hover:translate-y-0" : "hover:scale-110"
                  } ${sizeClasses}`}
                  style={{
                    ...(!open ? {} : { transform: transformStyle }),
                    backgroundColor: i === 0 ? paper1 : i === 1 ? paper2 : paper3,
                    borderRadius: "10px",
                  }}
                >
                  {item}
                </div>
              )
            })}
            <div
              className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
                !open ? "group-hover:[transform:skew(15deg)_scaleY(0.6)]" : ""
              }`}
              style={{
                backgroundColor: color,
                borderRadius: "5px 15px 15px 15px",
                ...(open && { transform: "skew(15deg) scaleY(0.6)" }),
              }}
            ></div>
            <div
              className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
                !open ? "group-hover:[transform:skew(-15deg)_scaleY(0.6)]" : ""
              }`}
              style={{
                backgroundColor: color,
                borderRadius: "5px 15px 15px 15px",
                ...(open && { transform: "skew(-15deg) scaleY(0.6)" }),
              }}
            ></div>
          </div>
        </div>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-lg font-medium text-white z-1"
      >
        {label}
      </motion.span>

      <AnimatePresence>
        {open && mockContent && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
          >
            <div className="p-4">{mockContent}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, x: 5 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center mt-4 text-sm font-medium text-white/80 transition-colors hover:text-white"
      >
        {viewAllLabel}
        <ArrowRight className="w-4 h-4 ml-1" />
      </motion.button>
    </div>
  )
}

export default Folder
