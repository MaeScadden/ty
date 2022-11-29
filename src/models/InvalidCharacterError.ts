export default class InvalidCharacterError extends Error {
  public static readonly DEFAULT_ERROR_MESSAGE =
    "Character '{}' is an invalid character";

  public constructor(public readonly character: string) {
    super(InvalidCharacterError.DEFAULT_ERROR_MESSAGE.replace("{}", character));
  }
}
