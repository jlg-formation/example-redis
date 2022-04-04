import express from "express";
import serveIndex from "serve-index";
import { api } from "./api.router";

const port = +process.env.PORT || 3000;
const wwwDir = "../front/dist/front";

const app = express();

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
