import * as mod from "https://deno.land/std@0.181.0/streams/mod.ts";
import { Md5 } from "https://deno.land/std@0.119.0/hash/md5.ts";

const data = new TextDecoder().decode(mod.readAllSync(Deno.stdin)).trim();

let n = 0;
for (; !new Md5().update(`${data}${n}`).toString().startsWith("000000"); n++);
console.log(n);
