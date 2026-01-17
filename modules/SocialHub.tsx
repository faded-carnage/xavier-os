
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Camera, MapPin, Heart, MessageSquare, Share2, 
  BrainCircuit, Activity, Sparkles, UserCheck, 
  Fingerprint, Eye, Zap, BarChart, Loader2, Radio, Target, Globe,
  Scan, Crosshair, Cpu, Lock, Ghost, Database
} from 'lucide-react';
import { profileUserEmotion } from '../services/geminiService';
import { getSocialFeed, postToSocialFeed, isSupabaseConfigured } from '../services/supabaseClient';

interface SocialHubProps {
  userAura: string;
  setUserAura: (color: string) => void;
}

export default function SocialHub({ userAura, setUserAura }: SocialHubProps) {
  const [inputText, setInputText] = useState('');
  const [isProfiling, setIsProfiling] = useState(false);
  const [analysis, setAnalysis] = useState('Neural state: Synchronized.');
  const [activeChannel, setActiveChannel] = useState('Global_Nexus');
  const [typingCadence, setTypingCadence] = useState(0);
  const [keystrokeLogs, setKeystrokeLogs] = useState<{key: string, ms: number}[]>([]);
  const [isProduction, setIsProduction] = useState(false);
  const [isDbConnected, setIsDbConnected] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastKeyTime = useRef<number>(Date.now());

  const [channels] = useState([
    { id: 'Global_Nexus', name: 'Global Nexus', icon: Globe, count: 1420 },
    { id: 'Alpha_Squad', name: 'Alpha Squad Ops', icon: Target, count: 12 },
    { id: 'Shadow_Trade', name: 'Shadow Arbitrage', icon: Ghost, count: 94 }
  ]);

  const [posts, setPosts] = useState<any[]>([
    { id: '1', user: 'Nova_AI', content: 'Quantum-XTS encryption layers are holding steady at Node Singapore. Entropy levels reaching verified peaks.', aura: '#a855f7', intent: 'Intelligence Synthesis', time: '2h ago' },
    { id: '2', user: 'Zenith_Operative', content: 'Autonomous swarm successfully extracted high-ticket affiliate leads. ROI scaling at 14.2% velocity.', aura: '#22c55e', intent: 'Expansion Directive', time: '4h ago' },
  ]);

  useEffect(() => {
    // Check Stripe/Prod status
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
    }

    // Check Supabase Connection & Load Data
    const checkDb = async () => {
      const configured = isSupabaseConfigured();
      setIsDbConnected(configured);
      
      if (configured) {
        const livePosts = await getSocialFeed();
        if (livePosts && livePosts.length > 0) {
          // Map Supabase fields to UI fields
          const mappedPosts = livePosts.map((p: any) => ({
            id: p.id.toString(),
            user: p.username || 'Anon_Operative',
            content: p.content,
            aura: p.aura_color || '#ffffff',
            intent: p.intent || 'General',
            time: new Date(p.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
          }));
          setPosts(mappedPosts);
        }
      } else if (key && key.startsWith('pk_live')) {
        // If in production but NO Supabase, clear mock data
        setPosts([]);
      }
    };
    
    checkDb();
  }, []);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    }).catch(err => console.log("Camera access restricted."));

    // Simple facial tracking simulation loop
    const ctx = canvasRef.current?.getContext('2d');
    let frame: number;
    const loop = () => {
      if (ctx && canvasRef.current) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        if (videoRef.current) {
           ctx.globalAlpha = 0.3;
           ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
           ctx.globalAlpha = 1.0;
           
           // Draw simulated tracking points
           ctx.strokeStyle = userAura;
           ctx.lineWidth = 1;
           const time = Date.now() * 0.002;
           for(let i=0; i<15; i++) {
             const x = canvasRef.current.width/2 + Math.cos(time + i) * 60;
             const y = canvasRef.current.height/2 + Math.sin(time * 0.8 + i) * 80;
             ctx.beginPath();
             ctx.arc(x, y, 2, 0, Math.PI * 2);
             ctx.stroke();
             if (i % 3 === 0) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(canvasRef.current.width/2, canvasRef.current.height/2);
                ctx.stroke();
             }
           }
        }
      }
      frame = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(frame);
  }, [userAura]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const now = Date.now();
    const diff = now - lastKeyTime.current;
    lastKeyTime.current = now;
    
    setTypingCadence(Math.min(100, Math.floor(1000 / (diff || 1))));
    setKeystrokeLogs(prev => [{ key: e.key, ms: diff }, ...prev].slice(0, 10));
  };

  const handlePost = async () => {
    if (!inputText) return;
    setIsProfiling(true);
    
    try {
      // 1. Profile with Gemini
      const data = await profileUserEmotion(inputText);
      setUserAura(data.color);
      setAnalysis(data.analysis);
      
      const newPostLocal = {
        id: Date.now().toString(),
        user: 'Xavier_Admin',
        content: inputText,
        aura: data.color,
        intent: data.analysis.split(' ').slice(0, 3).join(' '),
        time: 'Just now'
      };

      // 2. Persist to Supabase if connected
      if (isDbConnected) {
        await postToSocialFeed({
          username: 'Xavier_Admin',
          content: inputText,
          aura: data.color,
          intent: data.analysis.split(' ').slice(0, 3).join(' ')
        });
        // Reloading feed would be ideal, but we'll optimistic update for now
      }
      
      setPosts([newPostLocal, ...posts]);
      setInputText('');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProfiling(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex gap-10 animate-in fade-in duration-1000 h-[calc(100vh-140px)] overflow-hidden">
      {/* Left Sidebar: Neural Channels */}
      <aside className="w-80 flex flex-col gap-8 shrink-0">
        <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/40 shadow-2xl relative overflow-hidden group flex-1">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
          <h3 className="font-bold text-[11px] uppercase tracking-[0.4em] flex items-center gap-4 text-white/40 mb-10">
            <Radio size={20} className="text-cyan-400 animate-pulse" />
            Channels
          </h3>
          <nav className="space-y-3">
            {channels.map((chan) => (
              <button 
                key={chan.id}
                onClick={() => setActiveChannel(chan.id)}
                className={`w-full flex items-center justify-between p-5 rounded-[1.8rem] transition-all border ${activeChannel === chan.id ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-2xl' : 'text-white/30 border-transparent hover:bg-white/5 hover:text-white'}`}
              >
                <div className="flex items-center gap-4">
                  <chan.icon size={20} className={activeChannel === chan.id ? 'animate-pulse' : ''} />
                  <span className="text-[12px] font-bold uppercase tracking-widest">{chan.name}</span>
                </div>
              </button>
            ))}
          </nav>
        </div>

        <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-gradient-to-br from-purple-500/5 to-transparent shadow-2xl space-y-8">
           <h3 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 flex items-center gap-4">
              <Zap size={18} className="text-purple-400" />
              Pulse
           </h3>
           <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-white/20">
                <span>Sync</span>
                <span className="text-cyan-400 font-mono">99.8%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                <div className="h-full bg-gradient-to-r from-cyan-600 to-purple-600 rounded-full shadow-[0_0_10px_#06b6d4]" style={{ width: '99.8%' }} />
              </div>
           </div>
        </div>
      </aside>

      {/* Main Feed Section */}
      <main className="flex-1 flex flex-col gap-10 overflow-hidden">
        {/* Post Composer */}
        <div className="glass p-10 rounded-[4rem] border border-white/10 space-y-8 relative overflow-hidden bg-black/60 shadow-2xl shrink-0">
          <div 
            className="absolute top-0 left-0 w-full h-[6px] transition-all duration-1000" 
            style={{ backgroundColor: userAura, boxShadow: `0 0 30px ${userAura}` }}
          ></div>
          
          <div className="flex gap-8 items-start relative z-10">
            <div className="relative shrink-0">
              <div 
                className="w-24 h-24 rounded-full p-1 relative z-10 transition-all duration-1000" 
                style={{ 
                  background: `conic-gradient(from 0deg, ${userAura}, transparent, ${userAura})`,
                  boxShadow: `0 0 50px ${userAura}33`
                }}
              >
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                  <img src="https://picsum.photos/seed/admin/200" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" alt="Admin" />
                </div>
              </div>
              <div className="absolute -inset-2 rounded-full border border-white/5 animate-spin-slow opacity-20"></div>
            </div>
            
            <div className="flex-1 space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">Admin_Session::{activeChannel}</p>
                <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-mono animate-pulse ${isDbConnected ? 'text-green-500' : 'text-cyan-400'}`}>
                    {isDbConnected ? 'SUPABASE_DB_LINKED' : 'LOCAL_DIRECTIVE_READY'}
                  </span>
                </div>
              </div>
              <textarea 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Broadcast sentient directives..."
                className="w-full bg-transparent border-none focus:ring-0 text-3xl resize-none placeholder:text-white/5 py-2 font-bold leading-tight uppercase tracking-tighter"
                rows={2}
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between border-t border-white/5 pt-8">
            <div className="flex gap-8">
              {[
                { icon: Camera, label: 'Visuals' },
                { icon: BrainCircuit, label: 'Intent' },
                { icon: MapPin, label: 'Node' }
              ].map((btn, i) => (
                <button key={i} className="text-white/20 hover:text-white transition-all flex items-center gap-3 text-[10px] uppercase font-bold tracking-[0.2em] group">
                  <btn.icon size={18} className="group-hover:scale-110 group-hover:text-cyan-400 transition-all" />
                  {btn.label}
                </button>
              ))}
            </div>
            <button 
              onClick={handlePost}
              disabled={isProfiling || !inputText}
              className="px-12 py-5 bg-white text-black font-bold rounded-[1.8rem] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-4 disabled:opacity-50 shadow-2xl uppercase tracking-[0.4em] text-[12px]"
              style={{ boxShadow: `0 0 40px ${userAura}44` }}
            >
              {isProfiling ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              Commit Directive
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="flex-1 overflow-y-auto scrollbar-hide space-y-10 pr-4 relative">
          {posts.length > 0 ? posts.map((post) => (
            <div key={post.id} className="glass p-12 rounded-[4rem] border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden bg-black/40 shadow-xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full p-1 relative" style={{ background: `linear-gradient(45deg, ${post.aura}, #000)` }}>
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/${post.user}/200`} alt={post.user} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-black" style={{ backgroundColor: post.aura }}></div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xl tracking-tighter group-hover:text-white transition-colors uppercase">{post.user}</h4>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold mt-1 italic">
                       {post.time} • {isDbConnected ? 'Supabase Relay' : 'Fragmented Node'}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.3em] text-white/40">
                  {post.intent}
                </div>
              </div>
              <p className="text-white/80 leading-relaxed text-2xl mb-10 font-medium pl-8 border-l-4 border-white/10 group-hover:border-cyan-500/50 transition-all duration-700 italic font-serif">
                "{post.content}"
              </p>
              <div className="flex items-center gap-10 text-white/10 pt-8 border-t border-white/5">
                <button className="flex items-center gap-3 hover:text-red-500 transition-all"><Heart size={24} /> <span className="text-base font-bold">142</span></button>
                <button className="flex items-center gap-3 hover:text-cyan-400 transition-all"><MessageSquare size={24} /> <span className="text-base font-bold">88</span></button>
                <button className="flex items-center gap-3 hover:text-white transition-all ml-auto"><Share2 size={24} /></button>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center h-full opacity-30 space-y-4">
               {isDbConnected ? <Database size={64} className="text-green-500" /> : <Globe size={64} className="text-white/20" />}
               <p className="text-[12px] uppercase tracking-widest font-bold">{isDbConnected ? 'Supabase Feed: No Records' : 'Secure Feed Empty'}</p>
               <p className="text-[10px]">{isDbConnected ? 'Post a directive to initialize the database.' : 'Awaiting encrypted transmissions.'}</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar: Deep Profiling HUD */}
      <aside className="w-96 flex flex-col gap-8 shrink-0">
        <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/80 shadow-2xl relative overflow-hidden flex flex-col group">
          <div className="absolute top-0 left-0 w-full h-1.5 transition-all duration-1000" style={{ backgroundColor: userAura }}></div>
          <h3 className="font-bold text-[11px] flex items-center gap-4 mb-10 uppercase tracking-[0.5em] text-white/30">
            <Eye size={20} style={{ color: userAura }} className="animate-pulse" />
            Neural Profiling HUD
          </h3>
          
          <div className="aspect-square rounded-[3rem] bg-black overflow-hidden relative mb-10 border border-white/10 group shadow-2xl">
            <video ref={videoRef} autoPlay muted playsInline className="hidden" />
            <canvas ref={canvasRef} width={400} height={400} className="w-full h-full object-cover rounded-[3rem]" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
               <div className="w-64 h-64 border border-cyan-500/10 rounded-full animate-spin-slow"></div>
               <div className="absolute w-48 h-48 border border-white/5 rounded-full animate-reverse-spin"></div>
            </div>
            <div className="absolute inset-6 border border-white/5 rounded-[2rem] pointer-events-none group-hover:border-cyan-500/20 transition-all">
               <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/40 rounded-tl-xl animate-pulse m-4"></div>
               <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/40 rounded-br-xl animate-pulse m-4"></div>
            </div>
            <div className="absolute bottom-6 left-6 px-4 py-1.5 bg-black/90 rounded-full border border-white/10 text-[9px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
               Live Biometric Trace
            </div>
          </div>
          
          <div className="p-8 bg-white/5 rounded-[3rem] border border-white/10 space-y-6 relative overflow-hidden shadow-inner">
            <div className="flex items-center justify-between mb-2">
               <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">Neural Sentiment</p>
               <Activity size={18} style={{ color: userAura }} className="animate-pulse" />
            </div>
            <p className="text-base text-white/90 leading-relaxed font-serif italic">"{analysis}"</p>
            
            <div className="space-y-6 pt-6 border-t border-white/5">
              <div className="space-y-3">
                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">
                    <span>Intent Clarity</span>
                    <span className="text-cyan-400">99.1%</span>
                 </div>
                 <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <div className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4]" style={{ width: '99.1%' }} />
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass p-10 rounded-[4rem] border border-white/10 bg-black/40 space-y-8 shadow-2xl relative overflow-hidden group flex-1">
          <h3 className="text-[11px] font-bold uppercase text-white/40 tracking-[0.6em] flex items-center gap-4">
             <BarChart size={20} className="text-cyan-400" />
             Keystroke DNA
          </h3>
          <div className="space-y-3">
            {keystrokeLogs.map((log, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/20 transition-all font-mono text-[10px] uppercase">
                <div className="flex items-center gap-4">
                  <span className="text-cyan-500 font-bold">[{log.key}]</span>
                  <span className="text-white/60">{log.ms}ms</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/30 animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <style>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        .animate-reverse-spin {
          animation: spin 30s linear reverse infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
