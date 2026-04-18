'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, ShieldCheck, Sparkles, ChevronRight, Info } from 'lucide-react'

interface DemoPopupProps {
  title: string
  description: string
  features: string[]
}

export default function DemoPopup({ title, description, features }: DemoPopupProps) {
  const [isOpen, setIsOpen] = useState(true)

  if (!isOpen) return (
     <motion.button
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ opacity: 1, scale: 1 }}
       onClick={() => setIsOpen(true)}
       className="fixed bottom-6 left-6 z-[9999] w-12 h-12 bg-[#111827] text-white rounded-full flex items-center justify-center shadow-2xl border border-white/10 hover:bg-blue-600 transition-colors"
     >
        <Info className="w-6 h-6" />
     </motion.button>
  )

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0F172A] text-white rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          <div className="h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 relative">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
             <div className="absolute -bottom-8 left-10 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-600/40">
                <Sparkles className="w-8 h-8 text-white" />
             </div>
             <button 
               onClick={() => setIsOpen(false)}
               className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
             >
                <X className="w-5 h-5 text-white/60" />
             </button>
          </div>

          <div className="p-10 pt-14">
            <h3 className="text-3xl font-black tracking-tight mb-4 flex items-center gap-3">
               {title}
               <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] uppercase tracking-widest rounded-full border border-blue-600/30">Showcase</span>
            </h3>
            <p className="text-slate-400 leading-relaxed text-lg mb-8">
              {description}
            </p>

            <div className="space-y-4 mb-10">
               <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">Key Features</p>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                       <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0" />
                       <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <button 
                 onClick={() => setIsOpen(false)}
                 className="flex-1 px-8 py-4 bg-white text-[#0F172A] font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
               >
                  Explore Demo
                  <ChevronRight className="w-4 h-4" />
               </button>
               <a 
                 href="https://yamanlabs.com" 
                 target="_blank"
                 className="flex-1 px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
               >
                  Main Site
                  <ExternalLink className="w-4 h-4 opacity-40" />
               </a>
            </div>

            <p className="mt-8 text-center text-[11px] text-slate-500 font-medium">
               This is a decoupled standalone version of the original showcase.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
