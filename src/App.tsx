import React, { useState, useMemo } from 'react';
import { 
  Cpu, 
  Workflow, 
  Zap, 
  Shield, 
  Search, 
  Settings, 
  Bell, 
  ChevronRight,
  ChevronLeft,
  Gavel,
  Scale,
  Users,
  FileText,
  BadgeCheck,
  Download,
  Loader2,
  MapPin,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LegalTool {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
}

const CATEGORIES = [
  { id: 'all', label: 'All Tools', icon: Workflow },
  { id: 'criminal', label: 'Criminal Law', icon: Shield },
  { id: 'civil', label: 'Civil Law', icon: Scale },
  { id: 'family', label: 'Family Law', icon: Users },
  { id: 'general', label: 'General', icon: FileText },
];

const TOOLS: LegalTool[] = [
  {
    id: 'bail-gen',
    title: 'Smart Bail Generator',
    category: 'criminal',
    description: 'AI-assisted bail application drafting with automated citation matching.',
    icon: Gavel
  },
  {
    id: '22a-pet',
    title: '22-A Petition',
    category: 'criminal',
    description: 'Direct petition generator for registration of FIR and police compliance.',
    icon: Shield
  },
  {
    id: 'stay-order',
    title: 'Stay Order Application',
    category: 'civil',
    description: 'Urgent stay order drafting for property and civil disputes.',
    icon: Scale
  },
  {
    id: 'khula-pet',
    title: 'Khula Petition',
    category: 'family',
    description: 'Streamlined family court petition drafting for dissolution of marriage.',
    icon: Users
  },
  {
    id: 'doc-analyzer',
    title: 'Legal Document Analyzer',
    category: 'general',
    description: 'Upload legal documents to extract key clauses and risk factors instantly.',
    icon: FileText
  }
];

type AppView = 'dashboard' | 'tool-form';

export default function App() {
  const [view, setView] = useState<AppView>('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTool, setActiveTool] = useState<LegalTool | null>(null);
  
  // Form State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleLaunchTool = (tool: LegalTool) => {
    if (tool.id === 'bail-gen') {
      setActiveTool(tool);
      setView('tool-form');
    } else {
      // Logic for other tools can be added later
      alert(`${tool.title} is coming soon in Phase 3!`);
    }
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    setActiveTool(null);
    setIsProcessing(false);
    setIsSuccess(false);
  };

  const handleGeneratePDF = () => {
    setIsProcessing(true);
    // Simulated 3 second delay for "AI Generation"
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 3000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 blur-[120px] rounded-full" />

      {/* Navigation Top Bar */}
      <header className="absolute top-0 left-0 w-full h-20 px-12 flex items-center justify-between z-50 transition-all">
        <div className="flex items-center gap-4 cursor-pointer" onClick={handleBackToDashboard}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            MK Legal <span className="font-light text-slate-400">Hub</span>
          </h1>
        </div>

        {view === 'dashboard' && (
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            {CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`transition-colors relative py-1 ${selectedCategory === cat.id ? 'text-blue-600' : 'hover:text-slate-800'}`}
              >
                {cat.label}
                {selectedCategory === cat.id && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 h-10 bg-white/40 backdrop-blur-md rounded-full pl-10 pr-4 text-xs border border-white focus:outline-none focus:w-64 transition-all"
            />
          </div>
          <button className="relative w-10 h-10 rounded-full border border-white bg-white/40 flex items-center justify-center hover:bg-white transition-colors">
            <Bell size={18} className="text-slate-600" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="relative z-10 w-full h-full pt-24 px-12 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto pb-20"
            >
              <header className="mb-12">
                <h2 className="text-4xl font-bold text-slate-800 mb-2 font-serif">Smart Tools</h2>
                <p className="text-slate-500">Select a specialized intelligence module to begin automated legal drafting.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool, idx) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => handleLaunchTool(tool)}
                    className="glass-panel p-8 rounded-[2.5rem] cursor-pointer group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-300 mb-6">
                      <tool.icon className="text-blue-500 w-8 h-8 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-6">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Launch Module</span>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool-form"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="max-w-4xl mx-auto pb-20"
            >
              {/* Form Navigation */}
              <button 
                onClick={handleBackToDashboard}
                className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 mb-8 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-colors">
                  <ChevronLeft size={18} />
                </div>
                Back to Dashboard
              </button>

              <div className="glass-panel p-10 rounded-[3rem] relative overflow-hidden">
                {isProcessing ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-20 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-8 relative">
                      <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-blue-100/50 rounded-full -z-10"
                      />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">Processing Intelligence</h3>
                    <p className="text-slate-500 max-w-sm">Analyzing legal grounds, matching precedents, and formatting CrPC document according to <b>{activeTool?.title}</b> standards...</p>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-20 flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 text-green-500">
                      <BadgeCheck size={64} className="animate-in zoom-in-50 duration-500" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Generation Successful</h3>
                    <p className="text-slate-500 mb-10 max-w-sm">Your court-ready PDF is ready for review and submission. All citation matches verified.</p>
                    <button className="cta-neo-glow h-16 px-12 rounded-full flex items-center gap-4 group">
                      <Download size={20} className="text-blue-600 group-hover:translate-y-1 transition-transform" />
                      <span className="text-sm font-bold text-slate-700 tracking-wide">Download Court-Ready PDF</span>
                    </button>
                    <button 
                      onClick={handleBackToDashboard}
                      className="mt-6 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      Draft New Application
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <header className="mb-12">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center">
                          <Gavel className="text-blue-600 w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 font-serif">{activeTool?.title}</h2>
                      </div>
                      <p className="text-slate-500">Provide the required details below. Our AI Virtual Clerk will format the application automatically.</p>
                    </header>

                    <form className="space-y-12" onSubmit={(e) => { e.preventDefault(); handleGeneratePDF(); }}>
                      {/* Section: Court Information */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <MapPin size={18} className="text-blue-500" />
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Court Information</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Court Type</label>
                            <select className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSIjOTQvYjIzIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==')] bg-[length:16px] bg-[right_1.5rem_center] bg-no-repeat transition-all">
                              <option>Sessions Court</option>
                              <option>High Court</option>
                              <option>Magistrate Court</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">District / City</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Lahore / Islamabad"
                              required
                              className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all placeholder:text-slate-300"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Section: Bail Specification */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <Clock size={18} className="text-blue-500" />
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Bail Specification</h4>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Type of Application</label>
                          <div className="flex gap-4">
                            {['Pre-Arrest (498 CrPC)', 'Post-Arrest (497 CrPC)'].map((type) => (
                              <label key={type} className="flex-1 cursor-pointer">
                                <input type="radio" name="bailType" className="sr-only peer" defaultChecked={type.includes('Pre')} />
                                <div className="h-14 flex items-center justify-center border border-slate-100 rounded-2xl bg-white/50 peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 transition-all text-sm font-medium text-slate-600">
                                  {type}
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </section>

                      {/* Section: Personal Details */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <Users size={18} className="text-blue-500" />
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Accused Information</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Accused Full Name</label>
                            <input 
                              type="text" 
                              required
                              className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Father's Name</label>
                            <input 
                              type="text" 
                              required
                              className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Section: Case Details */}
                      <section>
                        <div className="flex items-center gap-2 mb-6">
                          <FileText size={18} className="text-blue-500" />
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">FIR Case Details</h4>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          <div className="lg:col-span-2 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Police Station</label>
                            <input type="text" className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">FIR NO.</label>
                            <input type="number" className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Year</label>
                            <input type="number" defaultValue="2024" className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                          <div className="lg:col-span-4 space-y-2">
                            <label className="text-[10px] font-bold text-slate-400 uppercase ml-2 tracking-wider">Offence Sections (PPC)</label>
                            <input placeholder="e.g. 302 / 324 / 34 PPC" type="text" className="w-full h-14 bg-white/50 border border-slate-100 rounded-2xl px-6 text-sm focus:outline-none focus:border-blue-400 transition-all" />
                          </div>
                        </div>
                      </section>

                      {/* Footer CTA */}
                      <footer className="pt-10 flex flex-col items-center">
                        <button 
                          type="submit"
                          className="cta-neo-glow h-16 w-full max-w-lg rounded-full flex items-center justify-center gap-4 group hover:-translate-y-1 transition-transform"
                        >
                          < Zap className="text-blue-500 w-5 h-5 group-hover:fill-blue-500 group-hover:scale-110 transition-all" />
                          <span className="text-sm font-extrabold text-slate-700 tracking-wide">⚡ Generate Legal PDF</span>
                        </button>
                        <p className="mt-4 text-[10px] text-slate-400 uppercase tracking-widest">Aura Intelligence Engine · Ver 1.4.2</p>
                      </footer>
                    </form>
                  </>
                )}
                
                {/* Decorative Flow Decor */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100/30 blur-[100px] pointer-events-none rounded-full" />
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[9px] font-bold text-green-700 uppercase tracking-tighter">AI Core Online</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Navigation (Optional) */}
      <footer className="absolute bottom-6 w-full text-center px-12 z-50 pointer-events-none opacity-50">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.5em]">Automated & Effortless · MK Legal Hub</p>
      </footer>
    </div>
  );
}
