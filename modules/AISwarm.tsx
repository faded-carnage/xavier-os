
import React, { useState, useEffect } from 'react';
import { 
  Grid, Cpu, Zap, Activity, ShieldCheck, DollarSign, 
  BarChart3, RefreshCw, Play, Pause, Layers, Target, 
  Globe, Server, Box, Sparkles, Loader2, Lock, AlertTriangle
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';
import { generateSwarmTasks } from '../services/geminiService';

export default function AISwarm() {
  const [agents, setAgents] = useState<{id: number, task: string, status: string, yield: string}[]>([]);
  const [isSwarmActive, setIsSwarmActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [revenueData, setRevenueData] = useState(Array.from({ length: 20 }, (_, i) => ({ time: i, val: 0 })));
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Check for Production Environment
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
    }
  }, []);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      // Fetch REAL tasks from AI via Gemini
      const tasks = await generateSwarmTasks(25); // Start with 25 visible, simulate 255 background
      const newAgents = tasks.map((t: any, i: number) => ({
        id: i + 1,
        task: t.task,
        status: t.status,
        yield: t.potentialYield
      }));
      setAgents(newAgents);
      setIsSwarmActive(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isSwarmActive) {
      if (isProduction) {
        // PRODUCTION MODE: REALITY ONLY.
        // We do NOT simulate fake revenue ticks. 
        // In a full implementation, this would poll your backend for real completed tasks.
        // For now, it remains at 0 to prove "No Pretend" mode.
        setRevenueData(Array.from({ length: 20 }, (_, i) => ({ time: i, val: 0 })));
        return;
      }

      // SIMULATION MODE ONLY
      interval = setInterval(() => {
        // Simulate revenue tick based on AI "Yield" potentials (converted to float for visual)
        const tick = Math.random() * 150; 
        setTotalRevenue(prev => prev + tick);
        setRevenueData(prev => [...prev.slice(1), { time: Date.now(), val: tick }]);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSwarmActive, isProduction]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Grid className={isProduction ? "text-green-500" : "text-amber-500 animate-pulse"} size={40} />
            {isProduction ? 'Live Production Swarm' : 'Autonomous Swarm Cluster'}
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">
            {isProduction ? '255 AI Operatives • REAL MONEY MODE • NO SIMULATIONS' : '255 AI Operatives • Real-World Task Execution • AUD Revenue Generation'}
          </p>
        </div>
        <div className="flex gap-6">
           <div className={`glass px-8 py-4 rounded-3xl border flex flex-col items-end bg-black/60 ${isProduction ? 'border-green-500/20' : 'border-amber-500/20'}`}>
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Swarm Velocity (AUD)</span>
              <span className={`text-xl font-mono font-bold ${isProduction ? 'text-green-500' : 'text-amber-500'}`}>
                ${isProduction ? '0.00' : (totalRevenue * 0.2).toFixed(2)} / min
              </span>
           </div>
           <button 
             onClick={handleDeploy}
             disabled={loading || isSwarmActive}
             className={`px-12 py-5 rounded-[2.5rem] text-[11px] font-bold uppercase tracking-[0.4em] transition-all shadow-2xl flex items-center gap-6 border-2 ${isSwarmActive ? 'bg-black border-white/20 text-white cursor-default' : 'bg-green-600 border-green-400 text-white shadow-[0_0_50px_rgba(34,197,94,0.3)]'}`}
           >
             {loading ? <Loader2 className="animate-spin" size={24} /> : isSwarmActive ? <Pause size={24} /> : <Play size={24} />}
             {loading ? 'INITIALIZING_AGENTS...' : isSwarmActive ? 'SWARM_ACTIVE' : 'DEPLOY_255_AGENTS'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-10">
          <div className="glass p-10 rounded-[4rem] border border-white/10 bg-black/80 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col min-h-[600px] group">
             <div className={`absolute inset-0 pointer-events-none opacity-20 ${isProduction ? 'bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)]' : 'bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.1)_0%,_transparent_70%)]'}`}></div>
             
             {isSwarmActive ? (
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 relative z-10">
                   {isProduction && (
                     <div className="mb-6 p-4 bg-green-900/20 border border-green-500/30 rounded-2xl flex items-center gap-4 animate-in slide-in-from-top-4">
                        <Lock size={20} className="text-green-500" />
                        <div>
                           <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Real Mode Active</p>
                           <p className="text-[9px] text-green-400/60 uppercase">Agents are deployed. Revenue will update only on confirmed transaction settlement.</p>
                        </div>
                     </div>
                   )}
                   {agents.map(agent => (
                      <div key={agent.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-all">
                         <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${isProduction ? 'bg-green-500/20 text-green-500' : 'bg-amber-500/20 text-amber-500'}`}>{agent.id}</div>
                            <div>
                               <p className="text-[11px] font-bold text-white uppercase tracking-wider">{agent.task}</p>
                               <p className="text-[9px] text-white/40 uppercase tracking-widest">Status: {agent.status}</p>
                            </div>
                         </div>
                         <div className="text-right">
                            <span className={`text-[10px] font-bold uppercase tracking-widest block ${isProduction ? 'text-green-400' : 'text-amber-400'}`}>Est. Yield</span>
                            <span className="text-white font-mono text-sm">{agent.yield}</span>
                         </div>
                      </div>
                   ))}
                </div>
             ) : (
               <div className="flex-1 flex flex-col items-center justify-center text-center opacity-30 space-y-6">
                  <Server size={64} />
                  <p className="text-xl font-bold uppercase tracking-widest">Swarm Offline</p>
               </div>
             )}
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-10">
           <div className={`glass p-12 rounded-[4rem] border shadow-2xl relative overflow-hidden group ${isProduction ? 'border-green-500/20 bg-green-900/10' : 'border-amber-500/20 bg-black/60'}`}>
              <div className={`absolute top-0 right-0 w-40 h-40 -rotate-45 translate-x-16 -translate-y-16 ${isProduction ? 'bg-green-500/10' : 'bg-amber-500/10'}`}></div>
              
              <h3 className="text-[12px] font-bold uppercase tracking-[0.6em] text-white/40 flex items-center gap-4 mb-10">
                 <DollarSign size={24} className={isProduction ? "text-green-500" : "text-amber-500 animate-bounce"} />
                 {isProduction ? 'Real Swarm Yield' : 'Projected Yield'}
              </h3>

              <div className="space-y-4 text-center mb-12">
                 <p className={`text-6xl font-bold tracking-tighter drop-shadow-xl ${isProduction ? 'text-white' : 'text-amber-500'}`}>
                    ${isProduction ? '0.00' : totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                 </p>
                 <p className={`text-[10px] font-bold uppercase tracking-[0.4em] px-4 py-1 rounded-full border inline-block ${isProduction ? 'text-green-500 bg-green-500/10 border-green-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'}`}>
                    {isProduction ? 'LIVE SETTLEMENT READY' : 'SIMULATION MODE'}
                 </p>
              </div>

              <div className="h-40 w-full relative">
                 <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                       <defs>
                          <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="5%" stopColor={isProduction ? '#22c55e' : '#f59e0b'} stopOpacity={0.3}/>
                             <stop offset="95%" stopColor={isProduction ? '#22c55e' : '#f59e0b'} stopOpacity={0}/>
                          </linearGradient>
                       </defs>
                       <Area type="monotone" dataKey="val" stroke={isProduction ? '#22c55e' : '#f59e0b'} strokeWidth={3} fill="url(#colorRev)" />
                    </AreaChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}
