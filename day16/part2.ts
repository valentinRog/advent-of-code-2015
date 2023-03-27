import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) => x.substring(x.indexOf(":") + 2))
  .map((x) =>
    x.split(", ").reduce((acc, x) => {
      const [k, v] = x.split(": ");
      return acc.set(k, Number(v));
    }, new Map<string, number>())
  );

const tt = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

console.log(
  data.findIndex((x) =>
    [...x.entries()].every(([k, v]) => {
      if (k === "cats" || k === "trees") {
        return tt[k as keyof typeof tt] < v;
      }
      if (k === "pomeranians" || k === "goldfish") {
        return tt[k as keyof typeof tt] > v;
      }
      return tt[k as keyof typeof tt] === v;
    })
  ) + 1
);
