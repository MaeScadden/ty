import ArgumentExpressionExpectingCommaError from "./ArgumentExpressionExpectingCommaError";
import IdentifierToken from "./IdentifierToken";
import NumberToken from "./NumberToken";
import OperatorToken, { OperatorType } from "./OperatorToken";
import ReservedToken, { ReservedTokenType } from "./ReservedToken";
import StringToken from "./StringToken";
import Token from "./Token";

describe("ArgumentExpressionExpectingCommaError", () => {
  const input: [string, Token][] = [
    [`Expected ',' but got NumberLiteral 3`, new NumberToken(3) ],
    [`Expected ',' but got Identifier foo`, new IdentifierToken("foo") ],
    [`Expected ',' but got Operator -`, new OperatorToken(OperatorType.Subtraction) ],
    [`Expected ',' but got ReservedToken {`, new ReservedToken(ReservedTokenType.LeftBracket) ],
    [`Expected ',' but got StringLiteral \`hello world\``, new StringToken("hello world") ],
  ];

  const tests = input.map(([message, token]) => ({
    message,
    token
  }));

  describe("message", () => {
    tests.forEach(({ message, token }) => {
      it(`Given token <${token}> has expected message`, () => {
        const error = new ArgumentExpressionExpectingCommaError(token);

        expect(error).toEqual(message);
      });
    });
  });
});
