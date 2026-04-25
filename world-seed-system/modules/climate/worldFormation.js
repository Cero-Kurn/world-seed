// modules/climate/worldFormation.js

export function renderWorldFormation(regions, decoded) {
  const container = document.getElementById("worldFormation");

  // --- TECTONIC SUMMARY ---
  const tectonic = decoded.tr.tectonicType.toLowerCase();
  let tectonicOrigin = "";

  switch (tectonic) {
    case "convergent":
      tectonicOrigin = "The world began in collision — continents grinding together, birthing vast mountain arcs and deep ocean trenches.";
      break;
    case "divergent":
      tectonicOrigin = "The world opened along great rifts — continents splitting, magma rising, and newborn oceans forming in fiery seams.";
      break;
    case "transform":
      tectonicOrigin = "The world fractured — continents sliding past one another, carving fault‑scarred valleys and broken highlands.";
      break;
    case "hotspot":
      tectonicOrigin = "The world rose from fire — mantle plumes punching through the crust, raising volcanic chains and basalt plateaus.";
      break;
    case "craton":
      tectonicOrigin = "The world began in stillness — ancient cratons anchoring the continents, their roots older than memory.";
      break;
  }

  // --- CLIMATE ORIGIN ---
  const lat = decoded.lm.primary.toLowerCase();
  let climateOrigin = "";

  if (lat.includes("hot") || lat.includes("greenhouse")) {
    climateOrigin = "Early climates were warm and energetic, with broad tropical belts and powerful atmospheric circulation.";
  } else if (lat.includes("cold") || lat.includes("ice")) {
    climateOrigin = "The planet cooled quickly, shaping vast polar domains and compressed temperate zones.";
  } else if (lat.includes("chaotic") || lat.includes("magical")) {
    climateOrigin = "Climate patterns formed in turbulence, producing unstable temperature gradients and unpredictable seasons.";
  } else {
    climateOrigin = "Climate settled into familiar latitudinal bands, with stable temperature gradients and predictable seasons.";
  }

  // --- HYDROLOGY ORIGIN ---
  const hydro = decoded.hy.primary.toLowerCase();
  let hydroOrigin = "";

  if (hydro.includes("wetland") || hydro.includes("river") || hydro.includes("lake")) {
    hydroOrigin = "Water shaped the early continents — rivers carved basins, wetlands stabilized climates, and inland seas moderated heat.";
  } else if (hydro.includes("arid") || hydro.includes("dried")) {
    hydroOrigin = "Sparse hydrology defined the young world — deserts expanded, rainfall was rare, and water became a force of migration.";
  } else if (hydro.includes("glacial")) {
    hydroOrigin = "Glacial meltwater sculpted the land — carving valleys, feeding rivers, and driving seasonal floods.";
  } else {
    hydroOrigin = "Hydrological patterns emerged gradually, shaping diverse climates and regional identities.";
  }

  // --- BIOME TENDENCY ---
  const biomeCounts = regions.reduce((acc, r) => {
    acc[r.biome] = (acc[r.biome] || 0) + 1;
    return acc;
  }, {});

  const dominantBiome = Object.entries(biomeCounts)
    .sort((a, b) => b[1] - a[1])[0][0];

  const biomeOrigin = `Over time, ${dominantBiome.toLowerCase()} biomes spread widely, becoming the ecological signature of the world.`;

  // --- REGIONAL HISTORY THREAD ---
  const historyThreads = regions.map(r => r.name + ": " + r.role).join(". ");

  const historyOrigin =
    "As climates stabilized and landscapes matured, early cultures adapted to their environments. " +
    "Across the continents, distinct regional identities emerged: " +
    historyThreads + ".";

  // --- FINAL NARRATIVE ---
  container.innerHTML = `
    <h3>🌏 World Formation Narrative</h3>
    <p>${tectonicOrigin}</p>
    <p>${climateOrigin}</p>
    <p>${hydroOrigin}</p>
    <p>${biomeOrigin}</p>
    <p>${historyOrigin}</p>
  `;
}
