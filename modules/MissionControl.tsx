
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Shield, 
  Activity, 
  Zap, 
  Server, 
  Package, 
  MapPin, 
  Loader2, 
  Radar, 
  Satellite, 
  Signal, 
  Crosshair,
  Rocket,
  Layers,
  Terminal,
  Cpu
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  Tooltip, 
  Cell, 
  LineChart, 
  Line 
} from 'recharts';

interface MissionControlProps {
  onLaunch: () => void;
  isLive?: boolean;
}

const data = [
  { x: 100, y: 200, name: 'North America Cluster', status: 'Optimal', load: '14%', latency: '2ms' },
  { x: 250, y: 180, name: 'EU-Central Node', status: 'Heavy', load: '82%', latency: '15ms' },
  { x: 400, y: 300, name: 'Asia-Pacific Hub', status: 'Optimal', load: '24%', latency: '4ms' },
  { x: 350, y: 100, name: 'AU-Syd Ops', status: 'Maintenance', load: '0%', latency: '--' },
  { x: 80, y: 400, name: 'LATAM Gateway', status: 'Optimal', load: '12%', latency: '8ms' },
];

export default function MissionControl({ onLaunch, isLive = false }: MissionControlProps) {
  const [satellitePos, setSatellitePos] = useState(0);
  const [telemetry, setTelemetry] = useState(Array.from({ length: 20 }, (_, i) => ({ val: 50 + Math.random() * 20 })));
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSatellitePos(p => (p + 0.5) % 360);
      setTelemetry(prev => [...prev.slice(1), { val: 40 + Math.random() * 40 }]);
      setScanProgress(p => (p + 1) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Globe className="text-cyan-400 animate-spin-slow" size={40} />
            Strategic Mission Command
          </h1>
          <p className="text-white/30 text-[11px] font-bold uppercase tracking-[0.6em] italic">Multi-Dimensional Infrastructure Oversight • Tier-1 Encryption</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="glass px-8 py-4 rounded-3xl border border-white/10 flex items-center gap-4 bg-black/60 shadow-inner group cursor-help">
            <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-cyan-500 shadow-[0_0_15px_#06b6d4]' : 'bg-green-500 animate-pulse'}`}></div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-white/60">
              Core Uplink: {isLive ? 'XAVIER_OS_BROADCASTING' : 'SECURE_STANDBY'}
            </span>
          </div>
          {!isLive && (
            <button 
              onClick={onLaunch}
              className="px-10 py-4 bg-white text-black font-bold rounded-3xl text-[12px] uppercase tracking-[0.3em] flex items-center gap-4 hover:scale-105 active:scale-95 transition-all shadow-[0_0_50px_rgba(255,255,255,0.2)] group"
            >
              <Rocket size={20} className="group-hover:-translate-y-1 transition-transform" />
              Initiate Global Sync
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-9 space-y-10">
          {/* Main Visual Control Surface */}
          <div className="glass rounded-[4rem] border border-white/5 h-[700px] relative overflow-hidden bg-black/80 shadow-[0_0_100px_rgba(0,0,0,0.5)] group">
            {/* Background Grids and Radials */}
            <div className="absolute inset-0 opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15)_0%,_transparent_70%)]"></div>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
            </div>

            {/* Scatter Map */}
            <div className="absolute inset-0 p-16">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <XAxis type="number" dataKey="x" hide />
                  <YAxis type="number" dataKey="y" hide />
                  <ZAxis type="number" range={[200, 800]} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3', stroke: '#06b6d4', strokeWidth: 1 }} 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const d = payload[0].payload;
                        return (
                          <div className="glass p-8 rounded-[2rem] border border-white/20 shadow-2xl backdrop-blur-2xl bg-black/90 space-y-4 min-w-[250px] animate-in zoom-in-95 duration-200">
                            <div className="flex justify-between items-center pb-2 border-b border-white/5">
                              <p className="text-sm font-bold text-cyan-400 uppercase tracking-[0.2em]">{d.name}</p>
                              <div className={`w-3 h-3 rounded-full ${d.status === 'Optimal' ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse shadow-[0_0_10px_currentColor]`} />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                               <div>
                                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Core Load</p>
                                  <p className="text-lg font-bold text-white tracking-tighter">{d.load}</p>
                               </div>
                               <div>
                                  <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Latency</p>
                                  <p className="text-lg font-bold text-cyan-500 tracking-tighter">{d.latency}</p>
                               </div>
                            </div>
                            <div className="pt-2">
                               <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Protocol: AES-XTS_ENABLED</p>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter name="Nodes" data={data}>
                    {data.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.status === 'Optimal' ? '#06b6d4' : entry.status === 'Heavy' ? '#a855f7' : '#ffffff20'} 
                        className="animate-pulse cursor-pointer"
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>

            {/* Orbit / Satellite Visual Overlay */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-[0.15]">
               <div className="w-[600px] h-[600px] border border-cyan-500/30 rounded-full relative animate-spin-slow">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <Satellite className="text-cyan-500" size={32} />
                    <div className="mt-4 h-48 w-[1px] bg-gradient-to-b from-cyan-500 to-transparent shadow-[0_0_20px_#06b6d4]" />
                  </div>
               </div>
               <div className="absolute w-[500px] h-[500px] border-2 border-dashed border-purple-500/10 rounded-full animate-reverse-spin" />
            </div>

            {/* Scanner Overlay */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent shadow-[0_0_30px_#06b6d4] animate-scan-y z-20 pointer-events-none"></div>

            {/* HUD Modules */}
            <div className="absolute top-10 left-10 space-y-6">
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 space-y-4 bg-black/60 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <Radar className="text-cyan-400 animate-pulse" size={24} />
                  <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40">Satellite Uplink Matrix</p>
                </div>
                <div className="flex items-end gap-6 pt-2">
                  <div className="text-5xl font-bold font-mono tracking-tighter text-white">15.4K <span className="text-[10px] text-cyan-400 uppercase align-middle ml-2">ACTIVE_RELAYS</span></div>
                </div>
              </div>
              
              <div className="glass p-8 rounded-[2.5rem] border border-white/10 bg-black/60 space-y-4 shadow-2xl backdrop-blur-md">
                 <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest text-white/30">
                    <Signal size={16} className="text-green-500" />
                    Neural Stream Synchronicity
                 </div>
                 <div className="h-24 w-64 pt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={telemetry}>
                        <Line type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={3} dot={false} isAnimationActive={false} className="drop-shadow-[0_0_8px_#06b6d4]" />
                      </LineChart>
                    </ResponsiveContainer>
                 </div>
              </div>
            </div>

            <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
               <div className="flex gap-6">
                  <div className="glass p-5 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 bg-black/80 shadow-2xl">
                    <MapPin size={18} className="text-cyan-400" />
                    Origin: Singapore_V4_HUB
                  </div>
                  <div className="glass p-5 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-4 bg-black/80 shadow-2xl">
                    <Crosshair size={18} className="text-red-500" />
                    Tactical Target: 0x98A_CYBER
                  </div>
               </div>
               
               <div className="glass p-8 rounded-3xl border border-white/10 bg-black/90 flex flex-col items-center gap-4 shadow-[0_0_50px_rgba(0,0,0,1)] group hover:border-cyan-500/40 transition-all cursor-pointer">
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-500/20 flex items-center justify-center group-hover:border-cyan-400 transition-colors">
                     <Loader2 className="text-cyan-500 animate-spin" size={32} />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-cyan-500 text-center animate-pulse">{isLive ? 'SYSTEM BROADCASTING' : 'CALIBRATING MATRIX'}</p>
               </div>
            </div>
          </div>

          {/* Secondary Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { label: 'Packet Throughput', value: isLive ? '184.2 GB/s' : '45.2 GB/s', icon: Activity, color: 'text-cyan-500', sub: 'Global Relay Load' },
              { label: 'Defense Integrity', value: '100.00%', icon: Shield, color: 'text-green-500', sub: 'AES-256 Protocol' },
              { label: 'AI Compute Cycles', value: '45.8 TFLOPS', icon: Cpu, color: 'text-purple-500', sub: 'Neural Core Performance' },
            ].map((card, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border border-white/5 hover:border-white/20 transition-all group bg-black/40 overflow-hidden relative shadow-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 -rotate-45 translate-x-20 -translate-y-20 group-hover:bg-white/10 transition-all"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className={`p-4 rounded-3xl bg-white/5 ${card.color} shadow-inner`}>
                    <card.icon size={32} />
                  </div>
                  <div className="text-right">
                     <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest font-mono">NODE_CLUSTER_0{i+1}</span>
                     <p className="text-[8px] text-white/5 font-bold uppercase mt-1">Status: Stable</p>
                  </div>
                </div>
                <div className="space-y-1">
                   <p className="text-[11px] font-bold text-white/30 uppercase tracking-[0.4em] mb-2">{card.label}</p>
                   <p className="text-4xl font-bold tracking-tighter text-white group-hover:text-cyan-400 transition-colors drop-shadow-2xl">{card.value}</p>
                   <p className="text-[10px] text-white/10 uppercase tracking-widest mt-4 font-medium italic">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Node Sidebar */}
        <div className="lg:col-span-3 space-y-10">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40 flex items-center gap-4">
              <Server size={18} className="text-purple-400" />
              Global Relay Health
            </h3>
            <div className="space-y-10">
              {['Asia-1 Cluster', 'US-West Node', 'EU-Nordic Relay', 'SA-Gateway_V3'].map((node, i) => (
                <div key={i} className="space-y-4 group cursor-help">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">{node}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${i === 3 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>{i === 3 ? 'LATENCY' : 'OPTIMAL'}</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${i === 3 ? 'bg-yellow-500 shadow-[0_0_10px_#eab308]' : 'bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_10px_#06b6d4]'}`} 
                      style={{ width: `${98 - i * 14}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-white/10 uppercase tracking-widest">
                     <span>Thread Count: 1024</span>
                     <span>Sync: 99.8%</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.5em] text-white/30 hover:text-white hover:bg-white/10 transition-all shadow-inner">View Detail Matrix</button>
          </div>

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 blur-[80px] pointer-events-none group-hover:bg-cyan-500/10 transition-all"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/40 mb-10 flex items-center gap-4">
              <Terminal size={18} className="text-cyan-400" />
              Strategic Logs
            </h3>
            <div className="space-y-8">
              {[
                { task: 'VPN Node Rotation', status: 'Success', time: '2m' },
                { task: 'Neural Weights Upload', status: 'Active', time: '12s' },
                { task: 'Market Funnel Injection', status: 'Success', time: '14m' },
                { task: 'Entropy Verification', status: 'Secure', time: '1h' },
              ].map((op, i) => (
                <div key={i} className="flex items-start gap-4 group/item">
                  <div className={`w-2 h-2 mt-1 rounded-full ${op.status === 'Success' || op.status === 'Secure' ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-cyan-500 animate-pulse shadow-[0_0_10px_#06b6d4]'}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold truncate uppercase tracking-widest text-white/80 group-hover/item:text-white transition-colors">{op.task}</p>
                    <p className="text-[9px] text-white/20 font-mono mt-1 uppercase tracking-tight">{op.time} ago • Status_{op.status.toUpperCase()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secure Handshake Stats */}
          <div className="p-8 bg-gradient-to-br from-cyan-900/40 to-black rounded-[3.5rem] border border-cyan-500/20 text-center relative overflow-hidden shadow-2xl group">
             <div className="relative z-10 space-y-4">
                <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                   <Signal size={36} className="text-cyan-400" />
                </div>
                <div className="space-y-2">
                   <h4 className="font-bold text-xs uppercase tracking-[0.6em] text-white/80">Signal Clarity</h4>
                   <p className="text-3xl font-bold tracking-tighter text-cyan-400 font-mono">99.98%</p>
                </div>
             </div>
             <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500/20 animate-scan-y"></div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        .animate-reverse-spin {
          animation: reverse-spin 12s linear infinite;
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg) }
          to { transform: rotate(0deg) }
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
        @keyframes scan-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(700px); }
        }
        .animate-scan-y {
          animation: scan-y 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
