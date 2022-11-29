export default function isNumber(text: string): boolean {
  return text != " " && !isNaN(+text);
}
