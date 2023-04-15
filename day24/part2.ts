import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) => Number(x)).sort((a, b) => b - a);

const GROUP_WEIGHT = data.reduce((a, b) => a + b, 0) / 4;

function weight(n: number): number {
  return data.reduce((acc, x, i) => acc + (n & (1 << i) ? x : 0), 0);
}

function qe(n: number): number {
  return data.reduce((acc, x, i) => acc * (n & (1 << i) ? x : 1), 1);
}

function count(n: number): number {
  return data.reduce((acc, _, i) => acc + (n & (1 << i) ? 1 : 0), 0);
}

function has_solution(r: number, g = 0): boolean {
  if (weight(g) > GROUP_WEIGHT) return false;
  if (weight(g) === GROUP_WEIGHT) return r ? has_solution(r, 0) : true;
  for (let i = 0; i < data.length; i++)
    if (r & (1 << i) && has_solution(r & ~(1 << i), g | (1 << i))) return true;
  return false;
}

let min_packages = Infinity;
let res = Infinity;
const cache = new Set<number>();
(function dfs(g = 0, r = (1 << data.length) - 1): void {
  if (cache.has(g)) return;
  cache.add(g);
  if (weight(g) > GROUP_WEIGHT || qe(g) >= res) return;
  if (count(g) > min_packages) return;
  if (weight(g) === GROUP_WEIGHT) {
    if (!has_solution(r)) return;
    min_packages = count(g);
    res = qe(g);
    return;
  }
  for (let i = 0; i < data.length; i++)
    if (r & (1 << i)) dfs(g | (1 << i), r & ~(1 << i));
})();

console.log(res);
