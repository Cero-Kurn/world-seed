export function pick(list, rng) {
  return list[Math.floor(rng() * list.length)];
}
