import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

console.log(
  new TextDecoder()
    .decode(readAllSync(Deno.stdin))
    .trim()
    .split("\n")
    .reduce((n, s) => (n += s.length - eval(`${s}.length`)), 0)
);
