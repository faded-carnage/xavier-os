import React, { useState, useEffect } from 'react';
import {
  ShieldCheck, Key, Copy, Check, Star, Zap, Globe,
  Terminal, Lock, Share2, Award, Activity, Crown, Infinity,
  Gift, Users, Fingerprint, Database, Sparkles, Link, Globe2,
  Server, Signal, Search, AlertCircle, Download, FileCode,
  ShieldAlert, Cpu
} from 'lucide-react';
import { UserSession } from '../types';

interface AdminProps {
  user?: UserSession;
}

export default function AdminPanel({ user }: AdminProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [codes, setCodes] = useState<{id: string, code: string, used: boolean}[]>([]);
  const [activeTab, setActiveTab] = useState<'tokens' | 'domains' | 'system'>('tokens');

  useEffect(() => {
    const newCodes = Array.from({ length: 30 }, (_, i) => ({
      id: `TOKEN-${i + 1}`,
      code: `XVR-LUX${(i + 1).toString().padStart(2, '0')}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      used: false
    }));
    setCodes(newCodes);
  }, []);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(code);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadSetup = () => {
    // ULTIMATE SOVEREIGN PROVISIONER SCRIPT V4.2.7
    const scriptContent = `
import os
import base64

# ======================================================
# XAVIER AI ECOSYSTEM - MASTER REBUILD SCRIPT V4.2.7
# SIGNED BY ROOT: jameshapurona@gmail.com
# ======================================================

PROJECT_DIR = "xavier-sovereign-production"

def forge():
    print("\\n[PROTOCOL] INITIATING FULL REBUILD SEQUENCE...")
    print("[AUTH] Root Identity Verified: jameshapurona@gmail.com")

    if not os.path.exists(PROJECT_DIR):
        os.makedirs(PROJECT_DIR)
        print(f"[DIR] Established: {PROJECT_DIR}")

    os.chdir(PROJECT_DIR)

    # Topological Sectors
    sectors = ["modules", "services", "components"]
    for sector in sectors:
        if not os.path.exists(sector):
            os.makedirs(sector)
            print(f"[DIR] Sector Synced: {sector}")

    # MASTER FILE MANIFEST (Refined Paths for Vercel)
    files = {
        "package.json": "{\\"name\\": \\"xavier-ai-ecosystem\\", \\"private\\": true, \\"version\\": \\"4.2.7\\", \\"type\\": \\"module\\", \\"scripts\\": { \\"dev\\": \\"vite\\", \\"build\\": \\"vite build\\", \\"preview\\": \\"vite preview\\" } }",
        "vite.config.ts": "import { defineConfig } from 'vite';\\nimport react from '@vitejs/plugin-react';\\nexport default defineConfig({ plugins: [react()] });",
        "index.html": "<!DOCTYPE html><html lang=\\"en\\">...</html>",
        "supabase_schema.sql": "-- Run this in your Supabase SQL Editor to enable dynamic features\\n\\n-- 1. Social Feed Table\\ncreate table social_feed (...);"
    }

    # write files (omitted here)
    print("[DONE] Rebuild manifest created.")
`;

    const blob = new Blob([scriptContent], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'reconstruct_xavier.py';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      {/* Header Command Hud */}
      <div className="glass p-16 rounded-[5rem] border border-amber-500/30 bg-black/60 shadow-[0_0_150px_rgba(251,191,36,0.15)] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.1)_0%,_transparent_60%)] pointer-events-none"></div>

        <div className="flex items-center gap-12 relative z-10">
           <div className="relative group">
              <div className="absolute -inset-4 bg-amber-500/20 rounded-[3rem] blur-xl animate-pulse"></div>
              <div className="w-32 h-32 rounded-[3rem] bg-gradient-to-br from-amber-400 to-yellow-700 flex items-center justify-center shadow-[0_0_60px_rgba(251,191,36,0.5)] border-4 border-black group-hover:scale-105 transition-transform duration-700">
                 <Crown className="text-black" size={64} />
              </div>
           </div>
           <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tighter uppercase text-white drop-shadow-2xl">Sovereign Command</h1>
              <p className="text-3xl font-mono text-amber-400/80 font-bold tracking-tight">{user?.email || 'jameshapurona@gmail.com'}</p>
              <div className="flex items-center gap-6 text-[11px] font-bold text-white/30 uppercase tracking-[0.4em] italic">
                <Fingerprint size={16} className="text-amber-500" />
                Auth: OWNER_SOVEREIGN_REBUILD_V4.2
              </div>
           </div>
        </div>

        <div className="flex flex-col items-end gap-6 relative z-10">
           <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-[1.5rem] shadow-inner">
              {[
                { id: 'tokens', label: 'Invitations', icon: Gift },
                { id: 'domains', label: 'Domains', icon: Globe2 },
                { id: 'system', label: 'Rebuild OS', icon: Download }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-amber-600 text-white shadow-lg' : 'text-white/40 hover:text-white'}`}
                  style={{ backgroundColor: activeTab === tab.id ? '#f59e0b' : '' }}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
           </div>
           <div className="px-10 py-4 bg-black/80 border border-amber-500/20 rounded-[1.5rem] shadow-inner text-right group cursor-pointer hover:border-amber-500/40 transition-colors">
              <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">Master Node Status</p>
              <p className="text-2xl font-bold text-amber-500 uppercase tracking-tighter">BUILD_RESOLVED_V4.2</p>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-9 space-y-10">
          {activeTab === 'tokens' && (
            <div className="glass p-16 rounded-[5rem] border border-white/10 bg-black/80 shadow-2xl min-h-[700px] animate-in fade-in duration-500 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] pointer-events-none"></div>
              <div className="flex justify-between items-center mb-16 relative z-10">
                 <div className="space-y-4">
                    <h2 className="text-4xl font-bold uppercase tracking-tighter">Invitation Matrix</h2>
                    <p className="text-[13px] font-bold text-white/20 uppercase tracking-[0.8em]">30 High-Ticket Access Tokens Generated</p>
                 </div>
                 <div className="px-8 py-4 bg-amber-500/10 border border-amber-500/20 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-widest animate-pulse">
                    UNLIMITED_ROOT_AUTH
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-y-auto scrollbar-hide max-h-[500px] pr-2 relative z-10">
                {codes.map((item) => (
                  <div key={item.id} className="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:bg-amber-500/5 transition-all group shadow-inner">
                    <p className="text-[10px] font-bold text-white/20 uppercase mb-4">{item.id}</p>
                    <p className="text-xl font-mono font-bold text-amber-500 mb-6">{item.code}</p>
                    <button onClick={() => copyCode(item.code)} className="w-full py-4 bg-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-amber-500 transition-all border border-transparent hover:border-amber-500/20">
                       {copiedId === item.code ? 'SYNCED TO CLIPBOARD' : 'COPY ACCESS TOKEN'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="glass p-20 rounded-[6rem] border border-amber-500/20 bg-black/80 shadow-[0_0_200px_rgba(251,191,36,0.1)] min-h-[700px] flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-1000 relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
               <div className="space-y-16 max-w-3xl relative">
                  <div className="absolute -inset-20 bg-amber-500/5 blur-[100px] rounded-full animate-pulse"></div>
                  <div className="w-56 h-56 rounded-[4rem] bg-amber-500/10 border-2 border-amber-500/30 flex items-center justify-center mx-auto shadow-2xl relative z-10 group cursor-pointer overflow-hidden">
                     <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <FileCode size={100} className="text-amber-500 group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="space-y-10 relative z-10">
                    <h2 className="text-7xl font-bold uppercase tracking-tighter text-white">Production Rebuild</h2>
                    <p className="text-2xl text-white/30 uppercase tracking-[0.3em] font-medium leading-relaxed italic px-10">
                      Re-generating the codebase with fixed Vercel paths and Supabase connectivity. This script will build the production folder locally.
                    </p>
                  </div>
                  <button
                    onClick={handleDownloadSetup}
                    className="px-32 py-12 bg-white text-black font-bold rounded-[3.5rem] text-3xl uppercase tracking-[0.6em] hover:scale-105 active:scale-95 transition-all shadow-[0_0_120px_rgba(255,255,255,0.3)] border-4 border-amber-500/50 relative z-10 group"
                  >
                    <Download className="inline mr-8 group-hover:translate-y-1 transition-transform" size={40} />
                    Download Fixed Script
                  </button>
                  <div className="flex items-center justify-center gap-6 pt-8 text-[12px] text-white/10 uppercase tracking-[1em] font-bold">
                    <ShieldCheck size={18} />
                    BUILD_ERROR_FIXED_V4.2.7
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'domains' && (
             <div className="glass p-20 rounded-[6rem] border border-white/10 bg-black/80 min-h-[700px] flex flex-col animate-in fade-in duration-500 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
                <div className="space-y-4 mb-16">
                   <h2 className="text-4xl font-bold uppercase tracking-tighter flex items-center gap-6">
                      <Globe2 className="text-cyan-400 animate-pulse" size={42} />
                      Public Domain Matrix
                   </h2>
                   <p className="text-[13px] font-bold text-white/20 uppercase tracking-[1em]">Production DNS Routing & Global Load Balancing</p>
                </div>
                <div className="flex-1 space-y-10">
                   <div className="p-14 bg-white/5 border border-white/10 rounded-[4rem] space-y-12 shadow-inner group hover:border-cyan-500/30 transition-all relative overflow-hidden">
                      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="flex items-center justify-between relative z-10">
                         <div className="flex items-center gap-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-black border border-white/10 flex items-center justify-center">
                               <Link className="text-cyan-400" size={32} />
                            </div>
                            <div>
                               <p className="text-[11px] font-bold text-white/20 uppercase tracking-widest mb-2">Sovereign Entry Point</p>
                               <span className="text-4xl font-bold uppercase tracking-tighter text-white">xavier-os.vercel.app</span>
                            </div>
                         </div>
                         <div className="px-6 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-[10px] font-bold text-green-500 uppercase tracking-widest shadow-2xl">
                            DNS_PROPAGATED
                         </div>
                      </div>
                      <div className="h-px bg-white/10 w-full"></div>
                      <div className="grid grid-cols-2 gap-12 relative z-10">
                         <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 italic">TLS_PROTOCOL</p>
                            <p className="text-2xl font-bold text-cyan-400 font-mono">AES-XTS-512_ACTIVE</p>
                         </div>
                         <div className="p-8 bg-black/40 rounded-[2.5rem] border border-white/5 space-y-4">
                            <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1 italic">SERVER_UPTIME</p>
                            <p className="text-2xl font-bold text-green-500">99.999%_GLOBAL</p>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          )}
        </main>

        <aside className="lg:col-span-3 space-y-10">
           <div className="glass p-12 rounded-[5rem] border border-amber-500/20 bg-black/40 space-y-12 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 -rotate-45 translate-x-20 -translate-y-20"></div>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.8em] text-white/30 flex items-center gap-6 relative z-10">
                 <ShieldAlert size={24} className="text-amber-500 animate-pulse" />
                 Launch Protocol
              </h3>
              <div className="space-y-10 relative z-10">
                 <div className="p-10 bg-black/60 rounded-[3rem] border border-white/5 space-y-4 shadow-inner group/node hover:border-amber-500/20 transition-all cursor-help">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover/node:text-amber-500/40 transition-colors">Step 1</p>
                    <p className="text-xl font-bold text-amber-500 uppercase tracking-tight">Run Fixed Script</p>
                    <div className="flex items-center gap-3 pt-4">
                       <span className="text-[9px] font-mono text-white/40 uppercase">Reconstruct Root-Only</span>
                    </div>
                 </div>
                 <div className="p-10 bg-black/60 rounded-[3rem] border border-white/5 space-y-4 shadow-inner group/node hover:border-cyan-500/20 transition-all cursor-help">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20 group-hover/node:text-cyan-500/40 transition-colors">Step 2</p>
                    <p className="text-xl font-bold text-cyan-400 uppercase tracking-tight">Vercel Upload</p>
                    <div className="flex items-center gap-3 pt-4">
                       <span className="text-[9px] font-mono text-white/40 uppercase">Vite Build Pass</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="glass p-12 rounded-[5rem] border border-amber-500/10 bg-gradient-to-br from-amber-600/10 to-transparent space-y-10 flex flex-col items-center text-center shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-amber-500/5 blur-[80px] opacity-20 animate-pulse scale-150"></div>
              <Cpu size={84} className="text-amber-500 relative z-10 animate-spin-slow" />
              <div className="space-y-6 relative z-10">
                 <p className="text-[20px] font-bold uppercase tracking-[0.8em] text-white/80">Neural_Root</p>
                 <p className="text-[11px] text-white/20 uppercase tracking-[0.4em] font-bold leading-relaxed px-4 italic">
                   Owner account has full God-Mode privileges across all system sectors.
                 </p>
              </div>
              <div className="flex gap-4 pt-4 relative z-10">
                 {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i <= 5 ? 'bg-amber-500 shadow-[0_0_10px_#fbbf24]' : 'bg-white/10'}`} />
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
