// modules/util/seededRNG.js
export function makeRNG(seed) {
  let h = 2166136261 >>> 0;

  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  return function () {
    h ^= h >>> 13;
    h = Math.imul(h, 16777619);
    h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  };
}
