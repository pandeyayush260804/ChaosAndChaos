# ⚔️ Code & Chaos

**Code & Chaos** is a real‑time competitive coding battle platform where players are matched live, solve algorithmic problems under pressure, and compete to climb the leaderboard.

It combines **real‑time matchmaking**, **WebSocket‑driven battles**, and a **modern animated UI** to deliver a fast, fair, and intense coding experience.

🌐 **Live Application:**  
👉 https://chaos-and-chaos.vercel.app/

---

## 🚀 Core Features

### 🎮 Player Features
- Real‑time **1v1 matchmaking**
- Live coding battles using WebSockets
- First correct submission wins
- Automatic win on opponent quit
- Global leaderboard
- Detailed match history (with reasons)
- Smooth animated UI

### 🛠️ Admin Features
- Secure admin authentication
- View all matches
- View player statistics
- Leaderboard management
- Analytics dashboard (extensible)

### ⚙️ System Features
- Room‑based Socket.IO architecture
- Deterministic winner logic
- Scalable backend structure
- Clean separation of frontend & backend
- No duplicate socket listeners

---

## 🧱 Tech Stack

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Socket.IO Client
- React Router
- React Hook Form + Zod

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose
- UUID
- Nodemon

### Authentication
- JWT‑based authentication
- Role‑based access (Admin / Player)

---

## 📁 Project Structure
CHAOSNCODE/
├── backend/
│   ├── api/
│   │   └── v1/
│   │       └── routes/
│   ├── controllers/
│   ├── models/
│   │   ├── admin-model.js
│   │   ├── player-model.js
│   │   └── MatchHistory.js
│   ├── services/
│   ├── sockets/
│   │   ├── matchmaking.js
│   │   ├── battle.js
│   │   ├── questions.js
│   │   └── judge.js
│   ├── utils/
│   │   ├── db/
│   │   ├── middlewares/
│   │   └── roomPlayers.js
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── dist/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── lib/
│   │   │   └── socket.ts
│   │   ├── modules/
│   │   │   ├── admin/
│   │   │   ├── battle/
│   │   │   ├── history/
│   │   │   ├── leaderboard/
│   │   │   ├── matches/
│   │   │   └── user/
│   │   ├── shared/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env
│   ├── components.json
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── README.md
│
└── .gitignore


---

## 🔌 Socket Architecture

- Single Socket.IO server instance
- Feature‑based socket modules:
  - `matchmaking`
  - `battle`
  - `questions`
  - `judge`
- Room‑based communication (`room_<uuid>`)
- Clean lifecycle handling (connect, join, leave, disconnect)

This avoids:
- Ghost listeners
- Duplicate events
- Memory leaks

---

## ⚔️ Matchmaking Flow

1. Player connects to Socket.IO
2. Emits `join_queue`
3. Server queues unique players
4. When two players are available:
   - A room is created
   - Both players join the room
   - `match_found` event is emitted
5. Frontend redirects to VS screen
6. Battle starts

---

## 🧠 Battle & Result Logic

- First correct submission wins
- If a player quits, opponent wins instantly
- Match history saved for both players
- Room and memory cleanup after match

---

## 📜 Supported Problems

- Two Sum
- Reverse Linked List
- Extensible problem system (easy to add more)

---

## ⚙️ Environment Variables

### Backend (`.env`)
```env
PORT=7777
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
