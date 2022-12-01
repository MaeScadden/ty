export enum OperatorType {
  Subtraction = "-",
}

export default class OperatorToken {
  public constructor(public readonly type: OperatorType) {}
}
