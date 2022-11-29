import isAlphaNumeric from "./isAlphaNumeric";

describe("isAlphaNumeric", () => {
  const passes = [
    "a",
    "abc",
    "asd213",
    "a123asd123",
    "aAdasV_",
    "asd_d_123_asd",
  ];
  const fails = ["12ase", "123"].concat(
    ..."-=+!@#$%^&*(),.<>/?;:'\"[{}]\\|`~".split("")
  );

  passes.forEach((text) => {
    it(`returns true for '${text}'`, () => {
      expect(isAlphaNumeric(text)).toBe(true);
    });
  });

  fails.forEach((text) => {
    it(`returns false for '${text}'`, () => {
      expect(isAlphaNumeric(text)).toBe(false);
    });
  });
});
