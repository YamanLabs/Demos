'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useRef, useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, MousePointer2, Layers, Hexagon, Maximize2 } from 'lucide-react'

import DemoPopup from '@/components/DemoPopup'

// Particle Component for high-performance background
const Particles = ({ count = 40 }) => {
   const [mounted, setMounted] = useState(false)
   useEffect(() => setMounted(true), [])

   const particles = useMemo(() => {
      return Array.from({ length: count }).map((_, i) => ({
         id: i,
         x: Math.random() * 100,
         y: Math.random() * 100,
         size: Math.random() * 2 + 1,
         duration: Math.random() * 20 + 20,
         delay: Math.random() * -20
      }))
   }, [count])

   if (!mounted) return null

   return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {particles.map((p) => (
            <motion.div
               key={p.id}
               className="absolute rounded-full bg-white/10"
               style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
               }}
               animate={{
                  y: [0, -100, 0],
                  opacity: [0.1, 0.4, 0.1],
               }}
               transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "linear"
               }}
            />
         ))}
      </div>
   )
}

// Custom Cursor Trail Unit
const CursorTrail = () => {
   const mouseX = useMotionValue(-100)
   const mouseY = useMotionValue(-100)

   const springs = [
      useSpring(mouseX, { stiffness: 1000, damping: 60 }),
      useSpring(mouseY, { stiffness: 1000, damping: 60 }),
      useSpring(mouseX, { stiffness: 500, damping: 40 }),
      useSpring(mouseY, { stiffness: 500, damping: 40 }),
      useSpring(mouseX, { stiffness: 250, damping: 30 }),
      useSpring(mouseY, { stiffness: 250, damping: 30 }),
      useSpring(mouseX, { stiffness: 125, damping: 20 }),
      useSpring(mouseY, { stiffness: 125, damping: 20 }),
   ]

   useEffect(() => {
      const handleMove = (e: MouseEvent) => {
         mouseX.set(e.clientX)
         mouseY.set(e.clientY)
      }
      window.addEventListener('mousemove', handleMove)
      return () => window.removeEventListener('mousemove', handleMove)
   }, [])

   return (
      <>
         <motion.div
            style={{ x: springs[0], y: springs[1] }}
            className="fixed top-0 left-0 w-4 h-4 rounded-full border border-white/40 pointer-events-none z-[1000] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
         >
            <div className="w-1 h-1 bg-white rounded-full" />
         </motion.div>
         {[2, 4, 6].map((idx) => (
            <motion.div
               key={idx}
               style={{ x: springs[idx], y: springs[idx + 1] }}
               className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white/10 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2"
            />
         ))}
      </>
   )
}

export default function AuraZenith() {
   const [isHovered, setIsHovered] = useState<number | null>(null)
   const [synthesisActive, setSynthesisActive] = useState(false)

   const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null])
   const sandboxRef = useRef<HTMLDivElement | null>(null)

   useEffect(() => {
      const cleanups: (() => void)[] = []
      cardRefs.current.forEach((card, i) => {
         if (!card) return
         let startX = 0, startY = 0, intent: 'scroll' | 'light' | null = null
         const onTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX
            startY = e.touches[0].clientY
            intent = null
         }
         const onTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0]
            const dx = Math.abs(touch.clientX - startX)
            const dy = Math.abs(touch.clientY - startY)
            if (intent === null && (dx > 5 || dy > 5)) {
               intent = dy > dx * 1.2 ? 'scroll' : 'light'
            }
            if (intent === 'scroll') return
            e.preventDefault()
            const rect = card.getBoundingClientRect()
            card.style.setProperty(`--card-x-${i}`, `${touch.clientX - rect.left}px`)
            card.style.setProperty(`--card-y-${i}`, `${touch.clientY - rect.top}px`)
         }
         const onTouchEnd = () => { intent = null }
         card.addEventListener('touchstart', onTouchStart, { passive: true })
         card.addEventListener('touchmove', onTouchMove, { passive: false })
         card.addEventListener('touchend', onTouchEnd, { passive: true })
         cleanups.push(() => {
            card.removeEventListener('touchstart', onTouchStart)
            card.removeEventListener('touchmove', onTouchMove)
            card.removeEventListener('touchend', onTouchEnd)
         })
      })
      return () => cleanups.forEach(fn => fn())
   }, [])

   useEffect(() => {
      const el = sandboxRef.current
      if (!el) return
      let startX = 0, startY = 0, intent: 'scroll' | 'light' | null = null
      const onTouchStart = (e: TouchEvent) => {
         startX = e.touches[0].clientX
         startY = e.touches[0].clientY
         intent = null
      }
      const onTouchMove = (e: TouchEvent) => {
         const touch = e.touches[0]
         const dx = Math.abs(touch.clientX - startX)
         const dy = Math.abs(touch.clientY - startY)
         if (intent === null && (dx > 5 || dy > 5)) {
            intent = dy > dx * 1.2 ? 'scroll' : 'light'
         }
         if (intent === 'scroll') return
         e.preventDefault()
         const rect = el.getBoundingClientRect()
         el.style.setProperty('--mouse-x', `${touch.clientX - rect.left}px`)
         el.style.setProperty('--mouse-y', `${touch.clientY - rect.top}px`)
      }
      const onTouchEnd = () => { intent = null }
      el.addEventListener('touchstart', onTouchStart, { passive: true })
      el.addEventListener('touchmove', onTouchMove, { passive: false })
      el.addEventListener('touchend', onTouchEnd, { passive: true })
      return () => {
         el.removeEventListener('touchstart', onTouchStart)
         el.removeEventListener('touchmove', onTouchMove)
         el.removeEventListener('touchend', onTouchEnd)
      }
   }, [])

   const [mounted, setMounted] = useState(false)
   const [isTouchDevice, setIsTouchDevice] = useState(false)
   useEffect(() => {
      setMounted(true)
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
   }, [])

   const rawMouseX = useMotionValue(0)
   const rawMouseY = useMotionValue(0)
   const springMouseX = useSpring(rawMouseX, { stiffness: 100, damping: 30 })
   const springMouseY = useSpring(rawMouseY, { stiffness: 100, damping: 30 })

   useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
         rawMouseX.set((e.clientX / window.innerWidth) * 100)
         rawMouseY.set((e.clientY / window.innerHeight) * 100)
      }
      const handleTouchMove = (e: TouchEvent) => {
         const touch = e.touches[0]
         rawMouseX.set((touch.clientX / window.innerWidth) * 100)
         rawMouseY.set((touch.clientY / window.innerHeight) * 100)
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      return () => {
         window.removeEventListener('mousemove', handleMouseMove)
         window.removeEventListener('touchmove', handleTouchMove)
      }
   }, [])

   return (
      <div className="bg-[#030303] min-h-[300vh] text-white font-sans selection:bg-white selection:text-black relative overflow-x-hidden">
         {mounted && !isTouchDevice && <CursorTrail />}
         <Particles count={isTouchDevice ? 20 : 60} />

         <DemoPopup
            title="Aura Zenith Engine"
            description="Experience the next generation of web interactivity. This engine combines refractive lighting, smart scroll logic, and generative visuals into a single performant experience."
            features={[
               "Autonomous Particle Simulation",
               "Smart Scroll-Intent Detection",
               "Interactive Light-Bending Sandbox"
            ]}
         />

         <nav className="fixed top-0 left-0 w-full h-24 flex items-center justify-between px-8 md:px-12 z-[100] mix-blend-difference pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-3 text-white/40 hover:text-white transition-all text-[11px] font-bold tracking-[0.4em] uppercase">
               Aura / Zenith
            </div>
            <div className="flex items-center gap-12 pointer-events-auto">
               <span className="text-[10px] font-black tracking-[0.5em] text-white/20 hidden md:block">AURORA_SYNTHESIS_ENGINE</span>
               <Link href="#sandbox" className="text-[10px] font-black tracking-[0.2em] hover:text-white transition-colors">SANDBOX</Link>
            </div>
         </nav>

         <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-12 px-4">
            <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40">
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,242,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,242,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] " />
               <svg className="w-full h-full p-10 md:p-20 absolute inset-0 mix-blend-screen" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                     <linearGradient id="auraGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00F2FF" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#00F2FF" stopOpacity="0.1" />
                     </linearGradient>
                     <filter id="hyperGlow">
                        <feGaussianBlur stdDeviation="8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                     </filter>
                  </defs>
                  {[...Array(6)].map((_, i) => (
                     <motion.ellipse
                        key={`ring-${i}`}
                        cx="500" cy="300"
                        rx={250 + i * 50} ry={100 + i * 20}
                        stroke="url(#auraGradient)"
                        strokeWidth={0.5 + (i * 0.2)}
                        strokeDasharray={`${5 + i * 5} ${10 + i * 5}`}
                        fill="none"
                        animate={{ rotateZ: 360, rotateX: [60, 45, 60] }}
                        transition={{ rotateZ: { duration: 60 + i * 10, repeat: Infinity, ease: "linear" }, rotateX: { duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut" } }}
                        style={{ transformOrigin: "500px 300px" }}
                     />
                  ))}
                  <motion.circle cx="500" cy="300" r="120" fill="url(#auraGradient)" filter="url(#hyperGlow)" animate={{ opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} />
               </svg>
               <motion.div
                  style={{
                     background: useTransform(
                        [springMouseX, springMouseY],
                        ([x, y]) => `radial-gradient(800px circle at ${x}% ${y}%, rgba(0, 242, 255, 0.15) 0%, transparent 60%)`
                     )
                  }}
                  className="absolute inset-0 pointer-events-none mix-blend-screen"
               />
            </div>

            <div className="relative z-20 text-center px-6">
               <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                  <h1 className="text-4xl md:text-[8rem] font-light tracking-tighter leading-none text-white">
                     Aura <span className="italic font-serif opacity-50 block mt-2">Zenith</span>
                  </h1>
                  <p className="mt-8 text-white/40 max-w-lg mx-auto text-sm md:text-lg tracking-widest uppercase font-mono">
                     Redefining Web Experiences
                  </p>
               </motion.div>
            </div>
         </section>

         <section className="relative z-30 bg-[#030303] flex flex-col gap-32 py-32">
            {[
               { title: "Sensory Design", desc: "Spaces are not just stone, but emotion. We shape the energy behind visual gaps.", count: "01", align: "left" },
               { title: "Light Mathematics", desc: "The algorithm of the perfect dance between shadow and light.", count: "02", align: "right" },
               { title: "Pure Presence", desc: "Where complexity ends, Zenith begins. We blend data and feeling.", count: "03", align: "center" }
            ].map((sec, i) => (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 100 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`w-full max-w-5xl mx-auto px-8 flex flex-col ${sec.align === 'center' ? 'items-center text-center' : sec.align === 'right' ? 'items-end text-right' : 'items-start text-left'}`}
               >
                  <span className="text-[10px] font-black tracking-[0.8em] text-[#00F2FF]/60 mb-6 font-mono border border-[#00F2FF]/20 px-4 py-2 rounded-full backdrop-blur-md">
                     {sec.count} / 03
                  </span>
                  <h2 className="text-4xl md:text-7xl font-light tracking-tighter leading-tight mb-6 text-white">
                     {sec.title.split(' ')[0]} <span className="italic font-serif opacity-40">{sec.title.split(' ')[1]}</span>
                  </h2>
                  <p className="max-w-md text-white/50 text-sm md:text-xl leading-relaxed font-light">
                     {sec.desc}
                  </p>
               </motion.div>
            ))}
         </section>

         <section className="py-40 px-8 md:px-24 bg-[#050505] relative z-40 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
               <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-24">
                  <div>
                     <h3 className="text-[12px] font-black tracking-[0.5em] text-[#00F2FF] mb-6 uppercase">The Sense Matrix</h3>
                     <h2 className="text-4xl md:text-7xl font-light tracking-tighter mb-8 max-w-2xl leading-[1.1]">Touch the <br /> <span className="italic font-serif">Light.</span></h2>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                     { title: "Refraction", icon: Layers, desc: "Breaking light rays through a virtual prism." },
                     { title: "Mirroring", icon: Maximize2, desc: "Symmetrical light reflection engine." },
                     { title: "Tactile", icon: Hexagon, desc: "Digital fabric reacting to your friction." },
                  ].map((card, i) => (
                     <motion.div
                        key={i}
                        onMouseEnter={() => setIsHovered(i)}
                        onMouseLeave={() => setIsHovered(null)}
                        onMouseMove={(e) => {
                           const rect = e.currentTarget.getBoundingClientRect()
                           const x = e.clientX - rect.left, y = e.clientY - rect.top
                           e.currentTarget.style.setProperty(`--card-x-${i}`, `${x}px`)
                           e.currentTarget.style.setProperty(`--card-y-${i}`, `${y}px`)
                        }}
                        ref={(el) => { cardRefs.current[i] = el as HTMLDivElement }}
                        className="group bg-[#080808] border border-white/5 rounded-2xl overflow-hidden relative h-[450px] touch-none"
                     >
                        <div className="absolute inset-0 bg-[#050505] z-0 overflow-hidden">
                           {/* Effect 0: Refraction */}
                           {i === 0 && (
                              <>
                                 <div className={`absolute inset-0 transition-opacity duration-300 ${isHovered === 0 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ background: `radial-gradient(200px circle at var(--card-x-0) var(--card-y-0), rgba(0, 242, 255, 0.4) 0%, transparent 100%)` }}
                                 />
                                 <div className={`absolute inset-0 transition-opacity duration-300 mix-blend-screen ${isHovered === 0 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ background: `radial-gradient(250px circle at calc(100% - var(--card-x-0)) calc(100% - var(--card-y-0)), rgba(255, 255, 255, 0.5) 0%, transparent 100%)` }}
                                 />
                                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-20 bg-white/5 backdrop-blur-xl -rotate-45 pointer-events-none transition-all duration-1000 mix-blend-overlay border-y border-white/10 ${isHovered === 0 ? 'opacity-100' : 'opacity-0'}`} />
                              </>
                           )}

                           {/* Effect 1: Mirroring */}
                           {i === 1 && (
                              <>
                                 <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10 opacity-50" />
                                 <div className={`absolute inset-0 transition-opacity duration-150 ${isHovered === 1 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ background: `radial-gradient(150px circle at var(--card-x-1) var(--card-y-1), rgba(255, 255, 255, 0.9) 0%, transparent 100%)` }}
                                 />
                                 <div className={`absolute inset-0 transition-opacity duration-150 ${isHovered === 1 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ background: `radial-gradient(150px circle at calc(100% - var(--card-x-1)) var(--card-y-1), rgba(0, 242, 255, 0.9) 0%, transparent 100%)` }}
                                 />
                                 <div className={`absolute inset-0 transition-opacity duration-500 mix-blend-overlay ${isHovered === 1 ? 'opacity-30' : 'opacity-0'}`}
                                    style={{ background: `linear-gradient(90deg, transparent calc(100% - var(--card-x-1)), rgba(255,255,255,0.5) 50%, transparent var(--card-x-1))` }}
                                 />
                              </>
                           )}

                           {/* Effect 2: Tactile Fabric */}
                           {i === 2 && (
                              <>
                                 <div className="absolute inset-0 opacity-20"
                                    style={{
                                       backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0px, transparent 1px, transparent 4px, rgba(0,242,255,0.05) 5px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.05) 0px, transparent 1px, transparent 4px, rgba(0,242,255,0.05) 5px)`,
                                       backgroundSize: '12px 12px'
                                    }}
                                 />
                                 <div className={`absolute inset-0 transition-opacity duration-300 mix-blend-color-dodge ${isHovered === 2 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ background: `radial-gradient(200px circle at var(--card-x-2) var(--card-y-2), rgba(0, 242, 255, 0.6) 0%, transparent 100%)` }}
                                 />
                                 <div className={`absolute inset-0 transition-opacity duration-100 mix-blend-overlay ${isHovered === 2 ? 'opacity-100' : 'opacity-0'}`}
                                    style={{
                                       background: `radial-gradient(60px circle at var(--card-x-2) var(--card-y-2), rgba(255,255,255,0.8) 0%, transparent 100%)`,
                                       boxShadow: `inset 0 0 100px rgba(0,0,0,0.8)`
                                    }}
                                 />
                              </>
                           )}
                        </div>
                        <div className="absolute inset-0 p-10 flex flex-col justify-between z-30">
                           <div className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                              <card.icon className="w-5 h-5" />
                           </div>
                           <div className="mix-blend-difference">
                              <h4 className="text-2xl font-black tracking-tight mb-2 uppercase">{card.title}</h4>
                              <p className="text-[11px] text-white/40 leading-relaxed group-hover:text-white transition-colors">{card.desc}</p>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <section id="sandbox" className="h-screen bg-[#030303] flex items-center justify-center relative border-t border-white/5 overflow-hidden">
            <div className="max-w-5xl w-full text-center px-8 relative z-20">
               <motion.div
                  onMouseMove={(e) => {
                     const rect = e.currentTarget.getBoundingClientRect()
                     const x = e.clientX - rect.left, y = e.clientY - rect.top
                     e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
                     e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
                  }}
                  ref={sandboxRef}
                  className="relative group p-8 md:p-24 border border-white/10 rounded-2xl md:rounded-[4rem] bg-[#050505] hover:border-white/20 transition-all overflow-hidden"
                  style={{ backgroundImage: `radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 242, 255, 0.15) 0%, transparent 40%)` }}
               >
                  <div className="relative z-20 mix-blend-difference">
                     <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6 text-white leading-tight">Manipulate <br /> <span className="text-[#00F2FF]">Light.</span></h2>
                     <button
                        onClick={() => setSynthesisActive(true)}
                        className="px-10 py-5 bg-white text-black font-black text-xs tracking-[0.3em] rounded-full hover:scale-105 active:scale-95 transition-all outline-none"
                     >
                        {synthesisActive ? 'SYNTHESIZING...' : 'START SIMULATION'}
                     </button>
                  </div>
               </motion.div>
            </div>
         </section>

         <footer className="py-40 bg-[#000000] border-t border-white/5 flex flex-col items-center justify-center text-center px-8 relative overflow-hidden">
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-white/5 mb-12 select-none">AURA SYSTEM.</h2>
            <p className="text-[10px] font-black tracking-[1em] text-white/30 uppercase">Silence is the new luxury</p>
         </footer>

         <style jsx global>{`
            body { background-color: #030303; }
            ::-webkit-scrollbar { width: 3px; }
            ::-webkit-scrollbar-track { background: transparent; }
            ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital@1&display=swap');
            .font-serif { font-family: 'Playfair Display', serif; }
         `}</style>
      </div>
   )
}
