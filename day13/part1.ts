import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .replaceAll("gain ", "")
  .replaceAll("lose ", "-")
  .replaceAll(".", "")
  .split("\n");
const names = new Set<string>(data.map((x) => x.split(" ")[0]));
const L = names.size;
const g = new Map<string, Map<string, number>>();
names.forEach((x) => g.set(x, new Map<string, number>()));
data.forEach((x) => {
  const a = x.split(" ");
  g.get(a[0])!.set(a.at(-1)!, Number(a[2]));
});

const configs: string[][] = [[]];
while (configs[0].length < L) {
  const x = configs.shift()!;
  for (const name of names) {
    if (x.indexOf(name) === -1) {
      configs.push([...x, name]);
    }
  }
}

console.log(
    configs.reduce((n, x) =>
      Math.max(n , x.reduce(
        (n, name, i) =>
          n +
          g.get(name)!.get(x[(i + 1) % L])! +
          g.get(name)!.get(x[(i - 1 + L) % L])!,
        0
      )), 0
    )
);
