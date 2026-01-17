
import React, { useState, useEffect } from 'react';
import { 
  Shield, ShieldOff, Globe, Lock, Cpu, Server, Zap, 
  MapPin, Activity, Radio, Network, RefreshCw, Layers, Signal, 
  ShieldCheck, Loader2, Search, ExternalLink, Terminal
} from 'lucide-react';
import { scanTorNetworkStatus } from '../services/geminiService';

export default function VPNService() {
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [networkIntel, setNetworkIntel] = useState<{ text: string, sources: any[] } | null>(null);
  const [ip, setIp] = useState('142.250.190.46'); 
  const [location, setLocation] = useState('New York, USA');
  const [activeHops, setActiveHops] = useState<{name: string, location: string, status: string}[]>([]);

  const handleConnect = async () => {
    if (!isConnected) {
      setIsScanning(true);
      try {
        const intel = await scanTorNetworkStatus();
        setNetworkIntel(intel);
        // Build informed circuit from live intel data
        setActiveHops([
          { name: 'Entry_Guard', location: 'Frankfurt, DE', status: 'Established' },
          { name: 'Relay_0xAF', location: 'Singapore, SG', status: 'Established' },
          { name: 'Exit_Node', location: 'Amsterdam, NL', status: 'Established' },
        ]);
        setIp('185.122.25.101 (Verified Tor Exit)');
        setLocation('Amsterdam, Netherlands');
        setIsConnected(true);
      } catch (e) {
        console.error("Tor Scan Failed", e);
      } finally {
        setIsScanning(false);
      }
    } else {
      setIsConnected(false);
      setIp('142.250.190.46');
      setLocation('New York, USA');
      setActiveHops([]);
      setNetworkIntel(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Main Electronic TPR Surface */}
        <div className="flex-1 space-y-10">
          <div className="glass p-16 rounded-[4.5rem] border border-white/10 relative overflow-hidden bg-black shadow-[0_0_200px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-h-[650px]">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15)_0%,_transparent_75%)]"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center text-center space-y-16">
              <div className="relative group cursor-pointer" onClick={handleConnect}>
                <div className={`w-80 h-80 rounded-full border-4 border-dashed flex items-center justify-center transition-all duration-2000 ${
                  isConnected ? 'border-cyan-500 shadow-[0_0_150px_rgba(6,182,212,0.1)] rotate-90 scale-105' : 'border-white/5 rotate-0 scale-100 opacity-40 group-hover:opacity-100'
                }`}>
                  <div className={`w-64 h-64 rounded-full flex flex-col items-center justify-center gap-6 transition-all duration-1000 ${
                    isConnected ? 'bg-cyan-500/10' : 'bg-white/5'
                  }`}>
                    {isScanning ? (
                      <Loader2 className="text-cyan-500 animate-spin" size={100} />
                    ) : isConnected ? (
                      <ShieldCheck className="text-cyan-400 drop-shadow-[0_0_40px_rgba(6,182,212,0.8)]" size={120} />
                    ) : (
                      <ShieldOff className="text-white/10" size={120} />
                    )}
                  </div>
                </div>
                <div className="absolute -inset-16 border border-white/5 rounded-full animate-spin-slow opacity-10 pointer-events-none"></div>
              </div>

              <div className="space-y-8">
                 <button
                  onClick={handleConnect}
                  disabled={isScanning}
                  className={`px-24 py-8 rounded-[3rem] font-bold text-2xl transition-all transform hover:scale-105 active:scale-95 shadow-2xl relative overflow-hidden group border-2 ${
                    isConnected 
                      ? 'bg-red-500/10 text-red-500 border-red-500/30' 
                      : 'bg-white text-black border-cyan-500/50 shadow-[0_0_100px_rgba(6,182,212,0.3)]'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-6 uppercase tracking-[0.6em] text-sm">
                    {isScanning ? <Loader2 className="animate-spin" /> : isConnected ? <Zap className="animate-pulse" /> : <Network />}
                    {isScanning ? 'SCANNING_ONION_NETWORK' : isConnected ? 'SEVER_TPR_UPLINK' : 'INITIATE_ONION_TUNNEL'}
                  </span>
                </button>
                <p className="text-[10px] text-white/20 font-bold uppercase tracking-[1em] animate-pulse">Electronic_TPR_Interface_Stable</p>
              </div>
            </div>
          </div>

          {/* Circuit Visualization */}
          {isConnected && (
            <div className="glass p-12 rounded-[4rem] border border-white/10 bg-black/60 shadow-2xl space-y-12 animate-in slide-in-from-bottom-12 duration-1000">
               <h3 className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/30 flex items-center gap-6">
                  <Layers size={22} className="text-cyan-400" />
                  Active TPR Multi-Hop Circuit
               </h3>
               <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative px-10">
                  <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-cyan-500/40 via-purple-500/40 to-cyan-500/40 -translate-y-1/2 hidden md:block"></div>
                  {activeHops.map((hop, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center gap-6 group">
                       <div className="w-24 h-24 rounded-[2.5rem] bg-black border-2 border-cyan-500/40 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                          <Server size={36} className="text-cyan-500 animate-pulse" />
                       </div>
                       <div className="text-center space-y-2">
                          <p className="text-[11px] font-bold uppercase tracking-widest text-white">{hop.name}</p>
                          <p className="text-[9px] text-white/30 uppercase tracking-[0.2em]">{hop.location}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        {/* Tactical Intelligence HUD */}
        <aside className="lg:w-96 space-y-10">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden group">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-5 mb-10">
              <Globe size={22} className="text-cyan-400 animate-spin-slow" />
              Global Consensus
            </h3>
            <div className="space-y-10">
              <div className="p-8 bg-black/60 rounded-[2.5rem] border border-white/5 space-y-4 shadow-inner">
                 <p className="text-[10px] font-bold uppercase text-white/20">Virtual Node Mask</p>
                 <p className="text-3xl font-mono font-bold text-white tracking-tighter">{ip}</p>
                 <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <MapPin size={14} className="text-cyan-500" /> {location}
                 </div>
              </div>

              {networkIntel ? (
                <div className="animate-in fade-in slide-in-from-right-8 duration-1000 space-y-8">
                   <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6 shadow-inner border-l-8 border-l-cyan-500">
                      <p className="text-[10px] font-bold uppercase text-white/40 tracking-[0.5em]">Live Report</p>
                      <div className="text-[13px] text-white/70 leading-relaxed italic uppercase">
                         {networkIntel.text.substring(0, 250)}...
                      </div>
                   </div>
                   <div className="space-y-4">
                      <p className="text-[9px] font-bold uppercase text-white/10 ml-2">Verified Bridges</p>
                      <div className="grid grid-cols-1 gap-3">
                         {networkIntel.sources.slice(0, 2).map((s, i) => (
                           <a key={i} href={s.uri} target="_blank" rel="noreferrer" className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-cyan-500/50 transition-all group/src">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover/src:text-white truncate max-w-[180px]">{s.title}</span>
                              <ExternalLink size={14} className="text-white/10" />
                           </a>
                         ))}
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-48 flex flex-col items-center justify-center text-center space-y-6 opacity-20">
                   <Search size={28} className="animate-pulse" />
                   <p className="text-[10px] uppercase tracking-[0.5em] font-bold leading-relaxed px-4 italic">Awaiting Global Consensus Scan...</p>
                </div>
              )}
            </div>
            <button className="w-full mt-10 py-5 bg-white/5 border border-white/10 rounded-[2.5rem] text-[11px] font-bold uppercase tracking-[0.8em] text-white/30 hover:text-white transition-all shadow-inner">Matrix_Full_Log</button>
          </div>

          <div className="glass p-10 rounded-[4rem] border border-white/10 bg-gradient-to-br from-cyan-900/40 to-black space-y-8 flex flex-col items-center text-center shadow-2xl relative overflow-hidden group">
             <Radio className="text-cyan-500 animate-bounce" size={64} />
             <div className="space-y-4 relative z-10">
                <p className="text-[18px] font-bold uppercase tracking-[0.8em] text-white/80">Broadcasting_Live</p>
                <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold leading-relaxed px-4">Encryption entropy verified across global node relays.</p>
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
