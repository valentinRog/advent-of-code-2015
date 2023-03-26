import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data: number[][] = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) =>
    x
      .split("x")
      .map((x) => Number(x))
      .sort((a, b) => a - b)
  );

console.log(
  data.reduce(
    (n, x) => n + 3 * x[0] * x[1] + 2 * x[0] * x[2] + 2 * x[1] * x[2],
    0
  )
);
