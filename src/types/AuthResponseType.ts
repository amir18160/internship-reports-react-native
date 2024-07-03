import { User } from "./UserType";
import { Token } from "./TokenType";

export interface AuthResponseType {
  user: User;
  token: Token;
}
