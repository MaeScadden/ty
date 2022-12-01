import LexingError from "./LexingError";

export default class LexingUnsupportedCharacterError extends LexingError {
  public static readonly INFO_TEMPLATE =
    "Character '{}' is an invalid character";

  public constructor(
    lineNumber: number,
    column: number,
    line: string,
    character: string
  ) {
    super(
      lineNumber,
      column,
      line,
      LexingUnsupportedCharacterError.INFO_TEMPLATE.replace("{}", character)
    );
  }
}
