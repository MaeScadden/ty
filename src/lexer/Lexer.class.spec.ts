import LexingNumberError from "../models/LexingNumberError";
import LexingStringError from "../models/LexingStringError";
import LexingUnsupportedCharacterError from "../models/LexingUnsupportedCharacterError";
import { OperatorType } from "../models/OperatorToken";
import { ReservedTokenType } from "../models/ReservedToken";
import Token from "../models/Token";
import Lexer from "./Lexer.class";

describe("Lexer", () => {
  it("should return an array", () => {
    const result = new Lexer().lex("");
    expect(Array.isArray(result)).toBe(true);
  });

  it("should ignore whitespace", () => {
    const result = new Lexer().lex(`abc 
  asda sd
sdas  12312
                       `);

    expect(result).toHaveLength(5);
  });

  it("should return expected Identifier tokens", () => {
    const [first, second] = new Lexer().lex("abc a23 123");

    expect(first).toEqual(new Token.Identifier("abc"));
    expect(second).toEqual(new Token.Identifier("a23"));
  });

  it("should return expected Number tokens", () => {
    const [_0123, , _88, , _123, _123dot1, , _942dot1] = new Lexer().lex(
      "0123 a23 88 -123 123.1 -942.1"
    );

    expect(_0123).toEqual(new Token.Number(123));
    expect(_88).toEqual(new Token.Number(88));
    expect(_123).toEqual(new Token.Number(123));
    expect(_123dot1).toEqual(new Token.Number(123.1));
    expect(_942dot1).toEqual(new Token.Number(942.1));
  });

  it("should return OpMinus token", () => {
    const [, second, , fourth] = new Lexer().lex("asd - 123 - 4");
    expect(second).toEqual(new Token.Operator(OperatorType.Subtraction));
    expect(fourth).toEqual(new Token.Operator(OperatorType.Subtraction));
  });

  describe("should throw LexingNumberError", () => {
    const tests = [
      { text: "asdd 891723.", at: "891723" },
      { text: "hell 778 123.123. is", at: "123.123" },
      { text: "_ -189. foo", at: "189" },
      { text: "wow -908.09. 123", at: "908.09" },
      { text: "-608.09.0 123", at: "608.09" },
      { text: "99213 542.124.123.123", at: "542.124" },
    ];

    tests.forEach(({ text, at }) => {
      it(`When parsing number '${at}'`, () => {
        try {
          new Lexer().lex(text);
          expect("Did not throw error").toBe(null);
        } catch (e) {
          expect(e instanceof LexingNumberError).toBe(true);
        }
      });
    });
  });

  describe("should throw LexingStringError", () => {
    const tests = [
      { text: "ad 'sdasd", line: "ad 'sdasd", lineNumber: 1, column: 10 },
      { text: `hell "' is`, line: `hell "' is`, lineNumber: 1, column: 11 },
      { text: `hell "' is\n`, line: `hell "' is\n`, lineNumber: 1, column: 12 },
      {
        text: `\n_ -189 ' \\'`,
        line: `_ -189 ' \\'`,
        lineNumber: 2,
        column: 12,
      },
    ];

    tests.forEach(({ text, lineNumber, column, line }) => {
      it(`When parsing \`${text}\``, () => {
        try {
          const items = new Lexer().lex(text);
          expect(items).toEqual([]);
        } catch (e) {
          expect(e).toEqual(new LexingStringError(lineNumber, column, line));
        }
      });
    });
  });

  describe("Token.Reserved", () => {
    const tests = [
      {
        text: "asd 123 ( 'hello'",
        index: 2,
        type: ReservedTokenType.LeftParenth,
      },
      { text: "asd ) 'hello'", index: 1, type: ReservedTokenType.RightParenth },
      { text: "asd 123 123 ;", index: 3, type: ReservedTokenType.Semi },
      {
        text: "asd 123 { 'hello'",
        index: 2,
        type: ReservedTokenType.LeftBracket,
      },
      { text: " } 'hello'", index: 0, type: ReservedTokenType.RightBracket },
      {
        text: "asd 123 'hello' 'world' =",
        index: 4,
        type: ReservedTokenType.Assignment,
      },
    ];

    tests.forEach(({ text, index, type }) => {
      it(`should correctly identify reserved token \`${type}\` in \`${text}\``, () => {
        const token = new Lexer().lex(text)[index];

        expect(token).toEqual(new Token.Reserved(type));
      });
    });
  });

  describe("should throw LexingUnsupportedCharacterError", () => {
    const tests = [
      { text: "123 a123 | 123", at: "|" },
      { text: "123 113 ^", at: "^" },
      { text: "123 a123 # 123", at: "#" },
      { text: "123 a123 @ 123", at: "@" },
    ];

    tests.forEach(({ text, at }) => {
      it(`When parsing number '${at}'`, () => {
        try {
          new Lexer().lex(text);
        } catch (e) {
          expect(e instanceof LexingUnsupportedCharacterError).toBe(true);
        }
      });
    });
  });

  describe("when parsing strings", () => {
    [`""`, `''`, `"hello"`, `"hello world"`].forEach((str) => {
      it(`should be successful for \`${str}\``, () => {
        const [token] = new Lexer().lex(str);

        expect(token).toEqual(new Token.String(str.slice(1, -1)));
      });
    });

    [`"world\\"hello"`, `'good\\'bye'`].forEach((str) => {
      it(`should be successful for string escapes \`${str}\``, () => {
        const [first] = new Lexer().lex(str);

        expect(first).toEqual(new Token.String(str.slice(1, -1)));
      });
    });

    // simple escape of escape
    [`"\\""`, `"\\\\""`].forEach((str) => {
      it(`should be successful for backslash escapes \`${str}\``, () => {
        const [first] = new Lexer().lex(str);

        expect(first).toEqual(new Token.String(str.slice(1, -1)));
      });
    });
  });
});
