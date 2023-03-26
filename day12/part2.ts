import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = JSON.parse(new TextDecoder().decode(readAllSync(Deno.stdin)));

function compute(o: unknown): number {
  if (typeof o === "object") {
    if (
      !Array.isArray(o) &&
      Object.values(o as Record<string, unknown>).find((x) => x === "red")
    ) {
      return 0;
    }
    return Object.values(o as Record<string, unknown>).reduce(
      (n: number, x: unknown) => n + compute(x),
      0
    );
  }
  return typeof o === "number" ? o : 0;
}

console.log(compute(data));
