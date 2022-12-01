import OperatorToken, { OperatorType } from "./OperatorToken";

describe("OperatorToken", () => {
  it("should set this.type to first argument", () => {
    const op = OperatorType.Subtraction;
    const token = new OperatorToken(op);

    expect(token.type).toBe(op);
  });
});
