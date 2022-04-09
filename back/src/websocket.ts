import http from "http";
import WebSocket from "ws";

export const webSocket = (server: http.Server) => {
  console.log("starting websocket.");
  const wss = new WebSocket.Server({
    noServer: true,
    path: "/websocket",
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on("connection", function connection(ws) {
    ws.on("message", function message(data) {
      console.log("received: %s", data);
    });

    ws.send(JSON.stringify({ message: "something" }));
  });
};
