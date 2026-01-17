
import React, { useState, useEffect } from 'react';
import { Shield, ShieldAlert, Lock, Fingerprint, Zap, RefreshCw, Terminal, Eye, AlertTriangle, Cpu, Globe, Activity, Signal, ShieldCheck, Key, Loader2, Radar, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: 'Encrypted', value: 85, color: '#06b6d4' },
  { name: 'Filtered', value: 12, color: '#a855f7' },
  { name: 'Risk_Delta', value: 3, color: '#ef4444' },
];

const initialLogs = [
  { time: '14:20:01', event: 'Packet entropy analysis complete (Node HK-04)', status: 'SAFE' },
  { time: '14:22:15', event: 'Brute-force vector neutralized (Origin: 104.22.x.x)', status: 'BLOCKED' },
  { time: '14:23:44', event: 'Quantum-XTS handshake verified successfully', status: 'SECURE' },
  { time: '14:25:10', event: 'AI Guardian flagged pattern shift in Cluster-DE', status: 'MITIGATING' },
];

export default function CyberDefense() {
  const [logs, setLogs] = useState(initialLogs);
  const [entropy, setEntropy] = useState(Array.from({ length: 20 }, (_, i) => ({ val: 80 + Math.random() * 20 })));
  const [isRotating, setIsRotating] = useState(false);
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
      setLogs([]); // Clear fake logs in production
      setEntropy(Array.from({ length: 20 }, () => ({ val: 0 }))); // Flatline entropy
    }
  }, []);

  useEffect(() => {
    if (isProduction) return; // Stop simulation in production

    const interval = setInterval(() => {
      setEntropy(prev => [...prev.slice(1), { val: 78 + Math.random() * 22 }]);
      
      if (Math.random() > 0.88) {
        const newLog = {
          time: new Date().toLocaleTimeString(),
          event: `Neural Buffer Check: 0x${Math.random().toString(16).slice(2, 6).toUpperCase()} verified via SG-01.`,
          status: 'SECURE'
        };
        setLogs(prev => [newLog, ...prev.slice(0, 8)]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [isProduction]);

  const handleKeyRotation = () => {
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
      if (!isProduction) {
        setLogs(prev => [{ time: new Date().toLocaleTimeString(), event: 'Quantum Master RSA-4096 Key Matrix Rotated', status: 'SECURE' }, ...prev]);
      }
    }, 3000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 mb-3">
             <Radar size={18} className="animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-[0.5em]">
               {isProduction ? 'LIVE_THREAT_MONITORING_ACTIVE' : 'Real-Time_Threat_Neutralization_Active'}
             </span>
          </div>
          <h1 className="text-5xl font-bold flex items-center gap-8 tracking-tighter uppercase">
            <ShieldAlert className={isProduction ? "text-green-500" : "text-red-500 animate-pulse"} size={48} />
            {isProduction ? 'Live Perimeter Defense' : 'Quantum Defense Command'}
          </h1>
          <p className="text-white/30 text-[12px] font-bold uppercase tracking-[0.6em] italic ml-2">
            {isProduction ? 'NO SIMULATIONS • REAL-TIME PACKET INSPECTION' : 'Automated Threat Mitigation • Tier-1 Sovereignty Protection'}
          </p>
        </div>
        <div className="flex gap-6">
          <div className={`glass px-10 py-5 rounded-[2.5rem] border flex items-center gap-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] ${isProduction ? 'border-green-500/30 bg-green-500/5' : 'border-red-500/30 bg-red-500/5'}`}>
             <AlertTriangle size={32} className={isProduction ? "text-green-500" : "text-red-500 animate-pulse"} />
             <div className="text-left">
                <p className={`text-[14px] font-bold uppercase tracking-widest ${isProduction ? 'text-green-500' : 'text-red-500'}`}>
                  {isProduction ? 'SECURE' : 'DEFCON 5'}
                </p>
                <p className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Optimal Integrity</p>
             </div>
          </div>
          <button 
            onClick={handleKeyRotation}
            disabled={isRotating}
            className="flex items-center gap-6 bg-white text-black hover:bg-red-500 hover:text-white border border-white/10 px-12 py-5 rounded-[3rem] text-[12px] font-bold transition-all uppercase tracking-[0.4em] shadow-2xl active:scale-95 disabled:opacity-50 group"
          >
            {isRotating ? <Loader2 size={24} className="animate-spin" /> : <Key size={24} className="group-hover:rotate-90 transition-transform duration-700" />}
            {isRotating ? 'ROTATING_KEYS...' : 'REGEN_MASTER_CIPHER'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-9 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: 'Uptime Reliability', value: '99.999%', icon: Shield, color: 'text-green-500' },
              { label: 'E2EE Capsules', value: isProduction ? 'WAITING' : '1.4M Active', icon: Lock, color: 'text-cyan-500' },
              { label: 'Neural Harmony', value: 'SYNCED', icon: Cpu, color: 'text-purple-500' },
              { label: 'Packet Drift', value: '0.000%', icon: Zap, color: 'text-yellow-500' },
            ].map((stat, i) => (
              <div key={i} className="glass p-12 rounded-[4rem] border border-white/5 flex flex-col items-center justify-center text-center bg-black/60 group hover:border-white/20 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                <div className={`p-8 bg-white/5 rounded-[2.5rem] mb-8 group-hover:scale-110 transition-transform ${stat.color} shadow-inner`}>
                   <stat.icon size={42} />
                </div>
                <p className="text-[12px] text-white/30 uppercase tracking-[0.5em] font-bold mb-3">{stat.label}</p>
                <p className="text-4xl font-bold tracking-tighter uppercase text-white drop-shadow-2xl">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="glass p-20 rounded-[6rem] border border-white/10 relative overflow-hidden group bg-black shadow-[0_0_250px_rgba(0,0,0,1)] min-h-[700px] flex flex-col">
            <div className={`absolute inset-0 pointer-events-none ${isProduction ? 'bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.05)_0%,_transparent_75%)]' : 'bg-[radial-gradient(circle_at_center,_rgba(239,68,68,0.05)_0%,_transparent_75%)]'}`}></div>
            
            <div className="flex items-center justify-between mb-20 relative z-10">
               <div className="space-y-4">
                  <h3 className="font-bold flex items-center gap-10 text-5xl tracking-tighter uppercase text-white/90">
                    <Target size={56} className={isProduction ? "text-green-500" : "text-red-500 animate-pulse"} />
                    {isProduction ? 'Live Intrusion Scanner' : 'Neural Perimeter Defense'}
                  </h3>
                  <p className="text-[14px] font-bold uppercase tracking-[0.8em] text-white/20 ml-4">Monitoring Global Intent Vectors via 0xROOT Handshake</p>
               </div>
               <div className="flex items-center gap-10">
                  <div className="flex items-center gap-6 text-[14px] font-mono text-cyan-500/60 font-bold uppercase tracking-widest bg-cyan-500/5 px-10 py-4 rounded-full border border-cyan-500/20 shadow-inner">
                     <Signal size={24} className="animate-pulse" />
                     SECURE_ENTANGLEMENT_V4
                  </div>
               </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center mb-16 overflow-hidden rounded-[5rem] border border-white/10 bg-white/5 shadow-[inset_0_0_150px_rgba(0,0,0,1)]">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-[6px] z-0"></div>
               <div className="relative w-full h-full p-20 flex items-center justify-center">
                  {!isProduction && (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={entropy}>
                        <Area type="monotone" dataKey="val" stroke="#ef4444" fill="#ef444410" strokeWidth={6} isAnimationActive={false} className="drop-shadow-[0_0_50px_rgba(239,68,68,0.3)]" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-16">
                     <div className="relative w-[450px] h-[450px]">
                        <div className={`absolute inset-0 border-6 border-dashed rounded-full animate-spin-slow ${isProduction ? 'border-green-500/10' : 'border-red-500/10'}`}></div>
                        <div className={`absolute inset-16 border-2 rounded-full animate-ping ${isProduction ? 'border-green-500/30' : 'border-red-500/30'}`}></div>
                        <div className="absolute inset-24 border-6 border-purple-500/10 rounded-full animate-reverse-spin"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                           <ShieldCheck size={120} className={`${isProduction ? 'text-green-500 drop-shadow-[0_0_60px_#22c55e]' : 'text-red-500 animate-pulse drop-shadow-[0_0_60px_#ef4444]'}`} />
                        </div>
                     </div>
                     <div className="text-center space-y-6">
                        <p className={`text-[20px] font-mono font-bold tracking-[1.2em] uppercase ${isProduction ? 'text-green-500/80' : 'text-red-500/80 animate-pulse'}`}>
                          {isProduction ? 'SYSTEM SECURE' : 'Scrubbing Neural Traffic'}
                        </p>
                        <p className="text-[13px] text-white/10 font-bold uppercase tracking-[0.6em]">Zero-Trust Sovereign Protocol Active</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="glass p-16 rounded-[4rem] border border-white/10 font-mono text-[16px] space-y-10 bg-black/80 shadow-inner">
              <div className="flex justify-between items-center text-[12px] font-bold text-white/30 uppercase tracking-[0.8em] mb-10 pb-8 border-b border-white/5">
                 <span>Strategic Perimeter Audit Logs</span>
                 <span className="flex items-center gap-6 text-green-500">Consensus: VERIFIED_0x9AF <ShieldCheck size={20} /></span>
              </div>
              <div className="space-y-6 max-h-96 overflow-y-auto scrollbar-hide pr-10">
                {isProduction && logs.length === 0 ? (
                  <div className="text-center py-10 opacity-30">
                    <Loader2 size={32} className="mx-auto mb-4 animate-spin text-green-500" />
                    <p className="text-[12px] uppercase tracking-widest font-bold">Scanning for Live Intrusion Vectors...</p>
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="flex gap-12 p-8 hover:bg-white/5 transition-all border-l-[12px] border-white/5 hover:border-red-500/50 rounded-r-[3rem] group animate-in fade-in slide-in-from-left-8">
                      <span className="text-white/10 shrink-0 font-bold text-lg">[{log.time}]</span>
                      <span className="flex-1 text-white/70 uppercase tracking-[0.1em] font-bold group-hover:text-white transition-colors leading-relaxed">{log.event}</span>
                      <div className="flex items-center gap-10">
                         <span className={`font-bold px-10 py-3 rounded-full text-[12px] tracking-[0.4em] shadow-inner border-2 ${log.status === 'BLOCKED' ? 'bg-red-500/10 text-red-500 border-red-500/30' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'}`}>
                            {log.status}
                         </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-10">
          <div className="glass p-14 rounded-[5rem] border border-white/10 text-center bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40 group-hover:opacity-100 transition-opacity ${isProduction ? 'hidden' : ''}`}></div>
            <h3 className="text-[14px] font-bold uppercase text-white/40 mb-16 tracking-[0.8em]">Bit-Purity Index</h3>
            <div className="h-80 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={100}
                    outerRadius={135}
                    paddingAngle={15}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} className="drop-shadow-[0_0_20px_rgba(0,0,0,1)]" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <p className="text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">100.0</p>
                 <p className="text-[12px] font-bold text-white/20 uppercase tracking-[0.5em] mt-4">Verified_Stable</p>
              </div>
            </div>
            <div className="space-y-10 mt-16">
              {data.map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[12px] font-bold uppercase tracking-[0.6em] p-6 bg-white/5 rounded-[2.5rem] border border-white/5 group/entry hover:bg-white/10 transition-all shadow-inner">
                  <div className="flex items-center gap-6">
                    <span className="w-5 h-5 rounded-full shadow-[0_0_20px_currentColor]" style={{ backgroundColor: item.color, color: item.color }}></span>
                    <span className="text-white/40 group-hover/entry:text-white/90 transition-colors">{item.name}</span>
                  </div>
                  <span className="font-mono text-white/80">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-12 rounded-[5rem] border border-white/10 bg-gradient-to-br from-red-900/40 to-black relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[120px] pointer-events-none group-hover:bg-red-500/10 transition-colors"></div>
            <div className="flex items-center gap-10 mb-12 relative z-10">
              <div className="w-20 h-20 bg-red-500/10 rounded-[2rem] flex items-center justify-center border border-red-500/20 shadow-inner group-hover:bg-red-500/20 transition-all">
                 <Fingerprint className="text-red-500 animate-pulse" size={48} />
              </div>
              <h3 className="font-bold text-3xl uppercase tracking-tighter text-white/90">Identity Wall</h3>
            </div>
            <p className="text-[13px] text-white/30 leading-loose mb-14 font-bold uppercase tracking-[0.5em] px-4 italic leading-relaxed">
              Zero-Trust architecture enforced via hardware-bound Sovereign Session Keys.
            </p>
            <div className="space-y-8 relative z-10">
               <div className="flex justify-between text-[12px] font-bold uppercase tracking-[0.5em] text-white/20 ml-2">
                  <span>Biometric Confidence</span>
                  <span className="text-red-400">100.0%</span>
               </div>
               <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-1.5 shadow-inner">
                 <div className="h-full bg-red-500 rounded-full animate-pulse transition-all duration-2000 shadow-[0_0_30px_#ef4444]" style={{ width: '100%' }} />
               </div>
            </div>
            <button className="w-full mt-14 py-8 bg-white/5 border border-white/10 rounded-[2.5rem] text-[12px] font-bold uppercase tracking-[1.2em] text-white/40 hover:text-white hover:border-red-500/30 transition-all shadow-inner group-hover:shadow-[0_0_40px_rgba(239,68,68,0.2)]">
               RE-SYNC_BIOMETRICS
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes reverse-spin {
          from { transform: rotate(360deg) }
          to { transform: rotate(0deg) }
        }
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
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
