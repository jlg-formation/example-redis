import { AuthenticationError } from "./AuthenticationError";
import { Account } from "./interfaces/Account";
import { AccountForm } from "./validation/AccountFormModel";
import { Credentials } from "./validation/Credentials";

const accounts: Account[] = [];

export class AccountService {
  async create(accountForm: AccountForm) {
    const account = accounts.find((a) => a.email === accountForm.email);
    if (account) {
      throw new Error("account email already exists.");
    }
    const newAccount: Account = { ...accountForm, score: 0 };
    delete newAccount.password;
    accounts.push(newAccount);
    return newAccount;
  }

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

  async retrieveAll(): Promise<Account[]> {
    return accounts;
  }
}
