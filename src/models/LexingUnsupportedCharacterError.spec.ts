import LexingUnsupportedCharacterError from "./LexingUnsupportedCharacterError";

describe("LexingUnsupportedCharacterError", () => {
  const expectations: Expectation[] = [
    { attribute: "lineNumber", argPosition: 0 },
    { attribute: "column", argPosition: 1 },
    { attribute: "line", argPosition: 2 },
  ];

  describe("constructor", () => {
    expectations.forEach(({ attribute, argPosition }) => {
      it(`argument[${argPosition}] be assigned to this.${attribute}`, () => {
        const args = {
          lineNumber: 5,
          column: 4,
          line: "<line>",
          character: "",
        };

        const error = new LexingUnsupportedCharacterError(
          args.lineNumber,
          args.column,
          args.line,
          args.character
        );

        const value = args[attribute as keyof typeof args];
        expect(error[attribute]).toBe(value);
      });
    });

    it(`should set info = "Character '~' is an invalid character"`, () => {
      const error = new LexingUnsupportedCharacterError(
        1,
        3,
        "foo ~ hello",
        "~"
      );

      expect(error.info).toBe("Character '~' is an invalid character");
    });
  });

  it("should have correct message format", () => {
    const lineNumber = 1;
    const column = 4;
    const char = "~~";
    const line = `"asdh${char}adea`;
    const expectedString = `Error at line: ${lineNumber} column: ${column}\n${line}\n   ^\nCharacter '${char}' is an invalid character`;

    const error = new LexingUnsupportedCharacterError(
      lineNumber,
      column,
      line,
      char
    );

    expect(error.message).toEqual(expectedString);
  });

  interface Expectation {
    attribute: keyof LexingUnsupportedCharacterError;
    argPosition: number;
    transform?(a: unknown): string;
  }
});
