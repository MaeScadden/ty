import { argv } from "node:process";
import fs from "node:fs/promises";
import Lexer from "./lexer/Lexer.class";

(async () => {
  try {
    console.log("Got arguments: %s\n", argv);
    const lexer = new Lexer();

    const file = await fs.readFile("assets/sample.ty");
    const lexed = lexer.lex(file.toString());

    console.log("-- Lex Result! --");
    console.log(lexed);
    console.log("-----------------");
  } catch (e) {
    console.error(`Top Level Error! %s`, e);
  }
})();
