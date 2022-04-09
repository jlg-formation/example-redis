import { Router, json } from "express";
import ws from "ws";
import { account } from "./account.router";

export const api = (wss: ws.Server) => {
  const app = Router();
  app.use(json());

  app.get("/date", (req, res) => {
    res.json({ date: new Date() });
  });

  app.use("/account", account(wss));
  return app;
};
