import { Router } from "express";
import { assert, StructError } from "superstruct";
import { Credentials } from "./validation/Credentials";

const app = Router();
app.get("/", (req, res) => {
  res.json([]);
});

app.post("/", (req, res) => {
  const createdAccount = {};
  res.status(201).json(createdAccount);
});

app.post("/login", (req, res) => {
  (async () => {
    try {
      const credentials = req.body;
      console.log("credentials: ", credentials);
      assert(credentials, Credentials);
      res.status(401).json({ error: "bad login/password" });
    } catch (err) {
      console.log("err: ", err);
      if (err instanceof StructError) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.status(500).end();
    }
  })();
});

app.post("/logout", (req, res) => {
  const createdAccount = {};
  res.status(204).end();
});

export const account = app;
