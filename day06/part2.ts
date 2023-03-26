import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

const W = 1000;

type Action = {
  action: "on" | "toggle" | "off";
  p0: number;
  p1: number;
};

const data = new TextDecoder()
  .decode(mod.readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .map((x) => {
    const a = x.replace("turn ", "").replaceAll(" ", ",").split(",");
    return {
      action: a[0],
      p0: Number(a[2]) * W + Number(a[1]),
      p1: Number(a[5]) * W + Number(a[4]),
    } as Action;
  });

const lights = new Map<number, number>();

data.forEach((a) => {
  for (let y = Math.floor(a.p0 / W); y <= a.p1 / W; y++) {
    for (let x = Math.floor(a.p0 % W); x <= a.p1 % W; x++) {
      const p = y * W + x;
      let n = lights.get(p) || 0;
      lights.delete(p);
      switch (a.action) {
        case "on":
          n++;
          break;
        case "off":
          n--;
          break;
        default:
          n += 2;
      }
      if (n > 0) {
        lights.set(p, n);
      }
    }
  }
});

console.log([...lights].reduce((n, x) => n + x[1], 0));
