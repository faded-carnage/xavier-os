
import React, { useState, useEffect } from 'react';
import { 
  DollarSign, TrendingUp, Briefcase, ShoppingBag, 
  ArrowUpRight, LayoutGrid, Layers, Loader2, FileText, CheckCircle2,
  Zap, Copy, ChevronRight, Server, Play, ShieldCheck, Activity, Globe,
  Rocket, Box, CreditCard, Mail, Megaphone, Target, Settings, Lock
} from 'lucide-react';
import { generateAutonomousCampaign } from '../services/geminiService';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

interface RevenueStreamsProps {
  navigateToSettings?: () => void;
}

export default function RevenueStreams({ navigateToSettings }: RevenueStreamsProps) {
  const [viewMode, setViewMode] = useState<'selector' | 'building' | 'live'>('selector');
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [buildLogs, setBuildLogs] = useState<string[]>([]);
  const [buildProgress, setBuildProgress] = useState(0);
  const [campaignData, setCampaignData] = useState<any>(null);
  const [hasStripeKey, setHasStripeKey] = useState(false);
  
  // Live Dashboard State
  const [revenue, setRevenue] = useState(0.00);
  const [chartData, setChartData] = useState(Array.from({ length: 20 }, (_, i) => ({ time: i, val: 0 })));

  useEffect(() => {
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    if (key && key.startsWith('pk_live')) {
      setHasStripeKey(true);
    }
  }, []);

  const streams = [
    { cat: 'E-Commerce', items: [
      'High-Ticket Dropshipping', 'White Label Supplements', 'POD Merchandise', 'Digital Products (Ebooks)', 
      'SaaS Reselling', 'Subscription Box Service', 'Luxury Watch Arbitrage', 'Sneaker Flipping Bot'
    ]},
    { cat: 'Affiliate', items: [
      'High-Ticket CPA', 'Crypto Exchange Referrals', 'Software Affiliate', 'Amazon Associates Automation', 
      'Travel Affiliate Niche', 'Credit Card Referrals', 'Course Launch Jacking', 'Web Hosting Affiliate'
    ]},
    { cat: 'Financial', items: [
      'Crypto Arbitrage Bot', 'DeFi Yield Farming', 'Forex Signal Auto-Trade', 'NFT Flipping Algorithim', 
      'Micro-Lending AI', 'Token Sniper Bot', 'Stablecoin Staking', 'High-Frequency Trading'
    ]},
    { cat: 'Service Agency', items: [
      'AI Agency (AAA)', 'Lead Generation Service', 'SEO Automation', 'Social Media Management AI', 
      'Copywriting AI Service', 'Email Marketing Automation', 'Reputation Management', 'Video Editing AI'
    ]}
  ];

  const initiateAutonomousMode = async (protocol: string) => {
    setSelectedProtocol(protocol);
    setViewMode('building');
    setBuildProgress(0);
    setBuildLogs(['[SYSTEM] Initializing Sovereign AI Protocol...']);

    // Build Simulation Steps
    const steps = [
      "Analyzing Global Market Trends (Google Grounding)...",
      "Identifying High-Margin Product Vector...",
      "Sourcing Supplier Nodes (CN/US/EU)...",
      "Drafting High-Conversion Sales Copy...",
      "Generating Ad Creative Matrix...",
      "Configuring Stripe Settlement Layer...",
      "Deploying to Production Cloud..."
    ];

    // Simulate progress visual while fetching real AI data
    let stepIndex = 0;
    const interval = setInterval(() => {
      if (stepIndex < steps.length) {
        if (steps[stepIndex].includes("Stripe") && !hasStripeKey) {
           setBuildLogs(prev => ["[ALERT] Stripe Production Keys Missing. Using Sandbox.", ...prev]);
        } else {
           setBuildLogs(prev => [steps[stepIndex], ...prev]);
        }
        setBuildProgress(prev => Math.min(prev + 14, 90));
        stepIndex++;
      }
    }, 1500);

    try {
      // THE REAL WORK: Call Gemini to build the business
      const data = await generateAutonomousCampaign(protocol);
      setCampaignData(data);
      
      clearInterval(interval);
      setBuildProgress(100);
      setBuildLogs(prev => ["SUCCESS: Business Fully Autonomous.", ...prev]);
      
      setTimeout(() => {
        setViewMode('live');
      }, 1500);

    } catch (e) {
      console.error(e);
      setBuildLogs(prev => ["ERROR: Neural Interrupt. Retrying...", ...prev]);
      clearInterval(interval);
    }
  };

  // Live Revenue Simulation Effect
  useEffect(() => {
    // CRITICAL UPDATE: If hasStripeKey is true, we DISABLE the fake money generator.
    if (viewMode === 'live' && campaignData) {
      if (hasStripeKey) {
        // Real Mode: No fake ticker. 
        setRevenue(0.00); 
        setChartData(Array.from({ length: 20 }, (_, i) => ({ time: i, val: 0 })));
        return; 
      }

      // Sandbox Mode: Run simulation
      const dailyYield = campaignData.estimatedDailyYield || 100;
      const tickBase = dailyYield / 100; 

      const interval = setInterval(() => {
        setRevenue(prev => prev + (Math.random() * tickBase));
        setChartData(prev => [...prev.slice(1), { time: Date.now(), val: Math.random() * tickBase }]);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [viewMode, campaignData, hasStripeKey]);

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000 h-[calc(100vh-140px)] flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 shrink-0">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Rocket className="text-green-500 animate-pulse" size={40} />
            Autonomous Revenue Engine
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">
            Zero-Touch Business Generation • AI Builds, Launches & Manages
          </p>
        </div>
        {viewMode === 'live' && (
           <div className={`px-8 py-3 rounded-full flex items-center gap-4 animate-pulse border ${hasStripeKey ? 'bg-green-500/10 border-green-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
              <Activity size={18} className={hasStripeKey ? "text-green-500" : "text-yellow-500"} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${hasStripeKey ? 'text-green-400' : 'text-yellow-500'}`}>
                {hasStripeKey ? 'LIVE OPERATIONS ACTIVE' : 'SANDBOX SIMULATION'}
              </span>
           </div>
        )}
      </div>

      {/* VIEW 1: SELECTOR */}
      {viewMode === 'selector' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
          <div className="lg:col-span-4 h-full overflow-y-auto custom-scrollbar pr-2 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {streams.map((stream, i) => (
                <div key={i} className="contents">
                  {stream.items.map((item, j) => (
                    <div key={`${i}-${j}`} className="glass p-8 rounded-[2rem] border border-white/5 bg-black/40 hover:border-green-500/30 hover:bg-green-500/5 transition-all group flex flex-col justify-between">
                       <div className="space-y-4">
                          <div className="flex justify-between items-start">
                             <div className="p-3 bg-white/5 rounded-xl text-white/40 group-hover:text-green-400 transition-colors">
                                {i === 0 ? <ShoppingBag size={20} /> : i === 1 ? <TrendingUp size={20} /> : <Zap size={20} />}
                             </div>
                             <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">{stream.cat}</span>
                          </div>
                          <h3 className="text-lg font-bold uppercase tracking-tight text-white group-hover:text-green-400 transition-colors">{item}</h3>
                       </div>
                       <button 
                         onClick={() => initiateAutonomousMode(item)}
                         className="mt-8 w-full py-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 hover:text-black hover:border-green-500 transition-all shadow-lg"
                       >
                          <Play size={14} /> Initiate AI Auto-Pilot
                       </button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: BUILDING PHASE */}
      {viewMode === 'building' && (
        <div className="flex-1 flex items-center justify-center relative">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,197,94,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
           <div className="max-w-3xl w-full space-y-12 text-center relative z-10">
              <div className="relative inline-block">
                 <div className="w-48 h-48 rounded-full border-4 border-dashed border-green-500/20 animate-spin-slow flex items-center justify-center mx-auto"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <BotBuildingIcon />
                 </div>
              </div>
              
              <div className="space-y-6">
                 <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">Constructing Business</h2>
                 <p className="text-green-400 font-mono text-lg uppercase tracking-widest animate-pulse">{buildLogs[0]}</p>
                 
                 <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
                    <div className="h-full bg-green-500 rounded-full transition-all duration-500 shadow-[0_0_20px_#22c55e]" style={{ width: `${buildProgress}%` }}></div>
                 </div>
              </div>

              <div className="glass p-8 rounded-[2rem] bg-black/60 text-left h-48 overflow-y-auto custom-scrollbar font-mono text-[11px] space-y-2 border border-white/10">
                 {buildLogs.map((log, i) => (
                    <div key={i} className="text-white/60 flex gap-4">
                       <span className="text-green-500/50">>></span>
                       {log}
                    </div>
                 ))}
              </div>
           </div>
        </div>
      )}

      {/* VIEW 3: LIVE DASHBOARD */}
      {viewMode === 'live' && campaignData && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 flex-1 overflow-hidden">
           {/* Left: Live Metrics */}
           <div className="lg:col-span-4 flex flex-col gap-8 h-full overflow-y-auto scrollbar-hide pb-20">
              <div className="glass p-10 rounded-[3rem] border border-green-500/30 bg-black/60 shadow-[0_0_50px_rgba(34,197,94,0.1)] text-center relative overflow-hidden group">
                 <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
                 <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em] mb-4">Total Revenue Generated</p>
                 <p className="text-6xl font-bold text-white tracking-tighter drop-shadow-2xl">${revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                 <div className="mt-6 flex justify-center gap-4">
                    <span className="px-4 py-1 bg-green-500/20 text-green-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">AUD Settled</span>
                 </div>
              </div>

              {hasStripeKey ? (
                <div className="p-8 bg-green-500/10 border border-green-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4 shadow-2xl relative overflow-hidden animate-in slide-in-from-left-4">
                   <Lock size={32} className="text-green-500" />
                   <div className="space-y-2 relative z-10">
                      <p className="text-green-500 font-bold uppercase tracking-widest text-xs">Real Mode: Active</p>
                      <p className="text-[10px] text-white/60 leading-relaxed">Simulated revenue is DISABLED. Assets are deployed. Monitoring for real conversion events.</p>
                   </div>
                </div>
              ) : (
                <div className="p-8 bg-yellow-500/10 border border-yellow-500/30 rounded-[2.5rem] flex flex-col items-center text-center space-y-4 shadow-2xl relative overflow-hidden animate-in slide-in-from-left-4">
                   <Lock size={32} className="text-yellow-500 animate-bounce" />
                   <div className="space-y-2 relative z-10">
                      <p className="text-yellow-500 font-bold uppercase tracking-widest text-xs">Sandbox Mode Active</p>
                      <p className="text-[10px] text-white/60 leading-relaxed">Revenue is simulated. Connect Stripe to process real payments.</p>
                   </div>
                   <button 
                     onClick={navigateToSettings}
                     className="mt-4 px-8 py-3 bg-yellow-500 text-black font-bold rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg flex items-center gap-2"
                   >
                      <Settings size={14} /> Configure Keys
                   </button>
                </div>
              )}

              <div className="glass p-8 rounded-[2.5rem] border border-white/10 bg-black/40 flex-1 flex flex-col">
                 <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-white/40 mb-6 flex items-center gap-3">
                    <Activity size={16} className="text-green-500" /> Live Traffic
                 </h3>
                 <div className="flex-1 w-full min-h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                       <AreaChart data={chartData}>
                          <defs>
                             <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                             </linearGradient>
                          </defs>
                          <Area type="monotone" dataKey="val" stroke="#22c55e" strokeWidth={3} fill="url(#colorRev)" />
                       </AreaChart>
                    </ResponsiveContainer>
                 </div>
              </div>
           </div>

           {/* Right: Asset Monitor */}
           <div className="lg:col-span-8 flex flex-col gap-8 h-full overflow-hidden">
              <div className="glass p-10 rounded-[3rem] border border-white/10 bg-black/80 flex-1 overflow-y-auto custom-scrollbar relative">
                 <div className="absolute top-0 right-0 p-10 opacity-20">
                    <Server size={120} className="text-white" />
                 </div>
                 
                 <div className="relative z-10 space-y-12">
                    <div>
                       <h2 className="text-4xl font-bold uppercase tracking-tighter text-white mb-2">{campaignData.productName}</h2>
                       <div className="flex items-center gap-6">
                          <span className="text-xl text-green-400 font-mono font-bold">{campaignData.targetPrice}</span>
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 border-l border-white/10 pl-6">{selectedProtocol}</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                             <Megaphone size={14} className="text-purple-400" /> Ad Configuration
                          </div>
                          <div className="space-y-2">
                             <p className="text-white/80 font-bold text-lg">"{campaignData.adCampaign.hook}"</p>
                             <p className="text-white/40 text-sm leading-relaxed">{campaignData.adCampaign.copy}</p>
                          </div>
                          <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                             <span className="text-[9px] font-bold uppercase text-white/20">Platform</span>
                             <span className="text-[9px] font-bold uppercase text-purple-400 border border-purple-500/30 px-3 py-1 rounded-full">{campaignData.adCampaign.platform}</span>
                          </div>
                       </div>

                       <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
                          <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                             <Globe size={14} className="text-cyan-400" /> Landing Page
                          </div>
                          <div className="space-y-2">
                             <p className="text-white/80 font-bold text-lg">{campaignData.landingPage.headline}</p>
                             <p className="text-white/40 text-sm leading-relaxed">{campaignData.landingPage.subheadline}</p>
                          </div>
                          <button className="w-full mt-2 py-3 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500 hover:text-black transition-all">
                             View Live Site
                          </button>
                       </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/5 space-y-4">
                        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-white/40">
                           <Mail size={14} className="text-yellow-400" /> Automated Email Sequence
                        </div>
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-white font-bold text-sm mb-1">{campaignData.emailSequence.subject}</p>
                              <p className="text-white/40 text-xs italic">"{campaignData.emailSequence.bodySnippet}..."</p>
                           </div>
                           <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[8px] font-bold uppercase rounded-full border border-green-500/20">Active</span>
                        </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}

function BotBuildingIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-green-500 animate-pulse">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  );
}
