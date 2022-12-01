import LexingError from "./LexingError";

export default class LexingNumberError extends LexingError {
  private static readonly INFO_TEMPLATE = "Number '{}' is invalid";

  public constructor(
    lineNumber: number,
    column: number,
    line: string,
    number: string
  ) {
    super(
      lineNumber,
      column,
      line,
      LexingNumberError.INFO_TEMPLATE.replace("{}", number)
    );
  }
}
