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

export enum TokenType {
  Number,
  Identifier,
  Operator,
  Reserved,
  String,
}

export default Token;
