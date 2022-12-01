import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OperatorToken from "./OperatorToken";
import ReservedToken, { ReservedTokenType } from "./ReservedToken";
import StringToken from "./StringToken";
import Token from "./Token";

export default class ArgumentExpressionExpectingCommaError extends Error {
  private static MESSAGE_TEMPLATE = "Expected ',' but got {}";

  public constructor(token: Token) {
    const message = ArgumentExpressionExpectingCommaError.getMessageFromToken(token);

    super(ArgumentExpressionExpectingCommaError.MESSAGE_TEMPLATE.replace("{}", message));
  }

  private static getMessageFromToken(token: Token): string {
    if (token instanceof NumberToken) {
      return `NumberLiteral ${token.value}`;
    } else if (token instanceof IdentifierToken) {
      return `Identifier ${token.value}`;
    } else if (token instanceof OperatorToken) {
      return `Operator ${token.type}`;
    } else if (token instanceof ReservedToken) {
      return `ReservedToken ${token.type}`;
    }

    return `StringLiteral \`${token.value}\``
  }
}
