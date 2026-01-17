
import React, { useState, useEffect } from 'react';
import {
  ShoppingCart, Plus, Box, Truck, CreditCard, ShieldCheck,
  Loader2, MapPin, Package, RefreshCw, Activity, Search,
  ExternalLink, Sparkles, Warehouse, Wallet, Zap, TrendingUp, Globe,
  Trash2, Store
} from 'lucide-react';
import { findWholesaleProducts } from '../services/geminiService';
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';

const transactionData = [
  { id: 'TXN-0x921', item: 'Quantum Core V4', amount: '+$1,249.00', status: 'Settled', node: 'HK-04', type: 'Credit' },
  { id: 'TXN-0x920', item: 'Neural Link Mask', amount: '-$420.00', status: 'Transit', node: 'DE-01', type: 'Debit' },
  { id: 'TXN-0x919', item: 'Entropy Chipset', amount: '+$58.50', status: 'Settled', node: 'SG-09', type: 'Credit' },
  { id: 'TXN-0x918', item: 'Batch Allocation', amount: '-$2,400.00', status: 'Pending', node: 'US-01', type: 'Debit' },
  { id: 'TXN-0x917', item: 'Cipher Dongle x12', amount: '+$842.00', status: 'Settled', node: 'HK-04', type: 'Credit' },
];

export default function DropShipping() {
  const [activeTab, setActiveTab] = useState<'store' | 'wholesale' | 'merchant' | 'logistics'>('store');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [sourcingResults, setSourcingResults] = useState<{ text: string, sources: any[] } | null>(null);

  const [inventory, setInventory] = useState([
    { id: '1', name: 'X-Gen Quantum Processor', price: 299.99, margin: '45%', sales: 124, img: 'https://picsum.photos/seed/cpu/400', source: 'Shenzhen Node' },
    { id: '2', name: 'Neural Link Headset', price: 149.50, margin: '30%', sales: 88, img: 'https://picsum.photos/seed/headset/400', source: 'Frankfurt Hub' },
    { id: '3', name: 'Cipher-X Security Dongle', price: 45.00, margin: '60%', sales: 542, img: 'https://picsum.photos/seed/dongle/400', source: 'Amsterdam Exit' },
  ]);

  const warehouses = [
    { name: 'Shenzhen Hub (CN-01)', stock: '850k Units', latency: '48h', status: 'Optimal', fill: 82, coord: {x: 75, y: 30} },
    { name: 'Frankfurt Hub (DE-04)', stock: '220k Units', latency: '24h', status: 'Optimal', fill: 94, coord: {x: 45, y: 25} },
    { name: 'Singapore Port (SG-09)', stock: '1.2M Units', latency: '36h', status: 'Optimal', fill: 75, coord: {x: 70, y: 60} },
  ];

  const handleProductSource = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const results = await findWholesaleProducts(searchQuery);
      setSourcingResults(results);
    } catch (err) {
      console.error(err);
      if (err instanceof Error && err.message.includes("429")) {
        alert("API rate limit exceeded. Please wait a moment before trying again or check your plan and billing details.");
      } else {
        alert("An error occurred while sourcing products. Please check the console for details.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const injectProduct = (source: any) => {
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      name: source.title,
      price: Math.floor(Math.random() * 500) + 99.99,
      margin: `${Math.floor(Math.random() * 30) + 20}%`,
      sales: 0,
      img: `https://picsum.photos/seed/${encodeURIComponent(source.title)}/400`,
      source: 'AI Oracle Sourced'
    };
    setInventory([newProduct, ...inventory]);
    setActiveTab('store');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Warehouse className="text-cyan-400 animate-pulse" size={40} />
            Global Logistics Matrix
          </h1>
          <p className="text-white/30 text-[11px] uppercase tracking-[0.6em] font-bold italic">Autonomous Supply Chain & Multi-Node Fulfillment V4.2</p>
        </div>
        <div className="flex gap-6">
          <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl shadow-inner">
            {[
              { id: 'store', label: 'Store Matrix' },
              { id: 'wholesale', label: 'Wholesale Oracle' },
              { id: 'merchant', label: 'Merchant Ledger' },
              { id: 'logistics', label: 'Fulfillment Orbit' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-cyan-600 text-white shadow-2xl scale-105' : 'text-white/40 hover:text-white'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="p-4 bg-white/5 border border-white/10 rounded-2xl text-white/40 hover:text-white transition-all relative group shadow-2xl">
            <ShoppingCart size={28} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 w-7 h-7 bg-cyan-500 text-black text-[11px] font-bold rounded-full flex items-center justify-center border-2 border-black animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.6)]">{inventory.length}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-9 space-y-10">
          {activeTab === 'store' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 animate-in fade-in duration-1000">
              <div
                className="glass border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-16 rounded-[4.5rem] hover:border-cyan-500/50 transition-all cursor-pointer group bg-black/40 min-h-[500px] shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"
                onClick={() => setActiveTab('wholesale')}
              >
                <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform border border-white/10 shadow-2xl relative">
                  <Plus className="text-white/10 group-hover:text-cyan-400" size={56} />
                </div>
                <div className="text-center space-y-4">
                   <p className="font-bold text-[16px] uppercase tracking-[1em] text-white/20 group-hover:text-white transition-colors">Import_Asset</p>
                   <p className="text-[10px] text-white/10 uppercase tracking-[0.5em] font-bold italic">Query Wholesale Oracle...</p>
                </div>
              </div>
              {inventory.map((p) => (
                <div key={p.id} className="glass rounded-[5rem] border border-white/10 overflow-hidden hover:translate-y-[-20px] transition-all group bg-black shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    <div className="absolute top-10 right-10 bg-black/90 backdrop-blur-3xl px-6 py-2 rounded-full text-[9px] font-bold text-cyan-400 border border-white/10 uppercase tracking-[0.4em]">ACTIVE_SKU</div>
                  </div>
                  <div className="p-12 space-y-12">
                    <div className="space-y-4">
                      <h3 className="font-bold text-2xl group-hover:text-cyan-400 transition-colors uppercase tracking-tight truncate">{p.name}</h3>
                      <p className="text-5xl font-bold text-white tracking-tighter drop-shadow-2xl">${p.price}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1 italic">Arbitrage</p>
                        <p className="text-2xl font-bold text-green-500 font-mono tracking-tighter">{p.margin}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/20 uppercase font-bold tracking-widest mb-1 italic">Throughput</p>
                        <p className="text-2xl font-bold text-white font-mono tracking-tighter">{p.sales}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                       <button className="flex-1 py-6 bg-white/5 border border-white/10 rounded-[2.5rem] text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-black hover:bg-cyan-500 transition-all">
                          Edit_Node
                       </button>
                       <button onClick={() => setInventory(inventory.filter(i => i.id !== p.id))} className="p-6 bg-red-500/10 border border-red-500/20 text-red-500 rounded-[2.5rem] hover:bg-red-500 hover:text-white transition-all">
                          <Trash2 size={24} />
                       </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'wholesale' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
              <div className="glass p-20 rounded-[6rem] border border-white/10 relative overflow-hidden bg-black/80 shadow-[0_0_200px_rgba(0,0,0,0.8)] flex flex-col min-h-[800px]">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 blur-[250px] pointer-events-none animate-pulse"></div>
                <div className="space-y-4 mb-20 relative z-10">
                  <h3 className="font-bold text-6xl flex items-center gap-10 tracking-tighter uppercase drop-shadow-2xl">
                    <Sparkles className="text-cyan-400 animate-pulse" size={64} />
                    Wholesale Oracle
                  </h3>
                  <p className="text-[14px] text-white/20 uppercase tracking-[1.2em] font-bold ml-4">Grounded Real-World Logistics Source Matrix</p>
                </div>

                <div className="flex gap-10 relative z-10">
                  <div className="flex-1 relative group/input">
                    <Search className="absolute left-10 top-1/2 -translate-y-1/2 text-white/10 group-focus-within/input:text-cyan-400 transition-colors" size={42} />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleProductSource()}
                      placeholder="Search global warehouses (e.g. 'Consumer electronics wholesalers USA')..."
                      className="w-full bg-black/90 border border-white/10 rounded-[4rem] py-16 pl-32 pr-12 text-3xl focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition-all placeholder:text-white/5 font-medium shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
                    />
                  </div>
                  <button
                    onClick={handleProductSource}
                    disabled={isSearching || !searchQuery}
                    className="px-28 bg-gradient-to-tr from-cyan-700 to-cyan-400 text-black font-bold rounded-[4rem] hover:scale-105 transition-all disabled:opacity-30 flex items-center gap-10 shadow-[0_0_100px_rgba(6,182,212,0.4)] group/btn active:scale-95 border-2 border-white/20"
                  >
                    {isSearching ? <Loader2 className="animate-spin" size={42} /> : <Zap size={42} className="group-hover/btn:animate-bounce" />}
                    <span className="uppercase tracking-[0.8em] text-xl">Search</span>
                  </button>
                </div>

                <div className="flex-1 mt-24 relative overflow-y-auto scrollbar-hide pr-4">
                  {sourcingResults ? (
                    <div className="space-y-20 animate-in fade-in zoom-in-95 duration-1000 relative z-10 pb-20">
                      <div className="p-20 bg-white/5 border border-white/10 rounded-[6rem] prose prose-invert max-w-none text-white/80 leading-relaxed text-3xl whitespace-pre-wrap font-serif border-l-[16px] border-cyan-500 shadow-2xl italic backdrop-blur-3xl">
                        {sourcingResults.text}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {sourcingResults.sources.map((source, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between p-14 bg-white/5 border border-white/10 rounded-[4rem] hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all group/source shadow-2xl relative overflow-hidden"
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover/source:opacity-100 transition-opacity"></div>
                            <div className="min-w-0 flex items-center gap-10 relative z-10">
                              <div className="w-24 h-24 bg-black/90 rounded-[2.5rem] flex items-center justify-center border border-white/10 group-hover/source:border-cyan-500/50 transition-all">
                                 <Package size={42} className="text-white/10 group-hover/source:text-cyan-400" />
                              </div>
                              <div className="min-w-0 space-y-4">
                                <p className="text-2xl font-bold truncate group-hover/source:text-white transition-colors uppercase tracking-[0.2em]">{source.title}</p>
                                <button
                                  onClick={() => injectProduct(source)}
                                  className="flex items-center gap-4 px-8 py-3 bg-cyan-500 text-black font-bold rounded-full text-[11px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl"
                                >
                                  <Store size={14} /> Inject SKU
                                </button>
                              </div>
                            </div>
                            <a href={source.uri} target="_blank" rel="noreferrer">
                              <ExternalLink size={32} className="text-white/5 group-hover/source:text-cyan-400 transition-colors shrink-0 ml-10 relative z-10" />
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : !isSearching && (
                    <div className="h-full flex flex-col items-center justify-center text-center py-40 space-y-24 opacity-10 group">
                      <div className="relative">
                        <Globe size={160} className="animate-spin-slow group-hover:text-cyan-400 transition-colors duration-2000" />
                        <div className="absolute inset-0 bg-cyan-500 blur-[200px] opacity-20 animate-pulse"></div>
                      </div>
                      <p className="text-4xl font-bold uppercase tracking-[1.5em] text-white/40">Oracle_Standby</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* other tabs omitted for brevity; original structure preserved */}
        </main>
      </div>
    </div>
  );
}
