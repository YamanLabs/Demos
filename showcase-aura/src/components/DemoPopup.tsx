'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { X, Info, ChevronRight } from 'lucide-react'

interface DemoPopupProps {
  title: string
  description: string
  features: string[]
}

export default function DemoPopup({ title, description, features }: DemoPopupProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 50, y: -20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="fixed top-28 right-8 z-[9999] w-[380px] bg-[#050505]/95 backdrop-blur-3xl border border-white/10 p-6 rounded-2xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), 0 0 20px rgba(0, 242, 255, 0.05)' }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00F2FF]/50 to-transparent opacity-50" />
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 mb-4">
             <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#00F2FF]">
               <div className="flex items-center justify-center">
                 <Info className="w-4 h-4" />
               </div>
             </div>
             <div>
                <div className="text-[9px] font-black tracking-[0.3em] text-[#00F2FF] uppercase mb-1">
                   Showcase Demo
                </div>
                <h3 className="text-sm font-bold tracking-tight text-white uppercase">
                  {title}
                </h3>
             </div>
          </div>

          <p className="text-[12px] text-white/60 leading-relaxed font-light mb-6 border-l border-white/10 pl-3">
            {description}
          </p>

          <div className="space-y-2">
            {features.map((feature, idx) => (
               <div key={idx} className="flex items-start gap-2 text-[11px] text-white/40">
                  <ChevronRight className="w-3 h-3 text-white/20 mt-0.5 shrink-0" />
                  <span className="leading-snug">{feature}</span>
               </div>
            ))}
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="mt-6 w-full py-2 bg-white/5 hover:bg-white/10 border border-white/5 rounded-lg text-[10px] font-black tracking-[0.2em] text-white transition-colors"
          >
            UNDERSTOOD, EXPLORE
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
