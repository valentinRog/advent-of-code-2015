import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

type Reindeer = { v: number; dt1: number; dt2: number };
const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) => {
    const a = x.split(" ");
    return {
      v: Number(a[3]),
      dt1: Number(a[6]),
      dt2: Number(a.at(-2)),
    } as Reindeer;
  });

function dist(r: Reindeer, dt: number): number {
  const cycles = dt / (r.dt1 + r.dt2);
  const d = Math.floor(cycles) * r.v * r.dt1;
  dt = (cycles - Math.floor(cycles)) * (r.dt1 + r.dt2);
  return d + r.v * Math.min(Math.round(dt), r.dt1);
}

const score = new Array<number>(data.length).fill(0);

for (let k = 1; k <= 2503; k++) {
  let a = data.map((x, i) => [i, dist(x, k)]);
  const w = a.reduce((acc, x) => Math.max(acc, x[1]), 0);
  a = a.filter((x) => x[1] === w);
  for (const [i, _] of a) {
    score[i]++;
  }
}

console.log(Math.max(...score));
