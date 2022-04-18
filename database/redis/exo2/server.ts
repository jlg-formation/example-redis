import express from "express";
import morgan from "morgan";
import { redisAxios } from "./redis-cache";

const app = express();

app.use(morgan("tiny"));

app.get("/users", (req, res) => {
  (async () => {
    try {
      const data = await redisAxios("https://api.github.com/users");
      res.json(data);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
