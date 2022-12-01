import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OperatorToken from "./OperatorToken";
import ReservedToken from "./ReservedToken";
import StringToken from "./StringToken";

const Token = {
  Number: NumberToken,
  Identifier: IdentifierToken,
  Operator: OperatorToken,
  Reserved: ReservedToken,
  String: StringToken,
};

export type IToken =
  | NumberToken
  | IdentifierToken
  | OperatorToken
  | ReservedToken;

export default Token;
