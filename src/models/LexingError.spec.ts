import LexingError from "./LexingError";

describe("LexingError", () => {
  it("first argument should be set to lineNumber", () => {
    const { lineNumber, column, line, info } = genErrorArguments();

    const error = new LexingError(lineNumber, column, line, info);

    expect(error.lineNumber).toEqual(lineNumber);
  });

  it("second argument should be set to column", () => {
    const { lineNumber, column, line, info } = genErrorArguments();

    const error = new LexingError(lineNumber, column, line, info);

    expect(error.column).toEqual(column);
  });

  it("third argument should be set to line", () => {
    const { lineNumber, column, line, info } = genErrorArguments();

    const error = new LexingError(lineNumber, column, line, info);

    expect(error.line).toEqual(line);
  });

  it("fourth argument should be set to info", () => {
    const { lineNumber, column, line, info } = genErrorArguments();

    const error = new LexingError(lineNumber, column, line, info);

    expect(error.info).toBe(info);
  });

  describe("message", () => {
    describe("cursor location", () => {
      it("should be equal ' '.repeat(cursor - 1) when cursor > 0", () => {
        const column = 3;
        const args = genErrorArguments({ column });
        const error = new LexingError(
          args.lineNumber,
          column,
          args.line,
          args.info
        );

        const carrot = " ".repeat(column - 1) + "^";
        expect(error.message).toContain(carrot);
      });

      it("should be equal '^' when cursor == 0", () => {
        const column = 1;
        const args = genErrorArguments({ column });
        const error = new LexingError(
          args.lineNumber,
          column,
          args.line,
          args.info
        );

        expect(error.message).toContain("^");
      });
    });

    const expectations = [
      {
        input: "Error at line: {lineNumber}",
        args: genErrorArguments({ lineNumber: 8 }),
      },
      {
        input: "line: {lineNumber} column: {column}",
        args: genErrorArguments({ column: 8 }),
      },
      {
        input: "column: {column}\n{line}",
        args: genErrorArguments({ column: 8, line: "<column-line>" }),
      },
      {
        input: "\n{line}\n{carrot}",
        args: genErrorArguments({ column: 4, line: "<line-carrot>" }),
      },
      {
        input: "{carrot}{info}",
        args: genErrorArguments({ column: 5, info: "<carrot-info>" }),
      },
    ];

    expectations.forEach(({ input, args }) => {
      const expected = expecting(input, args);

      it(`message contains \`${expected}\``, () => {
        const error = new LexingError(
          args.lineNumber,
          args.column,
          args.line,
          args.info
        );

        expect(error.message).toContain(expected);
      });
    });

    function expecting(
      input: string,
      { lineNumber, column, line, info }: GenErrorArguments
    ): string {
      const columnLocation = " ".repeat(column - 1) + "^";

      return input
        .replace("{lineNumber}", lineNumber.toString())
        .replace("{column}", column.toString())
        .replace("{line}", line)
        .replace("{carrot}", columnLocation)
        .replace("{info}", info.length > 0 ? `\n${info}` : "");
    }
  });

  function genErrorArguments(
    args: Partial<GenErrorArguments> = {}
  ): GenErrorArguments {
    return {
      column: 10,
      lineNumber: 1,
      line: "",
      info: "",
      ...args,
    };
  }

  interface GenErrorArguments {
    lineNumber: number;
    column: number;
    line: string;
    info: string;
  }
});
