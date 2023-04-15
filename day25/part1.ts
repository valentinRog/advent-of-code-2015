import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder().decode(readAllSync(Deno.stdin)).trim();
const [y, x] = data.match(/\d+/g)!.map(Number);

function un(x: number, y: number): number {
  if (y === 0) return (x + 1) * ((2 + x) / 2);
  return un(x + 1, y - 1) - 1;
}

const n = un(x - 1, y - 1);
let res = 20151125;
for (let i = 1; i < n; i++) res = (res * 252533) % 33554393;
console.log(res);
