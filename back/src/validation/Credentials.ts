import isEmail from "is-email";
import { define, object, string } from "superstruct";

const Email = define("Email", isEmail);

export const Credentials = object({
  email: Email,
  passwordx: string(),
});
