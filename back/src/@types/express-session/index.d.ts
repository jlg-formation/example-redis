import { Account } from "../../interfaces/Account";

declare module "express-session" {
  interface SessionData {
    account?: Account;
  }
}
