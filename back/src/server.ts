import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import serveIndex from "serve-index";
import { api } from "./api.router";
import { pubsub } from "./pubsub";
import { redisSession } from "./redis-session";
import { webSocket } from "./websocket";

const port = +process.env.PORT || 3000;
const wwwDir = "../front/dist/front";

const app = express();
app.set("trust proxy", 1);

const server = createServer(app);
const wss = webSocket(server);

app.use(morgan("tiny"));

app.use(redisSession);
pubsub(wss);

app.use("/api", api(wss));

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
