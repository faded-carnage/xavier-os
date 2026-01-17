
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Loader2, Zap, Globe, Cpu, Lock, Network, Terminal, Activity } from 'lucide-react';

interface LaunchProtocolProps {
  onComplete: () => void;
}

export default function LaunchProtocol({ onComplete }: LaunchProtocolProps) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Initializing Military Handshake...');
  const [logs, setLogs] = useState<string[]>([]);

  const launchSteps = [
    { msg: 'Establishing encrypted tunnel to Node HK-04...', p: 10 },
    { msg: 'Quantum Entanglement Matrix synchronized.', p: 25 },
    { msg: 'Bypassing global censorship filters via Tor Relay swarm...', p: 40 },
    { msg: 'Injecting AI Agent persistence into background worker nodes.', p: 55 },
    { msg: 'Syncing Warehouse Logistics with Stripe settlement gateways.', p: 70 },
    { msg: 'Validating Neural Uplink integrity across 5 continents.', p: 85 },
    { msg: 'Applying final AES-XTS memory encryption layers.', p: 95 },
    { msg: 'SYSTEM IS LIVE. BROADCASTING XAVIER_OS_V3.', p: 100 },
  ];

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < launchSteps.length) {
        const step = launchSteps[currentStep];
        setStatus(step.msg);
        setProgress(step.p);
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step.msg}`, ...prev.slice(0, 8)]);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 2000);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
         <div className="h-full w-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)]"></div>
      </div>

      <div className="max-w-4xl w-full space-y-12 relative">
        <div className="text-center space-y-4">
           <div className="relative inline-block mb-4">
              <Globe className="text-cyan-500 animate-spin-slow" size={84} />
              <div className="absolute inset-0 bg-cyan-500 blur-3xl opacity-20 animate-pulse"></div>
           </div>
           <h1 className="text-4xl font-bold tracking-[0.5em] uppercase">Global Deployment</h1>
           <p className="text-cyan-500 font-mono text-sm animate-pulse">BROADCASTING FROM SECURE NODE: FRANKFURT_DE_0x82</p>
        </div>

        <div className="space-y-6">
           <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-2">
              <span>{status}</span>
              <span>{progress}%</span>
           </div>
           <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
              <div 
                className="h-full bg-gradient-to-r from-cyan-600 via-blue-500 to-purple-600 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(6,182,212,0.5)]" 
                style={{ width: `${progress}%` }}
              ></div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { label: 'Nodes', val: '15.4k', icon: Network },
             { label: 'Security', val: 'QUANTUM', icon: Lock },
             { label: 'Neural', val: 'SYNCED', icon: Cpu },
             { label: 'Uplink', val: 'READY', icon: Zap },
           ].map((stat, i) => (
             <div key={i} className="glass p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center space-y-2 group transition-all" style={{ opacity: progress > (i * 20) ? 1 : 0.1 }}>
                <stat.icon className="text-cyan-500 group-hover:animate-bounce" size={24} />
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</p>
                <p className="text-sm font-bold tracking-tighter">{stat.val}</p>
             </div>
           ))}
        </div>

        <div className="glass p-8 rounded-[2rem] border border-white/5 bg-black/40 font-mono text-[11px] text-white/40 space-y-2 h-48 overflow-hidden shadow-inner">
           {logs.map((log, i) => (
             <div key={i} className="animate-in fade-in slide-in-from-left-4">
                <span className="text-cyan-500/60 mr-4">>>></span>
                {log}
             </div>
           ))}
        </div>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
