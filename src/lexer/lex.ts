import InvalidCharacterError from "../models/InvalidCharacterError";
import Token, { IToken } from "../models/Token";
import UnexpectedEndOfNumberError from "../models/UnexpectedEndOfNumberError";
import isAlphaNumeric from "./helpers/isAlphaNumeric";
import isNewLine from "./helpers/isNewLine";
import isNumber from "./helpers/isNumber";
import isWhiteSpace from "./helpers/isWhiteSpace";

export default function lex(input: string): IToken[] {
  const tokens: IToken[] = [];
  let cursor = 0;

  while (cursor < input.length) {
    let value = "";

    if (isWhiteSpace(input[cursor]) || isNewLine(input[cursor])) {
      cursor++;
      continue;
    }

    if (isAlphaNumeric(input[cursor])) {
      do {
        value += input[cursor];
        cursor++;
      } while (isAlphaNumeric(`${value}${input[cursor]}`));

      tokens.push(new Token.Identifier(value));
      continue;
    }

    if (input[cursor] == "-") {
      cursor++;
      tokens.push(new Token.OpMinus());
      continue;
    }

    if (isNumber(input[cursor])) {
      let fullstop = false;

      do {
        value += input[cursor];
        cursor++;

        if (input[cursor] == ".") {
          if (fullstop) {
            throw new UnexpectedEndOfNumberError(value);
          }

          fullstop = true;
          cursor++;

          // check ONLY the next digit
          if (isNumber(input[cursor])) {
            value = `${value}.${input[cursor]}`;
            cursor++;
          } else {
            throw new UnexpectedEndOfNumberError(value);
          }
        }
      } while (isNumber(`${value}${input[cursor]}`));

      tokens.push(new Token.Number(+value));
      continue;
    }

    throw new InvalidCharacterError(input[cursor]);
  }

  return tokens;
}
