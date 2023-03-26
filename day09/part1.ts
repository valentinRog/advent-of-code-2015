import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n");
const cities = new Set<string>(
  data.flatMap((x) => [x.split(" ")[0], x.split(" ")[2]])
);

const g = new Map<string, Map<string, number>>();
cities.forEach((x) => g.set(x, new Map<string, number>()));
data.forEach((x) => {
  const a = x.split(" ");
  g.get(a[0])!.set(a[2], Number(a.at(-1)));
  g.get(a[2])!.set(a[0], Number(a.at(-1)));
});

function compute(
  current: string,
  d = 0,
  visited = new Set<string>([current])
): number {
  return visited.size === cities.size
    ? d
    : [...g.get(current)!.entries()]
        .filter(([k, _]) => !visited.has(k))
        .reduce(
          (n, [k, v]) =>
            Math.min(n, compute(k, d + v, new Set<string>([...visited, k]))),
          Infinity
        );
}

console.log(Math.min(...[...g.keys()].map((x) => compute(x))));
