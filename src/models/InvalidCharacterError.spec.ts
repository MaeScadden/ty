import InvalidCharacterError from "./InvalidCharacterError";

describe("InvalidCharacterError", () => {
  const attributes = [
    { attribute: "message", type: "string" },
    { attribute: "character", type: "string" },
    { attribute: "stack", type: "string" },
    { attribute: "name", type: "string" },
  ];

  attributes.forEach(({ attribute, type }) => {
    it(`should have '${attribute}' attribute`, () => {
      const error = new InvalidCharacterError("thisdoesnotmatter");
      expect(typeof error.message).toBe(type);
    });
  });

  describe(`should have message value of "Character '{input}' is an invalid character"`, () => {
    const defaultMessage: Readonly<string> =
      "Character '{}' is an invalid character";
    const testValues = "abc".split("");

    testValues.forEach((char) => {
      it(`expecting: "Character '${char}' is an invalid character"`, () => {
        const expects = defaultMessage.replace("{}", char);

        const error = new InvalidCharacterError(char);

        expect(error.message).toEqual(expects);
      });
    });
  });
});
