
import React, { useState } from 'react';
import { Search, Globe, TrendingUp, Volume2, Loader2, Sparkles, ExternalLink, Brain } from 'lucide-react';
import { performMarketResearch, generateBriefingVoice } from '../services/geminiService';

// Fix: added manual base64 decoding helper as required for raw Gemini API outputs
function decode(base64: string) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Fix: added manual PCM decoding helper as Gemini TTS returns raw bytes without headers
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export default function MarketIntel() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [intel, setIntel] = useState<{ text: string, sources: any[] } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const result = await performMarketResearch(query);
      setIntel(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceBriefing = async () => {
    if (!intel) return;
    setIsPlaying(true);
    try {
      const base64Audio = await generateBriefingVoice(intel.text);
      if (base64Audio) {
        // Fix: implemented correct AudioContext-based playback for raw PCM stream
        const outputAudioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)({sampleRate: 24000});
        
        const audioBuffer = await decodeAudioData(
          decode(base64Audio),
          outputAudioContext,
          24000,
          1,
        );
        
        const source = outputAudioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(outputAudioContext.destination);
        source.onended = () => setIsPlaying(false);
        source.start();
      }
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Globe className="text-cyan-400" />
            AI Market Intelligence
          </h1>
          <p className="text-white/40 text-sm">Real-time global market monitoring via Google Search Grounding</p>
        </div>
        <div className="flex gap-2">
          <div className="glass px-4 py-2 rounded-xl border border-white/5 flex items-center gap-2">
            <TrendingUp size={16} className="text-green-400" />
            <span className="text-[10px] font-bold uppercase">Trending: AI SaaS</span>
          </div>
        </div>
      </div>

      <div className="relative group">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-400 transition-colors" size={24} />
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Research competitor strategies, market trends, or niche opportunities..."
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-6 pl-16 pr-6 text-lg focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-2xl"
        />
        <button 
          onClick={handleSearch}
          disabled={loading || !query}
          className="absolute right-3 top-3 bottom-3 px-8 bg-cyan-500 text-black font-bold rounded-[1.5rem] hover:bg-cyan-400 transition-all disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          Analyze
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/10 min-h-[400px] relative">
            {intel ? (
              <div className="animate-in fade-in duration-500">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-xl flex items-center gap-2">
                    <Brain className="text-purple-400" />
                    Deep Analysis
                  </h3>
                  <button 
                    onClick={handleVoiceBriefing}
                    disabled={isPlaying}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${isPlaying ? 'bg-cyan-500 text-black animate-pulse' : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'}`}
                  >
                    <Volume2 size={16} />
                    {isPlaying ? 'Speaking...' : 'Audio Briefing'}
                  </button>
                </div>
                <div className="prose prose-invert max-w-none text-white/80 leading-relaxed whitespace-pre-wrap font-serif text-lg">
                  {intel.text}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6 opacity-40">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center">
                  <Search size={40} />
                </div>
                <p className="max-w-xs text-sm uppercase tracking-widest font-bold">Awaiting Market Directives</p>
              </div>
            )}
            {loading && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-md rounded-[2rem] flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="font-bold text-xs uppercase tracking-[0.3em] text-cyan-400 animate-pulse">Scanning Global Nodes</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-6 rounded-2xl border border-white/10">
            <h3 className="text-xs font-bold uppercase text-white/40 mb-6 tracking-widest">Grounding Sources</h3>
            <div className="space-y-4">
              {intel?.sources.length ? intel.sources.map((source: any, i: number) => (
                <a 
                  key={i} 
                  href={source.uri} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block p-4 bg-white/5 border border-white/5 rounded-xl hover:border-cyan-500/50 transition-all group"
                >
                  <p className="text-xs font-bold text-white/80 line-clamp-1 mb-1 group-hover:text-cyan-400">{source.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-white/20">
                    <span className="truncate max-w-[150px]">{source.uri}</span>
                    <ExternalLink size={10} />
                  </div>
                </a>
              )) : (
                <p className="text-[10px] text-white/20 italic uppercase text-center py-10">No sources retrieved</p>
              )}
            </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-white/10 bg-gradient-to-tr from-cyan-500/5 to-transparent">
            <h3 className="text-xs font-bold uppercase text-white/40 mb-4 tracking-widest">Strategic Outlook</h3>
            <div className="space-y-4 text-[11px] leading-relaxed text-white/60">
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-cyan-400 font-bold block mb-1">Q4 AD CLUSTER</span>
                Market volatility in e-commerce segments requires high-frequency ad rotation.
              </div>
              <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                <span className="text-purple-400 font-bold block mb-1">CONVERSION NODES</span>
                Live intent profiling in Social Hub correlates with 15% higher LTV.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
