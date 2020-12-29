import { parse as cliParser } from "https://deno.land/std/flags/mod.ts";
import { ParsedNamed } from "./types.ts";
import { parse as nameParser } from "./parse.ts";

const helpMessage = `Name Parser

USAGE:
    deno run name_parser "[name to parse]"

OPTIONS:
    -h, --help
        Prints help information

EXAMPLE:
    deno run name_parser "John Smith"
`;

const {
  help = false,
  h = false,
  test, // REMVOE
  _: names,
} = cliParser(Deno.args);

if (help || h) {
  console.log(helpMessage);
} else {
  const output: ParsedNamed[] = [];

  for (const name of names) {
    if (typeof name !== "string") {
      console.error(`Error: Cannot parse the given input of ${name}`);
      continue;
    }

    output.push(nameParser(name));
  }

  console.log(output);
}
