export enum ReservedTokenType {
  LeftParenth = "(",
  RightParenth = ")",
  Semi = ";",
  LeftBracket = "{",
  RightBracket = "}",
  Assignment = "=",
  Comma = ",",
  Fn = "fn",
}

export default class ReservedToken<
  T extends ReservedTokenType = ReservedTokenType
> {
  public constructor(public readonly type: T) {}
}
