import { readAllSync } from "https://deno.land/std@0.181.0/streams/mod.ts";

const data = new TextDecoder()
  .decode(readAllSync(Deno.stdin))
  .trim()
  .split("\n")
  .flatMap((x) => Number(x.split(": ")[1]));

const BOSS = {
  hp: data[0],
  damage: data[1],
};
Object.freeze(BOSS);

const PLAYER = {
  hp: 50,
  mana: 500,
};
Object.freeze(PLAYER);

const SPELLS = {
  MagicMissile: {
    cost: 53,
    damage: 4,
    heal: 0,
  },
  Drain: {
    cost: 73,
    damage: 2,
    heal: 2,
  },
};
Object.freeze(SPELLS);

const EFFECTS = {
  Shield: {
    cost: 113,
    duration: 6,
    damage: 0,
    heal: 0,
    armor: 7,
    mana: 0,
  },
  Poison: {
    cost: 173,
    duration: 6,
    damage: 3,
    heal: 0,
    armor: 0,
    mana: 0,
  },
  Recharge: {
    cost: 229,
    duration: 5,
    damage: 0,
    heal: 0,
    armor: 0,
    mana: 101,
  },
};
Object.freeze(EFFECTS);

type State = {
  player_hp: number;
  player_mana: number;
  boss_hp: number;
  spent_mana: number;
  player_turn: boolean;
  effects: [keyof typeof EFFECTS, number][]; // [effect, duration]
};

function apply_effects(state: State): void {
  for (const [effect, _] of state.effects) {
    state.player_hp += EFFECTS[effect].heal;
    state.player_mana += EFFECTS[effect].mana;
    state.boss_hp -= EFFECTS[effect].damage;
  }
  state.effects = state.effects.map(([effect, duration]) => [
    effect,
    duration - 1,
  ]);
  state.effects = state.effects.filter(([, duration]) => duration > 0);
}

function apply_spell(state: State, spell: keyof typeof SPELLS): State {
  const new_state: State = structuredClone(state);
  new_state.player_mana -= SPELLS[spell].cost;
  new_state.player_hp += SPELLS[spell].heal;
  new_state.boss_hp -= SPELLS[spell].damage;
  new_state.spent_mana += SPELLS[spell].cost;
  return new_state;
}

function attack_player(state: State): void {
  const armor = state.effects.reduce(
    (acc, [effect, _]) => acc + EFFECTS[effect].armor,
    0
  );
  state.player_hp -= Math.max(1, BOSS.damage - armor);
}

let min_mana = Infinity;
function dfs(state: State): void {
  if (
    state.player_hp <= 0 ||
    state.player_mana < 0 ||
    state.spent_mana >= min_mana
  )
    return;
  if (state.boss_hp <= 0) {
    min_mana = Math.min(min_mana, state.spent_mana);
    return;
  }
  apply_effects(state);
  if (state.boss_hp <= 0) {
    min_mana = Math.min(min_mana, state.spent_mana);
    return;
  }
  if (!state.player_turn) {
    attack_player(state);
    state.player_turn = true;
    return dfs(state);
  }
  for (const spell of Object.keys(SPELLS) as (keyof typeof SPELLS)[]) {
    if (state.player_mana < SPELLS[spell].cost) continue;
    const new_state = apply_spell(state, spell);
    new_state.player_turn = false;
    dfs(new_state);
  }
  for (const effect of Object.keys(EFFECTS) as (keyof typeof EFFECTS)[]) {
    if (state.player_mana < EFFECTS[effect].cost) continue;
    if (state.effects.some(([e, _]) => e === effect)) continue;
    const new_state = structuredClone(state);
    new_state.player_mana -= EFFECTS[effect].cost;
    new_state.spent_mana += EFFECTS[effect].cost;
    new_state.effects.push([effect, EFFECTS[effect].duration]);
    new_state.player_turn = false;
    dfs(new_state);
  }
}

const state: State = {
  player_hp: PLAYER.hp,
  player_mana: PLAYER.mana,
  boss_hp: BOSS.hp,
  spent_mana: 0,
  player_turn: true,
  effects: [],
};

dfs(state);
console.log(min_mana);
