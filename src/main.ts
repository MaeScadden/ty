import { argv } from "node:process";
import fs from "node:fs/promises";
import lex from "./lexer/lex";

(async () => {
  try {
    console.log("Got arguments: %s\n", argv);

    const buffer = await fs.readFile("assets/sample.ty");
    const content = buffer.toString();
    const lexed = lex(content);
    console.log("-- Lex Result! --");
    console.log(lexed);
    console.log("-----------------");
  } catch (e) {
    console.error(`Top Level Error! %s`, e);
  }
})();
