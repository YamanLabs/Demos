'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion'
import {
   Zap, Cpu, Activity, Shield, Terminal as TerminalIcon,
   Settings, Database, Layers, BarChart3, ChevronRight,
   ArrowUpRight, AlertCircle, RefreshCw, Command,
   Search, Bell, Plus, Share2, Info, Maximize2,
   Code2, BrainCircuit, Network, Gauge, HardDrive, Filter
} from 'lucide-react'
import Link from 'next/link'
import DemoPopup from '@/components/DemoPopup'

// Types
interface NeuralNode {
   id: number
   x: number
   y: number
   type: 'Input' | 'Hidden' | 'Output'
   pulse: boolean
}

interface HardwareNode {
   id: number
   temp: number
   load: number
}

export default function VelocityForge() {
   const [activeModel, setActiveModel] = useState('Sentinel_v4.2')
   const [trainingStatus, setTrainingStatus] = useState<'IDLE' | 'TRAINING' | 'SYNCING'>('IDLE')
   const [accuracy, setAccuracy] = useState(94.2)
   const [loss, setLoss] = useState(0.042)
   const [nodes, setNodes] = useState<NeuralNode[]>([])
   const [hardware, setHardware] = useState<HardwareNode[]>([])
   const [logs, setLogs] = useState<string[]>([
      '[SYSTEM] Kernel initialized.',
      '[AUTH] Administrator access granted.',
      '[CORE] Neural paths ready for synthesis.'
   ])

   // Parallax / Mouse Effects
   const mouseX = useMotionValue(0)
   const mouseY = useMotionValue(0)
   const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
   const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

   useEffect(() => {
      // Generate Neural Nodes
      const initialNodes: NeuralNode[] = []
      const layers = [3, 5, 4, 2] // structure
      let count = 0
      layers.forEach((layerSize, layerIdx) => {
         for (let i = 0; i < layerSize; i++) {
            initialNodes.push({
               id: count++,
               x: 15 + layerIdx * 23,
               y: 20 + i * (60 / (layerSize - 1 || 1)) + (layerIdx % 2 === 0 ? 0 : 5),
               type: layerIdx === 0 ? 'Input' : layerIdx === layers.length - 1 ? 'Output' : 'Hidden',
               pulse: false
            })
         }
      })
      setNodes(initialNodes)

      // Generate Hardware Matrix
      const initialHardware: HardwareNode[] = Array.from({ length: 48 }, (_, i) => ({
         id: i,
         temp: 45 + Math.random() * 20,
         load: 10 + Math.random() * 80
      }))
      setHardware(initialHardware)

      const handleMouseMove = (e: MouseEvent) => {
         const { clientX, clientY } = e
         const { innerWidth, innerHeight } = window
         mouseX.set(clientX - innerWidth / 2)
         mouseY.set(clientY - innerHeight / 2)
      }
      const handleTouchMove = (e: TouchEvent) => {
         const touch = e.touches[0]
         const { innerWidth, innerHeight } = window
         mouseX.set(touch.clientX - innerWidth / 2)
         mouseY.set(touch.clientY - innerHeight / 2)
      }
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('touchmove', handleTouchMove, { passive: true })
      return () => {
         window.removeEventListener('mousemove', handleMouseMove)
         window.removeEventListener('touchmove', handleTouchMove)
      }
   }, [])

   // Training Simulation
   const startTraining = () => {
      if (trainingStatus === 'TRAINING') return
      setTrainingStatus('TRAINING')
      setLogs(prev => ['[ACTION] Starting Neural Synthesis...', ...prev].slice(0, 15))

      const interval = setInterval(() => {
         setAccuracy(a => Math.min(99.9, a + Math.random() * 0.1))
         setLoss(l => Math.max(0.001, l - Math.random() * 0.002))

         // Randomly pulse nodes
         setNodes(prev => prev.map(n => ({ ...n, pulse: Math.random() > 0.8 })))

         // Update hardware
         setHardware(prev => prev.map(h => ({
            ...h,
            temp: Math.min(95, h.temp + (Math.random() - 0.4) * 2),
            load: Math.min(100, Math.max(10, h.load + (Math.random() - 1) * 5))
         })))

         if (Math.random() > 0.95) {
            const msgs = ['Adjusting weights...', 'Optimizing gradients...', 'Layer 4 verified.', 'Token sync complete.']
            setLogs(prev => [`[CORE] ${msgs[Math.floor(Math.random() * msgs.length)]}`, ...prev].slice(0, 15))
         }
      }, 200)

      setTimeout(() => {
         clearInterval(interval)
         setTrainingStatus('IDLE')
         setLogs(prev => ['[SYSTEM] Synthesis Cycle Complete.', ...prev].slice(0, 15))
      }, 10000)
   }

   return (
      <div className="bg-[#050505] min-h-screen text-[#E2E8F0] font-mono selection:bg-[#00F2FF] selection:text-[#050505] relative overflow-hidden flex cursor-crosshair">
         <DemoPopup
            title="Velocity Core: High-Performance AI Interface"
            description="Hyper-futuristic UI design capability for deep tech, AI, or high-performance infrastructure companies. We materialize abstract concepts through neural network topologies and data flow simulations."
            features={[
               "AI Algorithm Simulation & Node Networks",
               "Medical-Grade Dark Mode for Hardware Interfaces",
               "Terminal-style Real-time Activity Logs"
            ]}
         />
         {/* Dynamic Grid Background */}
         <div
            className="absolute inset-0 opacity-20 pointer-events-none z-0"
            style={{
               backgroundImage: `radial-gradient(circle at 2px 2px, rgba(0, 242, 255, 0.15) 1px, transparent 0)`,
               backgroundSize: '40px 40px'
            }}
         />

         {/* Cyber Glows */}
         <motion.div
            style={{ x: springX, y: springY }}
            className="absolute w-[800px] h-[800px] bg-[#00F2FF]/5 rounded-full blur-[120px] pointer-events-none z-0 -translate-x-1/2 -translate-y-1/2"
         />

         {/* Navigation Sidebar */}
         <nav className="hidden lg:flex w-20 border-r border-white/5 bg-[#0A0A0A] flex-col items-center py-10 gap-8 relative z-50">
            <div className="w-12 h-12 bg-[#00F2FF]/10 rounded-xl flex items-center justify-center border border-[#00F2FF]/20 shadow-[0_0_20px_rgba(0,242,255,0.1)] group cursor-pointer hover:bg-[#00F2FF]/20 transition-all">
               <Cpu className="w-6 h-6 text-[#00F2FF] group-hover:scale-110 transition-transform" />
            </div>

            <div className="flex-1 flex flex-col gap-4">
               {[BrainCircuit, Network, Gauge, HardDrive, TerminalIcon, Settings].map((Icon, i) => (
                  <div key={i} className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-500 hover:text-[#00F2FF] hover:bg-white/5 transition-all cursor-pointer group">
                     <Icon className="w-5 h-5 group-active:scale-95 transition-transform" />
                  </div>
               ))}
            </div>
         </nav>

         {/* Main Control Forge */}
         <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
            <header className="h-14 md:h-20 border-b border-white/5 px-4 md:px-8 flex items-center justify-between bg-[#0A0A0A]/80 backdrop-blur-xl">
               <div className="flex items-center gap-4 md:gap-10">
                  <div className="flex items-center gap-2 md:gap-4">
                     <div className="w-2 h-2 rounded-full bg-[#00F2FF] shadow-[0_0_10px_#00F2FF]" />
                     <h1 className="text-sm md:text-xl font-black tracking-tighter uppercase">Velocity <span className="text-[#00F2FF]">Forge</span></h1>
                     <span className="hidden sm:inline px-2 py-0.5 border border-white/10 text-[9px] font-bold text-slate-500 rounded">v4.2.0-ALFA</span>
                  </div>

                  <div className="hidden lg:flex items-center gap-6">
                     <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg border border-white/10">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Active Model:</span>
                        <span className="text-[10px] text-[#00F2FF] font-bold">{activeModel}</span>
                        <ChevronRight className="w-3 h-3 text-slate-600" />
                     </div>
                     <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500">
                        <span className="flex items-center gap-1.5"><Activity className="w-3 h-3 text-emerald-500" /> LATENCY: 4ms</span>
                        <span className="flex items-center gap-1.5"><Database className="w-3 h-3 text-indigo-400" /> INF: 142k/s</span>
                     </div>
                  </div>
               </div>
            </header>

            <div className="flex-1 p-4 md:p-8 grid grid-cols-12 gap-4 md:gap-8 overflow-y-auto">
               <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                  <section className="flex-1 bg-[#0A0A0A] border border-white/5 rounded-3xl relative overflow-hidden flex flex-col group min-h-[500px]">
                     <div className="absolute top-8 left-8 flex items-center gap-3 z-20">
                        <div className="w-10 h-10 border border-[#00F2FF]/20 rounded-xl flex items-center justify-center bg-[#050505]">
                           <BrainCircuit className="w-5 h-5 text-[#00F2FF]" />
                        </div>
                        <div>
                           <h3 className="text-[13px] font-black tracking-widest text-[#00F2FF] uppercase">Neural Topology</h3>
                           <p className="text-[10px] text-slate-500 uppercase font-bold">Deep Learning Synthesis Hub</p>
                        </div>
                     </div>

                     <div className="flex-1 relative flex items-center justify-center">
                        <svg className="w-[80%] h-[70%] overflow-visible">
                           <AnimatePresence>
                              {nodes.map((node, i) => {
                                 const nextLayer = nodes.filter(n => n.x > node.x && n.x < node.x + 30)
                                 return nextLayer.map((target, j) => (
                                    <motion.line
                                       key={`${i}-${j}`}
                                       x1={`${node.x}%`} y1={`${node.y}%`}
                                       x2={`${target.x}%`} y2={`${target.y}%`}
                                       stroke={node.pulse ? '#00F2FF' : 'rgba(0, 242, 255, 0.05)'}
                                       strokeWidth={node.pulse ? 2 : 1}
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                    />
                                 ))
                              })}
                           </AnimatePresence>

                           {nodes.map(node => (
                              <g key={node.id}>
                                 <motion.circle
                                    cx={`${node.x}%`}
                                    cy={`${node.y}%`}
                                    r={node.type === 'Hidden' ? 3 : 5}
                                    fill={node.pulse ? '#00F2FF' : '#0F172A'}
                                    stroke={node.pulse ? '#00F2FF' : 'rgba(0, 242, 255, 0.3)'}
                                    strokeWidth={1}
                                    animate={node.pulse ? { r: [5, 8, 5], filter: ["blur(0px)", "blur(8px)", "blur(0px)"] } : {}}
                                 />
                                 {node.pulse && (
                                    <motion.circle
                                       cx={`${node.x}%`}
                                       cy={`${node.y}%`}
                                       r={15}
                                       fill="transparent"
                                       stroke="#00F2FF"
                                       strokeWidth={1}
                                       initial={{ scale: 0, opacity: 1 }}
                                       animate={{ scale: 2, opacity: 0 }}
                                       transition={{ duration: 0.8 }}
                                    />
                                 )}
                              </g>
                           ))}
                        </svg>

                        <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                           <div className="flex justify-between items-start">
                              <div className="text-[10px] text-slate-500 font-bold border-l-2 border-[#00F2FF] pl-4 uppercase tracking-[0.2em] bg-gradient-to-r from-[#00F2FF]/5 to-transparent py-2 pr-10 mt-16">Data_Ingestion_Layer</div>
                              <div className="text-[10px] text-slate-500 font-bold border-r-2 border-[#FF006B] pr-4 uppercase tracking-[0.2em] bg-gradient-to-l from-[#FF006B]/5 to-transparent py-2 pl-10 text-right mt-16">Inference_Output_Stream</div>
                           </div>
                           <div className="flex justify-center mb-8">
                              <div className="px-6 py-2 bg-[#050505]/80 border border-white/10 rounded-full text-[9px] font-black text-slate-400 tracking-[0.3em] uppercase backdrop-blur-md">Synthesis_Engine_Core_Active</div>
                           </div>
                        </div>
                     </div>

                     <div className="h-32 border-t border-white/5 bg-[#050505]/50 flex items-center px-10 justify-between">
                        <div className="flex gap-10">
                           <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-black text-slate-500 uppercase">Training_Step</span>
                              <span className="text-xl font-black text-white"># 42,069</span>
                           </div>
                           <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-black text-slate-500 uppercase">Loss_Divergence</span>
                              <span className="text-xl font-black text-[#FF006B]">0.00{Math.floor(loss * 1000)}</span>
                           </div>
                        </div>
                        <button
                           onClick={startTraining}
                           disabled={trainingStatus === 'TRAINING'}
                           className={`px-10 py-4 font-black rounded-2xl transition-all uppercase tracking-widest text-[11px] flex items-center gap-3 ${trainingStatus === 'TRAINING' ? 'bg-slate-800 text-slate-500 shadow-none' : 'bg-[#00F2FF] text-[#050505] shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:scale-105 active:scale-95'}`}
                        >
                           {trainingStatus === 'TRAINING' ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4 fill-current" />}
                           {trainingStatus === 'TRAINING' ? 'Synthesis_In_Progress' : 'Ignite_Synthesis'}
                        </button>
                     </div>
                  </section>

                  <section className="bg-[#0A0A0A] border border-white/5 p-8 rounded-3xl">
                     <div className="flex justify-between items-center mb-8">
                        <h3 className="text-[11px] font-black text-slate-300 uppercase tracking-widest flex items-center gap-3">
                           <HardDrive className="w-4 h-4 text-[#00F2FF]" /> H100_Cluster_Matrix
                        </h3>
                     </div>
                     <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-3">
                        {hardware.map(h => (
                           <div key={h.id} className="group relative">
                              <motion.div
                                 animate={{
                                    backgroundColor: h.temp > 85 ? 'rgba(255, 184, 0, 0.6)' : h.temp > 70 ? 'rgba(255, 184, 0, 0.3)' : 'rgba(0, 242, 255, 0.15)',
                                    boxShadow: h.temp > 85 ? '0 0 10px rgba(255, 184, 0, 0.3)' : '0 0 0px transparent'
                                 }}
                                 className="aspect-square rounded-md border border-white/5 cursor-crosshair transition-all"
                              />
                           </div>
                        ))}
                     </div>
                  </section>
               </div>

               <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                  <div className="bg-[#0A0A0A] border border-white/5 p-10 rounded-3xl flex flex-col items-center">
                     <h3 className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-10 w-full text-left flex items-center gap-2">
                        <Gauge className="w-4 h-4 text-[#00F2FF]" /> Synthesis_Precision
                     </h3>

                     <div className="relative w-48 h-48 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                           <circle cx="96" cy="96" r="80" stroke="rgba(255,255,255,0.05)" strokeWidth="12" fill="none" />
                           <motion.circle
                              cx="96" cy="96" r="80"
                              stroke="#00F2FF" strokeWidth="12" fill="none"
                              strokeDasharray="502"
                              strokeDashoffset={502 - (502 * (accuracy / 100))}
                              strokeLinecap="round"
                              initial={{ strokeDashoffset: 502 }}
                              animate={{ strokeDashoffset: 502 - (502 * (accuracy / 100)) }}
                           />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-4xl font-black text-white tracking-tighter">%{accuracy.toFixed(1)}</span>
                           <span className="text-[9px] font-black text-[#00F2FF] uppercase tracking-widest">Confidence</span>
                        </div>
                     </div>
                  </div>

                  <div className="bg-[#111111] border border-white/5 p-8 rounded-3xl h-[280px] flex flex-col font-mono text-[10px] relative group">
                     <div className="flex justify-between items-center mb-6">
                        <h4 className="text-[9px] font-black text-[#00F2FF] uppercase tracking-[0.3em]">SYNTHESIS_STREAM</h4>
                        <div className="flex gap-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-red-500/50 animate-pulse" />
                           <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                        </div>
                     </div>
                     <div className="flex-1 overflow-y-auto space-y-2.5 custom-scrollbar uppercase">
                        {logs.map((log, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                              className={`border-l-2 p-1 pl-4 ${log.includes('[ERROR]') ? 'border-[#FF006B] text-[#FF006B]/80' : log.includes('[ACTION]') ? 'border-[#FFB800] text-[#FFB800]/80' : 'border-[#00F2FF]/40 text-slate-400'}`}
                           >
                              {log}
                           </motion.div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </main>

         <style jsx global>{`
        body { background-color: #050505; color: #E2E8F0; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0, 242, 255, 0.2); border-radius: 10px; }
      `}</style>
      </div>
   )
}
