import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = Number(new TextDecoder().decode(readAllSync(Deno.stdin)).trim());

function divisors(n: number): Set<number> {
  const res = new Set<number>();
  const sqrt = Math.sqrt(n);
  for (let i = 1; i <= sqrt; i++) {
    if (n % i === 0) {
      res.add(i);
      res.add(n / i);
    }
  }
  return res;
}

let i = 1;
const cache = new Map<number, number>();
while (
  [...divisors(i)]
    .filter((x) => (cache.get(x) || 0) < 50)
    .reduce((n, x) => n + 11 * x, 0) < data
) {
  [...divisors(i)].forEach((x) => {
    const v = cache.get(x) || 0;
    cache.set(x, v + 1);
  });
  i++;
}
console.log(i);
