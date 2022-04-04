import express from "express";
import serveIndex from "serve-index";
import session from "express-session";
import { api } from "./api.router";

const port = +process.env.PORT || 3000;
const wwwDir = "../front/dist/front";

const app = express();

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

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
