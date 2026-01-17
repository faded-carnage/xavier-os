
import React, { useState, useEffect } from 'react';
import { 
  MonitorPlay, Sparkles, Layout, Palette, Send, Loader2, Copy, Check, 
  Target, TrendingUp, BarChart3, Activity, Brain, PieChart as PieChartIcon,
  Search, ShieldCheck, Zap, ChevronRight, Share2, Rocket
} from 'lucide-react';
import { generateAdCreative } from '../services/geminiService';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export default function AdCreatives() {
  const [niche, setNiche] = useState('');
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeAdIndex, setActiveAdIndex] = useState(0);

  // Simulated psychological vectors for each ad
  const psychData = [
    { subject: 'Urgency', A: 85, fullMark: 100 },
    { subject: 'Trust', A: 92, fullMark: 100 },
    { subject: 'Curiosity', A: 78, fullMark: 100 },
    { subject: 'Belonging', A: 65, fullMark: 100 },
    { subject: 'Status', A: 94, fullMark: 100 },
  ];

  const handleGenerate = async () => {
    if (!niche) return;
    setLoading(true);
    try {
      const result = await generateAdCreative(niche);
      setAds(result);
      setActiveAdIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyAd = (id: number) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <MonitorPlay className="text-purple-400 animate-pulse" size={40} />
            Sentient Creative Engine
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">Psychological Trigger Synthesis • High-Conversion Ad Fragments</p>
        </div>
        <div className="flex gap-4">
           <div className="glass px-8 py-4 rounded-3xl border border-white/10 flex items-center gap-6 bg-black/60 shadow-inner">
              <div className="flex flex-col">
                 <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Resonance Score</span>
                 <span className="text-lg font-mono font-bold text-purple-400">98.4_OPTIMAL</span>
              </div>
              <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_#a855f7] animate-pulse"></div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sidebar: Control & Inputs */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 -rotate-45 translate-x-12 -translate-y-12 transition-all group-hover:bg-purple-500/10"></div>
            
            <h3 className="font-bold text-[11px] uppercase tracking-[0.4em] text-white/60 flex items-center gap-4">
              <Brain size={22} className="text-purple-400" />
              Intelligence Parameter
            </h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[9px] font-bold uppercase text-white/20 tracking-widest ml-4 italic">Campaign Niche Architecture</label>
                <div className="relative group/input">
                   <Search className="absolute left-6 top-8 text-white/10 group-focus-within/input:text-purple-400 transition-colors" size={24} />
                   <textarea 
                    value={niche}
                    onChange={(e) => setNiche(e.target.value)}
                    placeholder="e.g. Ultra-premium longevity supplements for tech executives"
                    className="w-full bg-black border border-white/10 rounded-[2.5rem] pt-8 pl-16 pr-8 pb-8 text-base focus:ring-2 focus:ring-purple-500/30 focus:outline-none min-h-[160px] resize-none font-medium placeholder:text-white/5 shadow-inner transition-all group-hover/input:border-white/20"
                  />
                </div>
              </div>
              
              <div className="space-y-6 pt-4">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
                    <span>Neural Sophistication</span>
                    <span className="text-purple-400">Level 4</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div className="h-full bg-purple-600 rounded-full shadow-[0_0_12px_#a855f7]" style={{ width: '85%' }} />
                 </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={loading || !niche}
                className="w-full py-8 bg-white text-black font-bold rounded-[2.5rem] flex items-center justify-center gap-6 hover:bg-purple-400 transition-all disabled:opacity-50 shadow-[0_0_80px_rgba(168,85,247,0.2)] active:scale-95 text-sm uppercase tracking-[0.4em] group/btn"
              >
                {loading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} className="group-hover/btn:animate-bounce" />}
                Forge Creatives
              </button>
            </div>
          </div>

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 shadow-inner space-y-10 relative overflow-hidden group">
            <h3 className="text-[11px] font-bold uppercase text-white/30 tracking-[0.5em] flex items-center gap-5">
               <PieChartIcon size={22} className="text-cyan-400" />
               Intent Mapping
            </h3>
            <div className="h-72 w-full relative z-10">
               <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={psychData}>
                     <PolarGrid stroke="#ffffff10" />
                     <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 'bold' }} />
                     <Radar 
                        name="Sentient Vectors" 
                        dataKey="A" 
                        stroke="#a855f7" 
                        fill="#a855f7" 
                        fillOpacity={0.3} 
                        strokeWidth={3}
                     />
                  </RadarChart>
               </ResponsiveContainer>
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(168,85,247,0.05)_0%,_transparent_70%)] pointer-events-none"></div>
            </div>
            <p className="text-[10px] text-white/20 uppercase font-bold tracking-[0.3em] leading-relaxed text-center px-4 italic">
               Cross-referencing global sentiment indices via Node-HK relays.
            </p>
          </div>
        </aside>

        {/* Main Workspace: Ad Variants */}
        <main className="lg:col-span-8 flex flex-col gap-10">
          <div className="glass rounded-[5rem] border border-white/10 min-h-[750px] relative overflow-hidden bg-black/90 shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"></div>
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            {ads.length > 0 ? (
              <div className="flex flex-col h-full relative z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                 <div className="p-16 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <div className="space-y-4">
                       <h2 className="text-4xl font-bold tracking-tighter uppercase drop-shadow-2xl">Output Cluster: 0x9AF</h2>
                       <div className="flex items-center gap-6">
                          <div className="flex items-center gap-3 px-6 py-2 bg-purple-500/10 rounded-full border border-purple-500/30 text-[10px] font-bold text-purple-400 tracking-widest uppercase animate-pulse">
                             <ShieldCheck size={16} /> Direct Response Optimized
                          </div>
                          <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.6em] font-bold">Latency: 1.2ms</span>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       {ads.map((_, i) => (
                          <button 
                            key={i} 
                            onClick={() => setActiveAdIndex(i)}
                            className={`w-12 h-12 rounded-2xl font-bold border transition-all ${activeAdIndex === i ? 'bg-purple-500 text-black border-purple-400 shadow-[0_0_30px_#a855f7]' : 'bg-white/5 border-white/10 text-white/30 hover:text-white'}`}
                          >
                            {i+1}
                          </button>
                       ))}
                    </div>
                 </div>

                 <div className="flex-1 p-16 flex flex-col lg:flex-row gap-16 overflow-y-auto scrollbar-hide">
                    <div className="lg:w-1/2 space-y-14">
                       <div className="space-y-8">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.8em] text-white/20 mb-2">
                             <span>Primary Headline</span>
                             <Zap size={14} className="text-yellow-500" />
                          </div>
                          <h3 className="text-5xl font-bold text-white tracking-tighter leading-tight uppercase group cursor-default">
                             {ads[activeAdIndex].headline}
                             <div className="h-2 w-24 bg-purple-500 mt-6 shadow-[0_0_20px_#a855f7] rounded-full group-hover:w-full transition-all duration-1000"></div>
                          </h3>
                       </div>

                       <div className="space-y-8">
                          <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.8em] text-white/20 mb-2">
                             <span>Core Transmission</span>
                          </div>
                          <p className="text-2xl text-white/70 leading-relaxed font-serif italic border-l-4 border-white/5 pl-10 group cursor-default hover:border-purple-500 transition-all duration-700">
                             "{ads[activeAdIndex].text}"
                          </p>
                       </div>

                       <div className="p-10 bg-white/5 rounded-[3.5rem] border border-white/10 space-y-6 shadow-inner group/theme relative overflow-hidden">
                          <div className="absolute inset-0 bg-purple-500/5 opacity-0 group-hover/theme:opacity-100 transition-opacity"></div>
                          <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-4">
                             <Palette size={18} className="text-purple-400" /> Visual Protocol
                          </p>
                          <p className="text-lg text-purple-300 font-medium tracking-tight italic drop-shadow-2xl">
                             {ads[activeAdIndex].visualTheme}
                          </p>
                       </div>
                    </div>

                    <div className="lg:w-1/2 flex flex-col gap-10">
                       <div className="glass flex-1 rounded-[4rem] border border-white/10 overflow-hidden relative group/mockup shadow-2xl bg-black">
                          <img src={`https://picsum.photos/seed/${activeAdIndex + 99}/800`} className="w-full h-full object-cover grayscale opacity-60 group-hover/mockup:grayscale-0 group-hover/mockup:opacity-100 transition-all duration-1500 scale-110 group-hover/mockup:scale-100" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                          <div className="absolute bottom-12 left-12 right-12 space-y-6">
                             <h4 className="text-2xl font-bold uppercase tracking-tight text-white drop-shadow-2xl">{ads[activeAdIndex].headline}</h4>
                             <button className="px-10 py-5 bg-white text-black font-bold rounded-2xl text-[11px] uppercase tracking-widest shadow-[0_0_50px_rgba(255,255,255,0.3)] hover:scale-105 transition-all">
                                {ads[activeAdIndex].cta}
                             </button>
                          </div>
                       </div>
                       
                       <div className="flex gap-4">
                          <button 
                            onClick={() => copyAd(activeAdIndex)}
                            className="flex-1 py-6 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center gap-6 text-[12px] font-bold uppercase tracking-[0.4em] text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-inner group/copy"
                          >
                             {copiedId === activeAdIndex ? <Check size={24} className="text-green-500 animate-in zoom-in" /> : <Copy size={24} className="group-hover/copy:scale-110" />}
                             {copiedId === activeAdIndex ? 'Nexus Synced' : 'Sync Directive'}
                          </button>
                          <button className="p-6 bg-purple-600 text-white rounded-[2.5rem] shadow-[0_0_40px_rgba(168,85,247,0.4)] hover:scale-105 active:scale-95 transition-all group/rocket">
                             <Rocket size={24} className="group-hover/rocket:-translate-y-1 group-hover/rocket:translate-x-1 transition-transform" />
                          </button>
                       </div>
                    </div>
                 </div>

                 <div className="p-12 border-t border-white/5 bg-black/60 flex justify-between items-center">
                    <div className="flex items-center gap-10">
                       <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          <Activity size={16} className="text-green-500" />
                          Global Awareness: LIVE
                       </div>
                       <div className="w-px h-6 bg-white/5" />
                       <div className="flex items-center gap-4 text-[10px] font-bold text-white/20 uppercase tracking-widest">
                          <TrendingUp size={16} className="text-cyan-500" />
                          Conversion Projection: +458%
                       </div>
                    </div>
                    <button onClick={() => setAds([])} className="text-[10px] font-bold text-white/10 hover:text-white uppercase tracking-[0.8em] transition-colors">Clear_Matrix_0x9A</button>
                 </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-40 space-y-20 opacity-20 group">
                <div className="relative">
                  <div className="w-64 h-64 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_100px_rgba(255,255,255,0.02)] group-hover:scale-110 transition-transform duration-1500 relative">
                    <MonitorPlay className="text-white/10 group-hover:text-purple-400 transition-colors" size={100} />
                    <div className="absolute inset-0 rounded-full border-4 border-dashed border-purple-500/10 animate-spin-slow"></div>
                  </div>
                  <div className="absolute inset-0 bg-purple-500/5 blur-[200px] rounded-full animate-pulse"></div>
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-[3.5rem] bg-black border border-white/10 flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-transform">
                     <Target className="text-purple-400" size={56} />
                  </div>
                </div>
                <div className="max-w-2xl space-y-10">
                  <h3 className="text-5xl font-bold uppercase tracking-tighter group-hover:text-white transition-colors">Creative Nexus Standby</h3>
                  <p className="text-lg font-medium leading-relaxed uppercase tracking-[0.5em] text-white/30 px-20 italic">
                    Architecting multi-variant high-conversion ad fragments through autonomous latent synthesis.
                  </p>
                </div>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl flex items-center justify-center z-50">
                <div className="text-center space-y-20 scale-125">
                  <div className="relative inline-block">
                    <div className="w-72 h-72 border-4 border-purple-500/10 rounded-full"></div>
                    <div className="w-72 h-72 border-t-4 border-purple-500 rounded-full animate-spin absolute inset-0 shadow-[0_0_150px_rgba(168,85,247,0.6)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="text-purple-400 animate-pulse" size={100} />
                    </div>
                  </div>
                  <div className="space-y-10">
                    <p className="font-bold text-6xl tracking-tighter uppercase text-white/90">Synthesizing Creative</p>
                    <p className="text-[16px] text-purple-400 uppercase tracking-[1.2em] animate-pulse font-bold">Modeling Market Entanglement...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="glass p-12 rounded-[4rem] border border-white/5 bg-black/40 flex items-center gap-12 group hover:border-purple-500/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                <div className="w-24 h-24 bg-purple-500/10 rounded-[2rem] flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all shrink-0 shadow-inner">
                   <BarChart3 className="text-purple-400" size={48} />
                </div>
                <div>
                   <h4 className="font-bold text-2xl uppercase tracking-tight">Analytics Synthesis</h4>
                   <p className="text-[11px] text-white/30 font-bold mt-4 uppercase tracking-widest leading-relaxed">High-frequency sentiment monitoring synced via Onion Relays.</p>
                </div>
             </div>
             <div className="glass p-12 rounded-[4rem] border border-white/5 bg-black/40 flex items-center gap-12 group hover:border-cyan-500/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                <div className="w-24 h-24 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all shrink-0 shadow-inner">
                   <Activity className="text-cyan-400" size={48} />
                </div>
                <div>
                   <h4 className="font-bold text-2xl uppercase tracking-tight">Real-Time Sync</h4>
                   <p className="text-[11px] text-white/30 font-bold mt-4 uppercase tracking-widest leading-relaxed">Broadcast creatives across 15,420 zero-knowledge node relays.</p>
                </div>
             </div>
          </div>
        </main>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 25s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
