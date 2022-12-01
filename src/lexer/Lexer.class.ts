import type Option from "../types/Option";
import OperatorToken, { OperatorType } from "../models/OperatorToken";
import ReservedToken, { ReservedTokenType } from "../models/ReservedToken";
import Token, { TokenType } from "../models/Token";
import isAlphaNumeric from "./helpers/isAlphaNumeric";
import isNewLine from "./helpers/isNewLine";
import isNumber from "./helpers/isNumber";
import isQoute from "./helpers/isQoute";
import isWhiteSpace from "./helpers/isWhiteSpace";
import LexingUnsupportedCharacterError from "../models/LexingUnsupportedCharacterError";
import LexingStringError from "../models/LexingStringError";
import LexingNumberError from "../models/LexingNumberError";
import StringToken from "../models/StringToken";
import IdentifierToken from "../models/IdentifierToken";
import NumberToken from "../models/NumberToken";

export default class Lexer {
  private readonly GetTokenOrder = [
    () => this.getReserved(),
    () => this.getOperator(),
    () => this.getString(),
    () => this.getIdentifier(),
    () => this.getNumber(),
  ];

  private _cursor = 0;
  private currentTokenType: Option<TokenType> = null;
  private lineNumber = 1;
  private column = 1;
  private input = "";
  private value = "";

  private get cursor() {
    return this._cursor;
  }

  private set cursor(num: number) {
    this._cursor = num;
  }

  private get char(): string {
    return this.input[this.cursor];
  }

  private get next(): string {
    return this.input[this.cursor + 1];
  }

  private incrementColumn(): void {
    this.cursor++;
    this.column++;
  }

  private incrementNewLine(): void {
    this.cursor++;
    this.lineNumber++;
    this.column = 1;
  }

  private get currentLine() {
    const start = this.cursor - (this.column - 1);
    const eol = this.input.indexOf("\n", start);
    const end = eol != -1 ? eol + 1 : this.input.length;
    return this.input.slice(start, end);
  }

  public lex(input: string): Token[] {
    this.input = input;
    const tokens: Token[] = [];

    this.column = 1;
    this.cursor = 0;
    this.lineNumber = 1;

    do {
      this.currentTokenType = null;
      if (this.char == undefined) {
        break;
      }

      this.value = "";

      if (isNewLine(this.char)) {
        this.incrementNewLine();
        continue;
      }

      if (isWhiteSpace(this.char)) {
        this._cursor++;
        this.column++;
        continue;
      }

      const token = this.getToken();
      if (token) {
        tokens.push(token);
        continue;
      }

      throw new LexingUnsupportedCharacterError(
        this.lineNumber,
        this.column,
        this.currentLine,
        this.char
      );
    } while (this.cursor < input.length);

    return tokens;
  }

  private getToken(): Option<Token> {
    for (const getter of this.GetTokenOrder) {
      const token = getter();

      if (token) {
        return token;
      }
    }

    return null;
  }

  private getReserved(): Option<ReservedToken> {
    switch (this.char) {
      case "(":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.LeftParenth);
      case ")":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.RightParenth);
      case ";":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.Semi);
      case "{":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.LeftBracket);
      case "}":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.RightBracket);
      case "=":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.Assignment);
      case ",":
        this.incrementColumn();
        return new ReservedToken(ReservedTokenType.Comma);
      case "f":
        if (this.next == "n") {
          this.incrementColumn();
          this.incrementColumn();
          return new ReservedToken(ReservedTokenType.Fn);
        }
    }

    return null;
  }

  private getOperator(): Option<OperatorToken> {
    switch (this.char) {
      case "-":
        this.currentTokenType = TokenType.Operator;

        this.incrementColumn();
        return new OperatorToken(OperatorType.Subtraction);
      default:
        return null;
    }
  }

  private getString(): Option<StringToken> {
    if (isQoute(this.char)) {
      this.currentTokenType = TokenType.String;

      const qoute = this.char.slice();
      this.incrementColumn();

      do {
        if (this.char == undefined) {
          this.throwUnexpectedEnd();
        }

        if (this.char === qoute) {
          this.incrementColumn();
          // value should be equal to "" if we started with "
          break;
        }

        if (this.char == "\\") {
          if (this.next == qoute) {
            this.value += `\\${qoute}`;
            this.incrementColumn();
            this.incrementColumn();
            continue;
          }
        }

        this.value += this.char;
        this.incrementColumn();
        // eslint-disable-next-line no-constant-condition
      } while (true);

      return new StringToken(this.value);
    }

    return null;
  }

  private getIdentifier(): Option<IdentifierToken> {
    if (isAlphaNumeric(this.char)) {
      this.currentTokenType = TokenType.Identifier;

      do {
        this.value += this.char;
        this.incrementColumn();
      } while (isAlphaNumeric(`${this.value}${this.char}`));

      return new IdentifierToken(this.value);
    }

    return null;
  }

  private getNumber(): Option<NumberToken> {
    if (isNumber(this.char)) {
      this.currentTokenType = TokenType.Number;
      let fullstop = false;

      do {
        this.value += this.char;
        this.incrementColumn();

        if (this.char == ".") {
          if (fullstop) {
            this.throwUnexpectedEnd();
          }

          fullstop = true;
          this.incrementColumn();

          // check ONLY the next digit
          if (isNumber(this.char)) {
            this.value = `${this.value}.${this.char}`;
            this.incrementColumn();
          } else {
            this.throwUnexpectedEnd();
          }
        }
      } while (isNumber(`${this.value}${this.char}`));

      return new NumberToken(+this.value);
    }

    return null;
  }

  private throwUnexpectedEnd() {
    switch (this.currentTokenType) {
      case TokenType.String:
        throw new LexingStringError(
          this.lineNumber,
          this.column,
          this.currentLine
        );
      case TokenType.Number:
        throw new LexingNumberError(
          this.lineNumber,
          this.column,
          this.currentLine,
          this.value
        );
    }
  }
}
