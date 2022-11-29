import IdentifierToken from "./IdentifierToken";

describe("IdentifierToken", () => {
  it("should set this.value to first argument of constructor", () => {
    const identifier = String(new Date());
    const token = new IdentifierToken(identifier);
    expect(token.value).toBe(identifier);
  });
});
