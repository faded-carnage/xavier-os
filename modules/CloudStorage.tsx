
import React, { useState } from 'react';
import { 
  FolderPlus, Upload, FileText, Folder, Search,
  HardDrive, Clock, Trash2, FileCode, Image as ImageIcon,
  ShieldCheck, Database, Share2, Download,
  History, ShieldAlert, Cpu, Activity, Infinity, Crown
} from 'lucide-react';
import { UserSession } from '../types';

interface StorageProps {
  user?: UserSession;
}

export default function CloudStorage({ user }: StorageProps) {
  const [files] = useState([
    { id: '1', name: 'Sovereign_Root_Blueprint.pdf', type: 'doc', size: '∞ PB', date: 'LIVE', health: 100, segments: 'GLOBAL' },
    { id: '2', name: 'Neural_Weights_V4.bin', type: 'code', size: '2.8 GB', date: 'Oct 20, 2023', health: 99.8, segments: 428 },
    { id: '3', name: 'Marketing_Assets_Archive', type: 'folder', size: '--', date: 'Oct 15, 2023', health: 100, segments: '--' },
    { id: '4', name: 'Ecosystem_Branding', type: 'folder', size: '--', date: 'Oct 12, 2023', health: 100, segments: '--' },
    { id: '5', name: 'Encrypted_Communications.log', type: 'doc', size: '1.2 MB', date: 'Oct 10, 2023', health: 94.2, segments: 4 },
  ]);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'folder': return <Folder className="text-amber-500" size={20} />;
      case 'doc': return <FileText className="text-blue-400" size={20} />;
      case 'img': return <ImageIcon className="text-purple-400" size={20} />;
      case 'code': return <FileCode className="text-orange-400" size={20} />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold flex items-center gap-6 tracking-tighter uppercase">
            <Database className="text-amber-400" size={40} />
            Xavier Root Vault
          </h1>
          <p className="text-amber-500/40 text-[11px] uppercase tracking-[0.6em] font-bold italic">Owner: jameshapurona@gmail.com • Unlimited Sovereign Quota</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-inner group">
            <FolderPlus size={18} />
            Create Container
          </button>
          <button className="flex items-center gap-4 bg-amber-600 hover:bg-amber-500 text-black font-bold px-8 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(251,191,36,0.3)]">
            <Upload size={18} />
            Inject Asset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <aside className="lg:col-span-3 space-y-8">
          <div className="glass p-10 rounded-[3.5rem] border border-amber-500/30 bg-black/40 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 -rotate-45 translate-x-16 -translate-y-16"></div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <HardDrive className="text-amber-400" size={24} />
              </div>
              <h3 className="font-bold text-sm uppercase tracking-widest">Sovereign Quota</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">
                <span>Account Capacity</span>
                <span className="flex items-center gap-1"><Infinity size={12} /> UNLIMITED</span>
              </div>
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden p-0.5 border border-white/5 shadow-inner">
                <div className="bg-gradient-to-r from-amber-600 to-yellow-500 h-full w-[100%] rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              </div>
              <p className="text-[10px] text-white/20 font-medium italic">NO LIMITS DETECTED FOR jameshapurona@gmail.com</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { label: 'Root Directory', icon: Crown, active: true },
              { label: 'Encrypted Cycles', icon: ShieldCheck },
              { label: 'Neural Archives', icon: Activity },
              { label: 'System Recovery', icon: Trash2 },
            ].map((item, i) => (
              <button key={i} className={`w-full flex items-center justify-between px-6 py-4 rounded-[1.5rem] transition-all border ${item.active ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}>
                <div className="flex items-center gap-4">
                  <item.icon size={20} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{item.label}</span>
                </div>
              </button>
            ))}
          </nav>
        </aside>

        <div className="lg:col-span-9 space-y-8">
          <div className="glass rounded-[4rem] border border-white/10 overflow-hidden bg-black/60 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            <table className="w-full text-left">
              <thead className="bg-white/5 border-b border-white/10 text-white/40 uppercase text-[10px] font-bold tracking-[0.4em]">
                <tr>
                  <th className="px-10 py-8">Asset Identifier</th>
                  <th className="px-10 py-8">Bit Density</th>
                  <th className="px-10 py-8">Status</th>
                  <th className="px-10 py-8 text-right">Owner Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-white/5 transition-all group cursor-pointer">
                    <td className="px-10 py-6">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:border-amber-500/30 transition-all shadow-inner">
                          {getFileIcon(file.type)}
                        </div>
                        <div>
                          <p className="font-bold text-base text-white/80 group-hover:text-amber-400 transition-colors uppercase tracking-tight">{file.name}</p>
                          <p className="text-[10px] text-white/20 font-bold uppercase tracking-widest mt-1">Sovereign_Signed_0xROOT</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-10 py-6">
                      <p className="text-sm font-mono text-amber-400/60 tracking-tighter">{file.size}</p>
                    </td>
                    <td className="px-10 py-6">
                       <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">IMMUTABLE</span>
                    </td>
                    <td className="px-10 py-6 text-right">
                      <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-3 bg-white/5 hover:bg-amber-500 hover:text-black rounded-xl border border-white/10 transition-all">
                           <Download size={18} />
                        </button>
                        <button className="p-3 bg-white/5 hover:bg-purple-500 hover:text-white rounded-xl border border-white/10 transition-all">
                           <Share2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
