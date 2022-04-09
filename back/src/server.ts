import express from "express";
import serveIndex from "serve-index";
import session from "express-session";
import { api } from "./api.router";
import { createServer } from "http";
import { webSocket } from "./websocket";

const port = +process.env.PORT || 3000;
const wwwDir = "../front/dist/front";

const app = express();
const server = createServer(app);
webSocket(server);

app.use(
  session({
    name: "example-redis.sid",
    secret: "do not change this secret or all session will be reset...",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
