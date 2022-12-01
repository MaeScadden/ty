import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OperatorToken from "./OperatorToken";
import ReservedToken from "./ReservedToken";
import StringToken from "./StringToken";

type Token =
  | NumberToken
  | IdentifierToken
  | OperatorToken
  | ReservedToken
  | StringToken;

export type TokenPrototype =
  | typeof NumberToken
  | typeof IdentifierToken
  | typeof OperatorToken
  | typeof ReservedToken
  | typeof StringToken;

export type TokenFromPrototype<T extends TokenPrototype> =
  T extends typeof NumberToken
    ? NumberToken
    : T extends typeof IdentifierToken
    ? IdentifierToken
    : T extends typeof OperatorToken
    ? OperatorToken
    : T extends typeof ReservedToken
    ? ReservedToken
    : T extends typeof StringToken
    ? StringToken
    : null;

export enum TokenType {
  Number,
  Identifier,
  Operator,
  Reserved,
  String,
}

export default Token;
