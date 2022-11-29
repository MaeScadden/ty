import OpToken, { OperatorType, OpMinusToken } from "./OpToken";

describe("OpToken", () => {
  it("should set this.type to first argument", () => {
    const op = OperatorType.OpMinus;
    const token = new OpToken(op);

    expect(token.type).toBe(op);
  });

  describe("OpMinusToken", () => {
    it("should set this.type to OperatorType.OpMinus", () => {
      const token = new OpMinusToken();

      expect(token.type).toBe(OperatorType.OpMinus);
    });
  });
});
