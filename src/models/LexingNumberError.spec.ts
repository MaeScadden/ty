import LexingNumberError from "./LexingNumberError";

describe("LexingNumberError", () => {
  const expectations: Expectation[] = [
    { attribute: "lineNumber", argPosition: 0 },
    { attribute: "column", argPosition: 1 },
    { attribute: "line", argPosition: 2 },
    {
      attribute: "info",
      argPosition: 3,
      transform(replace): string {
        return "Number '{}' is invalid".replace("{}", String(replace));
      },
    },
  ];

  describe("constructor", () => {
    expectations.forEach(({ attribute, argPosition, transform }) => {
      it(`argument[${argPosition}] be assigned to this.${attribute}`, () => {
        const args = {
          lineNumber: 5,
          column: 4,
          line: "<line>",
          number: "9",
        };

        const expected: unknown = transform
          ? transform(String(args.number))
          : args[attribute as keyof typeof args];

        const error = new LexingNumberError(
          args.lineNumber,
          args.column,
          args.line,
          args.number
        );

        expect(error[attribute]).toBe(expected);
      });
    });
  });

  it("should have correct message format", () => {
    const lineNumber = 1;
    const column = 2;
    const line = "<line>";
    const num = "3.";
    const expectedString = `Error at line: ${lineNumber} column: ${column}\n${line}\n ^\nNumber '${num}' is invalid`;

    const error = new LexingNumberError(lineNumber, column, line, num);

    expect(error.message).toEqual(expectedString);
  });

  interface Expectation {
    attribute: keyof LexingNumberError;
    argPosition: number;
    transform?(a: unknown): string;
  }
});
