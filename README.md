# 🎮 Voxel-Inspired Interactive Developer Portfolio

A high-fidelity, retro 3D voxel-style developer portfolio built using React, Vite, TailwindCSS, Express, MongoDB, and Telegram API integration. Designed to mimic the immersive, playful feel of block-building sandbox games, this website allows visitors to explore projects, play custom-crafted simulators, and send direct proposals via an interactive crafting grid console.

---

## 🛠 Key Features & Significant Implementations

### 1. Retro Voxel Aesthetic & Custom Components
* **Dynamic Interactive Elements**: Built with custom HSL-tailored colors, high-contrast borders, drop-shadows, and micro-animations that reflect classic voxel sandbox interfaces.
* **Sound Design Integration**: Features retro-synthesized audio tones using the native Web Audio API, triggering classic chime cadences upon successful quest submissions.
* **Advancement Achievements**: Custom achievement banners (e.g., *ISRO Research Internship*, *Cloud Journey*) mimicking classic achievement unlocks.

### 2. Interactive Game Simulators
* **Playable Minigames**: Includes embedded interactive projects, such as the **Cloud & Terraform Pipeline Simulator** and the **Great Archives System**, to show full-stack and cloud concepts through playable, gamified mechanics.

### 3. Interactive Crafting Grid V1.1 (HIRE ME Modal)
* A bespoke crafting grid interface where users must deploy three input blocks representing their **Name**, **Email**, and **Proposal** details into a crafting table slot to construct and submit a hire request.

### 4. Robust Full-Stack Backend Integration
* **MongoDB Lead Ledger**: Stores incoming proposals persistently via Mongoose schemas before dispatching alerts to prevent any lead loss.
* **Real-time Telegram Alerts**: Connects securely to the Telegram Bot API using a modular dispatcher (`utils/telegram.js`) to push instant rich-text notification summaries directly to the developer's chat.
* **Rate Limiting**: Configured `express-rate-limit` on the proposal API route to shield the endpoint from automated bots or spam floods.
* **Safe WebKit JSON Parsing**: Modified response handler routes to prevent browser parser exception crashes (e.g., Safari's `DOMException` string matching bugs) when dealing with non-JSON HTTP status codes or proxy timeouts.

---

## 🚀 Setup & Installation

### Prerequisites
* **Node.js** (v18+ recommended)
* **MongoDB** (Local instance or MongoDB Atlas cluster URI)
* **Telegram Bot** (Created via BotFather, along with your Target Chat ID)

### 1. Install Dependencies
Clone the repository and install the standard dependencies:
```bash
npm install
```

### 2. Environment Configurations
Create a `.env` file at the root of the project and define the following keys:
```env
# MongoDB Connection String (Note: special characters in password must be URL-encoded, e.g., @ as %40)
MONGODB_URI="mongodb+srv://<username>:<password>@cluster.mongodb.net/database?appName=Cluster"

# Telegram Bot configurations
TELEGRAM_BOT_TOKEN="your_bot_token"
TELEGRAM_CHAT_ID="your_telegram_chat_id"
```

### 3. Running the Application
The application is run as a split-process stack:

* **Start the Vite Frontend Server** (Port `3000`):
  ```bash
  npm run dev
  ```
* **Start the Express API Backend Server** (Port `5001`):
  ```bash
  node server.js
  ```

Once both processes are running, navigate to `http://localhost:3000` in your web browser. Vite is configured to proxy all `/api/*` endpoints to the Express port automatically.

---

## ⚠️ Plagiarism & Usage Warning
> [!CAUTION]
> **COPYING IS NOT ALLOWED**
> 
> All custom-crafted code, interactive minigames, simulated crafting grids, visual assets, text assets, and thematic portfolio design styles contained inside this repository are the **intellectual property of the owner**. 
> 
> Cloning, copying, reproducing, redistributing, or modifying this codebase/content for other personal portfolios or commercial usage without explicit written consent is strictly prohibited. Plagiarism is monitored and will be flagged.
