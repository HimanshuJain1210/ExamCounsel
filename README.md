# 🎓 ExamReady India — Deployment Guide

A complete exam guide app for JEE, BITSAT, VITEEE, JoSAA, and Study Abroad —  
with a **free AI Counsellor** powered by Google Gemini (no credit card needed).

---

## ⚡ Quick Overview

| What | Details |
|------|---------|
| **Frontend** | React + Vite (free) |
| **Hosting** | Vercel (free) |
| **AI Model** | Google Gemini 1.5 Flash (free: 1,500 req/day) |
| **API Key Cost** | ₹0 — completely free |

---

## 📋 STEP 1 — Get Your Free Gemini API Key

> This replaces the paid Anthropic API. Google gives you 1,500 free AI requests per day — more than enough for a classroom.

1. Go to: **https://aistudio.google.com/app/apikey**
2. Sign in with any Google account
3. Click **"Create API Key"**
4. Copy the key — it looks like: `AIzaSy...`
5. Save it somewhere safe (Notepad/Notes)

---

## 📋 STEP 2 — Set Up the Project on Your Computer

### Install Node.js (if not already installed)
- Download from: https://nodejs.org (choose "LTS" version)
- Install and restart your computer

### Set up the project
Open Terminal (Mac/Linux) or Command Prompt (Windows) and run:

```bash
cd examready          # go into the project folder
npm install           # installs React, Vite, and other packages (takes ~1 minute)
```

---

## 📋 STEP 3 — Push to GitHub

1. Go to **https://github.com** → Sign in → Click **"New Repository"**
2. Name it: `examready-india`
3. Keep it **Public** (required for free Vercel hosting)
4. Click **"Create Repository"**

Now in your terminal (inside the `examready` folder):

```bash
git init
git add .
git commit -m "Initial commit — ExamReady India"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/examready-india.git
git push -u origin main
```

> Replace `YOUR_USERNAME` with your actual GitHub username.

---

## 📋 STEP 4 — Deploy on Vercel

1. Go to **https://vercel.com** → Sign up/in with your GitHub account
2. Click **"Add New Project"**
3. Find and select your `examready-india` repository → Click **"Import"**
4. Vercel auto-detects Vite — **don't change any settings**
5. Click **"Deploy"** — wait ~1 minute

### ⚠️ IMPORTANT: Add your API Key in Vercel

Without this step, the AI Counsellor won't work!

1. In Vercel, go to your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. Fill in:
   - **Name:** `GEMINI_API_KEY`
   - **Value:** paste your key from Step 1 (e.g. `AIzaSy...`)
4. Click **Save**
5. Go to **Deployments** → Click **"Redeploy"** → Confirm

✅ Your app is now live at: `https://examready-india.vercel.app` (or similar URL)

---

## 📋 STEP 5 — Share With Students

Copy your Vercel URL and share it. That's it! Students can:
- Use it on mobile or desktop
- Ask the AI Counsellor questions in Hindi or English
- Browse JEE, BITSAT, VITEEE step-by-step guides

---

## 🔄 How to Update the App Later

Whenever you make changes to the code:

```bash
git add .
git commit -m "Update: describe what you changed"
git push
```

Vercel automatically redeploys when you push to GitHub. No manual steps needed!

---

## 🛠️ Local Development (Optional)

To test changes on your computer before pushing:

1. Create a `.env.local` file in the project root:
   ```
   GEMINI_API_KEY=your_key_here
   ```
2. Install Vercel CLI: `npm install -g vercel`
3. Run: `vercel dev`
4. Open: `http://localhost:3000`

---

## 🆓 Free Tier Limits

| Service | Free Limit |
|---------|-----------|
| Vercel Hosting | 100 GB bandwidth/month |
| Vercel Serverless Functions | 1,000,000 calls/month |
| Google Gemini 1.5 Flash | 1,500 requests/day, 15/minute |

For a classroom of 100 students doing 15 questions each = 1,500 requests = exactly the daily limit. If you need more, Gemini paid tier is very cheap (~₹0.06 per 1,000 requests).

---

## ❓ Troubleshooting

**"AI Counsellor says connection error"**
→ Check that `GEMINI_API_KEY` is set in Vercel Environment Variables and you redeployed.

**"Page not found" on refresh**
→ Check `vercel.json` is in your project root (it handles routing).

**Build fails on Vercel**
→ Make sure `package.json`, `vite.config.js`, and `index.html` are in the root folder.

---

## 📁 Project Structure

```
examready/
├── api/
│   └── chat.js          ← AI Counsellor backend (calls Gemini, keeps key secret)
├── src/
│   ├── main.jsx          ← React entry point
│   └── ExamReady.jsx     ← Main app (all tabs: Guide, Colleges, AI, Abroad)
├── index.html            ← HTML shell
├── package.json          ← Dependencies
├── vite.config.js        ← Build config
├── vercel.json           ← Vercel routing config
├── .env.example          ← Template for environment variables
└── .gitignore            ← Excludes node_modules, secrets from Git
```

---

Built with ❤️ for Indian students preparing for JEE and beyond.
