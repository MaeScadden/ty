export default class UnexpectedEndOfNumberError extends Error {
  public static readonly DEFAULT_ERROR_MESSAGE =
    "Number '{}.' must not end with a fullstop";

  public constructor(public readonly number: string) {
    super(
      UnexpectedEndOfNumberError.DEFAULT_ERROR_MESSAGE.replace("{}", number)
    );
  }
}
