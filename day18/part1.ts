import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .replaceAll("\n", "");
const W = Math.sqrt(data.length);
let m = new Set<number>(
  [...data]
    .map((x, i) => [x, i])
    .filter(([x, _]) => x === "#")
    .map(([_, x]) => x as number)
);

function print() {
  let s = "";
  for (let i = 0; i < W * W; i++) {
    if (i % W === 0) {
      s += "\n";
    }
    if (m.has(i)) {
      s += "#";
    } else {
      s += ".";
    }
  }
  console.log(s);
}

function next(): Set<number> {
  const conf = new Set<number>();
  for (let i = 0; i < W * W; i++) {
    const x = i % W;
    const y = Math.floor(i / W);
    const nb = [
      [x, y + 1],
      [x, y - 1],
      [x + 1, y],
      [x - 1, y],
      [x + 1, y + 1],
      [x + 1, y - 1],
      [x - 1, y + 1],
      [x - 1, y - 1],
    ].filter(
      ([x, y]) => x >= 0 && x < W && y >= 0 && y < W && m.has(y * W + x)
    ).length;
    if (m.has(i) && (nb === 2 || nb === 3)) {
      conf.add(i);
    } else if (nb === 3) {
      conf.add(i);
    }
  }
  return conf;
}

for (let i = 0; i < 100; i++) {
  m = next();
}
console.log(m.size);
