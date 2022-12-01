export enum ReservedTokenType {
  LeftParenth = "(",
  RightParenth = ")",
  Semi = ";",
  LeftBracket = "{",
  RightBracket = "}",
  Assignment = "=",
  Comma = ",",
}

export default class ReservedToken {
  public constructor(public readonly type: ReservedTokenType) {}
}
