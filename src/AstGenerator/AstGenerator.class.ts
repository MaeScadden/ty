import type Option from "../types/Option";
import Expression from "../models/Expression";
import Token, { TokenFromPrototype, TokenPrototype } from "../models/Token";
import ReservedToken, { ReservedTokenType } from "../models/ReservedToken";
import { FunctionExpression } from "../models/FunctionExpression";
import IdentifierToken from "../models/IdentifierToken";
import NumberToken from "../models/NumberToken";
import StringToken from "../models/StringToken";
import OperatorToken from "../models/OperatorToken";
class Foo {}

export default class AstGenerator {
  private tokens: Token[] = [];
  private cursor = 0;

  private get token(): Token {
    return this.tokens[this.cursor];
  }

  private getNextAsNumberToken(error = true): Option<NumberToken> {
    this.cursor++;
    const token = this.token;
    if (token instanceof NumberToken) return token;
    if (error) throw new Error("TODO: NumberToken");
    return null
  }

  private getNextAsIdentifierToken(error = true): Option<IdentifierToken> {
    this.cursor++;
    const token = this.token;

    if (token instanceof IdentifierToken) return token;
    if (error) throw new Error("TODO: IdentifierToken");
    return null;
  }

  private getNextAsOperatorToken(error = true): Option<OperatorToken> {
    this.cursor++;
    const token = this.token;

    if (token instanceof OperatorToken) return token;
    if (error) throw new Error("TODO: OperatorToken");
    return null;
  }

  private getNextAsReservedToken<
    T extends ReservedTokenType = ReservedTokenType
  >(error = true, type: Option<T> = null): Option<ReservedToken<T>> {
    this.cursor++;
    const token = this.token;

    if (token instanceof ReservedToken) {
      if (token.type !== null) {
        if (token.type === type) {
          return token as ReservedToken<T>;
        }
      } else {
        return token;
      }
    }
    if (error) throw new Error("TODO: ReservedToken");
    return null;
  }

  private getNextAsStringToken(error = true): Option<StringToken> {
    this.cursor++;
    const token = this.token;

    if (token instanceof StringToken) return token;
    if (error) throw new Error("TODO: StringToken");
    return null;
  }

  public generate(tokens: Token[]): never {
    this.tokens = tokens;
    const expressions: Expression[] = [];
    const cursor = 0;

    while (cursor < tokens.length) {
      const expression = this.getExpression();
      if (expression) {
        expressions.push(expression);
        continue;
      }
    }

    throw new Error("TODO");
  }

  private getExpression(): Option<Expression> {
    if (this.token instanceof ReservedToken) {
      switch (this.token.type) {
        // starters
        case ReservedTokenType.Fn:
          return this.parseFunctionExpression();
        // should not be found here
        case ReservedTokenType.LeftParenth:
        case ReservedTokenType.RightParenth:
        case ReservedTokenType.Semi:
        case ReservedTokenType.LeftBracket:
        case ReservedTokenType.RightBracket:
        case ReservedTokenType.Assignment:
        case ReservedTokenType.Comma:
      }
    }
    return null;
  }

  private parseFunctionExpression(): FunctionExpression {
    const name = this.getNextAsIdentifierToken(true)!;
    const args: Token[] = [];
    const body: Token[] = [];

    const open = this.getNextAsReservedToken(true, ReservedTokenType.LeftParenth)!;
    let scope = 1;

    do {
      const next = this.getNextAsReservedToken();
      if (next?.type == ReservedTokenType.RightParenth) {
        scope--;
        continue;
      }

      throw new Error("TODO");
    } while (scope > 0);

    return new FunctionExpression(name, args, body);
  }
}
