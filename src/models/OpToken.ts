export enum OperatorType {
  OpMinus = "-",
}

export default class OpToken {
  public constructor(public readonly type: OperatorType) {}
}

export class OpMinusToken extends OpToken {
  public constructor() {
    super(OperatorType.OpMinus);
  }
}
