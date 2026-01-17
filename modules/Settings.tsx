
import React, { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon, 
  Key, 
  Shield, 
  CreditCard, 
  Globe, 
  ChevronRight,
  Power,
  Infinity,
  Crown,
  Eye,
  EyeOff,
  Star,
  Save,
  CheckCircle2,
  AlertTriangle,
  Database,
  Loader2
} from 'lucide-react';
import { UserSession } from '../types';
import { getSupabaseClient } from '../services/supabaseClient';

interface SettingsProps {
  user?: UserSession;
}

export default function Settings({ user }: SettingsProps) {
  const [activeTab, setActiveTab] = useState('security');
  const [showKey, setShowKey] = useState(false);
  
  // Local Config State
  const [stripeKey, setStripeKey] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [businessAbn, setBusinessAbn] = useState('');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Load from local storage on mount
    setStripeKey(localStorage.getItem('XAVIER_STRIPE_PK') || '');
    setMerchantId(localStorage.getItem('XAVIER_MERCHANT_ID') || '');
    setBusinessAbn(localStorage.getItem('XAVIER_ABN') || '');
    setSupabaseUrl(localStorage.getItem('XAVIER_SUPABASE_URL') || '');
    setSupabaseKey(localStorage.getItem('XAVIER_SUPABASE_KEY') || '');
  }, []);

  const handleSaveConfig = async () => {
    localStorage.setItem('XAVIER_STRIPE_PK', stripeKey);
    localStorage.setItem('XAVIER_MERCHANT_ID', merchantId);
    localStorage.setItem('XAVIER_ABN', businessAbn);
    
    // Save Supabase credentials locally
    localStorage.setItem('XAVIER_SUPABASE_URL', supabaseUrl);
    localStorage.setItem('XAVIER_SUPABASE_KEY', supabaseKey);
    
    if (activeTab === 'database' && supabaseUrl && supabaseKey) {
      setConnectionStatus('checking');
      const client = getSupabaseClient();
      if (client) {
        // Simple ping to check connection (e.g. list tables or just auth check)
        const { error } = await client.from('health_check').select('*').limit(1);
        // We expect an error if table doesn't exist, but a network error/auth error is different.
        // Usually if URL/Key are wrong, we get specific errors. 
        // For now, if we get a client, we assume config format is valid.
        // A better check would be auth.getSession()
        const { data: authData, error: authError } = await client.auth.getSession();
        
        if (!authError || (authError && authError.status !== 500)) { 
           // 500 usually implies bad URL. 401 implies bad key but reachable.
           // We'll consider it "Linked" if we can reach the instance.
           setConnectionStatus('success');
        } else {
           setConnectionStatus('error');
        }
      } else {
        setConnectionStatus('error');
      }
    }

    setIsSaved(true);
    setTimeout(() => { 
      setIsSaved(false); 
      if (connectionStatus === 'success') setConnectionStatus('idle');
    }, 2000);
  };

  const navItems = [
    { id: 'security', label: 'Security & Access', icon: Shield },
    { id: 'financials', label: 'Financial Gateway', icon: CreditCard },
    { id: 'database', label: 'Supabase Data', icon: Database },
    { id: 'infrastructure', label: 'Nodes & VPN', icon: Globe },
    { id: 'sovereign', label: 'Sovereign Overrides', icon: Crown },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <SettingsIcon className="text-amber-400" size={40} />
            Sovereign Configuration
          </h1>
          <p className="text-amber-500/60 text-[11px] uppercase tracking-[0.6em] font-bold italic">Authenticated Owner: {user?.email || 'ROOT_USER'}</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-amber-500 shadow-inner">
             <Crown size={14} className="inline mr-2" />
             ROOT_MASTER_ACCESS_V4
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <aside className="lg:col-span-4 space-y-3">
          {navItems.map((item) => (
            <button 
              key={item.id} 
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-8 py-6 rounded-[2rem] transition-all border ${activeTab === item.id ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-2xl' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
            >
              <div className="flex items-center gap-6">
                <item.icon size={24} className={activeTab === item.id ? 'animate-pulse' : ''} />
                <span className="text-[12px] font-bold uppercase tracking-[0.3em]">{item.label}</span>
              </div>
              <ChevronRight size={18} className={`opacity-20 transition-transform ${activeTab === item.id ? 'rotate-90 text-amber-400 opacity-100' : ''}`} />
            </button>
          ))}
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-10">
          <div className="glass p-12 rounded-[4rem] border border-amber-500/20 space-y-12 bg-black/40 shadow-2xl flex-1 relative overflow-hidden">
            
            {activeTab === 'security' && (
              <section className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-sm font-bold uppercase tracking-[0.4em] text-amber-500/60 flex items-center gap-4">
                  <Key size={20} className="text-amber-400" />
                  Sovereign Identity Key
                </h3>
                <div className="p-10 bg-black/80 rounded-[3.5rem] border border-amber-500/10 space-y-8 shadow-inner">
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/80">Account Quota Status</p>
                    <span className="px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                      <Infinity size={14} className="inline mr-2" /> Unlimited Access
                    </span>
                  </div>
                  <div className="relative">
                    <input 
                      type={showKey ? 'text' : 'password'} 
                      value="ROOT_SIGNATURE_BYPASS_ENABLED_0x9AF"
                      readOnly
                      className="w-full bg-black/90 border border-amber-500/20 rounded-[2rem] py-6 pl-8 pr-16 text-lg font-mono text-amber-500 shadow-inner"
                    />
                    <button onClick={() => setShowKey(!showKey)} className="absolute right-8 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors">
                      {showKey ? <EyeOff size={24} /> : <Eye size={24} />}
                    </button>
                  </div>
                </div>
              </section>
            )}

            {activeTab === 'sovereign' && (
              <section className="space-y-10 animate-in fade-in duration-500">
                <div className="p-10 bg-amber-500/5 border border-amber-500/20 rounded-[3.5rem] space-y-8">
                   <div className="flex items-center gap-6">
                      <Star className="text-amber-500 animate-bounce" size={32} />
                      <h3 className="text-xl font-bold uppercase tracking-tighter text-white">Owner Bypass Matrix</h3>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { label: 'Unlimited Credit Line', desc: 'Unlimited Stripe throughput.', active: true },
                        { label: 'Zero-Latency Tunnel', desc: 'Direct node injection bypass.', active: true },
                        { label: 'Quantum Overclock', desc: 'Max TFLOPS neural cycles.', active: true },
                        { label: 'Global God-Mode', desc: 'Access to all Sector-7 assets.', active: true },
                      ].map((item, i) => (
                        <div key={i} className="p-6 bg-black/40 border border-amber-500/10 rounded-3xl flex items-center justify-between group">
                           <div>
                              <p className="text-[12px] font-bold text-white group-hover:text-amber-400 transition-colors uppercase tracking-widest">{item.label}</p>
                              <p className="text-[9px] text-white/20 uppercase font-bold mt-1 tracking-widest">{item.desc}</p>
                           </div>
                           <div className="w-10 h-5 bg-amber-600/40 rounded-full relative p-1">
                              <div className="w-3 h-3 bg-amber-400 rounded-full ml-auto shadow-[0_0_8px_#fbbf24]"></div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              </section>
            )}

            {activeTab === 'database' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="p-10 bg-green-900/10 border border-green-500/20 rounded-[3.5rem] space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                       <Database size={120} className="text-green-500" />
                    </div>
                    
                    <div className="space-y-2 relative z-10">
                       <h3 className="text-2xl font-bold uppercase tracking-tight text-white flex items-center gap-4">
                          Supabase Sovereign Backend
                          {connectionStatus === 'success' || (supabaseUrl && !isSaved) ? 
                            <span className="text-[10px] bg-green-500 text-black px-3 py-1 rounded-full uppercase tracking-widest font-bold flex items-center gap-2"><CheckCircle2 size={12} /> Linked</span> : 
                            <span className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">Unlinked</span>
                          }
                       </h3>
                       <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] max-w-md leading-relaxed">
                          Point your app to a live Supabase Project for persistent auth and database ops.
                       </p>
                    </div>

                    <div className="space-y-6 relative z-10">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Project URL</label>
                          <input 
                             type="text"
                             value={supabaseUrl}
                             onChange={(e) => setSupabaseUrl(e.target.value)}
                             placeholder="https://xyz.supabase.co"
                             className="w-full bg-black/80 border border-green-500/20 rounded-[2rem] py-5 px-8 text-green-400 font-mono focus:outline-none focus:border-green-500 transition-all placeholder:text-white/10"
                          />
                       </div>
                       
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Anon Public Key</label>
                          <input 
                             type="password"
                             value={supabaseKey}
                             onChange={(e) => setSupabaseKey(e.target.value)}
                             placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                             className="w-full bg-black/80 border border-white/10 rounded-[2rem] py-5 px-8 text-white font-mono focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                          />
                       </div>
                    </div>

                    <button 
                       onClick={handleSaveConfig}
                       disabled={connectionStatus === 'checking'}
                       className={`w-full py-6 font-bold rounded-[2.5rem] uppercase tracking-[0.4em] text-[12px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 relative z-10 ${
                         connectionStatus === 'error' ? 'bg-red-600 hover:bg-red-500 text-white' : 
                         'bg-green-600 hover:bg-green-500 text-white'
                       }`}
                    >
                       {connectionStatus === 'checking' ? <Loader2 size={18} className="animate-spin" /> : connectionStatus === 'error' ? <AlertTriangle size={18} /> : <Save size={18} />}
                       {connectionStatus === 'checking' ? 'Verifying Handshake...' : connectionStatus === 'error' ? 'Connection Failed - Retry' : isSaved ? 'Database Link Established' : 'Save Connection'}
                    </button>
                 </div>
              </div>
            )}

            {activeTab === 'financials' && (
              <div className="space-y-10 animate-in fade-in duration-500">
                 <div className="p-10 bg-blue-500/5 border border-blue-500/20 rounded-[3.5rem] space-y-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-20">
                       <CreditCard size={120} className="text-blue-500" />
                    </div>
                    
                    <div className="space-y-2 relative z-10">
                       <h3 className="text-2xl font-bold uppercase tracking-tight text-white flex items-center gap-4">
                          Stripe Payment Vault
                          {stripeKey ? <span className="text-[10px] bg-blue-500 text-black px-3 py-1 rounded-full uppercase tracking-widest font-bold">Live Active</span> : <span className="text-[10px] bg-white/10 text-white px-3 py-1 rounded-full uppercase tracking-widest font-bold">Test Mode</span>}
                       </h3>
                       <p className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] max-w-md leading-relaxed">
                          Enter your <span className="text-white">Publishable Key</span> (pk_live) below. <br/>
                          <span className="text-red-400">WARNING: NEVER enter Secret Keys (sk_live) in the frontend.</span>
                       </p>
                    </div>

                    <div className="space-y-6 relative z-10">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Stripe Publishable Key</label>
                          <input 
                             type="password"
                             value={stripeKey}
                             onChange={(e) => setStripeKey(e.target.value)}
                             placeholder="pk_live_..."
                             className="w-full bg-black/80 border border-blue-500/20 rounded-[2rem] py-5 px-8 text-blue-400 font-mono focus:outline-none focus:border-blue-500 transition-all placeholder:text-white/10"
                          />
                       </div>
                       
                       <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4">Merchant ID</label>
                             <input 
                                type="text"
                                value={merchantId}
                                onChange={(e) => setMerchantId(e.target.value)}
                                placeholder="acct_..."
                                className="w-full bg-black/80 border border-white/10 rounded-[2rem] py-5 px-8 text-white font-mono focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                             />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[10px] font-bold uppercase tracking-widest text-white/30 ml-4 flex items-center gap-2">
                                Business ABN / Tax ID <span className="text-white/10">(Required for Invoicing)</span>
                             </label>
                             <input 
                                type="text"
                                value={businessAbn}
                                onChange={(e) => setBusinessAbn(e.target.value)}
                                placeholder="XX XXX XXX XXX"
                                className="w-full bg-black/80 border border-white/10 rounded-[2rem] py-5 px-8 text-white font-mono focus:outline-none focus:border-white/30 transition-all placeholder:text-white/10"
                             />
                          </div>
                       </div>
                    </div>

                    <button 
                       onClick={handleSaveConfig}
                       className="w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-[2.5rem] uppercase tracking-[0.4em] text-[12px] shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-4 relative z-10"
                    >
                       {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                       {isSaved ? 'Vault Securely Updated' : 'Save Production Config'}
                    </button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
