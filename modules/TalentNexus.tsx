
import React, { useState } from 'react';
import { 
  Gem, Sparkles, UserCheck, Palette, 
  Briefcase, PenTool, Loader2, RefreshCw, Download
} from 'lucide-react';
import { generateAIImage } from '../services/geminiService';

export default function TalentNexus() {
  const [loading, setLoading] = useState(false);
  const [models, setModels] = useState<{id: number, name: string, img: string, niche: string}[]>([]);
  const [params, setParams] = useState({ archetype: 'High Fashion', trait: 'Futuristic' });

  const handleSynthesize = async () => {
    setLoading(true);
    try {
      const prompt = `Full body portrait of a ${params.trait} ${params.archetype} model, professional studio photography, 8k resolution, highly detailed, photorealistic.`;
      const img = await generateAIImage(prompt);
      if (img) {
        setModels(prev => [{
          id: Date.now(),
          name: `Model_Gen_${Math.floor(Math.random()*1000)}`,
          img,
          niche: params.archetype
        }, ...prev]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Gem className="text-pink-500 animate-pulse" size={40} />
            Talent Nexus
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">
            AI Brand Ambassador Agency • Real-Time Asset Synthesis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-4 space-y-8">
           <div className="glass p-12 rounded-[3.5rem] border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent"></div>
              <h3 className="font-bold text-[12px] uppercase tracking-[0.4em] text-white/40 flex items-center gap-4 mb-8">
                 <PenTool size={20} className="text-pink-400" />
                 Genetics Lab
              </h3>
              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Archetype</label>
                    <select 
                      onChange={(e) => setParams({...params, archetype: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[11px] uppercase font-bold text-white focus:outline-none focus:border-pink-500"
                    >
                       <option>High Fashion (Editorial)</option>
                       <option>Commercial / Lifestyle</option>
                       <option>Fitness / Wellness</option>
                       <option>Tech / Futurism</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-white/20">Visual Trait</label>
                    <input 
                      type="text"
                      value={params.trait}
                      onChange={(e) => setParams({...params, trait: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[11px] uppercase font-bold text-white focus:outline-none focus:border-pink-500"
                    />
                 </div>
                 <button 
                   onClick={handleSynthesize}
                   disabled={loading}
                   className="w-full py-6 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-[2.5rem] uppercase tracking-[0.4em] text-[10px] transition-all shadow-[0_0_40px_rgba(236,72,153,0.3)] flex items-center justify-center gap-4"
                 >
                    {loading ? <Loader2 className="animate-spin" /> : <Sparkles size={16} />}
                    {loading ? 'Synthesizing...' : 'Generate New Clone'}
                 </button>
              </div>
           </div>
        </aside>

        <main className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {models.length > 0 ? models.map((model) => (
                 <div key={model.id} className="glass p-8 rounded-[4rem] border border-white/10 bg-black shadow-2xl relative overflow-hidden group hover:border-pink-500/40 transition-all">
                    <div className="aspect-[3/4] rounded-[3rem] overflow-hidden relative mb-8">
                       <img src={model.img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={model.name} />
                       <div className="absolute top-6 right-6 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-white">
                          Available
                       </div>
                    </div>
                    <div className="space-y-6">
                       <h3 className="text-2xl font-bold uppercase tracking-tight text-white">{model.name}</h3>
                       <div className="flex gap-4">
                          <button className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-2">
                             <Download size={14} /> Save Asset
                          </button>
                       </div>
                    </div>
                 </div>
              )) : (
                <div className="col-span-2 h-[500px] flex flex-col items-center justify-center text-center opacity-30 space-y-6 border-2 border-dashed border-white/10 rounded-[4rem]">
                   <UserCheck size={64} className="text-pink-500" />
                   <p className="text-xl font-bold uppercase tracking-widest">No Clones Active</p>
                   <p className="text-sm">Use the Genetics Lab to synthesize your first model.</p>
                </div>
              )}
           </div>
        </main>
      </div>
    </div>
  );
}
