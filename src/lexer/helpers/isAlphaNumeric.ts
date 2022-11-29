const REGEX = /[a-zA-Z_][\w\d]*/;
export default function isAlphaNumeric(text: string): boolean {
  const match = text.match(REGEX);
  return match?.[0].length === text.length;
}
