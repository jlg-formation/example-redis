import { Router, json } from "express";
import { account } from "./account.router";

const app = Router();
app.use(json());

app.get("/date", (req, res) => {
  res.json({ date: new Date() });
});

app.use("/account", account);

export const api = app;
