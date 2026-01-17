
import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, Video, Wand2, Sparkles, Download, Play, 
  RefreshCw, Loader2, Upload, FileImage, Layers, Cpu, Maximize2, 
  Settings2, Zap, Sliders, Eye, Film, Share2, ShieldCheck, Activity
} from 'lucide-react';
import { generateAIImage, startVideoGeneration } from '../services/geminiService';

export default function AIStudio() {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState<'image' | 'video' | 'photo-video'>('image');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [renderStats, setRenderStats] = useState({ steps: 0, fps: 0, temp: 42 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setRenderStats(prev => ({
          steps: Math.min(100, prev.steps + Math.random() * 5),
          fps: 24 + Math.random() * 4,
          temp: 45 + Math.random() * 15
        }));
      }, 500);
      return () => clearInterval(interval);
    } else {
      setRenderStats({ steps: 0, fps: 0, temp: 42 });
    }
  }, [loading]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!prompt && mode !== 'photo-video') return;

    if (mode !== 'image') {
      try {
        const hasKey = await (window as any).aistudio.hasSelectedApiKey();
        if (!hasKey) {
          await (window as any).aistudio.openSelectKey();
        }
      } catch (err) {
        console.error("API Key selection failed", err);
      }
    }

    setLoading(true);
    try {
      if (mode === 'image') {
        const imageUrl = await generateAIImage(prompt);
        setResult(imageUrl);
      } else {
        const videoUrl = await startVideoGeneration(prompt, selectedImage || undefined);
        setResult(videoUrl);
      }
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("429")) {
        alert("API rate limit exceeded. Please wait a moment before trying again or check your plan and billing details.");
      } else if (err instanceof Error && err.message.includes("Requested entity was not found")) {
        await (window as any).aistudio.openSelectKey();
      } else {
        alert("An error occurred during generation. Please check the console for details.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Film className="text-cyan-400 animate-pulse" size={40} />
            Neural Asset Workstation
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">Cinematic Latent Space Synthesis • Xavier Core V4.2</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
            {[
              { id: 'image', icon: ImageIcon, label: 'Still' },
              { id: 'video', icon: Video, label: 'Motion' },
              { id: 'photo-video', icon: FileImage, label: 'Animate' }
            ].map((m) => (
              <button 
                key={m.id}
                onClick={() => { setMode(m.id as any); setResult(null); }}
                className={`flex items-center gap-3 px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${mode === m.id ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'text-white/40 hover:text-white'}`}
              >
                <m.icon size={14} />
                {m.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Control Deck */}
        <aside className="lg:col-span-4 space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-white/10 space-y-8 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
            
            <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 flex items-center gap-4">
              <Sliders size={20} className="text-cyan-400" />
              Synthesis Parameters
            </h3>

            {mode === 'photo-video' && (
              <div className="space-y-4 animate-in slide-in-from-top-4 duration-500">
                <label className="block text-[9px] font-bold uppercase text-white/20 tracking-widest ml-4">Latent Seed Frame</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full aspect-video bg-black/90 border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500/50 transition-all overflow-hidden group/upload relative shadow-inner"
                >
                  {selectedImage ? (
                    <img src={selectedImage} className="w-full h-full object-cover transition-transform duration-1000 group-hover/upload:scale-110" alt="Source frame" />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover/upload:opacity-100 transition-opacity"></div>
                      <Upload className="text-white/10 mb-4 group-hover/upload:text-cyan-400 group-hover/upload:scale-110 transition-all" size={32} />
                      <span className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Inject Base Layer</span>
                    </>
                  )}
                </div>
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept="image/*" />
              </div>
            )}

            <div className="space-y-4">
              <label className="block text-[9px] font-bold uppercase text-white/20 tracking-widest ml-4">
                {mode === 'image' ? 'Latent Vector Prompt' : 'Motion Flow Script'}
              </label>
              <div className="relative group/input">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder={mode === 'image' ? "Cinematic wide shot, hyper-realistic neural architecture..." : "Slow dolly zoom into the cybernetic core, lightning pulses..."}
                  className="w-full bg-black border border-white/10 rounded-[2.5rem] p-8 text-base focus:ring-2 focus:ring-cyan-500/30 focus:outline-none min-h-[160px] resize-none font-medium placeholder:text-white/5 shadow-inner transition-all group-hover/input:border-white/20"
                />
                <div className="absolute bottom-6 right-8">
                  <Activity size={16} className="text-white/10 group-focus-within/input:text-cyan-400 animate-pulse transition-colors" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-[9px] font-bold uppercase text-white/20 tracking-widest ml-4">Aspect Ratio</label>
                <select className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-cyan-500">
                  <option>1:1 Square</option>
                  <option>16:9 Cinema</option>
                  <option>9:16 Vertical</option>
                  <option>2.39:1 Anamorphic</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-[9px] font-bold uppercase text-white/20 tracking-widest ml-4">Depth Buffer</label>
                <select className="w-full bg-black border border-white/10 rounded-2xl p-4 text-[10px] font-bold uppercase tracking-widest focus:ring-1 focus:ring-cyan-500">
                  <option>Standard (HD)</option>
                  <option>Neural Pro (4K)</option>
                  <option>X-High (8K Buffer)</option>
                </select>
              </div>
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading || (!prompt && mode !== 'photo-video')}
              className={`w-full py-8 rounded-[2.5rem] font-bold text-sm uppercase tracking-[0.5em] flex items-center justify-center gap-6 transition-all shadow-[0_0_80px_rgba(6,182,212,0.1)] border-2 ${
                loading 
                  ? 'bg-white/5 border-white/5 text-white/20' 
                  : 'bg-gradient-to-tr from-cyan-600 to-purple-600 border-white/20 text-white hover:scale-[1.02] active:scale-95 hover:shadow-[0_0_100px_rgba(6,182,212,0.3)]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  FORGING_{mode.toUpperCase()}
                </>
              ) : (
                <>
                  <Zap size={24} className="animate-pulse" />
                  Initiate Genesis
                </>
              )}
            </button>
          </div>

          <div className="glass p-8 rounded-[3rem] border border-white/5 bg-black/20 space-y-6 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
            <h3 className="text-[10px] font-bold uppercase text-white/30 tracking-[0.3em] ml-2">Recent Weights</h3>
            <div className="grid grid-cols-4 gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-white/5 border border-white/10 cursor-pointer hover:border-cyan-500/50 transition-all group/asset shadow-2xl relative">
                  <img src={`https://picsum.photos/seed/${i+142}/150`} alt="History" className="w-full h-full object-cover grayscale opacity-40 group-hover/asset:grayscale-0 group-hover/asset:opacity-100 transition-all duration-700" />
                  <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/asset:opacity-100 transition-opacity"></div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* High-Fidelity Viewport */}
        <main className="lg:col-span-8 flex flex-col gap-10">
          <div className="glass rounded-[5rem] border border-white/10 aspect-video relative flex items-center justify-center overflow-hidden bg-black shadow-[0_0_150px_rgba(0,0,0,1)] group/viewport">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_75%)] opacity-30"></div>
            
            {/* Viewport HUD Overlays */}
            <div className="absolute top-12 left-12 flex items-center gap-6 pointer-events-none z-20">
               <div className="px-6 py-2 bg-black/90 backdrop-blur-3xl rounded-full border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] flex items-center gap-4 shadow-2xl">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                  {loading ? 'RENDERING_IN_PROGRESS' : result ? 'SYMMETRIC_FEED_STABLE' : 'BUFFER_EMPTY'}
               </div>
               {loading && (
                 <div className="px-6 py-2 bg-cyan-500/10 backdrop-blur-3xl rounded-full border border-cyan-500/30 text-[10px] font-bold text-cyan-400 uppercase tracking-widest shadow-2xl animate-in slide-in-from-left-4">
                    THERMAL: {renderStats.temp.toFixed(1)}°C
                 </div>
               )}
            </div>

            <div className="absolute top-12 right-12 flex gap-4 pointer-events-none z-20">
               <div className="px-5 py-2 bg-black/80 rounded-2xl border border-white/10 text-[9px] font-mono text-cyan-500/60 font-bold uppercase tracking-widest shadow-2xl">
                  0x{Math.random().toString(16).slice(2,8).toUpperCase()}
               </div>
            </div>

            {result ? (
              <>
                <div className="w-full h-full animate-in zoom-in-95 duration-1000">
                  {mode === 'image' ? (
                    <img src={result} alt="Generated asset" className="w-full h-full object-cover transition-transform duration-2000 group-hover/viewport:scale-105" />
                  ) : (
                    <video src={result} controls className="w-full h-full object-cover" autoPlay loop />
                  )}
                </div>
                
                {/* Result Interaction Controls */}
                <div className="absolute bottom-12 right-12 flex gap-4 opacity-0 group-hover/viewport:opacity-100 transition-all transform translate-y-4 group-hover/viewport:translate-y-0 duration-500 z-30">
                  <button className="p-5 bg-black/90 backdrop-blur-3xl rounded-[1.5rem] text-white hover:text-cyan-400 border border-white/10 transition-all shadow-2xl group/btn">
                    <Download size={24} className="group-hover/btn:scale-110" />
                  </button>
                  <button onClick={() => setResult(null)} className="p-5 bg-black/90 backdrop-blur-3xl rounded-[1.5rem] text-white hover:text-cyan-400 border border-white/10 transition-all shadow-2xl group/btn">
                    <RefreshCw size={24} className="group-hover/btn:rotate-180 transition-transform duration-700" />
                  </button>
                  <button className="px-8 py-5 bg-cyan-500 text-black font-bold rounded-[1.5rem] border border-cyan-400 transition-all shadow-[0_0_50px_rgba(6,182,212,0.4)] flex items-center gap-4 hover:bg-cyan-400 active:scale-95 group/btn">
                    <Share2 size={24} />
                    <span className="text-[11px] uppercase tracking-widest">Commit to Vault</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center space-y-10 relative z-10 p-20 max-w-2xl opacity-20 group-hover/viewport:opacity-40 transition-opacity duration-1000">
                <div className="relative inline-block">
                  <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10 shadow-[inset_0_0_40px_rgba(255,255,255,0.02)] group-hover/viewport:scale-110 transition-transform duration-1000">
                    {mode === 'image' ? <ImageIcon className="text-white/20" size={64} /> : <Film className="text-white/20" size={64} />}
                  </div>
                  <div className="absolute inset-0 rounded-full border-2 border-dashed border-white/5 animate-spin-slow"></div>
                </div>
                <div className="space-y-6">
                  <p className="text-2xl font-bold uppercase tracking-[1em] text-white/60">Latent_Standby</p>
                  <p className="text-[12px] uppercase tracking-[0.4em] font-bold leading-relaxed px-12 italic">
                    Neural architecture is primed and awaiting seed parameters for volumetric synthesis.
                  </p>
                </div>
              </div>
            )}
            
            {loading && (
              <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center z-40 p-20 animate-in fade-in duration-500">
                <div className="text-center space-y-16 scale-110">
                  <div className="relative inline-block">
                    <div className="w-64 h-64 border-2 border-cyan-500/10 rounded-full"></div>
                    <div className="w-64 h-64 border-t-2 border-cyan-500 rounded-full animate-spin absolute inset-0 shadow-[0_0_80px_rgba(6,182,212,0.4)]"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Sparkles className="text-cyan-400 animate-pulse" size={64} />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <p className="font-bold text-4xl tracking-tighter uppercase text-white">Synthesizing Sentience</p>
                    <div className="max-w-md mx-auto space-y-4">
                       <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.6em] text-cyan-400/60">
                          <span>Sub-Atomic Processing</span>
                          <span>{renderStats.steps.toFixed(0)}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                          <div className="h-full bg-cyan-500 transition-all duration-500 shadow-[0_0_15px_#06b6d4]" style={{ width: `${renderStats.steps}%` }} />
                       </div>
                    </div>
                    <p className="text-[10px] text-white/20 uppercase tracking-[1em] font-bold italic pt-4">XAVIER_NEURAL_GPU: 42.8 TFLOPS • {renderStats.fps.toFixed(1)} FPS</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
             <div className="glass p-12 rounded-[4rem] border border-white/5 bg-black/40 flex items-center gap-12 group hover:border-cyan-500/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                <div className="w-24 h-24 bg-cyan-500/10 rounded-[2rem] flex items-center justify-center border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-all shrink-0 shadow-inner">
                   <Layers className="text-cyan-400" size={40} />
                </div>
                <div>
                   <h4 className="font-bold text-2xl uppercase tracking-tight">Volumetric Tiling</h4>
                   <p className="text-[11px] text-white/30 font-bold mt-4 uppercase tracking-widest leading-relaxed">Multi-stage upscaling via Xavier’s proprietary latent tiling engine.</p>
                </div>
             </div>
             <div className="glass p-12 rounded-[4rem] border border-white/5 bg-black/40 flex items-center gap-12 group hover:border-purple-500/50 transition-all shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 -rotate-45 translate-x-12 -translate-y-12"></div>
                <div className="w-24 h-24 bg-purple-500/10 rounded-[2rem] flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-all shrink-0 shadow-inner">
                   <ShieldCheck className="text-purple-400" size={40} />
                </div>
                <div>
                   <h4 className="font-bold text-2xl uppercase tracking-tight">Trust Verification</h4>
                   <p className="text-[11px] text-white/30 font-bold mt-4 uppercase tracking-widest leading-relaxed">Automated watermarking and biometric anchoring for every forged asset.</p>
                </div>
             </div>
          </div>
        </main>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
