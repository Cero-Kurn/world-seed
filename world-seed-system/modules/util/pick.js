export function pick(list, rng) {
  return list[Math.floor(Math.floor(rng() * list.length)];
}
