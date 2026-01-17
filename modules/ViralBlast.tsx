
import React, { useState } from 'react';
import { Rocket, Share2, Zap, Globe, TrendingUp, Twitter, Linkedin, Instagram, Play, Loader2, Sparkles, Megaphone, ShieldCheck, Activity } from 'lucide-react';
import { generateViralCampaign } from '../services/marketingService';

export default function ViralBlast() {
  const [target, setTarget] = useState('Tech Founders & Crypto Whales');
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<string | null>(null);
  const [reach, setReach] = useState(1420);

  const handleLaunch = async () => {
    setLoading(true);
    try {
      const result = await generateViralCampaign("Xavier AI Ecosystem", target);
      setCampaign(result);
      // Simulate "Blowing up"
      const interval = setInterval(() => {
        setReach(prev => prev + Math.floor(Math.random() * 5000));
      }, 100);
      setTimeout(() => clearInterval(interval), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Megaphone className="text-orange-500 animate-pulse" size={40} />
            Viral Blast Command
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.8em] font-bold italic">Global Attention Arbitrage & Psychological Warfare V1.0</p>
        </div>
        <div className="glass px-8 py-4 rounded-3xl border border-orange-500/20 flex items-center gap-6 bg-black/60 shadow-[0_0_40px_rgba(249,115,22,0.1)]">
           <div className="flex flex-col text-right">
              <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Total Global Reach</span>
              <span className="text-2xl font-mono font-bold text-orange-500">{reach.toLocaleString()}+</span>
           </div>
           <Activity size={24} className="text-orange-500 animate-pulse" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
              <Zap size={20} className="text-orange-400" />
              Target Demographics
            </h3>
            <div className="space-y-6">
              <textarea 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Describe your target for the world to see..."
                className="w-full bg-black border border-white/10 rounded-[2rem] p-6 text-sm focus:ring-2 focus:ring-orange-500/30 focus:outline-none min-h-[120px] resize-none"
              />
              <button 
                onClick={handleLaunch}
                disabled={loading}
                className="w-full py-8 bg-orange-600 text-white font-bold rounded-[2.5rem] uppercase tracking-[0.5em] text-sm flex items-center justify-center gap-4 hover:bg-orange-500 transition-all shadow-[0_0_80px_rgba(249,115,22,0.2)] active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Rocket size={20} />}
                Initiate Viral protocol
              </button>
            </div>
          </div>

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 space-y-6">
            <h3 className="text-[11px] font-bold uppercase text-white/30 tracking-[0.5em] flex items-center gap-4">
               <Globe size={18} className="text-cyan-400 animate-spin-slow" />
               Live Distribution Nodes
            </h3>
            {['Twitter_API_X', 'LinkedIn_Auth_Node', 'Insta_Meta_Relay', 'TikTok_Fragment'].map((node, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">{node}</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              </div>
            ))}
          </div>
        </aside>

        <main className="lg:col-span-8">
          <div className="glass rounded-[4.5rem] border border-white/10 min-h-[700px] relative overflow-hidden bg-black/90 shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col">
            <div className="p-16 border-b border-white/5 flex items-center justify-between bg-white/5">
              <h2 className="text-3xl font-bold uppercase tracking-tighter">Campaign Matrix Output</h2>
              <div className="flex gap-4">
                <button className="p-4 bg-white/5 rounded-2xl text-white/20 hover:text-white transition-all"><Share2 size={20} /></button>
              </div>
            </div>

            <div className="flex-1 p-16 overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-8 animate-pulse">
                  <Sparkles size={100} className="text-orange-500" />
                  <p className="text-2xl font-bold uppercase tracking-[1em] text-white">Generating Virality...</p>
                </div>
              ) : campaign ? (
                <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 space-y-12">
                   <div className="p-12 bg-white/5 rounded-[4rem] border-l-[12px] border-orange-500 font-serif text-2xl leading-relaxed italic text-white/80 shadow-inner">
                      {campaign}
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="p-8 bg-black/60 border border-white/10 rounded-[3rem] space-y-4">
                        <Twitter className="text-cyan-400" />
                        <p className="text-xs uppercase font-bold tracking-widest text-white/20">X_STORM_HOOK</p>
                        <p className="text-sm font-medium">"Xavier AI isn't just an OS. It's the end of mediocrity. 🧵👇"</p>
                      </div>
                      <div className="p-8 bg-black/60 border border-white/10 rounded-[3rem] space-y-4">
                        <Linkedin className="text-blue-500" />
                        <p className="text-xs uppercase font-bold tracking-widest text-white/20">LINKEDIN_AUTHORITY</p>
                        <p className="text-sm font-medium">"Scaling to $1M isn't hard when your OS is military-grade. #XavierAI"</p>
                      </div>
                   </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-40 opacity-20 group">
                   <Megaphone size={120} className="text-white mb-10 group-hover:scale-110 transition-transform" />
                   <p className="text-4xl font-bold uppercase tracking-[1em]">Awaiting Blast</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
