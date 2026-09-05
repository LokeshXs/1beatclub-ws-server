import express from "express";
import { WebSocket, WebSocketServer } from "ws";
import url from "url";

const app = express();

const port = Number.parseInt(process.env.PORT ?? "8081", 10);

// Used by Coolify to determine whether the container is ready to receive
// connections. It is also useful when checking the service outside of a
// WebSocket client.
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

const httpServer = app.listen(port, "0.0.0.0", () => {
  console.log(`WebSocket server listening on port ${port}`);
});

const wss = new WebSocketServer({ server: httpServer });

const connectedUsersMap = new Map<
  string,
  { clubid: string; wsClient: WebSocket }
>();

wss.on("connection", function connection(socket, req) {
  const params = url.parse(req.url!, true);
  const userId = params.query["userid"];

  if (!userId || Array.isArray(userId)) {
    return;
  }

  storeUserConnection(userId, "", socket);

  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {
    // converting the Buffer data to JSON string
    const jsonString = data.toString("utf-8");
    const jsonData = JSON.parse(jsonString);

    console.log("Received: ", jsonData);

    if (jsonData.type === "ping") {
      socket.send(JSON.stringify({ type: "pong" }));

      return;
    }

    if (jsonData.type === "club-change") {
      const userId = jsonData.userId;
      const clubId = jsonData.clubId;
      const wsSocket = getWsClientForAUser(userId);
      storeUserConnection(userId, clubId || "", wsSocket);

      return;
    }

    const clubId = jsonData.data?.clubId;

    // Getting the WS clients for the club id we received and  sending the data to only required users not all
    getWSForReceivedClubId(clubId || "").forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  socket.on("close", () => {
 
    console.log("closing connection");
    removeUserConnection(userId);
  });
});

// Storing the users ws connection along with user is and club id in a map
function storeUserConnection(
  userId: string,
  clubId: string,
  wsSocket: WebSocket
) {
  // const connectedUser = connectedUsersMap.has(userId);

  connectedUsersMap.set(userId, { clubid: clubId || "", wsClient: wsSocket });
}

// getting the ws clients for the clubid

function getWSForReceivedClubId(clubId: string): WebSocket[] {
  const wsArray: WebSocket[] = [];

  connectedUsersMap.forEach((value) => {
    if (value.clubid === clubId) {
      wsArray.push(value.wsClient);
    }
  });

  return wsArray;
}

function getWsClientForAUser(userId: string): WebSocket {
  const userWsSocketObj = connectedUsersMap.get(userId)!;

  return userWsSocketObj.wsClient;
}

// This function removes the stale user if connection is closed
function removeUserConnection(userId:string){
  connectedUsersMap.delete(userId);

}
