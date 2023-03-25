import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const data: string[] = [...mod.readAllSync(Deno.stdin)]
  .map((x) => String.fromCharCode(x))
  .filter((x) => x === "(" || x == ")");

let n = 0;
for (const [i, c] of data.entries()) {
  n += { "(": 1, ")": -1 }[c]!;
  if (n === -1) {
    console.log(i + 1);
    break;
  }
}
