import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

type Ingredient = {
  capacity: number;
  durability: number;
  flavor: number;
  texture: number;
};
const data: Ingredient[] = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .replaceAll(",", "")
  .split("\n")
  .map((x) => {
    const a = x
      .split(" ")
      .filter((x) => /^\d+$|-/.test(x))
      .map((x) => Number(x));
    return {
      capacity: a[0],
      durability: a[1],
      flavor: a[2],
      texture: a[3],
    };
  });

function score(k: number[]): number {
  const a = Array<number>(4).fill(0);
  k.forEach((x, i) => {
    a[0] += x * data[i].capacity;
    a[1] += x * data[i].durability;
    a[2] += x * data[i].flavor;
    a[3] += x * data[i].texture;
  });
  return a.map((x) => x < 0 ? 0 : x).reduce((n, x) => n * x);
}

const configs: number[][] = [[]];
while (configs[0].length < data.length) {
  const x = configs.shift()!;
  for (let i = 0; i <= 100; i++) {
    const n = x.reduce((n, x) => n + x, 0) + i;
    if (n <= 100) {
      if (x.length + 1 < data.length || n === 100) {
        configs.push([...x, i]);
      }
    }
  }
}
console.log(configs.reduce((n, x) => Math.max(n, score(x)), 0));
