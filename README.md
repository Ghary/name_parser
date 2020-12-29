# Name Parser

## About
Name Parser attempts to split full human names into individual parts such as the fore name, given name, aliases, and generations.

Name Parser is a code port from the JavaScript project [nameparts (JS)](https://github.com/Ghary/nameparts), which was a port from a Python project of the same name [nameparts (Py)](https://github.com/polera/nameparts).


## How to use

### Importing
```ts
import { parse } from "https://deno.land/x/name_parser/mod.ts";

const parts = parse('Bruce Wayne a/k/a Batman');
/*
{
  input: "Bruce Wayne a/k/a Batman",
  salutation: null,
  foreName: "Bruce",
  middleName: null,
  surName: "Wayne",
  generation: null,
  suffix: null,
  aliases: [ "Batman" ],
  hasCorporateEntity: false,
  hasNonName: true,
  hasSurNamePrefix: false,
  hasSupplementalInfo: false
}
*/
```

### Command Line
```bash
$ deno run https://deno.land/x/name_parser/cli.ts "Bruce Wayne a/k/a Batman"
> [
  {
    input: "Bruce Wayne a/k/a Batman",
    salutation: null,
    foreName: "Bruce",
    middleName: null,
    surName: "Wayne",
    generation: null,
    suffix: null,
    aliases: [ "Batman" ],
    hasCorporateEntity: false,
    hasNonName: true,
    hasSurNamePrefix: false,
    hasSupplementalInfo: false
  }
]
```
