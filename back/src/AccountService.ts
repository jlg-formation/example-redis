import { AuthenticationError } from "./AuthenticationError";
import { Account } from "./interfaces/Account";
import { AccountForm } from "./validation/AccountFormModel";
import { Credentials } from "./validation/Credentials";

const accounts: Account[] = [];

const cleanAccount = (a: Account): Account => {
  const result = { ...a };
  delete result.password;
  return result;
};

export class AccountService {
  async create(accountForm: AccountForm) {
    const account = accounts.find((a) => a.email === accountForm.email);
    if (account) {
      throw new Error("account email already exists.");
    }
    const newAccount: Account = { ...accountForm, score: 0 };
    accounts.push(newAccount);
    return cleanAccount(newAccount);
  }

  async incrementScore(email: string): Promise<Account> {
    const account = accounts.find((a) => a.email === email);
    if (!account) {
      throw new Error("bad email");
    }
    account.score++;
    return cleanAccount(account);
  }

  async login(credentials: Credentials) {
    const account = accounts.find((a) => a.email === credentials.email);
    if (!account) {
      throw new AuthenticationError("bad login");
    }
    if (credentials.password !== account.password) {
      throw new AuthenticationError("bad password");
    }
    return cleanAccount(account);
  }

  async retrieveAll(): Promise<Account[]> {
    return accounts.map((a) => cleanAccount(a));
  }
}
