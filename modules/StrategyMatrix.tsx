import React, { useState } from 'react';
import { Network, Cpu, ShieldAlert, Zap, Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function StrategyMatrix() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [thinking, setThinking] = useState<string | null>(null);

  const handleReasoning = async () => {
    if (!prompt) return;
    setLoading(true);
    setResult(null);
    setThinking(null);

    // Use process.env.API_KEY
    const apiKey = process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-pro-preview",
        contents: prompt,
        config: {
          thinkingConfig: { thinkingBudget: 32768 }
        }
      });
      
      setResult(response.text || "No output generated.");
      // In some implementations, thinking might be available in candidates, 
      // but we'll focus on the high-quality reasoned output.
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Network className="text-purple-400" />
            Strategic Reasoning Matrix
          </h1>
          <p className="text-white/40 text-sm">Deep-thought synthesis via Gemini 3 Pro Neural Clusters</p>
        </div>
        <div className="flex gap-2">
          <div className="glass px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
            <Cpu size={16} className="text-purple-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest">32K Thinking Budget</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 space-y-6">
            <h3 className="font-bold flex items-center gap-2 text-xs uppercase tracking-widest text-white/60">
              <BrainCircuit size={16} className="text-purple-400" />
              Strategic Objective
            </h3>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Model a global supply chain disruption for silicon chips and architect a 5-year mitigation roadmap..."
              className="w-full bg-black/50 border border-white/10 rounded-2xl p-4 text-sm focus:ring-1 focus:ring-purple-500 focus:outline-none min-h-[200px] resize-none"
            />
            <button 
              onClick={handleReasoning}
              disabled={loading || !prompt}
              className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all ${
                loading ? 'bg-white/5 text-white/40' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:opacity-90 active:scale-95'
              }`}
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
              {loading ? 'CALCULATING PROBABILITIES...' : 'INITIATE DEEP REASONING'}
            </button>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-3 text-red-500">
              <ShieldAlert size={18} />
              <h4 className="text-[10px] font-bold uppercase tracking-widest">System Warning</h4>
            </div>
            <p className="text-[10px] text-white/30 leading-relaxed uppercase">
              Deep reasoning requires significant compute cycles. Expect 15-30s latency while Xavier models complex outcome trees.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 min-h-[500px] relative overflow-hidden bg-black/40">
            {result ? (
              <div className="animate-in fade-in duration-700">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <h2 className="text-xl font-bold">Synthesized Strategic Output</h2>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[9px] font-bold rounded-full border border-green-500/20">VERIFIED</span>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none text-white/80 whitespace-pre-wrap font-serif text-lg leading-relaxed">
                  {result}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-24 space-y-6">
                <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center relative">
                  <Network className="text-white/10" size={40} />
                  <div className="absolute inset-0 rounded-full border-2 border-purple-500/20 animate-pulse"></div>
                </div>
                <div className="max-w-xs">
                  <h3 className="font-bold text-lg mb-2 uppercase tracking-tighter">Outcome Simulator</h3>
                  <p className="text-xs text-white/20 uppercase tracking-widest font-bold">Awaiting neural input parameters for outcome simulation.</p>
                </div>
              </div>
            )}

            {loading && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-20">
                <div className="text-center space-y-8">
                  <div className="relative">
                    <div className="w-32 h-32 border-2 border-purple-500/10 rounded-full"></div>
                    <div className="w-32 h-32 border-t-2 border-purple-500 rounded-full animate-spin absolute inset-0"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Zap className="text-purple-400 animate-pulse" size={32} />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-2xl tracking-tighter uppercase text-white/80">Thinking...</p>
                    <p className="text-[10px] text-white/40 uppercase mt-2 tracking-[0.4em] animate-pulse">Modeling multi-dimensional outcome trees</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}