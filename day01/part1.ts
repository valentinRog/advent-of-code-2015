import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const data: string[] = [...mod.readAllSync(Deno.stdin)]
  .map((x) => String.fromCharCode(x))
  .filter((x) => x === "(" || x == ")");

console.log(data.reduce((n: number, c) => n + { "(": 1, ")": -1 }[c]!, 0));
