// modules/climate/biomeSmoothing.js
export function smoothBiomes(regions) {
  // Adjacency for a 7‑hex "flower" layout:
  // 0 is center, 1–6 are ring.
  const neighbors = {
    0: [1, 2, 3, 4, 5, 6],
    1: [0, 2, 6],
    2: [0, 1, 3],
    3: [0, 2, 4],
    4: [0, 3, 5],
    5: [0, 4, 6],
    6: [0, 5, 1]
  };

  // Copy original biomes so smoothing is based on the old state
  const originalBiomes = regions.map(r => r.biome);

  regions.forEach((r, i) => {
    const nIdx = neighbors[i] || [];
    if (nIdx.length === 0) return;

    const counts = {};
    nIdx.forEach(j => {
      const b = originalBiomes[j];
      counts[b] = (counts[b] || 0) + 1;
    });

    // Find dominant neighbor biome
    let dominantBiome = r.biome;
    let maxCount = 0;

    Object.entries(counts).forEach(([biome, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominantBiome = biome;
      }
    });

    // Only smooth if:
    // - dominant neighbor biome appears at least twice
    // - and current biome is different
    if (dominantBiome !== r.biome && maxCount >= 2) {
      r.biome = dominantBiome;
      r.description += " Neighboring biomes gradually blend here, softening the transition.";
    }
  });

  return regions;
}
