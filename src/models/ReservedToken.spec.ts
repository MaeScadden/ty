import ReservedToken, { ReservedTokenType } from "./ReservedToken";

describe("ReservedToken", () => {
  it("should set this.type to first argument", () => {
    const type = ReservedTokenType.Semi;
    const token = new ReservedToken(type);

    expect(token.type).toBe(type);
  });
});
