import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";

type Direction = "<" | ">" | "^" | "v";

const data = [...mod.readAllSync(Deno.stdin)]
  .map((x) => String.fromCharCode(x))
  .filter((x) => "<>v^".includes(x)) as Direction[];

type Point = { x: number; y: number };

const dir: Record<Direction, (p: Point) => void> = {
  ">": (p) => {
    p.x++;
  },
  "<": (p) => {
    p.x--;
  },
  "^": (p) => {
    p.y++;
  },
  v: (p) => {
    p.y--;
  },
};

const s = new Set<string>();
const p: Point = { x: 0, y: 0 };
s.add(JSON.stringify(p));
data.forEach((c: Direction) => {
  dir[c](p);
  s.add(JSON.stringify(p));
});
console.log(s.size);
