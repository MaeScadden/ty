import isQoute from "./isQoute";

describe("isQoute", () => {
  const passes = `"'`.split("");
  const fails =
    "1234567890abcdefghijklmnop-_=+!@#$%^&*(),.<>/?;:[{}]\\|`~".split("");

  passes.forEach((char) => {
    it(`returns true for '${char}'`, () => {
      expect(isQoute(char)).toBe(true);
    });
  });

  fails.forEach((char) => {
    it(`returns false for '${char}'`, () => {
      expect(isQoute(char)).toBe(false);
    });
  });
});
