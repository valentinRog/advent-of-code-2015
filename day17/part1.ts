import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map(Number);
const TARGET = 150;

const cache = new Set<string>();
function generate(bucket = new Set<number>()): number {
  if (cache.has(JSON.stringify([...bucket].sort()))) {
    return 0;
  }
  cache.add(JSON.stringify([...bucket].sort()));
  const n = [...bucket].reduce((n, x) => n + data[x], 0);
  if (n >= TARGET) {
    return n === TARGET ? 1 : 0;
  }
  return data.reduce(
    (n, _, i) => n + generate(new Set<number>([...bucket, i])),
    0
  );
}

console.log(generate());
