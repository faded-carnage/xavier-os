
import React, { useState, useEffect } from 'react';
import { 
  Target, TrendingUp, Users, Layout, Zap, Search, ChevronRight, Loader2, 
  Sparkles, Network, ArrowDown, ShieldCheck, BarChart3, Workflow, 
  MousePointer2, FileCode2, Copy, Check, Download, MonitorPlay, 
  Rocket, Globe, Activity, Layers, Coins, Radio, Signal, Power, BrainCircuit, Lock
} from 'lucide-react';
import { generateMarketingStrategy, generateAutomationScript, generateAdCreative } from '../services/geminiService';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const liveTrafficData = Array.from({ length: 20 }, (_, i) => ({ name: i, val: 30 + Math.random() * 50 }));

export default function MarketingSuite() {
  const [product, setProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [strategy, setStrategy] = useState<string | null>(null);
  const [activeFunnelStep, setActiveFunnelStep] = useState(0);
  const [activeView, setActiveView] = useState<'strategy' | 'code' | 'ads' | 'monitoring'>('strategy');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [adVariants, setAdVariants] = useState<any[]>([]);
  const [codeLoading, setCodeLoading] = useState(false);
  const [adsLoading, setAdsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'IDLE' | 'DEPLOYING' | 'LIVE'>('IDLE');
  const [traffic, setTraffic] = useState(liveTrafficData);
  
  // Real Mode State
  const [isProduction, setIsProduction] = useState(false);

  useEffect(() => {
    // Check for Production Environment
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
      // Reset traffic to flatline for real mode
      setTraffic(Array.from({ length: 20 }, (_, i) => ({ name: i, val: 0 })));
    }
  }, []);

  useEffect(() => {
    // Only run simulation if NOT in production
    if (deploymentStatus === 'LIVE' && !isProduction) {
      const interval = setInterval(() => {
        setTraffic(prev => [...prev.slice(1), { name: Date.now(), val: 40 + Math.random() * 50 }]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [deploymentStatus, isProduction]);

  const handleGenerateStrategy = async () => {
    if (!product) return;
    setLoading(true);
    setGeneratedCode(null);
    setAdVariants([]);
    try {
      const result = await generateMarketingStrategy(product);
      setStrategy(result || 'No strategy could be generated.');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAds = async () => {
    if (!product) return;
    setAdsLoading(true);
    setActiveView('ads');
    try {
      const ads = await generateAdCreative(product);
      setAdVariants(ads);
    } catch (err) {
      console.error(err);
    } finally {
      setAdsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    if (!strategy) return;
    setCodeLoading(true);
    setActiveView('code');
    try {
      const result = await generateAutomationScript(`Generate a high-ticket enterprise landing page for: ${strategy.substring(0, 1000)}`);
      setGeneratedCode(result);
    } catch (err) {
      console.error(err);
    } finally {
      setCodeLoading(false);
    }
  };

  const deployCampaign = () => {
    setDeploymentStatus('DEPLOYING');
    setTimeout(() => {
      setDeploymentStatus('LIVE');
      setActiveView('monitoring');
    }, 4000);
  };

  const funnelSteps = [
    { label: 'Neural Capture', icon: Target, val: isProduction ? '0' : '184k', sub: 'Impressions', desc: 'AI-driven ad variation swarm.' },
    { label: 'Relay Tunnel', icon: Network, val: isProduction ? '0' : '28k', sub: 'Clicks', desc: 'Zero-knowledge redirect matrices.' },
    { label: 'Intent Harvest', icon: Zap, val: isProduction ? '0' : '4.2k', sub: 'Conversions', desc: 'Biometric intent profiling sync.' },
    { label: 'Settlement', icon: ShieldCheck, val: isProduction ? '$0.00' : '1.4k', sub: 'LTV Yield', desc: 'Secure blockchain transactions.' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Target className={isProduction ? "text-green-500" : "text-purple-400 animate-pulse"} size={40} />
            {isProduction ? 'Live Production Funnel' : 'Strategic Funnel Nexus'}
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.8em] font-bold">
            {isProduction ? 'REAL TRAFFIC MONITORING • NO SIMULATIONS' : 'Autonomous Market Domination & Global Deployment'}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
             {[
               { id: 'strategy', label: 'Matrix' },
               { id: 'ads', label: 'Swarm' },
               { id: 'code', label: 'Genesis' },
               { id: 'monitoring', label: 'Orbit' }
             ].map(v => (
              <button 
                key={v.id}
                onClick={() => setActiveView(v.id as any)} 
                className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeView === v.id ? 'bg-purple-600 text-white shadow-2xl' : 'text-white/40 hover:text-white'}`}
              >
                {v.label}
              </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 flex flex-col gap-8">
          <div className="glass p-12 rounded-[4rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/5 -rotate-45 translate-x-20 -translate-y-20 group-hover:bg-purple-500/10 transition-all duration-1000"></div>
            <h3 className="font-bold flex items-center gap-4 text-[12px] uppercase tracking-[0.5em] text-white/40">
              <Zap size={22} className="text-yellow-400" />
              Campaign Vector
            </h3>
            <div className="space-y-8">
              <div className="space-y-4">
                <label className="block text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] ml-6 italic">Target Niche Architecture</label>
                <div className="relative group/input">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-purple-400 transition-colors" size={28} />
                   <input 
                    type="text" 
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                    placeholder="e.g. High-Ticket SaaS Automation"
                    className="w-full bg-black/60 border border-white/10 rounded-[2.5rem] pl-16 pr-8 py-8 text-xl focus:ring-2 focus:ring-purple-500/30 focus:outline-none transition-all placeholder:text-white/5 shadow-inner font-medium"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={handleGenerateStrategy}
                  disabled={loading || !product}
                  className="py-8 bg-white text-black font-bold rounded-[2.5rem] uppercase tracking-[0.4em] text-[11px] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30 group"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <Rocket size={22} className="group-hover:-translate-y-1 transition-transform" />}
                  Architect
                </button>
                <button 
                  onClick={handleGenerateAds}
                  disabled={adsLoading || !product}
                  className="py-8 bg-purple-600/20 border border-purple-500/40 text-purple-400 font-bold rounded-[2.5rem] uppercase tracking-[0.4em] text-[11px] hover:bg-purple-600 hover:text-white transition-all shadow-xl flex items-center justify-center gap-4"
                >
                   {adsLoading ? <Loader2 className="animate-spin" /> : <MonitorPlay size={22} />}
                   Swarm_Gen
                </button>
              </div>

              {strategy && (
                <button 
                  onClick={deployCampaign}
                  disabled={deploymentStatus !== 'IDLE'}
                  className={`w-full py-8 rounded-[2.5rem] font-bold uppercase tracking-[0.6em] text-sm flex items-center justify-center gap-6 transition-all shadow-[0_0_80px_rgba(34,197,94,0.3)] border-2 ${
                    deploymentStatus === 'LIVE' ? 'bg-green-600 border-green-400 text-white' : 'bg-gradient-to-tr from-green-700 to-green-500 border-white/10 text-white hover:scale-105'
                  }`}
                >
                  {deploymentStatus === 'DEPLOYING' ? <Loader2 className="animate-spin" /> : <Globe size={24} />}
                  {deploymentStatus === 'LIVE' ? 'BROADCASTING_LIVE' : 'INITIATE_DEPLOYMENT'}
                </button>
              )}
            </div>
          </div>

          <div className="glass p-12 rounded-[4rem] border border-white/10 bg-black/60 shadow-inner flex-1 flex flex-col">
            <h3 className="font-bold text-[11px] uppercase text-white/30 tracking-[0.8em] flex items-center gap-6 mb-12">
               <Workflow size={24} className={isProduction ? "text-green-500" : "text-cyan-400"} />
               {isProduction ? 'Real Traffic Pulse' : 'Live Funnel Pulse'}
            </h3>
            <div className="space-y-8 flex-1 overflow-y-auto pr-4 scrollbar-hide">
              {funnelSteps.map((step, i) => (
                <div key={i} className="group cursor-default">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-6">
                      <div className={`p-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner group-hover:scale-110 transition-transform ${isProduction ? 'text-green-500' : 'text-purple-400'}`}>
                        <step.icon size={28} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 mb-1">{step.label}</p>
                        <p className="text-3xl font-bold tracking-tighter text-white drop-shadow-2xl">{step.val}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <span className={`text-[9px] font-bold uppercase tracking-widest ${isProduction ? 'text-white/20' : 'text-green-500/60'}`}>
                         {isProduction ? 'WAITING' : '+12.4%'}
                       </span>
                       <p className="text-[9px] text-white/10 uppercase tracking-widest mt-1 italic">{step.sub}</p>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                    <div className={`h-full rounded-full transition-all duration-1000 ${isProduction ? 'bg-green-500 w-0' : 'bg-gradient-to-r from-purple-600 to-cyan-500'}`} style={{ width: isProduction ? '0%' : `${95 - i * 20}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-8 flex flex-col gap-10">
          <div className="glass rounded-[5rem] border border-white/10 min-h-[850px] relative overflow-hidden bg-black shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col group/main">
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
            
            {activeView === 'strategy' && strategy ? (
              <div className="flex-1 p-20 flex flex-col h-full relative z-10 animate-in fade-in duration-1000">
                <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-14">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-bold tracking-tighter uppercase drop-shadow-2xl">{product} : Blueprint</h2>
                    <p className="text-[12px] font-bold uppercase tracking-[0.8em] text-white/20 flex items-center gap-4">
                       <ShieldCheck size={20} className="text-green-500" />
                       Strategic Synthesis Active • 0xAF9
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={handleGenerateCode} className="px-12 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-[2rem] text-[12px] font-bold uppercase tracking-[0.4em] hover:scale-105 transition-all shadow-[0_0_50px_rgba(147,51,234,0.3)]">Forge Assets</button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide pr-10">
                  <div className="text-white/80 whitespace-pre-wrap font-serif text-3xl leading-relaxed italic p-20 bg-white/5 rounded-[5rem] border border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] backdrop-blur-3xl border-l-[14px] border-l-purple-500">
                    {strategy}
                  </div>
                </div>
                <div className="mt-14 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-bold uppercase tracking-[1em] text-white/10">
                   <span>DEPLOYMENT_NODE: HK-04_ACTIVE</span>
                   <span>LATENCY: 1.2ms</span>
                </div>
              </div>
            ) : activeView === 'ads' && adVariants.length > 0 ? (
              <div className="flex-1 p-20 flex flex-col h-full relative z-10 animate-in slide-in-from-bottom-12 duration-1000">
                 <div className="flex items-center justify-between mb-16 border-b border-white/5 pb-12">
                    <div className="space-y-4">
                       <h3 className="text-4xl font-bold uppercase tracking-tighter flex items-center gap-8">
                          <MonitorPlay className="text-purple-400 animate-pulse" size={42} />
                          Creative Swarm Matrix
                       </h3>
                       <p className="text-[12px] font-bold text-white/20 uppercase tracking-[0.8em]">Multi-Variant Autonomous Ad Fragments</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 flex-1 overflow-y-auto scrollbar-hide pr-6">
                    {adVariants.map((ad, i) => (
                      <div key={i} className="glass p-14 rounded-[5rem] border border-white/10 bg-black/60 space-y-10 flex flex-col relative group/ad overflow-hidden hover:border-purple-500/40 transition-all shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 -rotate-45 translate-x-16 -translate-y-16 group-hover/ad:bg-purple-500/20 transition-all duration-1000"></div>
                        <div className="flex justify-between items-center relative z-10">
                           <span className="text-[12px] font-bold uppercase tracking-[0.6em] text-purple-400">Node_Variant_0{i+1}</span>
                           <div className="flex gap-3">
                             <Check className="text-green-500" size={20} />
                             <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Optimized</span>
                           </div>
                        </div>
                        <div className="space-y-6 relative z-10">
                           <h4 className="text-3xl font-bold text-white tracking-tight uppercase group-hover/ad:text-purple-300 transition-colors leading-tight">{ad.headline}</h4>
                           <p className="text-lg text-white/40 leading-relaxed font-medium line-clamp-4">{ad.text}</p>
                        </div>
                        <div className="mt-auto pt-10 border-t border-white/5 space-y-10 relative z-10">
                           <div className="p-8 bg-black/80 rounded-[2.5rem] border border-white/5 shadow-inner">
                              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/20 mb-4 flex items-center gap-4 italic"><Signal size={16} /> Latent Theme</p>
                              <p className="text-sm text-purple-300 font-bold tracking-widest uppercase">"{ad.visualTheme}"</p>
                           </div>
                           <button className="w-full py-6 bg-white text-black font-bold rounded-[2.5rem] text-[12px] uppercase tracking-[0.8em] shadow-2xl hover:scale-105 active:scale-95 transition-all group/btn">
                              {ad.cta}
                              <ChevronRight className="inline ml-4 group-hover/btn:translate-x-2 transition-transform" />
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
              </div>
            ) : activeView === 'monitoring' && deploymentStatus === 'LIVE' ? (
              <div className="flex-1 p-20 flex flex-col h-full relative z-10 animate-in fade-in duration-1000">
                 <div className="flex items-center justify-between mb-20">
                    <div className="space-y-4">
                       <h3 className="text-5xl font-bold uppercase tracking-tighter flex items-center gap-10">
                          <Activity className={isProduction ? "text-green-500" : "text-green-400 animate-pulse"} size={48} />
                          {isProduction ? 'Production Traffic Stream' : 'Live Campaign Orbit'}
                       </h3>
                       <p className="text-[13px] font-bold text-white/20 uppercase tracking-[1em]">
                         {isProduction ? 'Awaiting Pixel Fire Events' : 'Broadcasting via 15,420 Global Node Clusters'}
                       </p>
                    </div>
                    {isProduction && (
                      <div className="glass px-10 py-5 rounded-[2.5rem] bg-green-900/20 border-2 border-green-500/30 shadow-[0_0_60px_rgba(34,197,94,0.2)] flex items-center gap-4">
                         <Lock size={20} className="text-green-500" />
                         <p className="text-green-500 text-[14px] font-bold uppercase tracking-[0.5em]">Real Mode Active</p>
                      </div>
                    )}
                 </div>

                 <div className="grid grid-cols-2 gap-12 mb-20">
                    <div className="glass p-14 rounded-[5rem] border border-white/10 bg-black/60 flex flex-col gap-10 shadow-2xl relative group overflow-hidden">
                       <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 -rotate-45 translate-x-20 -translate-y-20"></div>
                       <div className="flex justify-between items-center">
                          <h4 className="text-[12px] font-bold uppercase tracking-[0.8em] text-white/20">Real-Time Traffic</h4>
                          <span className="text-cyan-400 text-[11px] font-bold uppercase tracking-widest animate-pulse flex items-center gap-3"><Signal size={16} /> {isProduction ? 'Waiting for Data' : '0.4ms Delay'}</span>
                       </div>
                       <div className="h-64 w-full relative z-10">
                          {isProduction ? (
                            <div className="w-full h-full flex flex-col items-center justify-center opacity-40 space-y-4">
                               <Globe size={48} className="text-cyan-500 animate-pulse" />
                               <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-cyan-500">Live Socket Listening...</p>
                            </div>
                          ) : (
                            <ResponsiveContainer width="100%" height="100%">
                               <AreaChart data={traffic}>
                                  <Area type="monotone" dataKey="val" stroke="#06b6d4" strokeWidth={5} fill="#06b6d410" isAnimationActive={false} />
                               </AreaChart>
                            </ResponsiveContainer>
                          )}
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       {[
                         { label: 'Settled ROI', val: isProduction ? '0.0%' : '458%', icon: TrendingUp, color: 'text-green-400' },
                         { label: 'Neural Sync', val: isProduction ? 'READY' : '99.2%', icon: BrainCircuit, color: 'text-purple-400' },
                         { label: 'Packet Load', val: isProduction ? '0 B' : '1.4 PB', icon: Layers, color: 'text-cyan-400' },
                         { label: 'Total Yield', val: isProduction ? '$0.00' : '$84k', icon: Coins, color: 'text-yellow-400' },
                       ].map((stat, i) => (
                        <div key={i} className="glass p-10 rounded-[3.5rem] border border-white/5 bg-black/40 space-y-6 shadow-2xl group hover:border-white/20 transition-all">
                           <div className={`p-4 rounded-3xl bg-white/5 ${stat.color} shadow-inner group-hover:scale-110 transition-transform`}>
                              <stat.icon size={28} />
                           </div>
                           <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-white/20 mb-2">{stat.label}</p>
                              <p className="text-4xl font-bold tracking-tighter text-white">{stat.val}</p>
                           </div>
                        </div>
                       ))}
                    </div>
                 </div>

                 <div className="mt-auto p-12 bg-white/5 border border-white/10 rounded-[4rem] flex items-center justify-between shadow-inner relative overflow-hidden group">
                    <div className="absolute inset-0 bg-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-8">
                       <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30 group-hover:animate-pulse shadow-inner">
                          <Power className="text-red-500" size={32} />
                       </div>
                       <div className="space-y-1">
                          <p className="text-lg font-bold uppercase tracking-tight text-red-500">Nuclear Protocol: Scorch_Campaign</p>
                          <p className="text-[11px] text-white/20 font-bold uppercase tracking-widest italic">Immediately dismantle all conversion nodes and wipe landing buffers.</p>
                       </div>
                    </div>
                    <button className="px-14 py-5 bg-red-600 text-white font-bold rounded-[2rem] text-[12px] uppercase tracking-[0.4em] shadow-2xl hover:bg-red-500 transition-all active:scale-95">Terminate Orbit</button>
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-40 space-y-24 opacity-20 group">
                <div className="relative scale-110">
                  <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_150px_rgba(255,255,255,0.02)] group-hover:scale-110 transition-transform duration-1500 relative">
                    <Target className="text-white/10 group-hover:text-purple-400 transition-colors" size={100} />
                    <div className="absolute inset-0 rounded-full border-6 border-dashed border-purple-500/20 animate-spin-slow"></div>
                  </div>
                  <div className="absolute inset-0 bg-purple-500/5 blur-[200px] rounded-full animate-pulse"></div>
                </div>
                <div className="max-w-3xl space-y-10">
                  <h3 className="text-5xl font-bold uppercase tracking-tighter group-hover:text-white transition-colors">Neural Campaign Nexus</h3>
                  <p className="text-lg font-medium leading-relaxed uppercase tracking-[0.6em] text-white/30 px-24 italic leading-loose">
                    Architecting multi-dimensional autonomous funnels through deep market grounding and global node synthesis.
                  </p>
                </div>
              </div>
            )}

            {(loading || codeLoading || adsLoading) && (
              <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center z-50 p-20">
                <div className="text-center space-y-20 scale-125">
                  <div className="relative inline-block">
                    <div className="w-72 h-72 border-6 border-purple-500/10 rounded-full"></div>
                    <div className="w-72 h-72 border-t-6 border-purple-500 rounded-full animate-spin absolute inset-0 shadow-[0_0_150px_rgba(168,85,247,0.6)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Target className="text-purple-400 animate-pulse" size={100} />
                    </div>
                  </div>
                  <div className="space-y-10">
                    <p className="font-bold text-6xl tracking-tighter uppercase text-white/90 drop-shadow-2xl">Forging Strategy</p>
                    <p className="text-[18px] text-purple-400 uppercase tracking-[1.2em] animate-pulse font-bold">Modeling Global Conversion Vectors...</p>
                  </div>
                </div>
              </div>
            )}
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
