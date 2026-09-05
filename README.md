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
ws://localhost:8081
```

## ☁️ Deploy with Coolify

This repository includes a `Dockerfile`, so select **Dockerfile** as the build
pack when creating the application in Coolify.

1. Create an Application from this Git repository and select the deployment
   branch (for example, `main`).
2. Set the Dockerfile location to `Dockerfile` and set the exposed port to
   `8081`.
3. Add a domain such as `ws.example.com`. Coolify provisions TLS, so clients
   should connect with `wss://ws.example.com/?userid=<user-id>`.
4. Enable a health check with path `/health` and port `8081`, then deploy.

The server honors the `PORT` environment variable. Leave it at `8081` unless
you also update Coolify's exposed port and health-check port to match.

---

## 📌 Important Notes

> - This WebSocket server must be running **before** you start the 1BeatClub web client.
> - Without this server, real-time features (votes, queue updates, live sync) will not work.
> - No database connection required — this server only broadcasts events between connected clients.

---

## 🧑‍💻 Author

**Lokesh Singh**  
🔗 Portfolio — https://lokesh-singh.vercel.app/
