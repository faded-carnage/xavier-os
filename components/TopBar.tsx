
import React from 'react';
import { Bell, Search, User, Lock, Sparkles, Wifi, Crown } from 'lucide-react';

interface TopBarProps {
  activeModule: string;
  toggleSidebar: () => void;
  userAura?: string;
  isLive?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ activeModule, userAura = '#06b6d4', isLive = false }) => {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-white/10 glass sticky top-0 z-40 bg-black/20">
      <div className="flex items-center gap-4">
        <h2 className="text-sm uppercase tracking-[0.3em] text-white/80 font-bold transition-colors" style={{ color: userAura }}>{activeModule}</h2>
        <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-2 text-[10px] font-bold tracking-widest text-white/40 shadow-inner">
          <Lock size={12} className={isLive ? 'text-cyan-400 animate-pulse' : 'text-green-500'} />
          {isLive ? 'SYSTEM BROADCAST LIVE' : 'MILITARY-GRADE E2E ACTIVE'}
        </div>
        {isLive && (
          <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[9px] font-bold text-cyan-400 uppercase tracking-widest animate-pulse">
            <Wifi size={10} /> Live Relay HK-04
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden lg:block group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-cyan-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search ecosystem..." 
            className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all w-64 shadow-inner"
          />
        </div>
        
        <button className="text-white/60 hover:text-white relative transition-colors group">
          <Bell size={20} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_5px_#ef4444]"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold flex items-center gap-2 justify-end">
              <Crown size={12} className="text-yellow-500" />
              James Hapurona
            </p>
            <div className="flex items-center gap-2 justify-end">
               <span className="text-[10px] uppercase font-bold tracking-widest transition-colors" style={{ color: userAura }}>Aura: Active</span>
               <Sparkles size={10} style={{ color: userAura }} className="animate-pulse" />
            </div>
          </div>
          <div className="w-10 h-10 rounded-full p-0.5 transition-all duration-1000 shadow-xl" style={{ backgroundColor: userAura, boxShadow: `0 0 20px ${userAura}44` }}>
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border border-black/50">
              <img src="https://picsum.photos/seed/admin/150" alt="Admin" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
