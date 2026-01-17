
import React, { useState, useEffect } from 'react';
import { Shield, Zap, Network, Lock, Signal, Activity, Globe, Cpu } from 'lucide-react';

const GlobalStatusHUD: React.FC = () => {
  const [nodes, setNodes] = useState(15420);
  const [encryption, setEncryption] = useState('AES-XTS-512');
  const [threatLevel, setThreatLevel] = useState('LOW');

  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-12 left-1/2 -translate-x-1/2 z-[60] flex gap-4 pointer-events-none">
      <div className="glass px-6 py-2 rounded-full border border-cyan-500/30 flex items-center gap-4 bg-black/80 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-cyan-400 animate-spin-slow" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active_Nodes</span>
          <span className="text-[10px] font-mono font-bold text-cyan-400">{nodes.toLocaleString()}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-green-500" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Cipher</span>
          <span className="text-[10px] font-mono font-bold text-green-500">{encryption}</span>
        </div>
        <div className="w-px h-3 bg-white/10" />
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-purple-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Threat_Level</span>
          <span className="text-[10px] font-mono font-bold text-purple-400">{threatLevel}</span>
        </div>
      </div>
    </div>
  );
};

export default GlobalStatusHUD;
