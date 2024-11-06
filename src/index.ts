import express from "express";
import { WebSocket, WebSocketServer } from "ws";

const app = express();

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", function connection(socket) {
  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {
    wss.clients.forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});
