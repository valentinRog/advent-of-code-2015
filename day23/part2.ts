import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .replaceAll(",", "")
  .split("\n")
  .map((x) => x.split(" "));

let i = 0;

const rs = {
  a: 1,
  b: 0,
};

type Op = "hlf" | "tpl" | "inc" | "jmp" | "jie" | "jio";

function compute(o: Op, arr: string[]) {
  type rsT = keyof typeof rs;
  ({
    hlf: () => (rs[arr[0] as rsT] /= 2),
    tpl: () => (rs[arr[0] as rsT] *= 3),
    inc: () => rs[arr[0] as rsT]++,
    jmp: () => (i += Number(arr.at(-1)) - 1),
    jie: () => rs[arr[0] as rsT] % 2 === 0 && (i += Number(arr.at(-1)) - 1),
    jio: () => rs[arr[0] as rsT] === 1 && (i += Number(arr.at(-1)) - 1),
  }[o]());
  i++;
}

while (i < data.length) {
  compute(data[i][0] as Op, data[i].slice(1));
}

console.log(rs.b);
