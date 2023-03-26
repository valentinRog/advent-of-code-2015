import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder().decode(readAllSync(Deno.stdin)).trim();

function incr(s: string, ret = 1): string {
  if (!ret) {
    return s;
  }
  if (s === "") {
    return ret ? "a" : "";
  }
  let c = s.at(-1)!;
  c = c === "z" ? "a" : String.fromCharCode(c.charCodeAt(0) + 1);
  return incr(s.substring(0, s.length - 1), Number(c === "a")) + c;
}

function valid(s: string): boolean {
  function has2Double(s: string): boolean {
    const doubled = new Set<string>();
    for (let i = 0; i < s.length - 1; i++) {
      if (s[i] === s[i + 1]) {
        doubled.add(s.slice(i, i + 2));
      }
    }
    return doubled.size >= 2;
  }
  function hasStraight(s: string): boolean {
    for (let i = 0; i <= s.length - 3; i++) {
      if (
        s.charCodeAt(i) <= "x".charCodeAt(0) &&
        s[i + 1] === incr(s[i]) &&
        s[i + 2] === incr(s[i + 1])
      ) {
        return true;
      }
    }
    return false;
  }
  return !/i|o|l/.test(s) && has2Double(s) && hasStraight(s);
}

function computePassword(s: string): string {
  while (!valid(s)) {
    s = incr(s);
  }
  return s;
}

console.log(computePassword(data));
