# 🔌 1BeatClub WebSocket Server

[![Node.js](https://img.shields.io/badge/Node.js-18-green?logo=node.js)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)]()
[![WebSocket](https://img.shields.io/badge/WebSocket-live-orange)]()

A minimal Node.js WebSocket server powering real-time features for **1BeatClub** such as live voting, queue updates, and club sync.

---

## 👉 Used by

1BeatClub Frontend - https://github.com/LokeshXs/1BeatClub

---

## 🚀 Features

- Real-time song voting
- Live queue updates
- Broadcast events to club members
- WebSocket rooms based on club ID
- Lightweight & fast

---

## 📦 Tech Stack

- ⚙️ Node.js
- 🔌 WebSocket (ws)
- 🧱 Express
- 🛠 TypeScript
- ⚡ ESBuild

---

## 🛠 Installation

### 1. Clone this repository:

```bash
git clone https://github.com/<your-username>/1beatclub-ws
cd 1beatclub-ws
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Run in dev mode:

```bash
npm run dev

```

### 4. Expected output:

```bash
WebSocket server starts on:
ws://localhost:8080
```

---

## 📌 Important Notes

> - This WebSocket server must be running **before** you start the 1BeatClub web client.
> - Without this server, real-time features (votes, queue updates, live sync) will not work.
> - No database connection required — this server only broadcasts events between connected clients.

---

## 🧑‍💻 Author

**Lokesh Singh**  
🔗 Portfolio — https://lokesh-singh.vercel.app/
