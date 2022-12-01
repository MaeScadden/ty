import ArgumentExpressionExpectingCommaError from "./ArgumentExpressionExpectingCommaError";
import Expression from "./Expression";
import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OperatorToken from "./OperatorToken";
import ReservedToken, { ReservedTokenType } from "./ReservedToken";
import StringToken from "./StringToken";
import Token from "./Token";

export default class ArgumentExpression extends Expression {
  public constructor(...tokens: Token[]) {
    ArgumentExpression.validate(tokens);

    super();
  }

  private static validate(tokens: Token[]) {
    let last = ReservedTokenType.Comma;

    for (const token of tokens) {
      if (last === ReservedTokenType.Comma) {
        if (!(token instanceof IdentifierToken)) {
          throw new ArgumentExpressionExpectingCommaError(token);
        }
      }
    }
  }
}
