# 🚀 GrowthOS AI

AI‑driven marketing and campaign management platform that lets teams create, organise, and monitor advertising campaigns.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-🌐-green?logo=vercel)](https://growthos-ai-murex.vercel.app/) &nbsp;[![GitHub](https://img.shields.io/badge/GitHub-💻-black?logo=github)](https://github.com/Classicharsh/growthos-ai)

**Technologies**
- Next.js **v16.2.12** – React framework for the frontend
- React **v19.2.4** – UI library
- TypeScript **v5** – type‑safe development
- Node.js **v20.x** – runtime for the backend
- Express **v4.19.2** – API server (deployed on Render)
- Firebase **v12.16.0** – Auth & Firestore (client SDK)

---

## 📸 Preview

> Screenshots coming soon.

---

## ✨ Features

- **🔐 Authentication** – Secure sign‑in with Google OAuth, email + password, registration, and password‑reset flows. A developer‑mode mock user is used when Firebase Auth is unavailable locally.
- **📊 Dashboard** – Backend endpoint `GET /api/v1/dashboard/overview` returns aggregated campaign metrics.
- **🎯 Campaign Management** – Full create, read, update, delete, and statistics operations are implemented in the client‑side service (`services/campaign.service.ts`) that talks directly to Firestore under `users/{uid}/campaigns/{campaignId}`.
- **📈 Meta Conversions API** – Server‑side endpoint `POST /api/v1/meta-capi/track` forwards event data to Meta’s Conversions API.
- **🛡️ Protected Routes** – CORS is limited to the origin defined in `process.env.CORS_ORIGIN`; health check `GET /health` reports service status.
- **☁️ Firebase / Firestore** – Data stored in Firestore with security rules that ensure each authenticated user can only access their own `users/{uid}` document and `campaigns` sub‑collection.
- **🚀 Production‑ready Deployment** – Frontend is deployed on Vercel (configured via `vercel.json`) and backend runs on Render (`https://growthos-ai-b2nk.onrender.com`).

---

## 🧠 What is GrowthOS AI?

GrowthOS AI is a full‑stack marketing platform that centralises campaign data and conversion tracking. It addresses three common challenges:
1. **Scattered data** – All campaign information lives in a single Firestore hierarchy (`users/{uid}/campaigns/{campaignId}`), eliminating the need for multiple spreadsheets.
2. **Manual conversion reporting** – The Meta Conversions API endpoint allows server‑side event tracking, reducing reliance on client‑side pixel implementations.
3. **Fragmented authentication** – Firebase Auth provides a unified, secure login experience with Google OAuth, email/password, and a mock user fallback for rapid development.

Designed for marketers, product managers, and developers who need a lightweight yet extensible tool to monitor campaign performance.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Frontend
        UI[Next.js + React UI]
    end

    subgraph Backend
        API[Express API (Render)]
        MetaCAPI[Meta CAPI Service]
        Dashboard[Dashboard Service]
    end

    subgraph Data
        Firestore[Firebase Firestore]
        Auth[Firebase Auth (client‑side)]
    end

    UI -->|HTTPS| API
    API -->|Calls| MetaCAPI
    API -->|Calls| Dashboard
    UI -->|Direct reads/writes| Firestore
    UI -->|Auth via| Auth
    Dashboard -->|Reads| Firestore
    MetaCAPI -->|Sends events to| Meta[Meta Conversions API]
    API -->|Reads/Writes| Firestore
```

*Both the Next.js frontend and the Express backend interact with Firestore using the Firebase client SDK. Authentication is performed on the client; the backend does not validate Firebase tokens.*

---

## 📂 Repository Structure

- `app/` – Next.js pages and components
- `backend/` – Express API (TypeScript source in `src/`)
- `services/` – Front‑end services that communicate with Firestore and the backend
- `contexts/` – React context for authentication
- `firestore.rules` – Security rules enforcing per‑user data access
- `vercel.json` – Vercel configuration for the frontend only

---

## 📦 Getting Started

1. **Clone the repo**
   ```bash
   git clone https://github.com/Classicharsh/growthos-ai.git
   cd growthos-ai
   ```
2. **Create a `.env.local`** (copy from `.env.example`) and set:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, … (your Firebase project values)
   - `NEXT_PUBLIC_API_URL=https://growthos-ai-b2nk.onrender.com/api/v1`
   - `CORS_ORIGIN` (frontend URL for production)
3. **Install dependencies**
   ```bash
   npm install            # installs both root and backend deps
   cd backend && npm install
   ```
4. **Run locally**
   ```bash
   # Frontend
   npm run dev           # Next.js on http://localhost:3000
   # Backend (in another terminal)
   cd backend && npm run dev   # Express on http://localhost:5001
   ```
5. **Deploy**
   - Frontend: push to GitHub – Vercel picks up `vercel.json` automatically.
   - Backend: Deploy the `backend/` folder to Render (already configured).

---

## 📜 License

MIT © Harshit Prajapati
