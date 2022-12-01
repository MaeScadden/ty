import ArgumentExpression from "./ArgumentExpression";
import Expression from "./Expression";
import IdentifierToken from "./IdentifierToken";
import ReservedToken, { ReservedTokenType } from "./ReservedToken";

export class FunctionExpression extends Expression {
  public constructor(
    private readonly name: IdentifierToken,
    private readonly args: ArgumentExpression[],
    private readonly body: Expression[]
  ) {
    super();
  }
}
