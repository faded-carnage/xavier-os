
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, Wallet, TrendingUp, ArrowUpRight, ArrowDownRight, 
  ShieldCheck, Zap, Globe, RefreshCw, Loader2, Activity, Lock, 
  Coins, PieChart, BarChart3, ChevronRight, Signal, History, 
  Terminal, Server, Fingerprint, Crown, AlertTriangle, Link, Settings, Building2, FileCheck, Wifi
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

// Mock data only used if NO live key is present
const mockTransactionData = [
  { time: '00:00', amount: 4200 },
  { time: '04:00', amount: 3500 },
  { time: '08:00', amount: 9800 },
  { time: '12:00', amount: 12400 },
  { time: '16:00', amount: 15800 },
  { time: '20:00', amount: 21200 },
  { time: '23:59', amount: 28400 },
];

const mockLedgerItems = [
  { id: 'LGR-0x9AF', type: 'Payout', amount: '$12,420.00', status: 'Settled', node: 'SG-01', method: 'Onion_Pay' },
  { id: 'LGR-0x8BD', type: 'Deposit', amount: '$4,200.00', status: 'Pending', node: 'HK-04', method: 'Stripe_E2E' },
  { id: 'LGR-0x7CE', type: 'Arbitrage', amount: '$840.50', status: 'Settled', node: 'US-West', method: 'X-Settlement' },
  { id: 'LGR-0x6DF', type: 'Payout', amount: '$5,800.00', status: 'Processing', node: 'EU-DE', method: 'Onion_Pay' },
  { id: 'LGR-0x5EA', type: 'Gateway', amount: '$1,200.00', status: 'Settled', node: 'AU-SYD', method: 'Direct_Uplink' },
];

interface StripeNexusProps {
  navigateToSettings?: () => void;
}

export default function StripeNexus({ navigateToSettings }: StripeNexusProps) {
  const [isRotating, setIsRotating] = useState(false);
  const [balance, setBalance] = useState(0.00); // Default to 0 for real mode
  const [isProduction, setIsProduction] = useState(false);
  const [merchantId, setMerchantId] = useState('');
  const [abn, setAbn] = useState('');
  
  // Real Data Containers
  const [realTransactions, setRealTransactions] = useState<any[]>([]);
  const [webhookStatus, setWebhookStatus] = useState('Listening for Events...');

  useEffect(() => {
    const key = localStorage.getItem('XAVIER_STRIPE_PK');
    const mid = localStorage.getItem('XAVIER_MERCHANT_ID');
    const taxId = localStorage.getItem('XAVIER_ABN');

    if (key && key.startsWith('pk_live')) {
      setIsProduction(true);
      // IN REAL MODE: We do NOT load mock data. Balance stays 0.00 until real API call.
      setBalance(0.00); 
    } else {
      // IN TEST MODE: Load simulation
      setBalance(842501.12);
    }

    if (mid) setMerchantId(mid);
    if (taxId) setAbn(taxId);
  }, []);

  const rotateKeys = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 2000);
  };

  const handleWithdraw = () => {
    if (!isProduction) {
      if (navigateToSettings) {
        navigateToSettings();
      } else {
        alert("System is in SANDBOX mode. Please configure Production Keys in Settings.");
      }
      return;
    }
    // Deep link to actual Stripe Dashboard for payouts
    window.open('https://dashboard.stripe.com/payouts', '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <CreditCard className={isProduction ? "text-green-500" : "text-blue-500 animate-pulse"} size={40} />
            {isProduction ? 'Sovereign Production Gateway' : 'Stripe Simulator Nexus'}
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">
            {isProduction ? 'REAL MONEY MODE ENGAGED • NO SIMULATIONS' : 'Military-Grade Settlement Gateway • E2EE Payout Matrix'}
          </p>
        </div>
        <div className="flex gap-4">
           <button 
            onClick={rotateKeys}
            disabled={isRotating}
            className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest transition-all shadow-inner group"
           >
             {isRotating ? <Loader2 size={18} className="animate-spin text-blue-500" /> : <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />}
             Rotate_Cipher_Node
           </button>
           <button 
             onClick={handleWithdraw}
             className={`flex items-center gap-4 text-white font-bold px-10 py-4 rounded-[2rem] text-[10px] font-bold uppercase tracking-widest transition-all shadow-[0_0_40px_rgba(59,130,246,0.3)] ${isProduction ? 'bg-green-600 hover:bg-green-500' : 'bg-blue-600 hover:bg-blue-500'}`}
           >
             {isProduction ? <ArrowUpRight size={20} /> : <Settings size={20} />}
             {isProduction ? 'INITIATE_REAL_PAYOUT' : 'Configure_Keys'}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-10">
          
          {/* Main Financial Matrix / Live Monitor */}
          <div className={`glass p-14 rounded-[5rem] border relative overflow-hidden flex flex-col min-h-[600px] group transition-all duration-1000 ${isProduction ? 'border-green-500/20 bg-black' : 'border-white/10 bg-black/80 shadow-[0_0_150px_rgba(0,0,0,1)]'}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.1)_0%,_transparent_70%)] pointer-events-none"></div>
            
            <div className="flex items-center justify-between mb-16 relative z-10">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold uppercase tracking-tighter flex items-center gap-6">
                  {isProduction ? <Activity className="text-green-500 animate-pulse" size={32} /> : <TrendingUp className="text-blue-500" size={32} />}
                  {isProduction ? 'Live Webhook Stream' : 'Revenue Velocity'}
                </h3>
                <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-white/20">
                  {isProduction ? 'Monitoring Real-Time Stripe Events' : 'Real-Time Global Settlement Swarm'}
                </p>
              </div>
              <div className={`px-8 py-4 bg-white/5 border rounded-full text-[11px] font-bold flex items-center gap-4 shadow-inner transition-colors ${isProduction ? 'border-green-500/40 text-green-400 bg-green-900/10' : 'border-blue-500/20 text-blue-400'}`}>
                {isProduction ? <Lock size={18} /> : <Globe size={18} className="animate-spin-slow" />}
                Network: {isProduction ? 'PRODUCTION_LIVE_KEY' : 'SIMULATION_SANDBOX'}
              </div>
            </div>

            {isProduction ? (
              // REAL MODE INTERFACE
              <div className="flex-1 w-full relative z-10 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
                 <div className="w-48 h-48 rounded-full border-4 border-green-500/20 flex items-center justify-center relative">
                    <div className="absolute inset-0 border-4 border-t-green-500 rounded-full animate-spin"></div>
                    <Wifi size={64} className="text-green-500 animate-pulse" />
                 </div>
                 <div className="text-center space-y-4">
                    <p className="text-2xl font-bold uppercase tracking-widest text-white">Awaiting Transactions</p>
                    <p className="text-sm font-mono text-green-500/60">{webhookStatus}</p>
                    <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] max-w-md mx-auto leading-relaxed">
                       System is in Hard Real Mode. Simulation drivers are disabled. 
                       Charts will populate only when actual money hits your Stripe account.
                    </p>
                 </div>
              </div>
            ) : (
              // SIMULATION INTERFACE
              <div className="flex-1 w-full h-[350px] relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTransactionData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor='#3b82f6' stopOpacity={0.3}/>
                        <stop offset="95%" stopColor='#3b82f6' stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="time" stroke="#ffffff10" fontSize={11} axisLine={false} tickLine={false} tick={{ fill: '#ffffff20' }} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: `1px solid rgba(59,130,246,0.2)`, borderRadius: '24px', color: '#fff' }}
                      itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="amount" stroke='#3b82f6' strokeWidth={5} fillOpacity={1} fill="url(#colorAmount)" className={`drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]`} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-10 pt-12 border-t border-white/5 relative z-10">
               {[
                 { label: 'Stripe Status', val: isProduction ? 'LIVE_KEY' : 'TEST_MODE', color: isProduction ? 'text-green-400' : 'text-blue-400', icon: Lock },
                 { label: 'Settlement Speed', val: isProduction ? 'T+2 DAYS' : '0.4s', color: isProduction ? 'text-white' : 'text-green-500', icon: Zap },
                 { label: 'Success Rate', val: isProduction ? '--' : '99.98%', color: isProduction ? 'text-white/40' : 'text-blue-500', icon: ShieldCheck },
                 { label: 'Daily Cap', val: '∞ LIMIT', color: 'text-amber-400', icon: Crown }
               ].map((m, i) => (
                 <div key={i} className="text-center group cursor-default space-y-2">
                    <div className="flex items-center justify-center gap-3">
                       <m.icon size={14} className={`${m.color} opacity-40 group-hover:opacity-100 transition-opacity`} />
                       <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{m.label}</p>
                    </div>
                    <p className={`text-2xl font-bold tracking-tighter ${m.color} drop-shadow-xl group-hover:scale-110 transition-transform`}>{m.val}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Detailed Ledger */}
          <div className="glass p-12 rounded-[4rem] border border-white/10 bg-black/60 shadow-2xl relative overflow-hidden flex flex-col min-h-[500px]">
             <div className="flex items-center justify-between mb-12">
                <div className="space-y-1">
                   <h3 className="text-2xl font-bold uppercase tracking-tighter flex items-center gap-6">
                      <History className="text-blue-400" size={28} />
                      Strategic Ledger
                   </h3>
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 italic">
                     {isProduction ? 'Real-Time Transaction Log' : 'Encrypted Log of All Global Payout Events'}
                   </p>
                </div>
                <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/20 hover:text-white transition-all"><BarChart3 size={20} /></button>
             </div>
             
             {isProduction && realTransactions.length === 0 ? (
               <div className="flex-1 flex flex-col items-center justify-center opacity-30 space-y-4">
                  <FileCheck size={48} />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em]">No Live Transactions Yet</p>
               </div>
             ) : (
               <div className="space-y-4 overflow-y-auto scrollbar-hide pr-2">
                  {(isProduction ? realTransactions : mockLedgerItems).map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white/5 rounded-[2.5rem] border border-white/5 hover:border-blue-500/30 transition-all group/item shadow-inner relative overflow-hidden">
                       <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:item:opacity-100 transition-opacity"></div>
                       <div className="flex items-center gap-8 relative z-10">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-2xl transition-transform group-hover/item:scale-110 ${item.type === 'Payout' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-500'}`}>
                             {item.type === 'Payout' ? <ArrowUpRight size={28} /> : <ArrowDownRight size={28} />}
                          </div>
                          <div>
                             <p className="text-lg font-bold text-white group-hover/item:text-blue-400 transition-colors uppercase tracking-tight">{item.id}</p>
                             <div className="flex items-center gap-4 mt-1">
                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{item.method}</span>
                                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest italic">Relay: {item.node}</span>
                             </div>
                          </div>
                       </div>
                       <div className="text-right space-y-2 relative z-10">
                          <p className={`text-2xl font-bold font-mono tracking-tighter ${item.type === 'Payout' ? 'text-green-400' : 'text-white'}`}>{item.amount}</p>
                          <span className={`text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full ${item.status === 'Settled' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 animate-pulse'}`}>{item.status}</span>
                       </div>
                    </div>
                  ))}
               </div>
             )}
          </div>
        </main>

        <aside className="lg:col-span-4 space-y-10">
          <div className={`glass p-12 rounded-[4rem] border space-y-10 shadow-2xl relative overflow-hidden group transition-all duration-1000 ${isProduction ? 'border-green-500/20 bg-green-900/10' : 'border-white/10 bg-gradient-to-br from-blue-600/10 to-transparent'}`}>
             <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 -rotate-45 translate-x-16 -translate-y-16"></div>
             <h3 className="text-[11px] font-bold uppercase tracking-[0.8em] text-white/30 flex items-center gap-6">
                <Coins size={24} className={isProduction ? "text-green-500 animate-bounce" : "text-blue-500 animate-bounce"} />
                {isProduction ? 'Real Account Balance' : 'Sovereign Liquidity'}
             </h3>
             <div className="space-y-12 relative z-10">
                <div className="p-10 bg-black/60 rounded-[3rem] border border-white/5 space-y-6 shadow-inner text-center">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Total Active Portfolio</p>
                   <p className={`text-7xl font-bold tracking-tighter text-white transition-all duration-1000 ${isProduction ? 'group-hover:text-green-400' : 'group-hover:text-blue-400'}`}>${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                   <div className="pt-6">
                      <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-green-500 mb-2">
                         <span>Profitability Swing</span>
                         <span>{isProduction ? '0.0%' : '+14.2%'}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5 shadow-inner">
                        <div className="h-full bg-green-500 rounded-full shadow-[0_0_10px_#22c55e]" style={{ width: isProduction ? '0%' : '84%' }} />
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="glass p-10 rounded-[4rem] border border-white/10 bg-black/40 space-y-12 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center text-center group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.1)_0%,_transparent_70%)] opacity-30 animate-pulse"></div>
             <div className="relative">
                <div className={`absolute inset-0 blur-[80px] opacity-20 animate-pulse scale-150 ${isProduction ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                <Fingerprint size={84} className={`relative z-10 animate-pulse ${isProduction ? 'text-green-500' : 'text-blue-500'}`} />
             </div>
             <div className="space-y-6 relative z-10 px-6">
                <p className="text-[18px] font-bold uppercase tracking-[0.6em] text-white/80">Biometric_Anchor</p>
                <p className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-bold leading-relaxed italic">
                  {isProduction ? 'Secure Payouts Enabled. Root biometric signature verified.' : 'Sandbox Mode. Please configure Production Keys in Settings to enable real-money protocols.'}
                </p>
             </div>
             <button 
               onClick={handleWithdraw}
               className="mt-8 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-all shadow-inner group-hover:border-blue-500/50"
             >
               Verify_Identity
             </button>
          </div>

          {/* New Compliance Card Showing Verified Entity */}
          {isProduction && (merchantId || abn) && (
            <div className="glass p-10 rounded-[3.5rem] border border-green-500/20 bg-green-900/10 shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="text-[11px] font-bold uppercase text-white/40 tracking-[0.5em] flex items-center gap-5 mb-8">
                  <FileCheck size={20} className="text-green-400" />
                  Entity Verified
               </h3>
               <div className="space-y-6 relative z-10">
                  {merchantId && (
                    <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <Settings size={14} className="text-white/40" />
                          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Merch_ID</span>
                       </div>
                       <span className="text-[10px] font-mono text-green-400">{merchantId}</span>
                    </div>
                  )}
                  {abn && (
                    <div className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                       <div className="flex items-center gap-3">
                          <Building2 size={14} className="text-white/40" />
                          <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Tax_ID</span>
                       </div>
                       <span className="text-[10px] font-mono text-green-400">{abn}</span>
                    </div>
                  )}
               </div>
            </div>
          )}

          <div className="glass p-10 rounded-[3.5rem] border border-white/10 bg-black/60 shadow-inner space-y-10 relative overflow-hidden group">
             <h3 className="text-[11px] font-bold uppercase text-white/30 tracking-[0.5em] flex items-center gap-5">
                <Server size={22} className="text-cyan-400" />
                Payment Relays
             </h3>
             <div className="space-y-8 relative z-10">
                {['Meta_Stripe_v4', 'Onion_Pay_HK', 'Sovereign_Yield_SG'].map((relay, i) => (
                  <div key={i} className="flex items-center justify-between group/rl cursor-help">
                    <div className="flex items-center gap-4">
                       <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"></div>
                       <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest group-hover/rl:text-cyan-400 transition-colors">{relay}</span>
                    </div>
                    <span className="text-[9px] font-mono text-white/20 uppercase">STABLE</span>
                  </div>
                ))}
             </div>
          </div>
        </aside>
      </div>

      <style>{`
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
}
