import { NextFunction, Request, Response, Router } from "express";
import { assert, StructError } from "superstruct";
import { AccountService } from "./AccountService";
import { AuthenticationError } from "./AuthenticationError";
import { AccountFormModel } from "./validation/AccountFormModel";
import { CredentialsModel } from "./validation/Credentials";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.account) {
    res.status(401).end();
    return;
  }
  next();
};

const app = Router();

const accountService = new AccountService();

app.get("/", auth, (req, res) => {
  (async () => {
    try {
      const accounts = await accountService.retrieveAll();
      res.json(accounts);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).end();
    }
  })();
});

app.get("/is-logged", (req, res) => {
  if (!req.session.account) {
    res.status(401).end();
    return;
  }
  console.log("req.session.account: ", req.session.account);
  res.status(200).json(req.session.account);
});

app.post("/", (req, res) => {
  (async () => {
    try {
      const accountForm = req.body;
      assert(accountForm, AccountFormModel);
      const account = await accountService.create(accountForm);
      req.session.account = account;
      res.status(201).json(account);
    } catch (err) {
      console.log("err: ", err);
      if (err instanceof StructError) {
        res.status(400).json({ error: err.message });
        return;
      }
      if (err instanceof Error) {
        res.status(401).json({ error: err.message });
        return;
      }
      res.status(500).end();
    }
  })();
});

app.post("/login", (req, res) => {
  (async () => {
    try {
      const credentials = req.body;
      assert(credentials, CredentialsModel);
      const account = await accountService.login(credentials);
      req.session.account = account;
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
  req.session.account = undefined;
  res.status(204).end();
});

export const account = app;
