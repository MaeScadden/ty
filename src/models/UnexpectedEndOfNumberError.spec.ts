import UnexpectedEndOfNumberError from "./UnexpectedEndOfNumberError";

describe("UnexpectedEndOfNumberError", () => {
  const attributes = [
    { attribute: "message", type: "string" },
    { attribute: "character", type: "string" },
    { attribute: "stack", type: "string" },
    { attribute: "name", type: "string" },
  ];

  attributes.forEach(({ attribute, type }) => {
    it(`should have '${attribute}' attribute`, () => {
      const error = new UnexpectedEndOfNumberError("123");
      expect(typeof error.message).toBe(type);
    });
  });

  describe(`should have message value of "Number '{number}.' must not end with a fullstop"`, () => {
    const defaultMessage: Readonly<string> =
      "Number '{}.' must not end with a fullstop";
    const testValues = ["123", "1.123", "-983"];

    testValues.forEach((number) => {
      it(`expecting: "Number '${number}.' must not end with a fullstop"`, () => {
        const expects = defaultMessage.replace("{}", number);

        const error = new UnexpectedEndOfNumberError(number);

        expect(error.message).toEqual(expects);
      });
    });
  });
});
