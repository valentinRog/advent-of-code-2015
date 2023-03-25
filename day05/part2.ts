import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(mod.readAllSync(Deno.stdin))
  .trim()
  .split("\n");

console.log(
  data.filter(
    (s) =>
      s.split("").some((c, i) => i && s.lastIndexOf(s[i - 1] + c) > i) &&
      s.split("").some((c, i) => i > 1 && s[i - 2] === c)
  ).length
);
