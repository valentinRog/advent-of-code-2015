import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const W = 1000;

type Action = {
  action: "on" | "toggle" | "off";
  p0: number;
  p1: number;
};

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
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

const lights = new Set<number>();

data.forEach((a) => {
  for (let y = Math.floor(a.p0 / W); y <= a.p1 / W; y++) {
    for (let x = Math.floor(a.p0 % W); x <= a.p1 % W; x++) {
      switch (a.action) {
        case "on":
          lights.add(y * W + x);
          break;
        case "off":
          lights.delete(y * W + x);
          break;
        default:
          if (lights.has(y * W + x)) {
            lights.delete(y * W + x);
          } else {
            lights.add(y * W + x);
          }
      }
    }
  }
});

console.log(lights.size);
