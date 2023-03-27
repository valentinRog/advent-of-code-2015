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
  return d + r.v * Math.min(dt, r.dt1);
}

console.log(data.reduce((n, x) => Math.max(n, dist(x, 2503)), 0));
