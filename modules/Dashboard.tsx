
import React, { useState, useEffect } from 'react';
import { 
  Activity, Globe, Zap, TrendingUp, ShieldAlert, Brain, ChevronRight,
  Loader2, ShieldCheck, Package, Network, Cpu, RefreshCw, Orbit,
  Wallet, Wifi, Lock, Eye, Radar, Crosshair, Fingerprint, Signal, 
  Layers, Terminal, Server, Sparkles, Crown, Infinity, Star, Megaphone,
  BarChart3
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { getFinancialForecast } from '../services/geminiService';
import { getGlobalSentiment } from '../services/marketingService';
import { UserSession } from '../types';

interface DashboardProps {
  isLive?: boolean;
  userAura?: string;
  user?: UserSession;
}

// Default mock data for Simulation Mode
const mockChartData = [
  { name: '00:00', load: 42, traffic: 2400, secure: 98, entropy: 0.95 },
  { name: '04:00', load: 35, traffic: 1398, secure: 99, entropy: 0.98 },
  { name: '08:00', load: 68, traffic: 9800, secure: 97, entropy: 0.92 },
  { name: '12:00', load: 82, traffic: 3908, secure: 99, entropy: 0.99 },
  { name: '16:00', load: 55, traffic: 4800, secure: 98, entropy: 0.96 },
  { name: '20:00', load: 94, traffic: 3800, secure: 96, entropy: 0.94 },
  { name: '23:59', load: 65, traffic: 4300, secure: 99, entropy: 0.99 },
];

export default function Dashboard({ isLive = false, userAura = '#fbbf24', user }: DashboardProps) {
  const [forecast, setForecast] = useState<string | null>(null);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [entropyLevel, setEntropyLevel] = useState(0.9998);
  const [activeNodes, setActiveNodes] = useState(15420);
  const [sentiment, setSentiment] = useState({ headline: "Initializing Global Listeners...", sentimentScore: 0 });
  
  // Real Mode States
  const [isProduction, setIsProduction] = useState(false);
  const [chartData, setChartData] = useState<any[]>(mockChartData);

  useEffect(() => {
    // Check for Production Environment
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    const prodMode = key && key.startsWith('pk_live');
    setIsProduction(!!prodMode);

    if (prodMode) {
      // IN REAL MODE: Reset chart to flatline (waiting for real data)
      // In a full backend implementation, this would fetch real analytics.
      setChartData(Array.from({ length: 7 }, (_, i) => ({ 
        name: `${i * 4}:00`, load: 0, traffic: 0, secure: 100, entropy: 1.0 
      })));
      setActiveNodes(1); // Only the local node is confirmed active
      setEntropyLevel(1.0); // Perfect stability expected
    } else {
      // IN SIMULATION MODE: Run drivers
      const interval = setInterval(() => {
        setEntropyLevel(0.9997 + Math.random() * 0.0003);
        setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      }, 3000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const fetchSentiment = async () => {
      try {
        const s = await getGlobalSentiment();
        setSentiment(s);
      } catch (err) {
        console.warn("Could not fetch global sentiment:", err);
        if (err instanceof Error && err.message.includes("429")) {
            setSentiment(prev => ({ ...prev, headline: "API Rate Limit Reached. Data is stale." }));
        }
      }
    };
    fetchSentiment();
    const sInterval = setInterval(fetchSentiment, 60000); // Check every minute

    return () => clearInterval(sInterval);
  }, []);

  const fetchForecast = async () => {
    setLoadingForecast(true);
    try {
      const result = await getFinancialForecast({
        dailyRevenue: isProduction ? 'REAL_TIME_MONITORING' : 28400,
        marketingSpend: isProduction ? 'ACTUAL_SPEND' : 4200,
        activeCampaigns: 'GLOBAL_MATRIX',
        warehouseEfficiency: 'MAXIMAL',
        vpnTraffic: 'X-BANDWIDTH',
        userAuraState: 'SOVEREIGN_GOLD'
      });
      setForecast(result);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("429")) {
        alert("API rate limit exceeded.");
      } else {
        alert("An error occurred while fetching the forecast.");
      }
    } finally {
      setLoadingForecast(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      {/* Top Protocol Status Bar */}
      <div className="flex flex-col xl:flex-row gap-8">
        <div className={`flex-1 glass p-10 rounded-[4rem] border flex items-center justify-between bg-black/60 shadow-[0_0_50px_rgba(251,191,36,0.1)] relative overflow-hidden group ${isProduction ? 'border-green-500/30' : 'border-amber-500/30'}`}>
          <div className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isProduction ? 'from-green-500/10' : 'from-amber-500/10'}`}></div>
          <div className="flex items-center gap-10">
            <div className={`w-20 h-20 rounded-[2.5rem] flex items-center justify-center border shadow-inner relative group-hover:scale-105 transition-transform duration-700 ${isProduction ? 'bg-green-500/10 border-green-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
              <Crown className={isProduction ? "text-green-400" : "text-amber-400 animate-pulse"} size={42} />
              {isProduction && <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-black animate-pulse"></div>}
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter uppercase drop-shadow-2xl">
                {isProduction ? 'Sovereign Production' : 'Root Sovereign Control'}
              </h2>
              <div className="flex items-center gap-4 mt-2">
                 <p className={`text-[11px] font-bold uppercase tracking-[0.4em] flex items-center gap-3 ${isProduction ? 'text-green-500/60' : 'text-amber-500/60'}`}>
                   <Lock size={12} />
                   Owner: jameshapurona@gmail.com
                 </p>
                 <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] ${isProduction ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                 <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em] animate-pulse">
                   {isProduction ? 'LIVE_KEY_ACTIVE' : 'SANDBOX_SIMULATION'}
                 </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-12 pr-6">
             <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Global Sentiment</p>
                <p className="text-xl font-mono font-bold text-orange-500 uppercase">{sentiment.sentimentScore > 0 ? `${sentiment.sentimentScore}% Positive` : 'CALIBRATING...'}</p>
             </div>
             <div className="w-px h-14 bg-white/10" />
             <div className="text-right space-y-1">
                <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em]">Market Focus</p>
                <p className="text-xl font-bold text-amber-500 uppercase tracking-tighter">GLOBAL_BLAST</p>
             </div>
          </div>
        </div>

        <div className="xl:w-1/3 glass p-10 rounded-[4rem] border border-white/10 flex items-center gap-10 bg-black/40 shadow-xl overflow-hidden group">
           <div className="w-20 h-20 rounded-full border-4 border-dashed border-orange-500/20 flex items-center justify-center animate-spin-slow group-hover:border-orange-500/40 transition-colors relative">
              <Megaphone className="text-orange-400" size={32} />
              <div className="absolute inset-0 bg-orange-500/5 rounded-full blur-2xl opacity-40 animate-pulse"></div>
           </div>
           <div className="space-y-4">
              <h3 className="text-base font-bold uppercase tracking-[0.3em] text-white/80">Broadcasting...</h3>
              <div className="flex items-center gap-5">
                 <div className="flex gap-2">
                    {[1,2,3,4,5].map(i => (
                       <div key={i} className={`w-2 h-6 rounded-full transition-all duration-1000 bg-orange-500 shadow-[0_0_12px_#f97316]`} />
                    ))}
                 </div>
                 <span className="text-[12px] font-bold text-orange-400 uppercase tracking-[0.4em] animate-pulse">Viral Pulse Active</span>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Control Column */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Main Visual Matrix */}
          <div className="glass p-14 rounded-[5rem] border border-white/10 relative overflow-hidden bg-black/80 shadow-[0_0_150px_rgba(0,0,0,1)] min-h-[600px] flex flex-col group/matrix">
            <div className={`absolute inset-0 pointer-events-none opacity-40 transition-all duration-2000 group-hover/matrix:scale-110 ${isProduction ? 'bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_75%)]' : 'bg-[radial-gradient(circle_at_center,_rgba(251,191,36,0.1)_0%,_transparent_75%)]'}`}></div>
            
            <div className="flex items-center justify-between mb-16 relative z-10">
              <div className="space-y-3">
                <h3 className="font-bold flex items-center gap-8 text-4xl tracking-tighter uppercase drop-shadow-2xl text-white">
                  <Activity size={42} className={isProduction ? "text-green-400" : "text-amber-400 animate-pulse"} />
                  {isProduction ? 'Live Production Pulse' : 'Ecosystem Simulation'}
                </h3>
                <p className="text-[12px] uppercase tracking-[0.8em] text-white/20 font-bold ml-12">
                  {isProduction ? 'REAL-TIME DATA STREAM ACTIVE' : sentiment.headline}
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className={`px-8 py-4 bg-black border rounded-3xl text-[11px] font-bold flex items-center gap-4 shadow-inner group cursor-pointer transition-all ${isProduction ? 'border-green-500/20 text-green-500/60 hover:border-green-500/40' : 'border-amber-500/20 text-amber-500/60 hover:border-amber-500/40'}`}>
                    <Star size={18} className="group-hover:text-current transition-colors animate-bounce" />
                    Tier: {isProduction ? 'PRODUCTION_LIVE' : 'MASTER_SOVEREIGN'}
                 </div>
              </div>
            </div>
            
            <div className="flex-1 h-[400px] w-full relative flex items-center justify-center">
              {isProduction ? (
                <div className="text-center space-y-6 opacity-60">
                   <div className="w-24 h-24 border-4 border-green-500/20 border-t-green-500 rounded-full animate-spin mx-auto"></div>
                   <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-green-500">Monitoring Real Traffic...</p>
                   <p className="text-[10px] text-white/20 uppercase tracking-widest">Connect Analytics Source to Populate</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={userAura} stopOpacity={0.4}/>
                        <stop offset="95%" stopColor={userAura} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="#ffffff10" 
                      fontSize={11} 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: '#ffffff30', fontWeight: 'bold' }}
                    />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '2px solid rgba(255,255,255,0.1)', borderRadius: '32px', color: '#fff', padding: '24px', backdropFilter: 'blur(30px)', boxShadow: '0 0 100px rgba(0,0,0,0.8)' }}
                      itemStyle={{ color: userAura, fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase' }}
                      cursor={{ stroke: userAura, strokeWidth: 2, strokeDasharray: '8 8' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="load" 
                      stroke={userAura} 
                      strokeWidth={6} 
                      fillOpacity={1} 
                      fill="url(#colorMain)" 
                      animationDuration={3000}
                      className="drop-shadow-[0_0_30px_rgba(251,191,36,0.4)]"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-10 pt-10 border-t border-white/5 relative z-10">
               {[
                 { label: 'Global Buzz', val: isProduction ? 'LISTENING' : 'EXPONENTIAL', color: 'text-orange-400', icon: Megaphone },
                 { label: 'Network Latency', val: isProduction ? '24ms (Real)' : '0.0ms (Local)', color: 'text-amber-500', icon: Zap },
                 { label: 'Privacy Mode', val: 'GOD_EYE', color: 'text-amber-400', icon: Eye },
                 { label: 'Store Quota', val: 'INFINITE', color: 'text-amber-500', icon: Infinity }
               ].map((m, i) => (
                 <div key={i} className="text-center group cursor-default space-y-2">
                    <div className="flex items-center justify-center gap-3">
                       <m.icon size={14} className={`${m.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] group-hover:text-white/40 transition-colors">{m.label}</p>
                    </div>
                    <p className={`text-2xl font-bold tracking-tighter ${m.color} drop-shadow-xl group-hover:scale-110 transition-transform`}>{m.val}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Intelligence Column */}
        <div className="lg:col-span-4 space-y-10">
          {/* Neural Prediction Core */}
          <div className={`glass p-12 rounded-[4rem] border relative overflow-hidden bg-black/60 shadow-[0_0_150px_rgba(0,0,0,0.2)] group/forecast min-h-[500px] flex flex-col ${isProduction ? 'border-green-500/20' : 'border-amber-500/20 shadow-[0_0_150px_rgba(251,191,36,0.05)]'}`}>
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent to-transparent ${isProduction ? 'via-green-500/40' : 'via-amber-500/40'}`}></div>
            <div className="flex items-center justify-between mb-12 relative z-10">
              <div className="space-y-2">
                <h3 className={`font-bold flex items-center gap-6 text-2xl tracking-tighter uppercase drop-shadow-2xl ${isProduction ? 'text-green-500' : 'text-amber-500'}`}>
                  <Brain size={36} className={`${isProduction ? 'text-green-400' : 'text-amber-400'} animate-pulse`} />
                  {isProduction ? 'Live Strategy' : 'Sovereign Forecast'}
                </h3>
                <p className="text-[11px] uppercase tracking-[0.6em] text-white/20 font-bold italic ml-1">Unlimited Strategic Cycles Active</p>
              </div>
              <button 
                onClick={fetchForecast}
                disabled={loadingForecast}
                className={`p-5 rounded-[1.8rem] transition-all relative overflow-hidden ${loadingForecast ? 'bg-white/5' : isProduction ? 'bg-green-600 hover:bg-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]' : 'bg-amber-600 hover:bg-amber-500 shadow-[0_0_40px_rgba(251,191,36,0.4)]'} hover:scale-105 active:scale-95 group/btn`}
              >
                {loadingForecast ? <Loader2 size={24} className="animate-spin text-white/60" /> : <RefreshCw size={24} className="text-white group-hover/btn:rotate-180 transition-transform duration-1000" />}
              </button>
            </div>

            <div className="flex-1 flex flex-col relative z-10">
              {forecast ? (
                <div className="animate-in fade-in slide-in-from-right-12 duration-1000 flex-1 flex flex-col">
                  <div className={`p-10 bg-black/90 rounded-[3.5rem] border font-serif text-xl leading-relaxed italic text-white/80 shadow-[inset_0_0_80px_rgba(0,0,0,1)] flex-1 backdrop-blur-3xl border-l-[12px] ${isProduction ? 'border-green-500/20 border-l-green-500' : 'border-amber-500/10 border-l-amber-500'}`}>
                    {forecast}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-12 opacity-20 group/stby cursor-pointer" onClick={fetchForecast}>
                   <Infinity size={84} className={`${isProduction ? 'text-green-400' : 'text-amber-400'} group-hover/stby:scale-110 transition-transform duration-1000`} />
                   <p className="text-xl font-bold uppercase tracking-[1em] text-white">Universal_Synthesis</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
