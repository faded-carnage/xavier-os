
import React from 'react';
import { 
  LayoutDashboard, 
  Cloud, 
  ShieldCheck, 
  Image as ImageIcon, 
  Users, 
  ShoppingBag, 
  Target, 
  Cpu, 
  Settings,
  ChevronLeft,
  ChevronRight,
  MonitorPlay,
  Share2,
  ShieldAlert,
  Search,
  Radio,
  Network,
  Globe,
  Terminal,
  Activity,
  Zap,
  Rocket,
  Crown,
  Star,
  CreditCard,
  Server,
  Megaphone,
  Grid,
  DollarSign,
  Gem
} from 'lucide-react';
import { ModuleType, UserSession } from '../types';

interface SidebarProps {
  activeModule: ModuleType;
  setActiveModule: (module: ModuleType) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isLive?: boolean;
  user?: UserSession;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, setActiveModule, isOpen, setIsOpen, isLive = false, user }) => {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Ecosystem' },
    { id: 'revenue', icon: DollarSign, label: '30+ Revenue Streams' },
    { id: 'swarm', icon: Grid, label: '255 AI Agent Swarm' },
    { id: 'talent', icon: Gem, label: 'Talent Nexus' },
    { id: 'admin', icon: Crown, label: 'Admin Command' },
    { id: 'viral-blast', icon: Megaphone, label: 'Viral Blast' },
    { id: 'server-mgmt', icon: Server, label: 'Cloud Servers' },
    { id: 'mission', icon: Globe, label: 'Mission Control' },
    { id: 'publish', icon: Rocket, label: 'Publish Build' },
    { id: 'stripe-nexus', icon: CreditCard, label: 'Stripe Nexus' },
    { id: 'uplink', icon: Radio, label: 'Neural Uplink' },
    { id: 'matrix', icon: Network, label: 'Strategy Matrix' },
    { id: 'forge', icon: Terminal, label: 'Quantum Forge' },
    { id: 'storage', icon: Cloud, label: 'Cloud Storage' },
    { id: 'vpn', icon: ShieldCheck, label: 'Tor VPN' },
    { id: 'aistudio', icon: ImageIcon, label: 'AI Studio' },
    { id: 'social', icon: Users, label: 'Social Hub' },
    { id: 'store', icon: ShoppingBag, label: 'Dropship' },
    { id: 'marketing', icon: Target, label: 'Marketing' },
    { id: 'intel', icon: Search, label: 'AI Market Intel' },
    { id: 'adcreatives', icon: MonitorPlay, label: 'Ad Creatives' },
    { id: 'collab', icon: Share2, label: 'Team Collab' },
    { id: 'agent', icon: Cpu, label: 'AI Agent' },
    { id: 'cyber', icon: ShieldAlert, label: 'Cyber Defense' },
  ];

  return (
    <div className={`relative flex flex-col transition-all duration-300 border-r border-white/5 glass bg-black/40 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-black shrink-0 shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all bg-gradient-to-tr from-amber-400 to-yellow-600`}>
          <Crown size={20} className="animate-pulse" />
        </div>
        {isOpen && (
          <div className="flex flex-col">
            <h1 className="text-xl font-bold tracking-tighter text-white uppercase">XAVIER <span className="text-[10px] text-amber-500 align-top">Root</span></h1>
            <span className="text-[7px] font-bold text-amber-500 tracking-[0.4em] uppercase animate-pulse">Access: SOVEREIGN</span>
          </div>
        )}
      </div>

      <nav className="flex-1 px-3 space-y-1 mt-4 overflow-y-auto scrollbar-hide">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id as ModuleType)}
              className={`w-full flex items-center gap-4 px-3.5 py-3 rounded-2xl transition-all duration-300 group relative ${
                isActive 
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]' 
                : 'text-white/30 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={20} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {isOpen && <span className="font-bold text-[10px] truncate uppercase tracking-[0.2em]">{item.label}</span>}
              {isActive && isOpen && <div className="ml-auto w-1 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#fbbf24]"></div>}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-4">
        {isOpen && (
           <div className="px-4 py-3 bg-amber-500/5 rounded-2xl border border-amber-500/10 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-amber-500/40">Quota</span>
              <span className="text-[9px] font-mono text-amber-500">∞ UNLIMITED</span>
           </div>
        )}
        <button
          onClick={() => setActiveModule('settings')}
          className={`w-full flex items-center gap-4 px-3.5 py-3.5 rounded-2xl transition-all duration-200 text-white/30 hover:text-white hover:bg-white/5`}
        >
          <Settings size={20} />
          {isOpen && <span className="font-bold text-[10px] uppercase tracking-widest">Settings</span>}
        </button>
      </div>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-20 bg-amber-500 text-black p-1.5 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.4)] z-50 hover:scale-110 transition-transform border border-black"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </div>
  );
};

export default Sidebar;
