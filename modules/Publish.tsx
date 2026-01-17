
import React, { useState } from 'react';
import {
  Rocket, ShieldCheck, Cpu, Globe, Zap, Loader2, CheckCircle2,
  Copy, Check, Link, Code2, Cloud, Key
} from 'lucide-react';

interface PublishProps {
  onPublishComplete?: () => void;
  isLive?: boolean;
}

export default function Publish({ onPublishComplete, isLive }: PublishProps) {
  const [stage, setStage] = useState<'IDLE' | 'SIGNING' | 'TUNNELING' | 'BINDING' | 'PUBLISHED'>(isLive ? 'PUBLISHED' : 'IDLE');
  const [progress, setProgress] = useState(isLive ? 100 : 0);
  const [logs, setLogs] = useState<string[]>(isLive ? ['[SYSTEM] XAVIER CORE BROADCASTING VIA GLOBAL RELAY PRODUCTION.'] : []);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'status' | 'manual'>('status');

  const publicUrl = "https://xavier-os.vercel.app"; // Example placeholder

  const deploymentSteps = [
    { msg: 'Rotating AES-XTS-512 Production Key Matrix...', delay: 800, p: 15 },
    { msg: 'Initializing Sovereign Node Tunneling protocol...', delay: 1600, p: 35 },
    { msg: 'Injecting biometric intent profiling to public gates...', delay: 2400, p: 55 },
    { msg: 'Establishing TPR node handshake (15,420 production relays)...', delay: 3200, p: 75 },
    { msg: 'Binding Sovereign Root Signature to Cloud Backbone...', delay: 4200, p: 90 },
    { msg: 'GLOBAL BROADCAST ESTABLISHED. PUBLIC URL GENERATED.', delay: 5200, p: 100 }
  ];

  const handlePublish = () => {
    setStage('SIGNING');
    deploymentSteps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${step.msg}`, ...prev].slice(0, 10));
        setProgress(step.p);
        if (i === 1) setStage('TUNNELING');
        if (i === 4) setStage('BINDING');
        if (i === deploymentSteps.length - 1) {
          setStage('PUBLISHED');
          if (onPublishComplete) onPublishComplete();
        }
      }, step.delay);
    });
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <div className="relative inline-block">
          <div className={`absolute inset-0 blur-[120px] opacity-20 animate-pulse ${stage === 'PUBLISHED' ? 'bg-green-500' : 'bg-amber-500'}`}></div>
          <Rocket className={`relative z-10 animate-bounce-slow ${stage === 'PUBLISHED' ? 'text-green-500' : 'text-amber-500'}`} size={84} />
        </div>
        <h1 className="text-6xl font-bold tracking-tighter uppercase drop-shadow-2xl text-white">
          {stage === 'PUBLISHED' ? 'Ecosystem Deployed' : 'Global Sovereign Launch'}
        </h1>
        <p className={`${stage === 'PUBLISHED' ? 'text-green-500/40' : 'text-amber-500/40'} uppercase tracking-[1.2em] text-sm font-bold`}>
          Xavier AI Ecosystem: Production Node V4.2.1
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <main className="lg:col-span-8 space-y-10">
          <div className="glass p-2 rounded-[4rem] border border-white/10 bg-black/60 shadow-[0_0_150px_rgba(0,0,0,1)] relative overflow-hidden flex flex-col min-h-[750px]">
            {/* Inner Header Tabs */}
            <div className="flex border-b border-white/5 bg-white/5 rounded-t-[4rem]">
              <button
                onClick={() => setActiveTab('status')}
                className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${activeTab === 'status' ? 'text-amber-500 bg-white/5' : 'text-white/20 hover:text-white'}`}
              >
                <Activity className="text-amber-500" size={18} /> Launch Status
              </button>
              <button
                onClick={() => setActiveTab('manual')}
                className={`flex-1 py-8 text-[11px] font-bold uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 ${activeTab === 'manual' ? 'text-cyan-400 bg-white/5' : 'text-white/20 hover:text-white'}`}
              >
                <Code2 size={18} /> Public URL Setup
