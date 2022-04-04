import { AuthenticationError } from "./AuthenticationError";
import { Account } from "./interfaces/Account";
import { Credentials } from "./validation/Credentials";

const accounts: Account[] = [];

export class AccountService {
  async login(credentials: Credentials) {
    const account = accounts.find((a) => a.email === credentials.email);
    if (!account) {
      throw new AuthenticationError("bad login");
    }
    if (credentials.password !== account.password) {
      throw new AuthenticationError("bad password");
    }
    const result = { ...account };
    delete result.password;
    return result;
  }
}
