
# 👑 Xavier AI Ecosystem: Sovereign Production Build

This repository contains the full source code for the **Xavier AI Ecosystem**, a world-class cloud server application with military-grade encryption, AI asset generation, and autonomous market operations.

## ⚡ Quick Start (Local Setup)

1. **Clone/Download** this code into a folder.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Set Environment Variable**:
   Create a `.env` file in the root and add:
   ```env
   VITE_API_KEY=your_gemini_api_key
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Launch Local Node**:
   ```bash
   npm run dev
   ```

## 🚀 Public URL Deployment (Recommended)

To deploy your Sovereign Node to the live web:

### 1. Push to Your Secure Repository
Run these commands in your project folder to sync with **your specific GitHub target**:

```bash
git init
git add .
git commit -m "Initial Sovereign Build V4.2.6"
git branch -M main
# Replace <YOUR_USERNAME> and <REPO_NAME> with your actual GitHub details
git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
git push -u origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com) and click **"Add New"**.
2. Select your repository from the list.
3. Under **Environment Variables**, add:
   - **Key**: `API_KEY` (Gemini)
   - **Key**: `VITE_SUPABASE_URL`
   - **Key**: `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**. Your public URL will be generated in ~60 seconds.

## 🔐 Military-Grade Features
- **Neural Uplink**: Real-time voice/thought interface via Gemini Live API.
- **Onion VPN**: Simulated multi-hop Tor network status.
- **Sovereign Store**: Integrated wholesale sourcing and Stripe payout nexus.
- **Autonomous Agent**: Browser-proxy emulation for Fiverr/Upwork task fulfillment.
- **Supabase Cloud**: Persistent database and auth integration.

## 📂 Project Structure
- `/modules`: Core platform features (VPN, Store, AI Studio, etc.)
- `/services`: Gemini API and Supabase client logic.
- `/components`: Global UI elements and HUD.
- `App.tsx`: Master system orchestration.

*Authored and Signed by: jameshapurona@gmail.com*
