import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const [data, mol] = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n\n");
const m = data.split("\n").reduce((m, x) => {
  const [v, k] = x.split(" => ");
  return m.set(k, v);
}, new Map<string, string>());

function compute(s: string): number {
  if (s === "e") {
    return 0;
  }
  const [k, v] = [...m.entries()].find(([k, _]) => s.includes(k))!;
  return 1 + compute(s.replace(k, v));
}

console.log(compute(mol));
