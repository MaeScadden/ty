import LexingStringError from "./LexingStringError";

describe("LexingStringError", () => {
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
        };

        const error = new LexingStringError(
          args.lineNumber,
          args.column,
          args.line
        );

        const value = args[attribute as keyof typeof args];
        expect(error[attribute]).toBe(value);
      });
    });

    it("should set info = 'string must be closed'", () => {
      const error = new LexingStringError(1, 3, "");

      expect(error.info).toBe("string must be closed");
    });
  });

  it("should have correct message format", () => {
    const lineNumber = 1;
    const column = 3;
    const line = '"asdhadea';
    const expectedString = `Error at line: ${lineNumber} column: ${column}\n${line}\n  ^\nstring must be closed`;

    const error = new LexingStringError(lineNumber, column, line);

    expect(error.message).toEqual(expectedString);
  });

  interface Expectation {
    attribute: keyof LexingStringError;
    argPosition: number;
    transform?(a: unknown): string;
  }
});
