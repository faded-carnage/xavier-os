
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Command, Cpu, Monitor, ShieldCheck, Loader2, Zap, 
  ExternalLink, Activity, Layers, Globe, MousePointer2, Keyboard,
  Briefcase, Search, CheckCircle2, Laptop, Wifi, Maximize2, Power, Box,
  Scan, Ghost, Network, Lock, Fingerprint, FileText, Send, Sparkles,
  UserPlus, MessageSquare, TrendingUp, BarChart, Rocket
} from 'lucide-react';
import { generateAgentResponse } from '../services/geminiService';

export default function AIAgentConsole() {
  const [command, setCommand] = useState('');
  const [activeTab, setActiveTab] = useState<'browser' | 'freelancer' | 'affiliate'>('browser');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Xavier Autonomous Operative V4.2.1 Booting...',
    '[SYSTEM] Remote Proxy Hub: ESTABLISHED (Frankfurt_DE)',
    '[READY] Standby for high-ticket browser directive.'
  ]);
  const [isRunning, setIsRunning] = useState(false);
  const [agentOutput, setAgentOutput] = useState<string | null>(null);
  const [browserState, setBrowserState] = useState({
    url: 'https://xavier.ai/workspace',
    status: 'IDLE'
  });

  const simulatedJobs = [
    { id: 'JOB-01', platform: 'Fiverr Pro', title: 'High-Ticket SaaS Dev', budget: '$2,500', client: 'TechCorp', urgency: 'CRITICAL' },
    { id: 'JOB-02', platform: 'Upwork', title: 'AI Marketing Funnel Expert', budget: '$1,200', client: 'NexusStore', urgency: 'HIGH' },
    { id: 'JOB-03', platform: 'Fiverr Pro', title: 'Dropshipping Logistics Optimization', budget: '$3,800', client: 'GlobalLogistics', urgency: 'MEDIUM' }
  ];

  const handleExecute = async (customCmd?: string, targetSite?: string) => {
    const finalCmd = customCmd || command;
    if (!finalCmd) return;
    
    setIsRunning(true);
    setAgentOutput(null);
    setLogs(prev => [`>>> INITIALIZING DIRECTIVE: ${finalCmd}`, ...prev].slice(0, 10));
    setBrowserState(prev => ({ ...prev, url: targetSite || 'https://fiverr.com/pro', status: 'SYNCHRONIZING' }));

    const sequence = [
      { msg: '[AGENT] Rotating multi-hop onion identities...', delay: 1500 },
      { msg: '[AGENT] Injecting neural DOM fragments into target host...', delay: 3000 },
      { msg: '[AGENT] Bypassing fingerprint heuristics (Node-HK)...', delay: 5000 },
      { msg: '[AGENT] Extracting tactical job parameters...', delay: 7000 },
      { msg: '[SUCCESS] Autonomous task fulfilled via secure relay.', delay: 10000 }
    ];

    try {
      // API call comes first
      const response = await generateAgentResponse(finalCmd);
      setAgentOutput(response);

      // Then run simulation
      sequence.forEach((step, i) => {
        setTimeout(() => {
          setLogs(prev => [step.msg, ...prev].slice(0, 10));
          if (i === 4) {
             setIsRunning(false);
             setBrowserState(prev => ({ ...prev, status: 'COMPLETED' }));
          }
        }, step.delay);
      });
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("429")) {
        alert("API rate limit exceeded. Please wait a moment before trying again or check your plan and billing details.");
      } else {
        alert("An error occurred while executing the agent directive. Please check the console for details.");
      }
      setAgentOutput("Neural pipeline disrupted. Proxy rotation required.");
      setIsRunning(false);
    }
    setCommand('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000 h-[850px] flex flex-col">
      <div className="flex items-center justify-between px-10">
         <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
            {[
              { id: 'browser', label: 'Remote Browser', icon: Globe },
              { id: 'freelancer', label: 'Fiverr Terminal', icon: Briefcase },
              { id: 'affiliate', label: 'Affiliate Hive', icon: TrendingUp }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-4 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-orange-600 text-white shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
         </div>
         <div className="flex items-center gap-6">
            <div className="px-6 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full text-[10px] font-bold text-orange-400 uppercase tracking-widest animate-pulse">
               AUTONOMOUS_MODE: ACTIVE
            </div>
         </div>
      </div>

      <div className="flex flex-1 gap-10 overflow-hidden">
        {/* Unit HUD Sidebar */}
        <aside className="w-96 flex flex-col gap-8 h-full shrink-0">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden group flex-1">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-5">
              <Cpu size={22} className="text-orange-400" />
              Operative Kernel
            </h3>
            
            <div className="space-y-6 overflow-y-auto scrollbar-hide pr-2">
              {activeTab === 'freelancer' ? (
                simulatedJobs.map((job, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleExecute(`DRAFT_PROPOSAL_${job.id}_${job.title}`, 'https://fiverr.com/jobs')}
                    disabled={isRunning}
                    className="w-full text-left p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all group relative overflow-hidden shadow-inner"
                  >
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[9px] font-bold text-orange-500 uppercase tracking-widest">{job.platform}</span>
                       <span className="text-[10px] font-bold text-green-500">{job.budget}</span>
                    </div>
                    <p className="text-[13px] font-bold text-white group-hover:text-orange-400 uppercase tracking-widest">{job.title}</p>
                    <p className="text-[10px] text-white/20 mt-3 uppercase tracking-widest italic">{job.client}</p>
                  </button>
                ))
              ) : (
                ['MINE_FIVERR_PRO_DATA', 'ROTATE_CAMPAIGN_NODES', 'SCRAPE_AFFILIATE_OFFERS', 'SYMPHONY_DOM_BYPASS'].map((cmd, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleExecute(cmd)}
                    disabled={isRunning}
                    className="w-full text-left p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-orange-500/40 hover:bg-orange-500/5 transition-all group relative overflow-hidden shadow-inner"
                  >
                    <p className="text-[13px] font-bold text-white group-hover:text-orange-400 uppercase tracking-widest">{cmd.replace(/_/g, ' ')}</p>
                    <p className="text-[10px] text-white/20 mt-3 uppercase tracking-widest italic">Node: {i % 2 === 0 ? 'FRANKFURT' : 'SINGAPORE'}</p>
                  </button>
                ))
              )}
            </div>

            <div className="pt-8 border-t border-white/5">
               <div className="flex justify-between items-center px-2 mb-4">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Node Cluster Load</span>
                  <span className="text-[14px] font-bold text-orange-400 font-mono">{isRunning ? '92.8%' : '0.0%'}</span>
               </div>
               <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                 <div className={`h-full bg-orange-500 rounded-full transition-all duration-1000 ${isRunning ? 'w-full animate-pulse shadow-[0_0_15px_#f97316]' : 'w-0'}`} />
               </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 flex flex-col font-mono text-[11px] overflow-hidden shadow-inner relative h-64 shrink-0">
             <div className="flex items-center gap-6 mb-8 text-white/20 uppercase tracking-[0.6em] font-bold border-b border-white/5 pb-6">
                <Terminal size={18} className="text-orange-400 animate-pulse" />
                <span>Kernel_Trace</span>
             </div>
             <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide text-white/50">
                {logs.map((log, i) => (
                  <div key={i} className={`flex gap-4 ${log.startsWith('[SUCCESS]') ? 'text-green-500' : ''}`}>
                    <span className="opacity-20 font-bold">0x{i}</span>
                    <p className="uppercase tracking-tighter italic">{log}</p>
                  </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Viewport & Result Terminal */}
        <main className="flex-1 flex flex-col glass rounded-[4.5rem] border border-white/10 bg-black overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] relative group/viewport">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-40 animate-scan-y bg-gradient-to-b from-orange-500 to-transparent h-[400px] w-full"></div>
          
          <div className="bg-white/5 border-b border-white/10 p-10 flex items-center gap-12 relative z-50 shadow-2xl">
            <div className="flex gap-4">
              <div className="w-4 h-4 rounded-full bg-red-500/60"></div>
              <div className="w-4 h-4 rounded-full bg-yellow-500/60"></div>
              <div className="w-4 h-4 rounded-full bg-green-500/60"></div>
            </div>
            <div className="flex-1 flex items-center bg-black/90 rounded-[2.5rem] px-10 py-4 border border-white/10 gap-8 shadow-inner">
              <Lock size={18} className="text-green-500" />
              <span className="text-sm text-white/40 font-mono flex-1 font-bold tracking-tight uppercase truncate">{browserState.url}</span>
              <div className={`text-[10px] font-bold uppercase tracking-[0.4em] px-6 py-2 rounded-full border shadow-2xl ${browserState.status === 'COMPLETED' ? 'text-green-500 border-green-500/20' : 'text-orange-500 border-orange-500/20 animate-pulse'}`}>
                {browserState.status}
              </div>
            </div>
          </div>

          <div className="flex-1 relative overflow-hidden bg-black p-10">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
             
             {agentOutput && !isRunning ? (
               <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-6 duration-1000 relative z-20">
                  <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                     <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-6">
                        <FileText className="text-orange-500" />
                        Tactical Action Report
                     </h3>
                     <div className="flex gap-4">
                        <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-orange-400 transition-all"><Send size={20} /></button>
                        <button className="p-4 bg-white/5 rounded-2xl text-white/40 hover:text-orange-400 transition-all"><Rocket size={20} /></button>
                     </div>
                  </div>
                  <div className="flex-1 overflow-y-auto scrollbar-hide font-serif text-2xl leading-relaxed text-white/80 p-12 bg-white/5 rounded-[4rem] border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl italic border-l-[16px] border-l-orange-500">
                     {agentOutput}
                  </div>
                  <div className="mt-8 flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-white/10">
                     <span>OPERATIVE_SIGNATURE: 0x9AF</span>
                     <span className="flex items-center gap-3"><Sparkles size={14} className="text-orange-500" /> PROPOSAL_STRENGTH: 99.4%</span>
                  </div>
               </div>
             ) : (
               <div className="h-full flex flex-col items-center justify-center text-center space-y-16 relative z-10">
                 {isRunning ? (
                   <div className="space-y-16 scale-110">
                      <div className="relative">
                        <div className="w-56 h-56 border-4 border-orange-500/10 rounded-full animate-spin-slow"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Scan className="text-orange-500 animate-pulse" size={84} />
                        </div>
                      </div>
                      <div className="space-y-6">
                        <p className="text-5xl font-bold uppercase tracking-tighter text-white">Injecting Operative</p>
                        <p className="text-[14px] text-orange-400 uppercase tracking-[1.2em] animate-pulse font-bold">Synchronizing with Remote Host API...</p>
                      </div>
                   </div>
                 ) : (
                   <div className="opacity-20 group-hover/viewport:opacity-40 transition-opacity duration-1000 space-y-12">
                      <div className="w-48 h-48 bg-white/5 rounded-[4rem] flex items-center justify-center mx-auto border border-white/10 shadow-2xl relative group-hover/viewport:scale-110 transition-transform duration-2000">
                        <Monitor className="text-white/10" size={84} />
                        <div className="absolute inset-0 rounded-[4rem] border-4 border-dashed border-orange-500/20 animate-spin-slow"></div>
                      </div>
                      <div className="max-w-2xl space-y-8">
                        <h3 className="text-5xl font-bold uppercase tracking-widest text-white/60">Operative Workspace</h3>
                        <p className="text-lg uppercase tracking-[0.6em] text-white/20 font-bold leading-relaxed px-16 italic leading-loose">
                          Awaiting high-ticket browser directives. Xavier is primed for Fiverr Pro, Upwork, and global affiliate funnel execution.
                        </p>
                      </div>
                   </div>
                 )}
               </div>
             )}

             {isRunning && (
               <div className="absolute top-1/4 left-1/3 animate-agent-mouse text-orange-500 drop-shadow-[0_0_50px_#f97316] z-50">
                 <MousePointer2 size={64} fill="currentColor" />
               </div>
             )}
          </div>

          <div className="p-16 bg-black border-t border-white/10 flex gap-10 relative z-50 shadow-[0_-40px_100px_rgba(0,0,0,0.8)]">
             <div className="flex-1 relative group">
                <Command className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-orange-500 transition-colors" size={42} />
                <input 
                  type="text" 
                  value={command}
                  onChange={(e) => setCommand(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleExecute()}
                  placeholder="Inject high-ticket tactical browser directive..." 
                  className="w-full bg-black border border-white/10 rounded-[3.5rem] py-12 pl-32 pr-16 text-2xl focus:ring-2 focus:ring-orange-500/50 focus:outline-none transition-all placeholder:text-white/10 font-medium shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
                />
             </div>
             <button 
                onClick={() => handleExecute()}
                disabled={isRunning || !command}
                className="px-24 bg-gradient-to-tr from-orange-700 to-orange-400 text-black font-bold rounded-[3.5rem] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_100px_rgba(249,115,22,0.4)] flex items-center gap-10 group/btn border-2 border-orange-300"
              >
                <Zap size={48} className="group-hover/btn:animate-bounce" />
                <span className="uppercase tracking-[0.8em] text-xl">EXEC</span>
             </button>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes agent-mouse {
          0% { transform: translate(0, 0) }
          25% { transform: translate(550px, 150px) }
          50% { transform: translate(150px, 480px) }
          75% { transform: translate(650px, 300px) }
          100% { transform: translate(0, 0) }
        }
        .animate-agent-mouse {
          animation: agent-mouse 12s infinite ease-in-out;
        }
        @keyframes scan-y {
          0% { transform: translateY(-400px); }
          100% { transform: translateY(850px); }
        }
        .animate-scan-y {
          animation: scan-y 10s linear infinite;
        }
      `}</style>
    </div>
  );
}
