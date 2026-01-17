
import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import Sidebar from './components/Sidebar';
import GlobalStatusHUD from './components/GlobalStatusHUD';
import Dashboard from './modules/Dashboard';
import CloudStorage from './modules/CloudStorage';
import VPNService from './modules/VPNService';
import AIStudio from './modules/AIStudio';
import SocialHub from './modules/SocialHub';
import DropShipping from './modules/DropShipping';
import MarketingSuite from './modules/MarketingSuite';
import AIAgentConsole from './modules/AIAgentConsole';
import AdCreatives from './modules/AdCreatives';
import TeamCollab from './modules/TeamCollab';
import CyberDefense from './modules/CyberDefense';
import MarketIntel from './modules/MarketIntel';
import NeuralUplink from './modules/NeuralUplink';
import StrategyMatrix from './modules/StrategyMatrix';
import MissionControl from './modules/MissionControl';
import CodeForge from './modules/CodeForge';
import Settings from './modules/Settings';
import LaunchProtocol from './modules/LaunchProtocol';
import Publish from './modules/Publish';
import AdminPanel from './modules/AdminPanel';
import StripeNexus from './modules/StripeNexus';
import ServerMgmt from './modules/ServerMgmt';
import ViralBlast from './modules/ViralBlast';
import AISwarm from './modules/AISwarm';
import RevenueStreams from './modules/RevenueStreams';
import TalentNexus from './modules/TalentNexus';
import { ModuleType, UserSession } from './types';
import { Power, Terminal, Shield, Zap, Maximize2, Minus, X, Cpu, Activity, Globe, Package, Crown, Star, CreditCard, Server, ExternalLink, Megaphone, Camera, Building2 } from 'lucide-react';

const OWNER_EMAIL = 'jameshapurona@gmail.com';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [userAura, setUserAura] = useState('#fbbf24'); // Gold aura for the owner
  const [isSystemLive, setIsSystemLive] = useState(false);
  const [bootSequence, setBootSequence] = useState(true);
  const [screenshotDataUrl, setScreenshotDataUrl] = useState<string | null>(null);
  const [businessAbn, setBusinessAbn] = useState<string | null>(null);

  const currentUser: UserSession = {
    email: OWNER_EMAIL,
    role: 'OWNER',
    isUnlimited: true,
    signature: '0xXAVIER_ROOT_SOVEREIGN'
  };

  useEffect(() => {
    // Check for ABN whenever module changes (e.g. coming back from settings)
    const storedAbn = localStorage.getItem('XAVIER_ABN');
    setBusinessAbn(storedAbn);
  }, [activeModule]);

  const handleScreenshot = () => {
    const elementToCapture = document.querySelector<HTMLElement>('#root');
    const buttonsToIgnore = document.querySelectorAll<HTMLElement>('#screenshot-button, #header-controls');

    if (elementToCapture) {
        buttonsToIgnore.forEach(btn => btn.style.opacity = '0');
        // Temporarily hide scrollbars to prevent them from appearing in the capture
        document.body.style.overflow = 'hidden';

        html2canvas(elementToCapture, {
            backgroundColor: '#010101',
            useCORS: true,
            scale: window.devicePixelRatio,
            ignoreElements: (element) => element.id === 'screenshot-modal'
        }).then(canvas => {
            setScreenshotDataUrl(canvas.toDataURL('image/png'));
        }).catch(err => {
            console.error("Sovereign Capture failed:", err);
            alert("Could not secure the frame. The neural renderer encountered an anomaly.");
        }).finally(() => {
            buttonsToIgnore.forEach(btn => btn.style.opacity = '1');
            document.body.style.overflow = '';
        });
    }
  };


  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard': return <Dashboard isLive={isSystemLive} userAura={userAura} user={currentUser} />;
      case 'storage': return <CloudStorage user={currentUser} />;
      case 'vpn': return <VPNService />;
      case 'aistudio': return <AIStudio />;
      case 'social': return <SocialHub userAura={userAura} setUserAura={setUserAura} />;
      case 'store': return <DropShipping />;
      case 'marketing': return <MarketingSuite />;
      case 'agent': return <AIAgentConsole />;
      case 'adcreatives': return <AdCreatives />;
      case 'collab': return <TeamCollab />;
      case 'cyber': return <CyberDefense />;
      case 'intel': return <MarketIntel />;
      case 'uplink': return <NeuralUplink />;
      case 'matrix': return <StrategyMatrix />;
      case 'mission': return <MissionControl onLaunch={() => setIsSystemLive(true)} isLive={isSystemLive} />;
      case 'launch': return <LaunchProtocol onComplete={() => { setBootSequence(false); setIsSystemLive(true); }} />;
      case 'publish': return <Publish onPublishComplete={() => setIsSystemLive(true)} isLive={isSystemLive} />;
      case 'forge': return <CodeForge />;
      case 'settings': return <Settings user={currentUser} />;
      case 'admin': return <AdminPanel user={currentUser} />;
      case 'stripe-nexus': return <StripeNexus navigateToSettings={() => setActiveModule('settings')} />;
      case 'server-mgmt': return <ServerMgmt />;
      case 'viral-blast': return <ViralBlast />;
      case 'swarm': return <AISwarm />;
      case 'revenue': return <RevenueStreams navigateToSettings={() => setActiveModule('settings')} />;
      case 'talent': return <TalentNexus />;
      default: return <Dashboard isLive={isSystemLive} userAura={userAura} user={currentUser} />;
    }
  };

  if (bootSequence && activeModule === 'dashboard' && !isSystemLive) {
     return <LaunchProtocol onComplete={() => { setBootSequence(false); setIsSystemLive(true); }} />;
  }

  return (
    <div className="h-screen w-full bg-[#010101] text-white overflow-hidden font-sans selection:bg-amber-500 selection:text-black flex flex-col relative">
      <div className="absolute inset-0 pointer-events-none z-[100] opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
      
      <header className="h-10 border-b border-white/10 bg-black/80 backdrop-blur-xl flex items-center justify-between px-6 z-50 shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
             <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_#f59e0b] ${isSystemLive ? 'bg-green-500 shadow-green-500/50' : 'bg-amber-500'}`}></div>
             <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Xavier_OS_Electronic_V4</span>
          </div>
          <div className="h-4 w-px bg-white/10"></div>
          <div className="flex items-center gap-3 px-4 py-1 bg-amber-500/10 rounded-full border border-amber-500/20 text-[8px] font-bold text-amber-500 uppercase tracking-widest animate-pulse">
            <Star size={10} /> {isSystemLive ? 'Production_Sovereign_Live' : 'Unlimited_Root_Access'}
          </div>
        </div>
        <div className="flex items-center gap-6">
           {businessAbn ? (
             <div className="flex items-center gap-3 text-[9px] font-mono text-green-500/80 bg-green-500/5 px-3 py-1 rounded border border-green-500/10">
               <Building2 size={10} className="text-green-500" />
               <span>ABN: {businessAbn} (Verified)</span>
             </div>
           ) : (
             <button 
                onClick={() => setActiveModule('settings')}
                className="flex items-center gap-3 text-[9px] font-mono text-white/40 hover:text-white hover:bg-white/10 bg-white/5 px-3 py-1 rounded border border-white/10 transition-all group"
             >
                <Building2 size={10} className="group-hover:text-amber-400" />
                <span>Register Business Entity</span>
             </button>
           )}
           <div className="h-4 w-px bg-white/10"></div>
           <div className="flex items-center gap-3 text-[9px] font-mono text-amber-400/60">
             <Crown size={12} className="text-amber-500" />
             <span>Owner: {currentUser.email}</span>
           </div>
           <div id="header-controls" className="flex items-center gap-2 ml-4">
              <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-white/40"><Minus size={14} /></button>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded transition-colors text-white/40"><Maximize2 size={14} /></button>
              <button className="w-6 h-6 flex items-center justify-center hover:bg-red-500/20 rounded transition-colors text-red-500/60"><X size={14} /></button>
           </div>
        </div>
      </header>

      <GlobalStatusHUD />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activeModule={activeModule} 
          setActiveModule={setActiveModule} 
          isOpen={true} 
          setIsOpen={() => {}} 
          isLive={isSystemLive}
          user={currentUser}
        />
        
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[radial-gradient(circle_at_center,_#080808_0%,_#000_100%)]">
          {/* Public Link Banner */}
          {isSystemLive && (
            <div className="bg-green-500/10 border-b border-green-500/20 py-2 px-10 flex items-center justify-between animate-in slide-in-from-top duration-700">
               <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-green-500">
                  <Globe size={14} className="animate-spin-slow" /> System Broadcasting Live to Public Node Cluster
               </div>
               <div className="flex items-center gap-4">
                  <span className="text-[9px] font-mono text-white/20 truncate max-w-[300px]">https://xavia-ai-ecosystem-3o5k.vercel.app/</span>
                  <button className="text-[9px] font-bold uppercase tracking-widest text-white/40 hover:text-white flex items-center gap-2">
                     <ExternalLink size={10} /> Open Portal
                  </button>
               </div>
            </div>
          )}

          <div className="h-14 border-b border-white/5 bg-white/[0.02] flex items-center justify-between px-10 shrink-0">
             <div className="flex items-center gap-4">
                <span className="text-[11px] font-bold uppercase tracking-[0.8em] text-white/20">Root_Terminal //</span>
                <span className="text-sm font-bold uppercase tracking-widest text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.4)]">{(activeModule as string).replace('-', ' ')}</span>
             </div>
             <div className="flex items-center gap-6">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[9px] font-bold uppercase tracking-widest ${isSystemLive ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-amber-500/5 border-amber-500/10 text-amber-500/60'}`}>
                   <Zap size={10} /> Sync: {isSystemLive ? 'GLOBAL_PRODUCTION' : 'Sovereign_Link'}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    id="screenshot-button"
                    onClick={handleScreenshot}
                    title="Sovereign Capture"
                    aria-label="Sovereign Capture"
                    className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                     <Camera size={16} />
                  </button>
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/20 hover:text-white transition-colors cursor-pointer">
                     <Terminal size={16} />
                  </div>
                </div>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-10 relative custom-scrollbar">
            {renderModule()}
          </div>
        </main>
      </div>

      <footer className="h-20 border-t border-white/10 bg-black/95 backdrop-blur-2xl flex items-center justify-center gap-4 px-10 z-50 shrink-0">
         <div className="flex items-center gap-2 p-2 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,1)] relative">
            <div className="absolute -inset-0.5 bg-gradient-to-t from-amber-500/20 to-transparent rounded-2xl opacity-20"></div>
            {['dashboard', 'vpn', 'agent', 'revenue', 'swarm', 'stripe-nexus', 'server-mgmt'].map((m) => (
              <button 
                key={m}
                onClick={() => setActiveModule(m as any)}
                className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 relative group ${activeModule === m ? 'bg-amber-500 text-black shadow-[0_0_25px_#fbbf24]' : 'text-white/40 hover:bg-white/5 hover:text-white'}`}
              >
                <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100 whitespace-nowrap pointer-events-none shadow-2xl">
                  {m.toUpperCase().replace('-', '_')}
                </div>
                {m === 'stripe-nexus' ? <CreditCard size={24} /> : m === 'server-mgmt' ? <Server size={24} /> : m === 'viral-blast' ? <Megaphone size={24} /> : <Zap size={24} className={activeModule === m ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />}
                {activeModule === m && (
                   <div className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-400 rounded-full shadow-[0_0_8px_#fbbf24]"></div>
                )}
              </button>
            ))}
         </div>
         
         <div className="absolute right-10 flex items-center gap-8">
            <div className="flex flex-col items-end gap-1">
               <span className="text-[9px] font-bold text-amber-500/40 uppercase tracking-widest">OWNER_STABILITY</span>
               <div className="flex gap-1.5 h-3 items-center">
                  {[1,2,3,4,5].map(i => <div key={i} className={`w-1 h-full rounded-full transition-all ${i <= 5 ? 'bg-amber-500 animate-pulse' : 'bg-white/10'}`}></div>)}
               </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <button className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-[0_0_30px_rgba(239,68,68,0.1)]">
               <Power size={24} />
            </button>
         </div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.05);
          border-radius: 20px;
          border: 2px solid rgba(0,0,0,0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(251,191,36,0.3);
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg) }
          to { transform: rotate(360deg) }
        }
      `}</style>
    </div>
  );
};

export default App;
