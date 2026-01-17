
import React, { useState, useEffect } from 'react';
import {
  Terminal, Code, Copy, Check, Play, Loader2, Cpu, Sparkles, Wand2,
  Activity, Zap, RefreshCw, TerminalSquare, Network, FileCode2, Globe
} from 'lucide-react';
import { generateAutomationScript } from '../services/geminiService';

export default function CodeForge() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean | null>(null);
  const [forgeLogs, setForgeLogs] = useState<string[]>([]);
  const [compilingProgress, setCompilingProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      const logs = [
        'Establishing Quantum Handshake...',
        'Syncing Logic Trees via Node-HK-01...',
        'Injecting Neural Syntax Weights...',
        'Validating AES-XTS Buffer integrity...',
        'Reconstructing Virtual DOM fragments...',
        'Applying Stealth obfuscation layers...',
        'Compiling Directive Genesis...'
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < logs.length) {
          setForgeLogs(prev => [`[${new Date().toLocaleTimeString()}] ${logs[i]}`, ...prev].slice(0, 10));
          setCompilingProgress(prev => Math.min(100, prev + 15));
          i++;
        } else {
          setCompilingProgress(100);
        }
      }, 800);
      return () => {
        clearInterval(interval);
        setCompilingProgress(0);
        setForgeLogs([]);
      };
    }
  }, [loading]);

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    setForgeLogs(['[SYSTEM] Initializing Forge Protocol 0xAF...']);
    try {
      const result = await generateAutomationScript(prompt);
      setCode(result || '// Generation failed. Neural path obstructed.');
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("429")) {
        alert("API rate limit exceeded. Please wait a moment before trying again or check your plan and billing details.");
      } else {
        alert("An error occurred during code generation. Please check the console for details.");
      }
      setCode('// Critical error in Code Forge. System offline.');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(null), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <TerminalSquare className="text-cyan-400 animate-pulse" size={40} />
            Quantum Code Forge
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">Autonomous Logic Engineering • Xavier Core V4.2</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="glass px-8 py-4 rounded-3xl border border-white/10 flex items-center gap-6 bg-black/60 shadow-inner">
              <div className="flex flex-col">
                 <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Compiler Entropy</span>
                 <span className="text-lg font-mono font-bold text-cyan-400">0.9998_SECURE</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] animate-pulse"></div>
           </div>
           <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all group">
              <RefreshCw size={24} className="group-hover:rotate-180 transition-transform duration-700" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Inputs & Tactical Logs */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>

            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
              <Wand2 size={20} className="text-cyan-400" />
              Strategic Blueprint
            </h3>

            <div className="space-y-6">
               <div className="relative group/input">
                 <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Generate a high-ticket sales funnel automation script with multi-node proxy rotation and biometric sentiment triggers..."
                  className="w-full bg-black border border-white/10 rounded-[2.5rem] p-8 text-base focus:ring-2 focus:ring-cyan-500/30 focus:outline-none min-h-[220px] resize-none font-medium placeholder:text-white/5 shadow-inner transition-all group-hover/input:border-white/20"
                />
                <div className="absolute top-6 right-8 text-[9px] font-mono text-cyan-500/30 font-bold uppercase tracking-widest">Comp:V4.2</div>
               </div>

               <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3 shadow-inner group/node cursor-help">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover/node:text-white/40 transition-colors">Neural Load</p>
                     <p className="text-3xl font-bold font-mono text-white group-hover/node:text-cyan-400 transition-colors">{loading ? '94%' : '12%'}</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3 shadow-inner group/node cursor-help">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 group-hover/node:text-white/40 transition-colors">Sync Delay</p>
                     <p className="text-3xl font-bold font-mono text-white group-hover/node:text-cyan-400 transition-colors">{loading ? '4ms' : '1ms'}</p>
                  </div>
               </div>

               <button
                onClick={handleGenerate}
                disabled={loading || !prompt}
                className={`w-full py-8 rounded-[2.5rem] font-bold text-sm uppercase tracking-[0.5em] flex items-center justify-center gap-6 transition-all shadow-[0_0_80px_rgba(6,182,212,0.1)] border-2 ${
                  loading
                    ? 'bg-white/5 border-white/5 text-white/20'
                    : 'bg-white text-black border-white/20 hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_100px_rgba(6,182,212,0.2)]'
                }`}
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} className="animate-pulse" />}
                {loading ? 'COMPILING_DIRECTIVE' : 'FORGE_QUANTUM_LOGIC'}
              </button>
            </div>
          </div>

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 shadow-inner space-y-10 relative overflow-hidden group">
             <div className="flex items-center justify-between">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-5">
                   <Activity size={22} className="text-purple-400 animate-pulse" />
                   Forge Telemetry
                </h3>
                <div className="flex gap-1.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
                </div>
             </div>
             <div className="space-y-4 max-h-64 overflow-y-auto scrollbar-hide pr-2">
                {forgeLogs.length > 0 ? forgeLogs.map((log, i) => (
                  <div key={i} className="flex gap-6 p-4 bg-white/5 rounded-2xl border border-white/5 group-hover:border-cyan-500/30 transition-all font-mono text-[10px] animate-in slide-in-from-left-4">
                     <span className="text-cyan-500 font-bold shrink-0">{'>>>'}</span>
                     <p className="text-white/60 truncate uppercase tracking-tighter italic">{log}</p>
                  </div>
                )) : (
                  <div className="text-center py-10 text-[10px] text-white/10 uppercase tracking-[0.4em] italic font-bold">Awaiting_Forge_Protocol...</div>
                )}
             </div>
             {loading && (
               <div className="space-y-3 pt-6 border-t border-white/5 animate-in fade-in duration-1000">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 ml-2">
                     <span>Directive Genesis</span>
                     <span className="text-cyan-400">{compilingProgress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                     <div className="h-full bg-cyan-500 shadow-[0_0_12px_#06b6d4] transition-all duration-700" style={{ width: `${compilingProgress}%` }} />
                  </div>
               </div>
             )}
          </div>
        </aside>

        {/* Right Side: Compiled Code Viewport */}
        <main className="lg:col-span-8 h-full flex flex-col gap-10">
          <div className="glass rounded-[4.5rem] border border-white/10 flex-1 min-h-[750px] flex flex-col overflow-hidden bg-black shadow-[0_0_150px_rgba(0,0,0,1)] relative group/terminal">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

            {/* Terminal Window Header */}
            <div className="bg-white/5 border-b border-white/10 p-10 flex items-center justify-between relative z-20">
               <div className="flex items-center gap-10">
                  <div className="flex gap-3">
                     <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-500/40"></div>
                     <div className="w-4 h-4 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                     <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-500/40"></div>
                  </div>
                  <div className="h-8 w-px bg-white/10" />
                  <div className="space-y-1">
                     <p className="text-[12px] font-bold text-white/80 uppercase tracking-[0.3em]">Compiler_Core_V4.2</p>
                     <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.8em]">Directive: {code ? 'FORGED_0x9F' : 'IDLE'}</p>
                  </div>
               </div>
               <div className="flex gap-4">
                  <button
                    onClick={copyCode}
                    className="p-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-cyan-400 transition-all shadow-inner group/btn relative"
                  >
                     {copied ? <Check size={24} className="text-green-500 animate-in zoom-in" /> : <Copy size={24} className="group-hover/btn:scale-110" />}
                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-black border border-white/10 rounded-xl text-[9px] font-bold text-white opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                        Sync Source
                     </div>
                  </button>
                  <button className="p-5 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-cyan-400 transition-all shadow-inner group/btn">
                     <Play size={24} className="group-hover/btn:scale-110" />
                  </button>
               </div>
            </div>

            {/* Code Field */}
            <div className="flex-1 p-16 overflow-y-auto font-mono text-lg leading-relaxed relative bg-black shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-14 opacity-40">
                  <div className="relative">
                    <Loader2 className="text-cyan-500 animate-spin" size={100} />
                    <div className="absolute inset-0 bg-cyan-500 blur-[100px] opacity-20 animate-pulse"></div>
                  </div>
                  <div className="text-center space-y-6">
                    <p className="text-4xl font-bold tracking-tighter uppercase text-white">Reconstructing Syntax Trees</p>
                    <p className="text-[12px] font-bold text-cyan-400 uppercase tracking-[1em] animate-pulse">Modeling multi-dimensional logic flow</p>
                  </div>
                </div>
              ) : code ? (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                  <pre className="text-cyan-400/90 whitespace-pre-wrap selection:bg-cyan-500 selection:text-black">
                    {code}
                  </pre>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-40 space-y-20 opacity-10 group">
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl group-hover/terminal:scale-110 transition-transform duration-1500 relative">
                      <Code className="text-white/10 group-hover/terminal:text-cyan-400 transition-colors" size={100} />
                      <div className="absolute inset-0 rounded-full border-4 border-dashed border-cyan-500/10 animate-spin-slow"></div>
                    </div>
                  </div>
                  <div className="max-w-2xl space-y-8">
                    <h3 className="text-5xl font-bold uppercase tracking-tighter group-hover/terminal:text-white transition-colors">Compiler_Standby</h3>
                    <p className="text-lg font-medium leading-relaxed uppercase tracking-[0.5em] text-white/30 px-12 italic">
                      Neural forge cluster is online. Awaiting tactical directives to output world-first quantum logic fragments.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Terminal Footer HUD */}
            <div className="p-12 border-t border-white/5 bg-black flex justify-between items-center relative z-20">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
               <div className="flex gap-14 items-center">
                  <div className="flex items-center gap-5 text-[11px] font-bold text-white/20 uppercase tracking-widest">
                     <Network size={20} className="text-cyan-500" />
                     Node Relay: ACTIVE_SG_01
                  </div>
                  <div className="w-px h-8 bg-white/5" />
                  <div className="flex items-center gap-5 text-[11px] font-bold text-white/20 uppercase tracking-widest">
                     <Lock size={20} className="text-green-500" />
                     E2EE Tunnel: VERIFIED
                  </div>
               </div>
               <div className="flex items-center gap-6">
                  <Globe size={24} className="text-white/5 animate-spin-slow" />
                  <span className="text-[10px] font-mono text-white/10 uppercase tracking-[0.4em] font-bold">Xavier_OS_V4_FORGE</span>
               </div>
            </div>
          </div>
        </main>
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
