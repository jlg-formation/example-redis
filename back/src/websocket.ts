import http from "http";
import ws from "ws";

export const webSocket = (server: http.Server) => {
  console.log("starting websocket.");
  const wss = new ws.Server({
    noServer: true,
    path: "/websocket",
  });

  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      wss.emit("connection", websocket, request);
    });
  });

  wss.on("connection", function connection(websocket) {
    console.log("new websocket connection");
    websocket.on("message", function message(data) {
      console.log("received: %s", data);
      websocket.send(JSON.stringify({ message: "yes sure." }));
    });

    websocket.on("close", function message() {
      console.log("closing client websocket.");
    });
  });

  return wss;
};
