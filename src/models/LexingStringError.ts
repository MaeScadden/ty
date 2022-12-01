import LexingError from "./LexingError";

export default class LexingStringError extends LexingError {
  private static readonly INFO_TEMPLATE = "string must be closed";

  public constructor(lineNumber: number, column: number, line: string) {
    super(lineNumber, column, line, LexingStringError.INFO_TEMPLATE);
  }
}
