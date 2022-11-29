import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OpToken, { OpMinusToken } from "./OpToken";

const Token = {
  Number: NumberToken,
  Identifier: IdentifierToken,
  Operator: OpToken,
  OpMinus: OpMinusToken,
};

export type IToken = NumberToken | IdentifierToken | OpToken;

export default Token;
