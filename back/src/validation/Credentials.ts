import isEmail from "is-email";
import { define, Describe, object, string, Struct } from "superstruct";

const Email: Struct<string, null> = define("Email", isEmail);

export interface Credentials {
  email: string;
  password: string;
}

export const CredentialsModel: Describe<Credentials> = object({
  email: Email,
  password: string(),
});
