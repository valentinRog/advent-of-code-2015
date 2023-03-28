import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .flatMap((x) => Number(x.split(": ")[1]));
type entity = { hp: number; dmg: number; armor: number };
const boss = { hp: data[0], dmg: data[1], armor: data[2] };

type item = { name: number; cost: number; dmg: number; armor: number };
const shop = {
  weapons: [
    { cost: 8, dmg: 4, armor: 0 },
    { cost: 10, dmg: 5, armor: 0 },
    { cost: 25, dmg: 6, armor: 0 },
    { cost: 40, dmg: 7, armor: 0 },
    { cost: 74, dmg: 8, armor: 0 },
  ].map((x, i) => ({ ...x, name: i } as item)),
  armor: [
    { cost: 13, dmg: 0, armor: 1 },
    { cost: 31, dmg: 0, armor: 2 },
    { cost: 53, dmg: 0, armor: 3 },
    { cost: 75, dmg: 0, armor: 4 },
    { cost: 102, dmg: 0, armor: 5 },
  ].map((x, i) => ({ ...x, name: i } as item)),
  rings: [
    { cost: 25, dmg: 1, armor: 0 },
    { cost: 50, dmg: 2, armor: 0 },
    { cost: 100, dmg: 3, armor: 0 },
    { cost: 20, dmg: 0, armor: 1 },
    { cost: 40, dmg: 0, armor: 2 },
    { cost: 80, dmg: 0, armor: 3 },
  ].map((x, i) => ({ ...x, name: i } as item)),
};

function win(player: entity) {
  const e = { ...boss };
  while (true) {
    e.hp -= Math.max(1, player.dmg - e.armor);
    if (e.hp <= 0) return true;
    player.hp -= Math.max(1, e.dmg - player.armor);
    if (player.hp <= 0) return false;
  }
}

const configs: item[][] = [];
for (const w of shop.weapons) {
  for (const a of [...shop.armor, { cost: 0, dmg: 0, armor: 0 }] as item[]) {
    configs.push([w, a]);
    for (const r1 of shop.rings) {
      configs.push([w, a, r1]);
      for (const r2 of shop.rings) {
        if (r1.name !== r2.name) configs.push([w, a, r1, r2]);
      }
    }
  }
}

const res = configs
  .filter((x) => {
    const player = { hp: 100, dmg: 0, armor: 0 };
    for (const i of x) {
      player.dmg += i.dmg;
      player.armor += i.armor;
    }
    return win(player);
  })
  .reduce(
    (n, x) =>
      Math.min(
        n,
        x.reduce((n, x) => n + x.cost, 0)
      ),
    Infinity
  );
console.log(res);
