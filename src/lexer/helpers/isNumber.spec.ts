import isNumber from "./isNumber";

describe("isNumber", () => {
  const passes = [..."1234567890".split(""), "1.0", "-1.0"];
  const fails = [
    ..."abcdefghijklmnop-_=+!@#$%^&*(),.<>/?;:'\"[{}]\\|`~".split(""),
    "1a",
    "-1.b",
    "1.a",
  ];

  passes.forEach((char) => {
    it(`returns true for '${char}'`, () => {
      expect(isNumber(char)).toBe(true);
    });
  });

  fails.forEach((char) => {
    it(`returns false for '${char}'`, () => {
      expect(isNumber(char)).toBe(false);
    });
  });
});
