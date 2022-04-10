import { AuthenticationError } from "./AuthenticationError";
import { Account } from "./interfaces/Account";
import { AccountForm } from "./validation/AccountFormModel";
import { Credentials } from "./validation/Credentials";
import ws from "ws";
import { redisClient } from "./redis-session";

const redisCli = redisClient.v4;

const accounts: Account[] = [];

const cleanAccount = (a: Account): Account => {
  const result = { ...a };
  delete result.password;
  return result;
};

export class AccountService {
  constructor(private wss: ws.Server) {}

  async create(accountForm: AccountForm) {
    const hash = await redisCli.HGETALL(`accounts:${accountForm.email}`);
    console.log("hash: ", hash);
    if (Object.keys(hash).length > 0) {
      throw new Error("account email already exists.");
    }

    await redisCli.hSet(
      `accounts:${accountForm.email}`,
      "displayName",
      accountForm.displayName
    );
    await redisCli.hSet(
      `accounts:${accountForm.email}`,
      "password",
      accountForm.password
    );
    await redisCli.hSet(`accounts:${accountForm.email}`, "score", 0);
    await this.publish();
    const newAccount: Account = { ...accountForm, score: 0 };
    return cleanAccount(newAccount);
  }

  async incrementScore(email: string): Promise<void> {
    const hash = await redisCli.HGETALL(`accounts:${email}`);
    console.log("hash: ", hash);
    if (!hash) {
      throw new Error("bad email");
    }

    await redisCli.hIncrBy(`accounts:${email}`, "score", 1);
    await this.publish();
  }

  async login(credentials: Credentials) {
    const hash = await redisCli.HGETALL(`accounts:${credentials.email}`);
    console.log("hash: ", hash);
    if (!hash) {
      throw new AuthenticationError("bad login");
    }

    if (credentials.password !== hash.password) {
      throw new AuthenticationError("bad password");
    }
    return cleanAccount({ ...hash });
  }

  async publish() {
    console.log("about to publish to everybody the new list of account");
    // publish on websocket all the accounts.
    const accounts = await this.retrieveAll();

    this.wss.clients.forEach(function each(client) {
      console.log("client: ", (client as any)._socket.remoteAddress);
      if (client.readyState === ws.WebSocket.OPEN) {
        client.send(JSON.stringify({ data: accounts }));
      }
    });
  }

  async retrieveAll(): Promise<Account[]> {
    const keys = await redisCli.KEYS("accounts:*");
    const accounts: Account[] = [];
    for (const key of keys) {
      const hash = await redisCli.HGETALL(key);
      accounts.push({ ...hash, email: key.substring("accounts:".length) });
    }
    return accounts.map((a) => cleanAccount(a));
  }
}
