import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .reduce((map, line) => {
    const [value, key] = line.split(" -> ");
    map.set(key, value);
    return map;
  }, new Map<string, string>());

type OP = "AND" | "OR" | "LSHIFT" | "RSHIFT" | "NOT";

const op: Record<OP, string> = {
  AND: "&",
  OR: "|",
  LSHIFT: "<<",
  RSHIFT: ">>",
  NOT: "~",
};

const cache = new Map<string, number>();
function compute(k: string): number {
  if (cache.has(k)) {
    return cache.get(k)!;
  }
  let expr = data.get(k)!;
  const tok = expr.split(" ");
  tok.forEach((t) => {
    if (data.has(t)) {
      expr = expr.replaceAll(t, compute(t).toString());
    }
  });
  for (const k in op) {
    expr = expr.replaceAll(k, op[k as OP]);
  }
  cache.set(k, eval(expr));
  return eval(expr);
}

console.log(compute("a"));
