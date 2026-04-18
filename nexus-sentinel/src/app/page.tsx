'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { 
  ShieldCheck, Cpu, Activity, ArrowLeft, Sparkles, Database, Zap, Globe, Compass, 
  Terminal as TerminalIcon, BarChart3, Settings, ShieldAlert, Layers, Command, Search,
  TrendingUp, Users, MoreHorizontal, RefreshCw, Eye, Trash2, Bell, Menu, X, ChevronDown, ChevronRight,
  PieChart, Briefcase, FileText, CheckCircle2, Clock, AlertCircle, Plus, Info, Download, Filter, 
  UserPlus, Mail, Phone, ExternalLink
} from 'lucide-react'
import Link from 'next/link'
import DemoPopup from '@/components/DemoPopup'

type ProjectStatus = 'Active' | 'Planned' | 'Completed'
interface Project {
  id: string
  name: string
  category: string
  progress: number
  status: ProjectStatus
  lead: string
  startDate: string
  priority: 'Low' | 'Medium' | 'High'
}

interface TeamMember {
  name: string
  role: string
  projects: number
  mail: string
  status: 'Online' | 'Offline'
}

type ActiveMetric = 'CRO' | 'CTR' | 'RoAS' | 'Tests'
type TimeRange = '24H' | '7D' | '30D'

export default function NexusSentinel() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMetric, setActiveMetric] = useState<ActiveMetric>('CRO')
  const [timeRange, setTimeRange] = useState<TimeRange>('30D')
  
  // Modals States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  
  const [newProject, setNewProject] = useState({ name: '', category: 'CRO' })
  const [newMember, setNewMember] = useState({ name: '', role: '', mail: '' })

  const [projects, setProjects] = useState<Project[]>([
    { id: 'PRJ-001', name: 'E-Commerce Conversion Optimization', category: 'CRO', progress: 75, status: 'Active', lead: 'Burak Y.', startDate: '12.04.2026', priority: 'High' },
    { id: 'PRJ-002', name: 'Corporate Identity Refresh', category: 'Branding', progress: 100, status: 'Completed', lead: 'Selin A.', startDate: '01.03.2026', priority: 'Medium' },
    { id: 'PRJ-003', name: 'Performance Marketing Campaign', category: 'Ads', progress: 40, status: 'Active', lead: 'Oğuzhan K.', startDate: '20.04.2026', priority: 'High' },
    { id: 'PRJ-004', name: 'SEO Infrastructure Analysis', category: 'Technical SEO', progress: 10, status: 'Planned', lead: 'Merve G.', startDate: '01.05.2026', priority: 'Low' },
    { id: 'PRJ-005', name: 'User Experience (UX) Research', category: 'Design', progress: 60, status: 'Active', lead: 'Caner D.', startDate: '15.04.2026', priority: 'Medium' },
  ])

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: 'Burak Yaman', role: 'Founder / Manager', projects: 12, mail: 'burak@yamanlabs.com', status: 'Online' },
    { name: 'Selin Arıkan', role: 'Creative Director', projects: 8, mail: 'selin@yamanlabs.com', status: 'Online' },
    { name: 'Oğuzhan Kaya', role: 'Performance Specialist', projects: 15, mail: 'oguz@yamanlabs.com', status: 'Online' },
    { name: 'Merve Gür', role: 'SEO Strategist', projects: 6, mail: 'merve@yamanlabs.com', status: 'Offline' },
    { name: 'Caner Demir', role: 'UX/UI Designer', projects: 9, mail: 'caner@yamanlabs.com', status: 'Online' },
  ])

  const [notifications, setNotifications] = useState<string[]>([])
  const [isTesting, setIsTesting] = useState(false)
  const [logs, setLogs] = useState<string[]>([
    'System protocols initialized.',
    'Data nodes synchronized.',
    'Nexus Sentinel dashboard ready.'
  ])

  // Chart Data Paths for different ranges
  const chartPaths = {
    '24H': "M0,180 L80,170 L160,190 L240,150 L320,160 L400,140 L480,155 L560,145 L640,150 L720,135 L800,140",
    '7D': "M0,200 L115,190 L230,120 L345,150 L460,80 L575,110 L690,60 L805,90",
    '30D': "M0,200 L100,180 L200,190 L300,140 L400,160 L500,100 L600,120 L700,80 L800,100"
  }

  const chartLabels = {
    '24H': ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    '7D': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    '30D': ['Apr 01', 'Apr 08', 'Apr 15', 'Apr 22', 'Apr 30']
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e
    const { innerWidth, innerHeight } = window
    mouseX.set(clientX - innerWidth / 2)
    mouseY.set(clientY - innerHeight / 2)
  }

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 5))
    setTimeout(() => setNotifications(prev => prev.filter(n => n !== msg)), 5000)
  }

  // --- Actions ---
  const addProject = () => {
    if (!newProject.name) return
    const id = `PRJ-${Math.floor(Math.random() * 900) + 100}`
    const p: Project = {
      id,
      name: newProject.name,
      category: newProject.category,
      progress: 0,
      status: 'Planned',
      lead: 'Admin',
      startDate: new Date().toLocaleDateString('en-US'),
      priority: 'Medium'
    }
    setProjects(prev => [p, ...prev])
    addNotification(`${p.name} successfully added.`)
    setIsAddModalOpen(false)
    setNewProject({ name: '', category: 'CRO' })
  }

  const addMember = () => {
    if (!newMember.name || !newMember.mail) return
    const m: TeamMember = {
      name: newMember.name,
      role: newMember.role || 'Developer',
      projects: 0,
      mail: newMember.mail,
      status: 'Online'
    }
    setTeamMembers(prev => [m, ...prev])
    addNotification(`${m.name} joined the team!`)
    setIsMemberModalOpen(false)
    setNewMember({ name: '', role: '', mail: '' })
  }

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id))
    addNotification('Project archived/deleted.')
  }

  const openDetail = (project: Project) => {
    setSelectedProject(project)
    setIsDetailModalOpen(true)
  }

  const [refreshingId, setRefreshingId] = useState<string | null>(null)
  const refreshProject = (id: string) => {
    setRefreshingId(id)
    setTimeout(() => {
      setProjects(prev => prev.map(p => p.id === id ? { ...p, progress: Math.min(100, p.progress + Math.floor(Math.random() * 10)) } : p))
      setRefreshingId(null)
      addNotification('Project data synchronized.')
    }, 1500)
  }

  const runTestSequence = () => {
    setIsTesting(true)
    const sequences = [
      'Analyzing sitemap...',
      'Testing mobile visibility...',
      'Conversion barriers detected (3 items).',
      'Generating AI recommendations...',
      'TEST COMPLETE: Conversion score can be increased by 12%.'
    ]
    
    sequences.forEach((msg, i) => {
      setTimeout(() => {
        setLogs(prev => [msg, ...prev].slice(0, 10))
        if(i === sequences.length - 1) setIsTesting(false)
      }, 800 * (i + 1))
    })
  }

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getMetricPrefix = () => {
     if (activeMetric === 'CRO' || activeMetric === 'CTR') return '%'
     if (activeMetric === 'RoAS') return 'x'
     return ''
  }

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="bg-[#F9FAFB] min-h-screen text-[#111827] font-sans selection:bg-blue-100 selection:text-blue-600 relative overflow-hidden flex cursor-default"
    >
      <DemoPopup 
         title="Nexus Sentinel: B2B Dashboard"
         description="Our vision for enterprise SaaS and complex B2B platforms. See how we transform hundreds of data points into a clean, modern, and high-performance interface."
         features={[
           "Modular Monochrome Design Language",
           "Minimal Dashboard Architecture for Complex Charts",
           "Real-time Notification and Activity Simulation"
         ]}
      />
      
      <motion.div 
        style={{ 
          background: useTransform(
            [springX, springY], 
            ([x, y]) => `radial-gradient(1000px circle at calc(50% + ${x}px) calc(50% + ${y}px), rgba(37, 99, 235, 0.04), transparent 80%)`
          )
        }}
        className="fixed inset-0 pointer-events-none z-0"
      />

      <aside className={`hidden lg:flex flex-col border-r border-[#E5E7EB] bg-white relative z-[100] transition-all duration-500 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
         <div className="h-20 flex items-center px-6 mb-8 border-b border-[#F3F4F6]">
            <div onClick={() => setSidebarOpen(!sidebarOpen)} className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center cursor-pointer shadow-lg shadow-blue-600/20 shrink-0">
               <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            {sidebarOpen && <span className="ml-4 font-black tracking-tighter text-2xl text-blue-600 uppercase">Nexus<span className="text-[#111827]">Sentinel</span></span>}
         </div>

         <nav className="flex-1 px-4 space-y-1">
            {[
              { label: 'Dashboard', icon: BarChart3 },
              { label: 'Projects', icon: Briefcase },
              { label: 'Performance', icon: Activity },
              { label: 'Analysis', icon: Database },
              { label: 'Team', icon: Users },
              { label: 'Reports', icon: FileText }
            ].map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => setActiveTab(item.label)}
                className={`flex items-center h-11 px-4 rounded-xl cursor-pointer transition-all ${activeTab === item.label ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-[#F3F4F6] text-[#6B7280] hover:text-[#111827]'}`}
              >
                 <item.icon className="w-5 h-5 shrink-0" />
                 {sidebarOpen && <span className="ml-4 text-[13px] tracking-wide">{item.label}</span>}
              </div>
            ))}
         </nav>

         <div className="p-4 border-t border-[#F3F4F6] space-y-1">
            <div 
              onClick={() => setActiveTab('Settings')}
              className={`flex items-center h-11 px-4 rounded-xl cursor-pointer transition-all ${activeTab === 'Settings' ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-[#F3F4F6] text-[#6B7280]'}`}
            >
               <Settings className="w-5 h-5" />
               <span className={sidebarOpen ? 'ml-4 text-[13px]' : 'hidden'}>Settings</span>
            </div>
            <div className="flex items-center px-4 py-4 gap-3 bg-[#F9FAFB] rounded-2xl mt-4 border border-[#F3F4F6]">
               <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0">AD</div>
               {sidebarOpen && (
                 <div className="overflow-hidden">
                    <p className="text-[12px] font-bold text-[#111827] truncate">Admin User</p>
                    <p className="text-[10px] text-[#6B7280] truncate">System Hub</p>
                 </div>
               )}
            </div>
         </div>
      </aside>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] z-[200] flex justify-around py-3 px-4">
        {[
          { label: 'Dashboard', icon: BarChart3 },
          { label: 'Projects', icon: Briefcase },
          { label: 'Team', icon: Users },
        ].map(({ label, icon: Icon }) => (
          <button key={label} onClick={() => setActiveTab(label)} className={`flex flex-col items-center gap-1 text-[9px] font-bold uppercase tracking-widest transition-colors ${activeTab === label ? 'text-blue-600' : 'text-[#9CA3AF]'}`}>
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <div className="flex-1 flex flex-col relative z-50 overflow-hidden">
        <header className="h-14 md:h-20 border-b border-[#E5E7EB] px-4 md:px-10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-[60]">
           <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-[12px] font-medium text-[#6B7280]">
                 <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>Nexus Hub</span>
                 <ChevronRight className="w-3 h-3" />
                 <span className="text-[#111827] font-bold">{activeTab}</span>
              </div>
              <div className="hidden md:flex items-center gap-3 bg-[#F3F4F6] px-5 py-2 rounded-xl border border-transparent focus-within:border-blue-600/20 focus-within:bg-white transition-all group">
                 <Search className="w-4 h-4 text-[#9CA3AF]" />
                 <input 
                  type="text" 
                  placeholder="Search..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none text-[12px] focus:outline-none w-64 text-[#111827]" 
                 />
              </div>
           </div>
           
           <div className="flex items-center gap-6">
              <div className="relative p-2 rounded-xl hover:bg-[#F3F4F6] cursor-pointer transition-colors" onClick={() => addNotification('All notifications read.')}>
                 <Bell className="w-5 h-5 text-[#6B7280]" />
                 {notifications.length > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white" />}
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-2.5 bg-[#111827] text-white text-[12px] font-bold rounded-xl transition-all shadow-xl shadow-black/10 hover:bg-[#1E293B] flex items-center gap-2"
              >
                 <Plus className="w-4 h-4" /> New Entry
              </button>
           </div>
        </header>

        <main className="p-4 md:p-10 flex flex-col gap-6 md:gap-10 overflow-y-auto max-h-[calc(100vh-56px)] lg:max-h-[calc(100vh-80px)] pb-20 lg:pb-4">
           {activeTab === 'Dashboard' && (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { key: 'CRO', label: 'Conversion Rate', value: '3.84%', trend: '+1.2%', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { key: 'CTR', label: 'Click-Through Rate', value: '18.2%', trend: '+0.5%', icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { key: 'RoAS', label: 'Average RoAS', value: '4.2x', trend: 'Stable', icon: PieChart, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { key: 'Tests', label: 'Data Samples', value: '1.2M', trend: '+200k', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50' }
                  ].map((stat, i) => (
                    <div 
                      key={i} 
                      onClick={() => setActiveMetric(stat.key as ActiveMetric)}
                      className={`bg-white border p-7 rounded-2xl hover:shadow-xl hover:shadow-black/5 transition-all cursor-pointer group ${activeMetric === stat.key ? 'border-blue-600 ring-4 ring-blue-600/5' : 'border-[#E5E7EB]'}`}
                    >
                       <div className="flex justify-between items-start mb-5">
                          <div className={`w-11 h-11 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-all group-hover:scale-110`}>
                             <stat.icon className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'text-emerald-600 bg-emerald-50' : 'text-[#6B7280] bg-[#F3F4F6]'}`}>{stat.trend}</span>
                       </div>
                       <p className="text-[12px] font-medium text-[#6B7280] mb-1">{stat.label}</p>
                       <h3 className="text-3xl font-black text-[#111827] tracking-tight">{stat.value}</h3>
                    </div>
                  ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  <div className="lg:col-span-8 bg-white border border-[#E5E7EB] p-8 rounded-3xl relative overflow-hidden flex flex-col min-h-[480px]">
                     <div className="flex justify-between items-center mb-10">
                        <div>
                           <h3 className="text-xl font-bold text-[#111827] mb-1">{activeMetric} Analysis</h3>
                           <p className="text-[12px] text-[#6B7280]">Real-time data for the last {timeRange}.</p>
                        </div>
                        <div className="flex bg-[#F3F4F6] p-1 rounded-xl">
                           {(['24H', '7D', '30D'] as TimeRange[]).map(t => (
                             <button 
                              key={t} 
                              onClick={() => setTimeRange(t)}
                              className={`px-5 py-2 text-[11px] font-bold rounded-lg transition-all ${t === timeRange ? 'bg-white text-[#111827] shadow-sm' : 'text-[#9CA3AF] hover:text-[#111827]'}`}
                             >
                               {t}
                             </button>
                           ))}
                        </div>
                     </div>
                     <div className="flex-1 relative w-full flex flex-col pb-8">
                        <div className="absolute left-0 top-0 bottom-12 w-12 flex flex-col justify-between text-[10px] font-bold text-[#D1D5DB] pointer-events-none">
                           <span>100{getMetricPrefix()}</span>
                           <span>0{getMetricPrefix()}</span>
                        </div>
                        <div className="flex-1 relative ml-12 border-l border-b border-[#F3F4F6]">
                           <svg className="w-full h-full overflow-visible">
                              <defs>
                                 <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                                 </linearGradient>
                              </defs>
                              <motion.path 
                                 key={`${activeMetric}-${timeRange}`}
                                 initial={{ pathLength: 0, opacity: 0 }}
                                 animate={{ pathLength: 1, opacity: 1 }}
                                 transition={{ duration: 1.2, ease: "easeInOut" }}
                                 d={chartPaths[timeRange]} 
                                 fill="none" stroke="#2563EB" strokeWidth="4" strokeLinecap="round" 
                               />
                              <motion.path 
                                key={`area-${activeMetric}-${timeRange}`}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                d={`${chartPaths[timeRange]} V250 H0 Z`} fill="url(#areaGradient)" 
                              />
                           </svg>
                        </div>
                        <div className="ml-12 mt-4 flex justify-between text-[10px] font-bold text-[#D1D5DB]">
                           {chartLabels[timeRange].map((l, i) => <span key={i}>{l}</span>)}
                        </div>
                     </div>
                  </div>

                  <div className="lg:col-span-4 flex flex-col gap-8">
                     <div className="bg-white border border-[#E5E7EB] p-8 rounded-3xl">
                        <h4 className="text-[13px] font-bold text-[#111827] mb-6 flex items-center gap-2">
                           <Sparkles className="w-4 h-4 text-amber-500" /> Autonomous Growth Engine
                        </h4>
                        <div className="space-y-4">
                           <button 
                            onClick={runTestSequence}
                            disabled={isTesting}
                            className={`w-full py-4 text-white font-bold text-[12px] rounded-2xl transition-all shadow-lg ${isTesting ? 'bg-slate-300 shadow-none' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'}`}
                           >
                             {isTesting ? 'ANALYZING...' : 'START SYSTEM SCAN'}
                           </button>
                           <button onClick={() => addNotification('Exporting project data to PDF...')} className="w-full py-4 border border-[#E5E7EB] text-[#111827] font-bold text-[12px] rounded-2xl hover:bg-[#F9FAFB] transition-all flex items-center justify-center gap-2">
                             <Download className="w-4 h-4" /> EXPORT REPORT
                           </button>
                        </div>
                     </div>

                     <div className="bg-[#111827] p-8 rounded-3xl flex-1 flex flex-col font-mono text-[11px] relative overflow-hidden h-[240px]">
                        <div className="flex items-center gap-3 mb-6 text-[#9CA3AF]">
                           <TerminalIcon className="w-4 h-4" />
                           <span className="font-bold tracking-widest text-[9px] uppercase">NEXUS_KERNEL</span>
                        </div>
                        <div className="space-y-3 overflow-hidden">
                           {logs.map((log, i) => (
                             <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className="text-[#9CA3AF]">
                               <span className="text-blue-400">{'>'}</span> {log}
                             </motion.p>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
             </>
           )}

           {activeTab === 'Projects' && (
              <div className="bg-white border border-[#E5E7EB] rounded-3xl overflow-hidden mb-20 shadow-sm animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="p-8 border-b border-[#F3F4F6] flex justify-between items-center bg-[#F9FAFB]/50">
                  <div>
                    <h3 className="text-lg font-bold text-[#111827] mb-1">Current Projects</h3>
                    <p className="text-[12px] text-[#6B7280]">Total {filteredProjects.length} entries shown.</p>
                  </div>
                </div>
                <div className="hidden lg:block">
                  <table className="w-full text-left text-[13px]">
                    <thead>
                      <tr className="bg-[#F9FAFB] text-[#6B7280] font-bold border-b border-[#E5E7EB]">
                        <th className="px-8 py-5">TITLE</th>
                        <th className="px-8 py-5">CATEGORY</th>
                        <th className="px-8 py-5">PROGRESS</th>
                        <th className="px-8 py-5">STATUS</th>
                        <th className="px-8 py-5 text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F3F4F6]">
                      {filteredProjects.map(proj => (
                        <tr key={proj.id} className="hover:bg-[#F9FAFB] transition-colors group">
                          <td className="px-8 py-6">
                            <div className="font-bold text-[#111827]">{proj.name}</div>
                            <div className="text-[10px] text-[#9CA3AF] font-mono">{proj.id}</div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-[#F3F4F6] rounded-lg text-[11px] font-medium text-[#4B5563]">{proj.category}</span>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <div className="w-24 h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                                <motion.div animate={{ width: `${proj.progress}%` }} className={`h-full ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`} />
                              </div>
                              <span className="text-[#6B7280] font-bold text-[11px]">{proj.progress}%</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${proj.status === 'Active' ? 'text-blue-600 bg-blue-50' : proj.status === 'Completed' ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50'}`}>
                              {proj.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2 group-hover:opacity-100 opacity-0 transition-opacity">
                              <button onClick={() => openDetail(proj)} className="p-2 border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                              <button onClick={() => deleteProject(proj.id)} className="p-2 border border-[#E5E7EB] rounded-lg text-[#6B7280] hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
           )}

           {activeTab === 'Team' && (
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="text-2xl font-black text-[#111827]">Operations Team</h3>
                   <button onClick={() => setIsMemberModalOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl text-[12px] font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">
                      <UserPlus className="w-4 h-4" /> ADD TEAM MEMBER
                   </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                   {teamMembers.map((member, i) => (
                     <div key={i} className="bg-white border border-[#E5E7EB] p-8 rounded-3xl hover:shadow-xl hover:shadow-black/5 transition-all group">
                        <div className="flex items-start justify-between mb-8">
                           <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center font-black text-xl text-blue-600">
                              {member.name.split(' ').map(n => n[0]).join('')}
                           </div>
                           <div className={`px-3 py-1 text-[10px] font-bold rounded-lg uppercase tracking-widest ${member.status === 'Online' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
                              {member.status}
                           </div>
                        </div>
                        <h4 className="text-lg font-bold text-[#111827] mb-1">{member.name}</h4>
                        <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-6">{member.role}</p>
                        <div className="space-y-3 mb-8">
                           <div className="flex items-center gap-3 text-sm text-[#4B5563]">
                              <Mail className="w-4 h-4 text-[#9CA3AF]" /> <span>{member.mail}</span>
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
           )}
        </main>
      </div>

      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 md:p-12">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-[#0a0a0b]/40 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white p-12 rounded-[3rem] shadow-2xl w-full max-w-lg border border-[#E5E7EB]">
                <h3 className="text-2xl font-black text-[#111827] mb-10">New Entry</h3>
                <div className="mt-12 flex gap-4">
                   <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 font-bold text-[12px] text-slate-400 hover:bg-[#F3F4F6] rounded-2xl transition-all">CANCEL</button>
                   <button onClick={() => setIsAddModalOpen(false)} className="flex-1 py-4 bg-blue-600 text-white font-bold text-[12px] rounded-2xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all">SAVE</button>
                </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-[400]">
         <AnimatePresence>
            {notifications.map((msg, i) => (
              <motion.div 
                key={msg + i}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-[#111827] text-white px-7 py-5 rounded-2xl shadow-2xl flex items-center gap-5 font-bold text-[13px] border border-white/10"
              >
                 <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                 {msg}
              </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.1); border-radius: 10px; }
        body { background-color: #F9FAFB; }
      `}</style>
    </div>
  )
}
