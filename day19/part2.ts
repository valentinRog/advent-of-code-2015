import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const [data, mol] = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n\n");
const m = data.split("\n").reduce((m, x) => {
  const [v, k] = x.split(" => ");
  return m.set(k, v);
}, new Map<string, string>());

let res = Infinity;
const cache = new Map<string, number>();
function compute(mol: string, n = 0) {
  if (n >= res) {
    return;
  }
  if (cache.has(mol) && n >= cache.get(mol)!) {
    return;
  }
  cache.set(mol, n);
  if (mol === "e") {
    res = Math.min(res, n);
    console.log(res)
    Deno.exit()
    return;
  }
  for (const [k, v] of m) {
    let i = 0;
    while (mol.indexOf(k, i) !== -1) {
      compute(mol.substring(0, i) + mol.substring(i).replace(k, v), n + 1);
      i = mol.indexOf(k, i) + 1;
    }
  }
}

compute(mol);
console.log(res);
