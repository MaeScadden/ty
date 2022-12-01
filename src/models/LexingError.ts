export default class LexingError extends Error {
  public static readonly MESSAGE_TEMPLATE = `Error at line: {lineNumber} column: {column}\n{line}\n{carrot}{info}`;

  public constructor(
    public readonly lineNumber: number,
    public readonly column: number,
    public readonly line: string,
    public readonly info: string
  ) {
    super(LexingError.message(lineNumber, column, line, info));
  }

  private static message(
    lineNumber: number,
    column: number,
    line: string,
    info: string
  ): string {
    const columnLocation = " ".repeat(Math.max(0, column - 1)) + "^";

    return LexingError.MESSAGE_TEMPLATE.replace(
      "{lineNumber}",
      lineNumber.toString()
    )
      .replace("{column}", column.toString())
      .replace("{line}", line)
      .replace("{carrot}", columnLocation)
      .replace("{info}", info.length > 0 ? `\n${info}` : "");
  }
}
