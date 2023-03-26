import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder().decode(readAllSync(Deno.stdin)).trim();

function compute(s: string): string {
  let res = "";
  let acc = 0;
  let c = s[0];
  for (const x of s) {
    if (x !== c) {
      res += `${acc}${c}`;
      acc = 0;
      c = x;
    }
    acc++;
  }
  res += `${acc}${c}`;
  return res;
}

let s = data;
for (let i = 0; i < 40; i++) {
  s = compute(s);
}

console.log(s.length);
