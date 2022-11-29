import isNewLine from "./isNewLine";

describe("isNewLine", () => {
  it("should return true for '\n'", () => {
    expect(isNewLine("\n")).toBe(true);
  });

  const failures = ["a", "  ", "1", "", " "];
  failures.forEach((char) => {
    it(`should return false for '${char}'`, () => {
      expect(isNewLine(char)).toBe(false);
    });
  });
});
