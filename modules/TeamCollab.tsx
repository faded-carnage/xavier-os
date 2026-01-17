
import React, { useState, useEffect } from 'react';
import { 
  Share2, Users, MessageSquare, Video, Mic, Plus, MoreHorizontal, User, 
  ShieldCheck, Send, Activity, Layout, Crosshair, Zap, Rocket,
  Target, TrendingUp, BarChart3, Radio, Network, Search, Loader2,
  Lock, Globe, Signal, Scan, Camera, Eye, Heart, BrainCircuit
} from 'lucide-react';

export default function TeamCollab() {
  const [isProduction, setIsProduction] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, user: 'Nova_AI', text: 'Quantum routing node in HK is stable now. Entanglement verified.', time: '10:02 AM', aura: '#a855f7' },
    { id: 2, user: 'System', text: 'Alpha Team joined the secure channel. 15,420 nodes syncing.', time: '10:05 AM', aura: '#ffffff10' },
    { id: 3, user: 'Cipher_Node', text: 'Copy that. Deploying ad variations to Meta cluster v8.4.', time: '10:08 AM', aura: '#22c55e' },
  ]);

  const [activeUnits, setActiveUnits] = useState([
    { name: 'Global Ops', count: 12, status: 'Active', health: 98, color: 'text-cyan-400' },
    { name: 'Neural Dev', count: 4, status: 'Synthesizing', health: 84, color: 'text-purple-400' },
    { name: 'Market Swarm', count: 8, status: 'Broadcasting', health: 92, color: 'text-orange-400' },
  ]);

  useEffect(() => {
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
      setMessages([]); // Clear fake chat
      setActiveUnits([]); // Clear fake units
    }
  }, []);

  const objectives = [
    { task: 'Fiverr Node Injection', status: 'In Progress', progress: 65, priority: 'High' },
    { task: 'Warehouse Sync (SG)', status: 'Complete', progress: 100, priority: 'Critical' },
    { task: 'Affiliate Funnel V2', status: 'Pending', progress: 12, priority: 'Medium' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex gap-8 animate-in fade-in duration-1000">
      {/* Left HUD: Units & Mission Objectives */}
      <aside className="w-80 flex flex-col gap-8">
        <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden group shrink-0">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-bold text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 text-white/40">
              <Network size={20} className="text-cyan-400 animate-pulse" />
              Tactical Units
            </h3>
            <button className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all text-white/30">
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-8 min-h-[100px]">
            {activeUnits.length > 0 ? activeUnits.map((unit, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="flex items-center justify-between mb-3 text-[11px] font-bold uppercase tracking-widest">
                  <span className={`group-hover:text-white transition-colors ${unit.color}`}>{unit.name}</span>
                  <span className="text-[10px] text-white/20 font-mono">{unit.count} OPERATIVES</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                   <div 
                    className="h-full bg-cyan-500 rounded-full transition-all duration-1000 shadow-[0_0_10px_#06b6d4]" 
                    style={{ width: `${unit.health}%` }} 
                   />
                </div>
              </div>
            )) : (
              <div className="text-center opacity-30 py-4">
                 <p className="text-[10px] font-bold uppercase tracking-widest">No Units Deployed</p>
              </div>
            )}
          </div>
        </div>

        <div className="glass p-10 rounded-[4rem] border border-white/10 flex-1 flex flex-col bg-black/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/5 -rotate-45 translate-x-16 translate-y-16"></div>
          <h3 className="font-bold text-[11px] uppercase tracking-[0.4em] mb-10 text-white/60 flex items-center gap-4">
             <Target size={20} className="text-purple-400 animate-pulse" />
             Mission Objectives
          </h3>
          <div className="space-y-6 overflow-y-auto scrollbar-hide pr-2">
            {objectives.map((obj, i) => (
              <div key={i} className="p-5 bg-white/5 rounded-[2rem] border border-white/5 hover:border-purple-500/30 transition-all group/obj relative overflow-hidden">
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <p className="text-[12px] font-bold uppercase tracking-tight text-white/90 group-hover/obj:text-purple-400 transition-colors">{obj.task}</p>
                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${obj.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}>{obj.priority}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-500 transition-all duration-1500" style={{ width: `${obj.progress}%` }} />
                </div>
                <div className="mt-3 flex justify-between text-[9px] font-bold text-white/20 uppercase">
                  <span>{obj.status}</span>
                  <span>{obj.progress}%</span>
                </div>
              </div>
            ))}
          </div>
          <button className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all shadow-inner">Objective Report</button>
        </div>
      </aside>

      {/* Main War Room Console */}
      <main className="flex-1 flex flex-col gap-8 h-full">
        {/* Holographic Video Stream Grid */}
        <div className="grid grid-cols-3 gap-8 h-72 shrink-0">
          {[1, 2, 3].map((op) => (
            <div key={op} className="glass rounded-[3rem] border border-white/10 bg-black overflow-hidden relative group/cam shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-20"></div>
               {!isProduction && (
                 <img src={`https://picsum.photos/seed/face${op}/400`} className="w-full h-full object-cover grayscale opacity-40 group-hover/cam:grayscale-0 group-hover/cam:opacity-100 transition-all duration-1000 scale-110 group-hover/cam:scale-100" />
               )}
               <div className="absolute top-6 left-6 flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${isProduction ? 'bg-white/20' : 'bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]'}`}></div>
                  <span className="text-[10px] font-bold text-white/80 uppercase tracking-widest drop-shadow-lg">{isProduction ? 'SIGNAL_LOST' : `LIVE_OP_0${op}`}</span>
               </div>
               {!isProduction && (
                 <div className="absolute bottom-6 right-6 flex items-center gap-4 opacity-0 group-hover/cam:opacity-100 transition-all duration-500">
                    <div className="p-2.5 bg-black/60 rounded-xl border border-white/10 backdrop-blur-xl text-cyan-400">
                       <Scan size={18} />
                    </div>
                    <div className="p-2.5 bg-black/60 rounded-xl border border-white/10 backdrop-blur-xl text-green-400">
                       <ShieldCheck size={18} />
                    </div>
                 </div>
               )}
               {/* Neural scanning HUD overlay */}
               <div className="absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-cyan-500/20 transition-all duration-700">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-500/40 m-4 rounded-tl-lg"></div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-500/40 m-4 rounded-br-lg"></div>
               </div>
            </div>
          ))}
        </div>

        {/* Command Center Communication */}
        <div className="flex-1 glass rounded-[4.5rem] border border-white/10 flex flex-col overflow-hidden bg-black/80 shadow-[0_0_150px_rgba(0,0,0,1)] relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(6,182,212,0.05)_0%,_transparent_60%)] pointer-events-none"></div>
          
          <div className="p-10 border-b border-white/10 flex items-center justify-between bg-white/5 relative z-10">
            <div className="flex items-center gap-8">
              <div className="w-16 h-16 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.2)] group cursor-pointer hover:bg-cyan-500/20 transition-all">
                <ShieldCheck className="text-cyan-400 group-hover:scale-110 transition-transform" size={32} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold uppercase tracking-tighter drop-shadow-2xl">Global Command Hub</h2>
                <div className="flex items-center gap-4 text-[9px] text-white/30 uppercase tracking-[0.6em] font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                    <span className="text-green-500">Secure Consensus</span>
                  </div>
                  <span>•</span>
                  <span>End-to-End Relay active</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-cyan-400 transition-all shadow-inner group">
                <Video size={20} className="group-hover:scale-110" />
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-purple-400 transition-all shadow-inner group">
                <Mic size={20} className="group-hover:scale-110" />
              </button>
              <button className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-white/40 hover:text-white transition-all shadow-inner group">
                <MoreHorizontal size={20} />
              </button>
            </div>
          </div>

          <div className="flex-1 p-12 space-y-10 overflow-y-auto scrollbar-hide relative z-10">
            {messages.length > 0 ? messages.map((m) => (
              <div key={m.id} className="flex gap-8 group animate-in slide-in-from-bottom-4 duration-500">
                <div className="w-12 h-12 rounded-full flex-shrink-0 border-2 border-white/10 p-0.5 shadow-2xl relative" style={{ borderColor: m.aura }}>
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    <img src={`https://picsum.photos/seed/${m.user}/100`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  </div>
                </div>
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold uppercase tracking-widest text-white/90 group-hover:text-cyan-400 transition-colors">{m.user}</span>
                    <span className="text-[9px] text-white/10 font-bold uppercase tracking-[0.4em]">{m.time} • Secure_Relay</span>
                  </div>
                  <div className="p-6 bg-black/60 rounded-[2.5rem] rounded-tl-none border border-white/10 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] group-hover:border-white/20 transition-all">
                    <p className="text-base text-white/70 leading-relaxed font-medium italic">"{m.text}"</p>
                  </div>
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full opacity-30 space-y-6">
                 <ShieldCheck size={64} className="text-green-500" />
                 <p className="text-sm font-bold uppercase tracking-widest">Secure Channel Ready</p>
                 <p className="text-[10px]">Invite operatives to begin secure comms.</p>
              </div>
            )}
          </div>

          <div className="p-10 bg-black border-t border-white/10 flex gap-6 relative z-20 shadow-[0_-40px_100px_rgba(0,0,0,0.8)]">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <button className="p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white/20 hover:text-cyan-400 transition-all shadow-inner group">
              <Plus size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
            <div className="flex-1 relative group/input">
              <input 
                type="text" 
                placeholder="Commit tactical transmission to unit matrix..." 
                className="w-full bg-black border border-white/10 rounded-[2.5rem] py-5 px-10 text-base focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all placeholder:text-white/5 font-medium shadow-inner"
              />
              <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-4 opacity-10 group-focus-within/input:opacity-100 transition-opacity">
                 <span className="text-[10px] font-mono text-cyan-500 uppercase font-bold tracking-widest">CIPHERING...</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_8px_#06b6d4]"></div>
              </div>
            </div>
            <button className="px-10 bg-white text-black font-bold rounded-[2.5rem] hover:scale-105 active:scale-95 transition-all flex items-center gap-6 shadow-[0_0_50px_rgba(255,255,255,0.2)] group/btn">
              <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span className="uppercase tracking-[0.4em] text-[12px]">Commit</span>
            </button>
          </div>
        </div>
      </main>

      {/* Right HUD: Global Wealth & Team Harmony */}
      <aside className="w-80 flex flex-col gap-8">
         <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-green-500/5 to-transparent space-y-10 shadow-2xl relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
               <Zap size={20} className="text-green-500" />
               Settlement Sync
            </h3>
            <div className="space-y-10">
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-2">Live Wealth Matrix</p>
                  <p className="text-5xl font-bold tracking-tighter text-green-500 drop-shadow-2xl">{isProduction ? '$0.00' : '$184,242'}</p>
                  <div className="flex items-center gap-3 text-[9px] font-bold text-green-500/60 uppercase mt-4 tracking-widest italic">
                    <TrendingUp size={14} className="animate-pulse" /> {isProduction ? '0.0% (Waiting)' : '+8.4% ROI Velocity'}
                  </div>
               </div>
               <div className="h-[2px] w-full bg-white/5"></div>
               <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-2">Neural Harmony</p>
                  <p className="text-5xl font-bold tracking-tighter text-cyan-400 drop-shadow-2xl">{isProduction ? '100%' : '94.2%'}</p>
                  <p className="text-[9px] text-white/10 uppercase tracking-widest mt-4 font-medium">Team Synergy Optimized</p>
               </div>
            </div>
         </div>

         <div className="glass p-10 rounded-[4rem] border border-white/10 bg-black/40 space-y-10 shadow-2xl relative overflow-hidden flex-1 flex flex-col items-center justify-center text-center group">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_75%)] opacity-30 animate-pulse"></div>
            <div className="relative">
               <div className="absolute inset-0 bg-cyan-500 blur-[60px] opacity-20 animate-pulse scale-150"></div>
               <BrainCircuit size={84} className="text-cyan-500 relative z-10 animate-spin-slow" />
            </div>
            <div className="space-y-4 relative z-10">
               <p className="text-[14px] font-bold uppercase tracking-[0.8em] text-white/80">Neural_Swarm_Online</p>
               <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold leading-relaxed px-4 italic">
                 Shared intent matrices are current across all 15,420 international node clusters.
               </p>
            </div>
            <div className="flex gap-2.5 pt-6 relative z-10">
               {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 4 ? 'bg-cyan-500 shadow-[0_0_8px_#06b6d4]' : 'bg-white/10'}`} />
               ))}
            </div>
         </div>
      </aside>

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
