import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const [data, mol] = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n\n");
const m = data.split("\n").reduce((m, x) => {
  const [k, v] = x.split(" => ");
  return m.has(k) ? m.set(k, [...m.get(k)!, v]) : m.set(k, [v]);
}, new Map<string, string[]>());

const s = new Set<string>();
for (const [k, v] of m) {
  let i = 0;
  while (mol.indexOf(k, i) !== -1) {
    for (const x of v) {
      s.add(mol.substring(0, i) + mol.substring(i).replace(k, x));
    }
    i = mol.indexOf(k, i) + 1;
  }
}

console.log(s.size);
