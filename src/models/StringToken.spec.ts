import StringToken from "./StringToken";

describe("StringToken", () => {
  it("should set this.value to first argument of constructor", () => {
    const identifier = String(new Date());
    const token = new StringToken(identifier);
    expect(token.value).toBe(identifier);
  });
});
