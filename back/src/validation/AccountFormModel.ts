import isEmail from "is-email";
import { define, Describe, object, size, string, Struct } from "superstruct";

const Email: Struct<string, null> = define("Email", isEmail);

export interface AccountForm {
  email: string;
  password: string;
  displayName: string;
}

export const AccountFormModel: Describe<AccountForm> = object({
  email: Email,
  password: string(),
  displayName: size(string(), 3, 100),
});
