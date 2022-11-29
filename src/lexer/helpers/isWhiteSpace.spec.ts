import isWhiteSpace from "./isWhiteSpace";

describe("isWhiteSpace", () => {
  it("should return true for ' '", () => {
    expect(isWhiteSpace(" ")).toBe(true);
  });

  const failures = ["a", "  ", "1", ""];
  failures.forEach((char) => {
    it(`should return false for '${char}'`, () => {
      expect(isWhiteSpace(char)).toBe(false);
    });
  });
});
