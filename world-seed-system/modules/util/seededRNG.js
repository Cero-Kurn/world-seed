// modules/util/seededRNG.js
// ------------------------------------------------------------
// Deterministic RNG (seed → stable random sequence)
// ------------------------------------------------------------

export function makeRNG(seedString) {
  // FNV-1a hash
  let h = 2166136261 >>> 0;

  for (let i = 0; i < seedString.length; i++) {
    h ^= seedString.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
 // Return a PRNG function
  return function () {
    h ^= h >>> 13;
    h = Math.imul(h, 16777619);
    h ^= h >>> 15;
    return (h >>> 0) / 4294967296;
  };
}
