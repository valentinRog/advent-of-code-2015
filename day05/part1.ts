import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(mod.readAllSync(Deno.stdin))
  .trim()
  .split("\n");
const vowels = "aeiou";
const exclusions = ["ab", "cd", "pq", "xy"];

console.log(
  data.filter(
    (s) =>
      s.split("").filter((c) => vowels.indexOf(c) !== -1).length >= 3 &&
      s.split("").some((c, i) => i && s[i - 1] === c) &&
      !exclusions.some((x) => s.indexOf(x) !== -1)
  ).length
);
