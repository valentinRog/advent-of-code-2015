import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const data: number[][] = new TextDecoder()
  .decode(mod.readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) =>
    x
      .split("x")
      .map((x) => Number(x))
      .sort((a, b) => a - b)
  );

console.log(
  data.reduce((n, x) => n + 2 * (x[0] + x[1]) + x.reduce((n, x) => n * x, 1), 0)
);
