import lex from "./lex";

describe("lex", () => {
  it("should return an array", () => {
    const result = lex("");
    expect(Array.isArray(result)).toBe(true);
  });
});
