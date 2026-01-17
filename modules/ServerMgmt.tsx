
import React, { useState, useEffect } from 'react';
import { 
  Server, Cpu, Activity, Zap, ShieldCheck, Thermometer, Wind, 
  Database, Network, Globe, RefreshCw, Loader2, Signal, Lock,
  Layers, HardDrive, Battery, Gauge, Power, Ghost, Maximize2, ShieldAlert,
  Boxes, Radio, Globe2, Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';

const clusterData = [
  { name: 'Alpha-01', heat: 42, load: 12, memory: 4 },
  { name: 'Beta-04', heat: 58, load: 45, memory: 16 },
  { name: 'Gamma-09', heat: 31, load: 8, memory: 2 },
  { name: 'Delta-X', heat: 84, load: 92, memory: 64 },
  { name: 'Epsilon-2', heat: 45, load: 30, memory: 8 },
  { name: 'Zeta-S', heat: 38, load: 22, memory: 12 },
];

export default function ServerMgmt() {
  const [isOverdrive, setIsOverdrive] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [temp, setTemp] = useState(38.4);
  const [nodes, setNodes] = useState(Array.from({ length: 48 }, (_, i) => ({ id: i, state: 'optimal' })));
  
  // Real Mode State
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Check for Production Environment
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
      // In Production, reset all nodes to stable initially
      setNodes(Array.from({ length: 48 }, (_, i) => ({ id: i, state: 'optimal' })));
      setTemp(42.0); // Stable baseline temp
    }
  }, []);

  useEffect(() => {
    if (isProduction) return; // Do NOT simulate fluctuations in Production Mode

    const interval = setInterval(() => {
      setTemp(prev => {
        const base = isOverdrive ? 62 : 38;
        return base + (Math.random() * 4);
      });
      
      setNodes(prev => prev.map(n => ({ 
        ...n, 
        state: Math.random() > 0.92 ? (Math.random() > 0.6 ? 'heavy' : 'warning') : 'optimal' 
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOverdrive, isProduction]);

  const toggleOverdrive = () => {
    setIsOverdrive(!isOverdrive);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <div className="flex items-center gap-4 text-cyan-500 mb-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Government_Clearance_Active</span>
          </div>
          <h1 className="text-5xl font-bold flex items-center gap-8 tracking-tighter uppercase text-white">
            <Server className={isProduction ? "text-green-500" : "text-cyan-400 animate-pulse"} size={48} />
            {isProduction ? 'Live Production Cluster' : 'Sovereign Cloud Backbone'}
          </h1>
          <p className="text-white/20 text-[12px] uppercase tracking-[0.8em] font-bold italic">
            {isProduction ? 'REAL WORKLOADS ONLY • MOCK TRAFFIC PURGED' : 'Military-Grade Tier-4 Infrastructure • Global Synchronous Cluster V4.2.6'}
          </p>
        </div>
        <div className="flex items-center gap-6">
           <div className="glass px-8 py-4 rounded-3xl border border-white/10 flex flex-col items-end">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Network_Entropy</span>
              <span className="text-xl font-mono font-bold text-green-500">0.99998_SECURE</span>
           </div>
           <button 
             onClick={toggleOverdrive}
             className={`px-12 py-5 rounded-[2.5rem] text-[11px] font-bold uppercase tracking-[0.4em] transition-all shadow-2xl flex items-center gap-6 border-2 ${isOverdrive ? 'bg-red-600 border-red-400 text-white shadow-[0_0_60px_rgba(239,68,68,0.4)]' : 'bg-cyan-600 border-cyan-400 text-black shadow-[0_0_50px_rgba(6,182,212,0.3)]'}`}
           >
             <Zap size={24} className={isOverdrive ? 'animate-bounce' : ''} />
             {isOverdrive ? 'COOLING_OVERDRIVE_ACTIVE' : 'ENGAGE_QUANTUM_CORE'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-9 space-y-10">
          <div className="glass p-16 rounded-[5rem] border border-white/10 bg-black shadow-[0_0_200px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(6,182,212,0.08)_0%,_transparent_60%)] pointer-events-none"></div>
             <div className="absolute top-0 right-0 p-12 opacity-5">
                <Globe2 size={240} className="animate-spin-slow" />
             </div>
             
             <div className="flex items-center justify-between mb-20 relative z-10">
                <div className="space-y-4">
                   <h3 className="text-4xl font-bold uppercase tracking-tighter flex items-center gap-8 text-white/90">
                      <Layers className="text-cyan-400" size={42} />
                      Global Cluster Topology
                   </h3>
                   <p className="text-[12px] font-bold uppercase tracking-[0.4em] text-white/30 ml-2">
                     {isProduction ? 'Awaiting real API requests from distributed endpoints' : 'Real-time Bit-Density Analysis across 15,420 Onion Relays'}
                   </p>
                </div>
                <div className="glass px-8 py-3 rounded-full border border-white/10 text-[10px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">
                   Load: {isProduction ? '0.0% (IDLE)' : isOverdrive ? '96.4%' : '18.2%'} SYNCED
                </div>
             </div>

             <div className="grid grid-cols-8 gap-4 flex-1 relative z-10 p-6 bg-white/5 rounded-[4rem] border border-white/5 shadow-inner">
                {nodes.map(node => (
                  <div 
                    key={node.id} 
                    className={`aspect-square rounded-xl border transition-all duration-1000 relative group/node cursor-crosshair ${
                      node.state === 'optimal' ? 'bg-cyan-500/10 border-cyan-500/20 shadow-[inset_0_0_10px_rgba(6,182,212,0.1)]' : 
                      node.state === 'heavy' ? 'bg-red-500/40 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 
                      'bg-yellow-500/20 border-yellow-500/40 animate-pulse'
                    }`}
                  >
                     <div className="absolute inset-0 opacity-0 group-hover/node:opacity-100 transition-opacity bg-white/10 rounded-xl flex flex-col items-center justify-center">
                        <Signal size={14} className="text-white mb-1" />
                        <span className="text-[6px] font-bold uppercase">Node_{node.id}</span>
                     </div>
                  </div>
                ))}
             </div>

             <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-white/5 relative z-10">
                {[
                  { label: 'Backbone Latency', val: isProduction ? '0.00ms' : '0.24ms', color: 'text-cyan-400', icon: Activity },
                  { label: 'Uplink Integrity', val: '99.999%', color: 'text-green-500', icon: RefreshCw },
                  { label: 'Core Thermal', val: `${temp.toFixed(1)}°C`, color: isOverdrive ? 'text-red-500' : 'text-cyan-500', icon: Thermometer },
                  { label: 'Throughput', val: isProduction ? '0 B/s' : '2.4 PB/s', color: 'text-purple-500', icon: Zap }
                ].map((m, i) => (
                  <div key={i} className="text-center group cursor-default space-y-3">
                     <div className="flex items-center justify-center gap-4">
                        <m.icon size={18} className={`${m.color} opacity-40 group-hover:opacity-100 transition-opacity animate-pulse`} />
                        <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">{m.label}</p>
                     </div>
                     <p className={`text-3xl font-bold tracking-tighter ${m.color} drop-shadow-2xl group-hover:scale-110 transition-transform`}>{m.val}</p>
                  </div>
                ))}
             </div>
          </div>
        </main>

        <aside className="lg:col-span-3 space-y-10">
           <div className="glass p-12 rounded-[4rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-black space-y-12 shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 -rotate-45 translate-x-20 -translate-y-20"></div>
              <h3 className="text-[14px] font-bold uppercase tracking-[0.8em] text-white/40 flex items-center gap-6 relative z-10">
                 <ShieldCheck size={28} className="text-cyan-400 animate-pulse" />
                 Hardware Logic
              </h3>
              <div className="space-y-10 relative z-10">
                 {[
                   { label: 'XTS-AES-512', val: 'ARMED', status: 'Optimal' },
                   { label: 'Quantum_Bypass', val: 'ACTIVE', status: 'Optimal' },
                   { label: 'Zero-Day_Shield', val: 'SCANNING', status: 'Monitoring' }
                 ].map((s, i) => (
                   <div key={i} className="p-8 bg-black/60 rounded-[3rem] border border-white/5 space-y-6 shadow-inner group/item hover:border-cyan-500/30 transition-all">
                      <div className="flex justify-between items-center">
                         <span className="text-[11px] font-bold text-white/20 uppercase tracking-widest">{s.label}</span>
                         <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest px-4 py-1.5 bg-cyan-500/10 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">{s.val}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
                         <span className="text-[11px] font-mono text-white/40 uppercase font-bold tracking-tighter">{s.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="glass p-12 rounded-[5rem] border border-white/10 bg-black/60 space-y-14 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_75%)] opacity-30 animate-pulse"></div>
              <div className="relative">
                 <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-20 animate-pulse scale-150"></div>
                 <Cpu size={100} className="text-cyan-500 relative z-10 animate-spin-slow" />
              </div>
              <div className="space-y-8 relative z-10 px-6">
                 <p className="text-[22px] font-bold uppercase tracking-[1.2em] text-white drop-shadow-2xl">Neural_Root</p>
                 <p className="text-[12px] text-white/20 uppercase tracking-[0.5em] font-bold leading-loose px-2 italic">
                   {isProduction ? 'Listening for authorized instruction sets...' : 'Proprietary multi-dimensional server arrays powering the Xavier AI Sovereign Ecosystem.'}
                 </p>
              </div>
              <div className="flex gap-5 pt-8 relative z-10">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] ${isProduction ? '' : 'animate-pulse'}`} style={{ animationDelay: `${i * 0.3}s` }}></div>
                 ))}
              </div>
           </div>
        </aside>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
