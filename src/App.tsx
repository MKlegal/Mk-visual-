import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Workflow, 
  Zap, 
  Shield, 
  Search, 
  Settings, 
  Bell, 
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  Activity,
  Layers
} from 'lucide-react';
import { motion, useAnimation } from 'motion/react';

interface Node {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  x: number;
  y: number;
}

const NODES: Node[] = [
  { 
    id: 'intake', 
    title: 'Smart Intake', 
    description: 'AI-powered data extraction from unstructured sources.', 
    icon: LayoutGrid,
    x: 15, y: 30
  },
  { 
    id: 'analysis', 
    title: 'Contextual Analysis', 
    description: 'Deep semantic mapping of legal and technical requirements.', 
    icon: Cpu,
    x: 45, y: 15
  },
  { 
    id: 'drafting', 
    title: 'Automated Drafting', 
    description: 'Template generation with real-time compliance checks.', 
    icon: Workflow,
    x: 45, y: 55
  },
  { 
    id: 'compliance', 
    title: 'Verification', 
    description: 'Multi-layer security and audit trail generation.', 
    icon: Shield,
    x: 75, y: 35
  }
];

export default function App() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG Line paths
  const getPath = (start: Node, end: Node) => {
    return `M ${start.x}% ${start.y}% C ${start.x + 10}% ${start.y}%, ${end.x - 10}% ${end.y}%, ${end.x}% ${end.y}%`;
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-200/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-200/20 blur-[120px] rounded-full" />

      {/* Navigation Top Bar */}
      <header className="absolute top-0 left-0 w-full h-20 px-12 flex items-center justify-between z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="text-white w-6 h-6 fill-white" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">
            Aura <span className="font-light text-slate-400">Workflow</span>
          </h1>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          <a href="#" className="text-blue-600">Dashboard</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Flow Builder</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Analytics</a>
          <a href="#" className="hover:text-slate-800 transition-colors">Resources</a>
        </nav>

        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search..."
              className="w-48 h-10 bg-white/40 backdrop-blur-md rounded-full pl-10 pr-4 text-xs border border-white focus:outline-none focus:w-64 transition-all"
            />
          </div>
          <button className="relative w-10 h-10 rounded-full border border-white bg-white/40 flex items-center justify-center hover:bg-white transition-colors">
            <Bell size={18} className="text-slate-600" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </header>

      {/* Workflow Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none" ref={containerRef}>
        <svg className="w-full h-full opacity-40">
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>
          
          {/* Connection Lines */}
          <path 
            className="flow-line transition-all duration-700" 
            d={getPath(NODES[0], NODES[1])} 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="3" 
            strokeDasharray="10 5"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
          </path>
          <path 
            className="flow-line" 
            d={getPath(NODES[0], NODES[2])} 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="3" 
            strokeDasharray="10 5"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
          </path>
          <path 
            className="flow-line" 
            d={getPath(NODES[1], NODES[3])} 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="3" 
            strokeDasharray="10 5"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
          </path>
          <path 
            className="flow-line" 
            d={getPath(NODES[2], NODES[3])} 
            fill="none" 
            stroke="url(#flowGradient)" 
            strokeWidth="3" 
            strokeDasharray="10 5"
          >
            <animate attributeName="stroke-dashoffset" from="100" to="0" dur="5s" repeatCount="indefinite" />
          </path>

          {/* Animated Nodes/Dots */}
          {NODES.map(node => (
            <circle 
              key={`dot-${node.id}`} 
              cx={`${node.x}%`} 
              cy={`${node.y}%`} 
              r="6" 
              fill="#0ea5e9" 
              className="flow-line"
            >
              <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      </div>

      {/* UI Panels / Nodes */}
      <div className="relative w-full h-full z-10 px-20">
        {NODES.map((node) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            style={{ 
              position: 'absolute', 
              left: `${node.x}%`, 
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
            className="glass-panel w-72 p-6 rounded-[2.5rem] cursor-pointer group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-500 transition-all duration-300">
                <node.icon className="text-blue-500 w-6 h-6 group-hover:text-white transition-colors" />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-bold text-slate-800 truncate">{node.title}</h3>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Optimized</span>
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 mb-6">
              {node.description}
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="flex items-center -space-x-2">
                {[1, 2, 3].map(i => (
                  <img 
                    key={i}
                    src={`https://picsum.photos/seed/${node.id}${i}/40/40`} 
                    className="w-6 h-6 rounded-full border-2 border-white ring-1 ring-slate-100"
                    alt="Team"
                    referrerPolicy="no-referrer"
                  />
                ))}
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Floating Info Panels */}
      <aside className="absolute bottom-12 left-12 z-20 space-y-4">
        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          className="glass-panel px-6 py-4 rounded-3xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <Activity className="text-green-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Load</p>
            <p className="text-sm font-bold text-slate-700">12.4% Optimal</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-panel px-6 py-4 rounded-3xl flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <Layers className="text-blue-500 w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Paths</p>
            <p className="text-sm font-bold text-slate-700">4 Intelligent Flows</p>
          </div>
        </motion.div>
      </aside>

      {/* Bottom CTA Section */}
      <footer className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cta-neo-glow h-16 px-10 rounded-full flex items-center gap-4 group"
        >
          <span className="text-sm font-bold text-slate-700 tracking-wide">Automated & Effortless</span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
            <Zap className="text-white w-4 h-4 fill-white" />
          </div>
        </motion.button>
      </footer>

      {/* Right Sidebar Utility */}
      <aside className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-4 p-4 z-50">
        {[TrendingUp, Workflow, Zap, Settings].map((Icon, idx) => (
          <button key={idx} className="w-12 h-12 rounded-2xl glass-panel flex items-center justify-center group hover:bg-white transition-all">
            <Icon size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
          </button>
        ))}
      </aside>
    </div>
  );
}
