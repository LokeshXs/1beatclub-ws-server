import express, { json } from "express";
import { WebSocket, WebSocketServer } from "ws";
import url from "url";

const app = express();

const httpServer = app.listen(8080);

const wss = new WebSocketServer({ server: httpServer });

const connectedUsersMap = new Map<
  string,
  { clubid: string; wsClient: WebSocket }
>();

wss.on("connection", function connection(socket, req) {


  const params = url.parse(req.url!, true);
  const userId = params.query["userid"];
  const clubId = params.query["clubid"];


  if (!userId || Array.isArray(userId) || Array.isArray(clubId)) {
    return;
  }


  storeUserConnection(userId, clubId || "", socket);

  socket.on("error", console.error);

  socket.on("message", function message(data, isBinary) {

    // converting the Buffer data to JSON string
    const jsonString = data.toString("utf-8");
    const jsonData  = JSON.parse(jsonString);
    const clubId = jsonData.data.clubId;

    // Getting the WS clients for the club id we received and the sending the data to only required users not all
    getWSForReceivedClubId(clubId || "").forEach((client) => {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });

  });

  socket.on("close", () => {
    socket.close();
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
