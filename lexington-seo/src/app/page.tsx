'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Sparkles, ArrowRight, ArrowLeft, Bookmark, Globe, TrendingUp, ShieldCheck, Cpu, Terminal, BarChart2, Radio, Zap, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import DemoPopup from '@/components/DemoPopup'

// Real-world Enterprise AI & Digital Transformation Data Series
const oracleArticles = [
  {
    id: 1,
    title: 'Agentic AI: The Future of Autonomous Workflows',
    category: 'Artificial Intelligence',
    desc: 'Beyond simple chatbots—the rise of Multi-Agent Systems (MAS) that plan and manage complex business processes autonomously.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600',
    size: 'large',
    keywords: ['ai', 'autonomous', 'agent', 'workflow', 'future'],
    fullContent: 'In 2025, the corporate AI world is evolving from simple chat interfaces to autonomous acting agents. Agentic AI can take a human-provided complex command, break it into smaller tasks, and finish them using various tools on its own.'
  },
  {
    id: 2,
    title: 'Hyperautomation: Intelligent Decision Augmentation',
    category: 'Digital Transformation',
    desc: 'The convergence of AI, ML, and RPA components to not just automate business processes, but to make intelligent decisions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600',
    size: 'medium',
    keywords: ['automation', 'transformation', 'hyperautomation', 'rpa', 'enterprise'],
    fullContent: 'Hyperautomation allows an organization to systematically identify and automate every possible business process. This doesn\'t just increase efficiency—it maximizes operational flexibility at the highest level.'
  },
  {
    id: 3,
    title: 'Cyber Resilience & Zero-Trust Architecture',
    category: 'Security',
    desc: 'AI-powered threat detection and the "never trust, always verify" philosophy against increasing digital risks.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600',
    size: 'medium',
    keywords: ['security', 'cyber', 'zero-trust', 'data', 'protection', 'ai'],
    fullContent: 'Modern security strategies are now built on resilience, not just defense. Zero-trust architecture mandates that every user and device be continuously verified, aiming to prevent leaks before they happen.'
  },
  {
    id: 4,
    title: 'Data Fabric: Breaking Down Data Silos',
    category: 'Data Analysis',
    desc: 'Intelligent data fabric architectures that unify data across hybrid and multi-cloud environments, making it accessible instantly.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600',
    size: 'wide',
    keywords: ['data', 'cloud', 'analytics', 'fabric', 'architecture'],
    fullContent: 'Data silos are one of the biggest hurdles for digital transformation. Data Fabric architecture unifies data from different sources under a virtual layer, enabling real-time analysis across the whole organization.'
  }
]

const PREMIUM_TRANSITION = { type: "tween" as const, ease: [0.16, 1, 0.3, 1] as any, duration: 0.6 }
const SNAPPY_TRANSITION = { type: "tween" as const, ease: [0.22, 1, 0.36, 1] as any, duration: 0.4 }

// Specialized Keywords for Semantic X-Ray Mode
const oracleKeywords: Record<string, string> = {
  'Agentic AI': 'A group of AI agents that not only plan but autonomously execute complex tasks.',
  'Zero-Trust': 'A security model that never trusts by default and verifies every access request.',
  'Hyperautomation': 'The end-to-end autonomous transformation of every business process using AI.',
  'Data Fabric': 'Intelligent data architecture that merges fragmented data into a single virtual layer.',
  'Multimodal': 'Systems capable of processing different data types like text, image, and voice simultaneously.',
  'Artificial Intelligence': 'A suite of algorithms that mimic human intelligence and improve through data.',
  'CRO': 'Conversion Rate Optimization - Expertise in maximizing user conversions.'
}

const DataGlobe = () => {
  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center pointer-events-none select-none">
      {[1, 2, 3].map((r) => (
        <motion.div key={r} animate={{ rotate: 360 }} transition={{ duration: 10 + r * 5, repeat: Infinity, ease: "linear" }} className="absolute border border-[#0a192f]/5 rounded-full" style={{ width: `${r * 33}%`, height: `${r * 33}%` }} />
      ))}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 4, repeat: Infinity }} className="absolute w-12 h-12 bg-amber-800/20 rounded-full blur-xl" />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <motion.circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" className="text-[#0a192f]/10" strokeWidth="0.5" strokeDasharray="1 4" animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />
      </svg>
      <Globe className="w-8 h-8 text-[#0a192f]/20" />
    </div>
  )
}

const SemanticText = ({ text, active, onTermClick }: { text: string, active: boolean, onTermClick: (term: string) => void }) => {
  if (!active) return <>{text}</>
  let components: any[] = []
  let lastIndex = 0
  const keys = Object.keys(oracleKeywords).sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${keys.join('|')})`, 'gi')
  text.replace(pattern, (match, p1, offset) => {
    components.push(text.substring(lastIndex, offset))
    components.push(
      <motion.span
        key={offset}
        initial={{ backgroundColor: 'rgba(251, 191, 36, 0)' }}
        animate={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', textShadow: '0 0 8px rgba(251, 191, 36, 0.5)' }}
        onClick={(e) => { e.stopPropagation(); onTermClick(match); }}
        className="cursor-help border-b border-amber-500/50 font-bold px-0.5 rounded-sm transition-all hover:bg-amber-500/20"
      >
        {match}
      </motion.span>
    )
    lastIndex = offset + match.length
    return match
  })
  components.push(text.substring(lastIndex))
  return <>{components}</>
}

const QuantumOverlay = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-50 bg-[#0a192f] flex flex-col items-center justify-center p-12 overflow-hidden">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {Array.from({ length: 25 }).map((_, i) => (
          <motion.div key={i} initial={{ y: -500 }} animate={{ y: [null, 1500] }} transition={{ duration: 1.5 + (i % 5) * 0.4, repeat: Infinity, ease: "linear", delay: (i % 3) * 0.2 }} className="absolute text-[8px] font-mono text-amber-500/30 whitespace-nowrap" style={{ left: `${i * 4}%` }}>
            {Array.from({ length: 80 }).map(() => Math.floor(Math.random() * 2)).join('')}
          </motion.div>
        ))}
      </div>
      <div className="relative z-10 text-center">
        <div className="flex items-center gap-4 justify-center mb-8">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}><Terminal className="w-12 h-12 text-amber-500" /></motion.div>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">Oracle_Scanning</h3>
        </div>
        <p className="text-amber-500/60 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">Cross-referencing data libraries... Synthesizing insights...</p>
      </div>
    </motion.div>
  )
}

const OracleTooltip = ({ term, onClose }: { term: string, onClose: () => void }) => {
  return (
    <motion.div initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }} transition={SNAPPY_TRANSITION} className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-lg bg-white border-t-[6px] border-[#0a192f] p-8 shadow-2xl rounded-sm">
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-300 hover:text-[#0a192f] transition-colors"><ChevronRight className="w-5 h-5 rotate-90" /></button>
      <div className="flex items-center gap-3 mb-4"><Sparkles className="w-4 h-4 text-amber-700" /><h4 className="font-sans font-bold text-[10px] uppercase tracking-[0.3em] text-[#0a192f]">Oracle Insight</h4></div>
      <h3 className="text-2xl font-black mb-3 text-[#0a192f]">{term}</h3>
      <p className="text-slate-500 font-serif leading-relaxed italic">{oracleKeywords[term] || "No strategic deep-dive defined for this term yet."}</p>
    </motion.div>
  )
}

const SelectedArticleView = ({ article, activeXRay, onTermClick, onClose }: { article: any, activeXRay: boolean, onTermClick: (term: string) => void, onClose: () => void }) => {
  return (
    <motion.div layoutId={`article-${article.id}`} initial={{ scale: 0.9, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 100 }} transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }} className="fixed inset-0 z-[2000] bg-[#fcfaf8] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-20 relative">
        <button onClick={onClose} className="fixed top-12 right-12 z-[2001] p-4 bg-[#0a192f] text-white rounded-full shadow-2xl hover:scale-110 transition-transform"><X className="w-6 h-6" /></button>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="mb-12">
            <span className="text-amber-800 font-sans text-xs font-black tracking-[0.5em] uppercase mb-6 block">{article.category}</span>
            <h1 className="text-5xl md:text-7xl font-black text-[#0a192f] tracking-tighter leading-[0.9] mb-12">{article.title}</h1>
            <div className="w-24 h-1 bg-[#0a192f] mb-12" />
          </div>
          <div className="aspect-video w-full overflow-hidden rounded-sm mb-16 shadow-2xl"><img src={article.image} alt={article.title} className="w-full h-full object-cover" /></div>
          <div className="prose prose-2xl prose-slate font-serif text-[#0a192f] max-w-none">
            <p className="text-3xl leading-relaxed font-light mb-12 italic border-l-8 border-slate-100 pl-10 text-slate-500"><SemanticText text={article.desc} active={activeXRay} onTermClick={onTermClick} /></p>
            <div className="text-xl leading-[1.8] space-y-8 first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#0a192f]"><SemanticText text={article.fullContent} active={activeXRay} onTermClick={onTermClick} /></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function LexingtonOracle() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [filteredArticles, setFilteredArticles] = useState(oracleArticles)
  const [oracleInsight, setOracleInsight] = useState<{ summary: string, matches: number } | null>(null)
  const [activeTab, setActiveTab] = useState('AGENDA')
  const [xRayActive, setXRayActive] = useState(false)
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    setIsSearching(true)
    setOracleInsight(null)
    setTimeout(() => {
      setIsSearching(false)
      const matches = oracleArticles.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredArticles(matches)
      setOracleInsight({
        summary: matches.length > 0 ? `Our AI analyzed "${searchQuery}". We predict this trend will drive a 12.4% productivity leap in the enterprise world by 2026.` : `No direct Oracle Insight found for "${searchQuery}". Try fundamental concepts like AI, Data, or Security.`,
        matches: matches.length
      })
    }, 1200)
  }

  return (
    <div className="bg-[#fcfaf8] min-h-screen text-[#0a192f] font-serif selection:bg-[#cbd5e1] relative cursor-default overflow-x-hidden">
      <motion.div animate={{ scale: selectedArticle ? 0.98 : 1, filter: selectedArticle ? 'blur(4px)' : 'blur(0px)', opacity: selectedArticle ? 0.7 : 1 }} transition={PREMIUM_TRANSITION} className="relative z-10">
        <DemoPopup title="Lexington Oracle: News & Editorial Hub" description="Typographic excellence for high-volume content platforms. A UX/UI architecture designed to feel both vintage and innovative, optimized for focused reading." features={["Pure Typography Focused Design", "Density-Optimized Grid System", "Semantic X-Ray Insight Mode"]} />
        <div className="bg-[#0a192f] text-white py-2.5 flex items-center overflow-hidden relative z-[101]">
          <div className="flex items-center gap-12 whitespace-nowrap animate-marquee px-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-12">
                <div className="flex items-center gap-4"><Radio className="w-3 h-3 text-red-500 animate-pulse" /><span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase">LIVE: ENT_AI INDEX +1.4% ▲</span></div>
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase">SYSTEMS: ORACLE HUB ONLINE</span>
                <span className="text-[10px] font-sans font-bold tracking-[0.2em] uppercase">QUARTERLY REPORT: Q3 GROWTH +12%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-8 flex justify-between items-center relative z-50">
           <div className="flex bg-[#0a192f]/5 p-1 rounded-sm gap-1 border border-black/5">
            {['AGENDA', 'STRATEGY', 'TECH', 'ANALYTICS'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[9px] font-sans font-bold tracking-widest uppercase transition-all ${activeTab === tab ? 'bg-white text-[#0a192f] shadow-sm' : 'text-slate-400 hover:text-[#0a192f]'}`}>{tab}</button>
            ))}
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 relative z-10">
          <header className="mb-20 flex flex-col items-center text-center border-b border-slate-100 pb-16 relative">
            <div className="absolute top-0 right-0 opacity-20 -translate-y-1/2 translate-x-1/4"><DataGlobe /></div>
            <div className="flex items-center gap-3 mb-6 bg-white shadow-sm border border-slate-100 px-4 py-1.5 rounded-full"><Sparkles className="w-4 h-4 text-amber-700" /><span className="font-sans text-[9px] font-black tracking-[0.4em] uppercase text-slate-600">Enterprise Intelligence Framework</span></div>
            <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] text-[#0a192f] mb-8">LEXINGTON <span className="text-slate-200 italic font-medium font-serif">ORACLE.</span></h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-2xl italic font-serif">Strategic depth and enterprise intelligence portal, enhanced by core AI synthesis.</p>
          </header>

          <section className="mb-24">
            <div className="bg-white p-1 rounded-sm shadow-sm border border-slate-200 flex flex-col md:flex-row gap-2">
              <form onSubmit={handleSearch} className="flex-1 flex items-center px-6 relative">
                <Search className="w-5 h-5 text-slate-300 mr-4" />
                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Agentic AI, Cyber Resilience, Data Fabric..." className="w-full bg-transparent py-6 text-2xl md:text-3xl font-serif text-[#0a192f] focus:outline-none placeholder:text-slate-200" />
                <button type="submit" disabled={isSearching} className="bg-[#0a192f] text-white px-8 py-4 font-sans text-[10px] font-bold tracking-widest uppercase rounded-sm hover:bg-slate-800 transition-colors disabled:opacity-30 absolute right-4">{isSearching ? 'SCANNING' : 'QUERY'}</button>
              </form>
            </div>
            <div className="flex justify-between items-center mt-6">
               <div className="flex gap-4">{['#AgentAI', '#ZeroTrust', '#DataFabric'].map(tag => <button key={tag} className="text-[10px] font-sans font-black text-slate-400 hover:text-[#0a192f] uppercase tracking-widest">{tag}</button>)}</div>
               <button onClick={() => setXRayActive(!xRayActive)} className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${xRayActive ? 'bg-amber-800/10 border-amber-800 text-amber-800' : 'bg-white border-slate-200 text-slate-400 opacity-60'}`}><Sparkles className="w-3.5 h-3.5" /><span className="text-[10px] font-black tracking-[0.2em] uppercase">SEMANTIC X-RAY {xRayActive ? 'ON' : 'OFF'}</span></button>
            </div>
            {oracleInsight && (
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-[#0a192f] text-white p-12 mt-12 rounded-sm border-l-[12px] border-amber-800 shadow-2xl relative">
                <h3 className="font-sans font-bold uppercase tracking-widest text-[10px] text-amber-500 mb-6">Strategic Oracle Synthesis</h3>
                <p className="text-2xl md:text-4xl leading-tight font-light font-serif mb-12">"{oracleInsight.summary}"</p>
                <div className="flex justify-between items-center border-t border-white/10 pt-8 text-[9px] font-sans font-bold uppercase tracking-widest">
                   <div className="flex gap-12"><div>MATCH RATE: {oracleInsight.matches * 20}%</div><div>STATUS: ACTIVE</div></div>
                </div>
              </motion.div>
            )}
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-24">
              {filteredArticles.map((article) => (
                <article key={article.id} onClick={() => setSelectedArticle(article)} className="group cursor-pointer">
                  <div className="aspect-[21/9] w-full overflow-hidden rounded-sm mb-10 relative">
                    <img src={article.image} className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000" alt={article.title} />
                    <div className="absolute bottom-6 left-6 p-4">
                       <span className="bg-amber-800 text-white px-3 py-1.5 text-[8px] font-sans font-bold tracking-[0.2em] uppercase mb-4 inline-block">FEATURED SYNTHESIS</span>
                       <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none">{article.title}</h2>
                    </div>
                  </div>
                  <p className="text-2xl text-slate-600 font-light font-serif leading-relaxed italic border-l-4 border-slate-200 pl-8"><SemanticText text={article.desc} active={xRayActive} onTermClick={setActiveTooltip} /></p>
                </article>
              ))}
            </div>
            <aside className="lg:col-span-4 space-y-12">
               <div className="bg-[#0a192f] text-white p-10 rounded-sm">
                  <h4 className="text-[10px] font-sans font-bold tracking-[0.3em] uppercase text-slate-500 mb-8 pb-4 border-b border-white/10">Market Pulse</h4>
                  {[{label: 'ADOPTION', val: '82%'}, {label: 'RISK', val: '41%'}].map(p => (
                    <div key={p.label} className="mb-6"><div className="flex justify-between text-[9px] mb-2 font-bold uppercase tracking-widest"><span>{p.label}</span><span>{p.val}</span></div><div className="h-0.5 bg-white/10"><div className="h-full bg-amber-500" style={{width: p.val}} /></div></div>
                  ))}
               </div>
            </aside>
          </div>
        </main>

        <footer className="bg-[#0a192f] text-white mt-32 py-24 px-12 text-center">
           <h2 className="text-4xl font-black tracking-tight mb-8">LEXINGTON ORACLE.</h2>
           <p className="text-white/20 text-[10px] font-sans font-bold tracking-[0.5em] uppercase">Enterprise Strategy & Technology Sourced by Yaman Labs</p>
        </footer>
      </motion.div>

      <AnimatePresence>{selectedArticle && <SelectedArticleView article={selectedArticle} activeXRay={xRayActive} onTermClick={setActiveTooltip} onClose={() => setSelectedArticle(null)} />}</AnimatePresence>
      <AnimatePresence>{activeTooltip && <OracleTooltip term={activeTooltip} onClose={() => setActiveTooltip(null)} />}</AnimatePresence>

      <style jsx global>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        body { background-color: #fcfaf8; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
      `}</style>
    </div>
  )
}
