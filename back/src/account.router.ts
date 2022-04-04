import { Router } from "express";
import { assert, StructError } from "superstruct";
import { AccountService } from "./AccountService";
import { AuthenticationError } from "./AuthenticationError";
import { Credentials, CredentialsModel } from "./validation/Credentials";

const app = Router();

const accountService = new AccountService();

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
      assert(credentials, CredentialsModel);
      const account = await accountService.login(credentials);
      res.json(account);
    } catch (err) {
      console.log("err: ", err);
      if (err instanceof StructError) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (err instanceof AuthenticationError) {
        res.status(401).json({ error: err.message });
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
