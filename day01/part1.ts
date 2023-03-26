import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data: string[] = [...readAllSync(Deno.stdin)]
  .map((x) => String.fromCharCode(x))
  .filter((x) => "()".includes(x));

console.log(data.reduce((n: number, c) => n + { "(": 1, ")": -1 }[c]!, 0));
