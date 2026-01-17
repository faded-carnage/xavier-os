
export type ModuleType = 
  | 'dashboard' 
  | 'storage' 
  | 'vpn' 
  | 'aistudio' 
  | 'social' 
  | 'store' 
  | 'marketing' 
  | 'agent' 
  | 'adcreatives' 
  | 'collab' 
  | 'cyber' 
  | 'intel' 
  | 'uplink'
  | 'matrix'
  | 'mission'
  | 'forge'
  | 'settings'
  | 'launch'
  | 'publish'
  | 'admin'
  | 'stripe-nexus'
  | 'server-mgmt'
  | 'swarm'
  | 'revenue'
  | 'talent'
  | 'viral-blast';

export interface UserSession {
  email: string;
  role: 'OWNER' | 'ADMIN' | 'OPERATIVE';
  isUnlimited: boolean;
  signature: string;
}

export interface FileItem {
  id: string;
  name: string;
  size: string;
  type: 'file' | 'folder';
  lastModified: string;
}

export interface SocialPost {
  id: string;
  user: string;
  avatar: string;
  content: string;
  aura: string;
  time: string;
  intent?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  margin: string;
  sales: number;
  img: string;
}

export interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'draft' | 'completed';
  conversions: number;
  spend: number;
}

export interface SystemIntegrity {
  nodes: number;
  encryption: 'AES-256' | 'AES-XTS' | 'QUANTUM';
  isLive: boolean;
  threatLevel: 'LOW' | 'ELEVATED' | 'CRITICAL';
}