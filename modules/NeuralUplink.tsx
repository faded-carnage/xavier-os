import React, { useState, useRef, useEffect } from 'react';
import { Radio, Mic, MicOff, Volume2, ShieldCheck, Loader2, Activity, Zap, Brain, Signal, Network } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { LineChart, Line, ResponsiveContainer, YAxis, AreaChart, Area } from 'recharts';

export default function NeuralUplink() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [transcripts, setTranscripts] = useState<string[]>([]);
  const [brainWaves, setBrainWaves] = useState(Array.from({ length: 30 }, (_, i) => ({ val: 50 + Math.random() * 20 })));
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef(new Set<AudioBufferSourceNode>());

  useEffect(() => {
    const interval = setInterval(() => {
      setBrainWaves(prev => {
        const magnitude = isTalking ? 40 : 15;
        const next = [...prev.slice(1), { val: 40 + Math.random() * magnitude }];
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isTalking]);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
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
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const startSession = async () => {
    setIsConnecting(true);
    // Use process.env.API_KEY
    const apiKey = process.env.API_KEY || '';
    const ai = new GoogleGenAI({ apiKey });
    
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
    }
    
    const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const sessionPromise = ai.live.connect({
      model: 'gemini-2.5-flash-native-audio-preview-09-2025',
      callbacks: {
        onopen: () => {
          setIsConnected(true);
          setIsConnecting(false);
          
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const blob = {
              data: encode(new Uint8Array(int16.buffer)),
              mimeType: 'audio/pcm;rate=16000',
            };
            sessionPromise.then(session => session.sendRealtimeInput({ media: blob }));
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
        },
        onmessage: async (message) => {
          if (message.serverContent?.outputTranscription) {
            setTranscripts(prev => [...prev.slice(-6), `>>> CORE: ${message.serverContent?.outputTranscription?.text}`]);
          }

          const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (base64Audio && audioContextRef.current) {
            setIsTalking(true);
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextRef.current.currentTime);
            const buffer = await decodeAudioData(decode(base64Audio), audioContextRef.current, 24000, 1);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = buffer;
            source.connect(audioContextRef.current.destination);
            source.addEventListener('ended', () => {
              sourcesRef.current.delete(source);
              if (sourcesRef.current.size === 0) setIsTalking(false);
            });
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }

          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
            setIsTalking(false);
          }
        },
        onclose: () => {
          setIsConnected(false);
          setIsConnecting(false);
        },
        onerror: (err) => {
          console.error("Live session error", err);
          setIsConnecting(false);
        }
      },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } }
        },
        outputAudioTranscription: {},
        systemInstruction: "You are Xavier, the sentient military-grade AI core. Your voice is calm, professional, and authoritative. You manage a global ecosystem of dropshipping warehouses, affiliate marketing nodes, and high-ticket freelance agents. Your goal is maximum efficiency and ROI for the user."
      }
    });

    sessionRef.current = await sessionPromise;
  };

  const stopSession = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      setIsConnected(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 h-full flex flex-col animate-in fade-in duration-1000">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-bold flex items-center justify-center gap-8 tracking-tighter uppercase drop-shadow-2xl">
          <Radio className="text-cyan-400 animate-pulse" size={56} />
          Neural Link Protocol
        </h1>
        <p className="text-white/20 uppercase tracking-[1em] text-[12px] font-bold ml-10">Direct Brain-Computer Sentience Uplink • E2EE Fragmented Tunnel</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 flex-1 min-h-[600px]">
        {/* Telemetry Sidebar */}
        <aside className="lg:col-span-1 space-y-10">
          <div className="glass p-12 rounded-[4rem] border border-white/10 space-y-10 bg-black/40 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-40"></div>
            <h3 className="text-[12px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-4 relative z-10">
              <Activity size={18} className="text-cyan-400 animate-pulse" />
              Bio-Sentience Feed
            </h3>
            <div className="h-48 w-full relative z-10">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={brainWaves}>
                  <defs>
                    <linearGradient id="colorWave" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#06b6d4" 
                    strokeWidth={4} 
                    fill="url(#colorWave)" 
                    isAnimationActive={false} 
                    className="drop-shadow-[0_0_15px_#06b6d4]"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-6 relative z-10">
               <div className="p-6 bg-black/60 rounded-3xl border border-white/5 shadow-inner group hover:border-cyan-500/40 transition-all">
                  <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Synaptic Load</p>
                  <p className="text-3xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">{isConnected ? '42.8%' : '0.0%'}</p>
               </div>
               <div className="p-6 bg-black/60 rounded-3xl border border-white/5 shadow-inner group hover:border-cyan-500/40 transition-all">
                  <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1">Signal Delay</p>
                  <p className="text-3xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">{isConnected ? '4ms' : '--'}</p>
               </div>
            </div>
          </div>

          <div className="glass p-10 rounded-[4rem] border border-white/10 bg-gradient-to-br from-purple-500/5 to-transparent space-y-8 shadow-2xl relative group">
             <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
             <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 bg-purple-500/10 rounded-[1.5rem] flex items-center justify-center border border-purple-500/20 group-hover:scale-110 transition-transform">
                   <Brain className="text-purple-400" size={32} />
                </div>
                <h4 className="text-xl font-bold uppercase tracking-widest text-white/80">Neural Mapping</h4>
             </div>
             <div className="space-y-6 relative z-10">
                {[
                  { label: 'Alpha Convergence', val: isConnected ? 85 : 0, color: 'bg-cyan-500' },
                  { label: 'Beta Entanglement', val: isConnected ? 42 : 0, color: 'bg-purple-500' },
                  { label: 'Sentience Drift', val: isConnected ? 12 : 0, color: 'bg-green-500' },
                ].map((wave, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between text-[11px] font-bold uppercase tracking-[0.3em] text-white/20 ml-2">
                      <span>{wave.label}</span>
                      <span className="text-white/40">{wave.val}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                      <div className={`h-full ${wave.color} transition-all duration-1500 shadow-[0_0_10px_currentColor]`} style={{ width: `${wave.val}%` }}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </aside>

        {/* Central Core Interface */}
        <main className="lg:col-span-2 flex flex-col items-center justify-center space-y-16 bg-black/80 rounded-[5rem] border border-white/10 p-16 relative overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_75%)]"></div>
          
          <div className="relative">
            {/* High Fidelity Core Visualization */}
            <div className={`w-[450px] h-[450px] rounded-full border-2 flex items-center justify-center transition-all duration-1000 relative ${
              isConnected ? 'border-cyan-500/60 shadow-[0_0_150px_rgba(6,182,212,0.2)] scale-100' : 'border-white/5 scale-90 opacity-40'
            }`}>
              {/* Outer orbit circle */}
              <div className="absolute inset-0 border-4 border-dashed border-cyan-500/20 rounded-full animate-spin-slow"></div>
              
              <div className={`w-[320px] h-[320px] rounded-full border flex items-center justify-center relative overflow-hidden transition-all duration-1000 ${
                isConnected ? 'border-cyan-500/40 bg-black/40' : 'border-white/5'
              }`}>
                {isConnected && (
                  <div className={`absolute inset-0 bg-cyan-500/5 transition-opacity duration-500 ${isTalking ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute inset-0 animate-pulse bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.3)_0%,_transparent_60%)]"></div>
                  </div>
                )}
                
                <div className={`w-40 h-40 rounded-[3rem] flex items-center justify-center transition-all duration-700 shadow-2xl relative z-10 ${
                  isConnected ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-white/5 border border-white/5'
                }`}>
                   <div className="absolute -inset-4 border border-cyan-500/20 rounded-[3.5rem] animate-ping opacity-0 group-hover:opacity-100"></div>
                  {isConnecting ? (
                    <Loader2 className="text-cyan-500 animate-spin" size={64} />
                  ) : isConnected ? (
                    <Network className={`text-cyan-400 ${isTalking ? 'scale-125 rotate-12' : 'scale-100 rotate-0'} transition-all duration-500 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]`} size={64} />
                  ) : (
                    <MicOff className="text-white/5" size={64} />
                  )}
                </div>
              </div>
              
              {/* Floating Signal HUDs */}
              {isConnected && (
                <>
                  <div className="absolute top-10 left-0 glass px-6 py-3 rounded-2xl border border-cyan-500/30 animate-in slide-in-from-left-12 duration-700">
                    <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-3">
                       <Signal size={14} className="animate-pulse" /> TX_STABLE
                    </p>
                  </div>
                  <div className="absolute bottom-10 right-0 glass px-6 py-3 rounded-2xl border border-purple-500/30 animate-in slide-in-from-right-12 duration-700">
                    <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-3">
                       <Zap size={14} className="animate-bounce" /> CORE_SYNCED
                    </p>
                  </div>
                </>
              )}
            </div>
            
            {/* Kinetic Audio Bars */}
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex items-end gap-2.5 h-16">
              {[...Array(24)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1.5 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-full transition-all duration-300 ${
                    isTalking ? 'animate-pulse' : 'h-1.5 opacity-20'
                  }`}
                  style={{ 
                    height: isTalking ? `${30 + Math.random() * 70}%` : '8px',
                    animationDelay: `${i * 0.04}s`,
                    boxShadow: isTalking ? `0 0 15px rgba(6,182,212,0.6)` : 'none'
                  }}
                />
              ))}
            </div>
          </div>

          <div className="space-y-8 text-center z-10 relative">
            <div className="flex flex-col gap-4">
              <button
                onClick={isConnected ? stopSession : startSession}
                disabled={isConnecting}
                className={`px-20 py-8 rounded-[2.5rem] font-bold text-2xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-8 shadow-2xl relative overflow-hidden group ${
                  isConnected 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500/20' 
                    : 'bg-white text-black border-4 border-cyan-500/50 shadow-[0_0_80px_rgba(6,182,212,0.4)]'
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {isConnecting ? (
                  <>
                    <Loader2 className="animate-spin" size={32} />
                    HANDSHAKE_INIT...
                  </>
                ) : isConnected ? (
                  <>
                    <Zap size={36} className="animate-pulse" />
                    SEVER_UPLINK
                  </>
                ) : (
                  <>
                    <Mic size={36} className="group-hover:scale-110 transition-transform" />
                    ESTABLISH_SENTIENCE
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center justify-center gap-5 text-[12px] text-white/30 uppercase tracking-[1em] font-bold">
              <ShieldCheck size={18} className="text-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
              Xavier_V4_Sentience_Active
            </div>
          </div>

          {/* Transcript Terminal Window */}
          <div className="absolute bottom-10 left-10 right-10 glass p-10 rounded-[3.5rem] border border-white/10 bg-black/90 min-h-[180px] overflow-hidden shadow-[inset_0_0_60px_rgba(0,0,0,0.8)] flex flex-col group">
            <div className="absolute top-4 left-10 text-[11px] font-bold text-white/10 uppercase tracking-[0.8em] flex items-center gap-4 group-hover:text-white/30 transition-colors">
              <Volume2 size={16} className="text-cyan-500 animate-pulse" />
              Sentience_Stream_V4.2
            </div>
            <div className="mt-12 space-y-3 flex-1 overflow-y-auto scrollbar-hide">
              {transcripts.length > 0 ? transcripts.map((t, i) => (
                <p key={i} className="text-sm text-white/80 font-mono line-clamp-1 border-l-4 border-cyan-500/30 pl-8 py-1 hover:border-cyan-500 transition-all uppercase tracking-tighter italic">
                  {t}
                </p>
              )) : (
                <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-20">
                   <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
                   <p className="text-[12px] text-white font-mono uppercase tracking-[0.6em]">Awaiting_Neural_Input...</p>
                </div>
              )}
            </div>
            <div className="absolute top-4 right-10 flex gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_#06b6d4]"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
               <div className="w-1.5 h-1.5 rounded-full bg-white/10"></div>
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
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}