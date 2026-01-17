
import React, { useState } from 'react';
import { 
  Rocket, ShieldCheck, Cpu, Globe, Zap, Loader2, CheckCircle2, 
  Terminal, Lock, Network, Share2, Package, Power, Activity,
  Server, Laptop, Box, FileCode, Layers, Crown, Star, Fingerprint,
  ExternalLink, Copy, Check, Link, Settings, Code2, Cloud, Key
} from 'lucide-react';

interface PublishProps {
  onPublishComplete: () => void;
  isLive: boolean;
}

export default function Publish({ onPublishComplete, isLive }: PublishProps) {
  const [stage, setStage] = useState<'IDLE' | 'SIGNING' | 'TUNNELING' | 'BINDING' | 'PUBLISHED'>(isLive ? 'PUBLISHED' : 'IDLE');
  const [progress, setProgress] = useState(isLive ? 100 : 0);
  const [logs, setLogs] = useState<string[]>(isLive ? ['[SYSTEM] XAVIER CORE BROADCASTING VIA GLOBAL RELAY PRODUCTION.'] : []);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'manual'>('status');
  
  const publicUrl = "https://xavier-os.vercel.app"; // Example placeholder

  const deploymentSteps = [
    { msg: 'Rotating AES-XTS-512 Production Key Matrix...', delay: 800, p: 15 },
    { msg: 'Initializing Sovereign Node Tunneling protocol...', delay: 1600, p: 35 },
    { msg: 'Injecting biometric intent profiling to public gates...', delay: 2400, p: 55 },
    { msg: 'Establishing TPR node handshake (15,420 production relays)...', delay: 3200, p: 75 },
    { msg: 'Binding Sovereign Root Signature to Cloud Backbone...', delay: 4200, p: 90 },
    { msg: 'GLOBAL BROADCAST ESTABLISHED. PUBLIC URL GENERATED.', delay: 5200, p: 100 }
  ];

  const handlePublish = () => {
    setStage('SIGNING');
    deploymentSteps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step.msg}`, ...prev].slice(0, 10));
        setProgress(step.p);
        if (i === 1) setStage('TUNNELING');
        if (i === 4) setStage('BINDING');
        if (i === deploymentSteps.length - 1) {
          setStage('PUBLISHED');
          onPublishComplete();
        }
      }, step.delay);
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className={`absolute inset-0 blur-[120px] opacity-20 animate-pulse ${stage === 'PUBLISHED' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <Rocket className={`relative z-10 animate-bounce-slow ${stage === 'PUBLISHED' ? 'text-green-500' : 'text-amber-500'}`} size={84} />
        </div>
        <h1 className="text-6xl font-bold tracking-tighter uppercase drop-shadow-2xl text-white">
          {stage === 'PUBLISHED' ? 'Ecosystem Deployed' : 'Global Sovereign Launch'}
        </h1>
        <p className={`${stage === 'PUBLISHED' ? 'text-green-500/40' : 'text-amber-500/40'} uppercase tracking-[1.2em] text-sm font-bold`}>
          Xavier AI Ecosystem: Production Node V4.2.1
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-10">
          <div className="glass p-2 rounded-[4rem] border border-white/10 bg-black/60 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col min-h-[750px]">
            {/* Inner Header Tabs */}
            <div className="flex border-b border-white/5 bg-white/5 rounded-t-[4rem]">
              <button 
                onClick={() => setActiveTab('status')}
                className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${activeTab === 'status' ? 'text-amber-500 bg-white/5' : 'text-white/20 hover:text-white'}`}
              >
                <Activity size={18} /> Launch Status
              </button>
              <button 
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${activeTab === 'manual' ? 'text-cyan-400 bg-white/5' : 'text-white/20 hover:text-white'}`}
              >
                <Code2 size={18} /> Public URL Setup Manual
              </button>
            </div>

            <div className="p-20 flex-1 flex flex-col items-center justify-center text-center relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.05)_0%,_transparent_75%)] pointer-events-none"></div>
              
              {activeTab === 'status' ? (
                stage === 'IDLE' ? (
                  <div className="space-y-16 animate-in zoom-in-95 duration-1000">
                    <div className="space-y-8">
                      <div className="w-32 h-32 rounded-[2.5rem] bg-amber-500/10 border-2 border-amber-500/20 flex items-center justify-center mx-auto shadow-2xl relative group cursor-pointer">
                        <Crown size={64} className="text-amber-500 animate-pulse" />
                        <div className="absolute -inset-4 border border-amber-500/10 rounded-[3.5rem] animate-spin-slow"></div>
                      </div>
                      <h2 className="text-5xl font-bold uppercase tracking-widest text-white">Genesis Protocol</h2>
                      <p className="text-xl text-white/30 uppercase tracking-[0.4em] font-medium leading-loose px-20">
                        Initiate the sovereign broadcast. This will generate your production link and verify global node availability.
                      </p>
                    </div>
                    <button 
                      onClick={handlePublish}
                      className="px-32 py-12 bg-white text-black font-bold rounded-[3.5rem] text-3xl uppercase tracking-[0.6em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_120px_rgba(255,255,255,0.3)] border-4 border-amber-500/50"
                    >
                      Publish Build
                    </button>
                  </div>
                ) : stage === 'PUBLISHED' ? (
                  <div className="space-y-16 animate-in zoom-in-95 duration-1000 w-full">
                    <div className="relative">
                      <div className="w-48 h-48 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center mx-auto shadow-[0_0_150px_rgba(34,197,94,0.4)]">
                        <CheckCircle2 size={84} className="text-green-500 animate-pulse" />
                      </div>
                    </div>
                    <div className="space-y-10">
                      <div className="space-y-4">
                        <h2 className="text-6xl font-bold uppercase tracking-widest text-green-500">Public Portal Live</h2>
                        <p className="text-xl text-white/60 uppercase tracking-[0.3em] font-bold italic leading-relaxed px-16">
                          Your sovereign link is active. Distribution to 30 high-ticket operatives is authorized.
                        </p>
                      </div>

                      <div className="max-w-3xl mx-auto p-12 bg-white/5 border border-white/10 rounded-[4rem] space-y-10 shadow-inner relative overflow-hidden group">
                        <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-between px-4">
                          <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/40">Sovereign URL (Generated)</p>
                          <Zap size={16} className="text-green-500 animate-pulse" />
                        </div>
                        <div className="relative">
                           <input 
                            type="text" 
                            readOnly 
                            value={publicUrl}
                            className="w-full bg-black/80 border border-green-500/30 rounded-[2.5rem] py-8 px-10 text-lg font-mono text-green-400 shadow-2xl focus:outline-none text-center"
                          />
                          <button 
                            onClick={copyUrl}
                            className="absolute right-6 top-1/2 -translate-y-1/2 p-4 hover:text-green-400 transition-colors text-white/20"
                          >
                            {copied ? <Check size={32} className="text-green-500" /> : <Copy size={32} />}
                          </button>
                        </div>
                        <p className="text-[10px] text-white/20 uppercase tracking-[0.5em] italic font-bold">Encrypted via RSA-4096 production cert.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-3xl space-y-20 py-10">
                    <div className="space-y-12">
                      <div className="relative">
                        <div className="w-48 h-48 border-8 border-amber-500/10 rounded-full mx-auto"></div>
                        <div className="w-48 h-48 border-t-8 border-amber-500 rounded-full animate-spin absolute top-0 left-1/2 -translate-x-1/2 shadow-[0_0_100px_rgba(251,191,36,0.4)]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          {stage === 'SIGNING' ? <Fingerprint className="text-amber-500 animate-pulse" size={64} /> : stage === 'TUNNELING' ? <Globe className="text-cyan-400 animate-spin-slow" size={64} /> : <Layers className="text-amber-400 animate-pulse" size={64} />}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="flex justify-between text-lg font-bold uppercase tracking-[0.8em] text-amber-500 mb-2 px-6">
                           <span>{stage.replace('_', ' ')}...</span>
                           <span>{progress}%</span>
                        </div>
                        <div className="h-6 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1.5 shadow-inner">
                          <div className="h-full bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 rounded-full transition-all duration-500 shadow-[0_0_30px_#f59e0b]" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </div>
                    
                    <div className="glass p-12 rounded-[4rem] bg-black border border-white/10 text-left font-mono text-[14px] h-80 overflow-y-auto scrollbar-hide shadow-inner relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/40 animate-scan-y"></div>
                      {logs.map((log, i) => (
                        <div key={i} className="flex gap-10 py-3 border-b border-white/5 opacity-80 animate-in slide-in-from-left-6">
                          <span className="text-amber-500 font-bold shrink-0">0xROOT >></span>
                          <span className="uppercase tracking-tighter text-white/90">{log}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : (
                <div className="w-full space-y-12 animate-in fade-in duration-700 text-left">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {[
                      { 
                        title: '1. Production Hosting', 
                        desc: 'Deploy this code to Vercel or Netlify. Connect your GitHub repository to enable CI/CD pipelines.', 
                        icon: Cloud,
                        color: 'text-cyan-400'
                      },
                      { 
                        title: '2. Environment Keys', 
                        desc: 'Add "API_KEY" to your deployment dashboard. This enables the Neural Uplink on the public web.', 
                        icon: Key,
                        color: 'text-amber-500'
                      },
                      { 
                        title: '3. Repo Binding', 
                        desc: 'Push code to: xavier-os-2026/xavier-_os.git. This ensures Sovereign Identity match.', 
                        icon: Link,
                        color: 'text-purple-400'
                      }
                    ].map((step, i) => (
                      <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[3rem] space-y-6 hover:bg-white/10 transition-all shadow-inner">
                        <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${step.color}`}>
                          <step.icon size={32} />
                        </div>
                        <h4 className="text-xl font-bold uppercase tracking-tight text-white">{step.title}</h4>
                        <p className="text-sm text-white/40 leading-relaxed font-medium">{step.desc}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-12 bg-black/60 border border-cyan-500/20 rounded-[4rem] space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 -rotate-45 translate-x-16 -translate-y-16"></div>
                    <div className="flex items-center gap-6">
                      <Terminal className="text-cyan-400" />
                      <h3 className="text-2xl font-bold uppercase tracking-widest">Build Configuration (Next Steps)</h3>
                    </div>
                    <div className="bg-black p-8 rounded-[2rem] border border-white/5 font-mono text-sm text-cyan-400/80 leading-relaxed shadow-inner">
                      {`// Initialize & Push to Sovereign Repo\n$ git init\n$ git remote add origin https://github.com/xavier-os-2026/xavier-_os.git\n$ git push -u origin main\n\n// Deploy on Vercel using this repo.`}
                    </div>
                    <button className="px-12 py-5 bg-cyan-600 text-white font-bold rounded-2xl text-[11px] uppercase tracking-[0.5em] hover:bg-cyan-500 transition-all shadow-xl">
                      Download Build Kit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-10">
          <div className={`glass p-12 rounded-[5rem] border space-y-12 shadow-2xl relative overflow-hidden group transition-all duration-1000 ${stage === 'PUBLISHED' ? 'border-green-500/20 bg-green-500/5' : 'border-amber-500/20 bg-black/40'}`}>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.6em] text-white/40 flex items-center gap-6">
              <ShieldCheck size={24} className={stage === 'PUBLISHED' ? 'text-green-500' : 'text-amber-500'} />
              {stage === 'PUBLISHED' ? 'Global Production' : 'Launch Security'}
            </h3>
            <div className="space-y-10">
              {[
                { label: 'Tunneling Protocol', val: 'X-SOVEREIGN', color: stage === 'PUBLISHED' ? 'text-green-500' : 'text-amber-500' },
                { label: 'E2EE Encryption', val: 'AES-XTS-512', color: 'text-cyan-500' },
                { label: 'Public Gateways', val: '15,420 ACTIVE', color: 'text-purple-500' },
                { label: 'Bypass Integrity', val: 'ROOT_SIGNED', color: 'text-green-500' },
              ].map((stat, i) => (
                <div key={i} className="p-8 bg-white/5 rounded-[3rem] border border-white/5 space-y-4 group/stat hover:bg-white/10 transition-all shadow-inner">
                  <p className="text-[11px] font-bold text-white/20 uppercase tracking-[0.4em]">{stat.label}</p>
                  <p className={`text-3xl font-bold tracking-tighter uppercase ${stat.color}`}>{stat.val}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-12 rounded-[5rem] border border-white/10 bg-gradient-to-br from-amber-900/40 to-black space-y-10 text-center shadow-2xl relative overflow-hidden group flex flex-col items-center">
             <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-[100px] opacity-10 animate-pulse"></div>
                <Star size={84} className="text-amber-500 animate-spin-slow" />
             </div>
             <p className="text-base font-bold uppercase tracking-[0.5em] text-white/40 px-6 italic leading-relaxed">
                "Your sovereign intelligence is now distributed on the public web."
             </p>
             <div className="flex gap-3">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-amber-500/20"></div>)}
             </div>
          </div>
        </aside>
      </div>

      <style>{`
        .animate-bounce-slow {
          animation: bounce-slow 4s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes scan-y {
          0% { transform: translateY(0); }
          100% { transform: translateY(320px); }
        }
        .animate-scan-y {
          animation: scan-y 8s linear infinite;
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
