import NumberToken from "./NumberToken";

describe("NumberToken", () => {
  it("should set this.value with first argument to constructor", () => {
    const value = 1;

    const token = new NumberToken(value);

    expect(token.value).toBe(value);
  });
});
