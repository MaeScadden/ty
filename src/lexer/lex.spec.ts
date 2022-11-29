import InvalidCharacterError from "../models/InvalidCharacterError";
import Token from "../models/Token";
import UnexpectedEndOfNumberError from "../models/UnexpectedEndOfNumberError";
import lex from "./lex";

describe("lex", () => {
  it("should return an array", () => {
    const result = lex("");
    expect(Array.isArray(result)).toBe(true);
  });

  it("should ignore whitespace", () => {
    const result = lex(`abc 
  asda sd
sdas  12312
                       `);

    expect(result).toHaveLength(5);
  });

  it("should return expected Identifier tokens", () => {
    const [first, second] = lex("abc a23 123");

    expect(first).toEqual(new Token.Identifier("abc"));
    expect(second).toEqual(new Token.Identifier("a23"));
  });

  it("should return expected Number tokens", () => {
    const [_0123, , _88, , _123, _123dot1, , _942dot1] = lex(
      "0123 a23 88 -123 123.1 -942.1"
    );

    expect(_0123).toEqual(new Token.Number(123));
    expect(_88).toEqual(new Token.Number(88));
    expect(_123).toEqual(new Token.Number(123));
    expect(_123dot1).toEqual(new Token.Number(123.1));
    expect(_942dot1).toEqual(new Token.Number(942.1));
  });

  it("should return OpMinus token", () => {
    const [, second, , fourth] = lex("asd - 123 - 4");
    expect(second).toEqual(new Token.OpMinus());
    expect(fourth).toEqual(new Token.OpMinus());
  });

  describe("should throw UnexpectedEndOfNumberError", () => {
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
          lex(text);
          expect("Did not throw error");
        } catch (e) {
          expect(e).toEqual(new UnexpectedEndOfNumberError(at));
        }
      });
    });
  });

  describe("should throw InvalidCharacterError", () => {
    const tests = [
      { text: "123 a123 | 123", at: "|" },
      { text: "123 113 ^", at: "^" },
      { text: "123 a123 # 123", at: "#" },
      { text: "123 a123 @ 123", at: "@" },
    ];

    tests.forEach(({ text, at }) => {
      it(`When parsing number '${at}'`, () => {
        expect(() => lex(text)).toThrow(new InvalidCharacterError(at));
      });
    });
  });
});
