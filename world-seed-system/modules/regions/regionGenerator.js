// regionGenerator.js

import { buildRegionDescription } from "./regionDescription.js";

export function generateRegions(decoded) {
  const { lm, we, tr, hy, sf } = decoded;

  const regionCount = 8 + Math.floor(Math.random() * 5); // 8–12 regions
  const regions = [];

  // Determine hemisphere from seed (simple, deterministic)
  const hemisphere = pickHemisphere(lm);

  // Determine prevailing wind direction
  const prevailingWind = pickPrevailingWind(lm, we, hemisphere);

  for (let i = 0; i < regionCount; i++) {
    const name = generateRegionName(i, tr, sf);

    const latitudeBand = pickLatitudeBand(lm);
    let biome = pickBiome(lm, we, tr, hy, latitudeBand);
    let elevation = pickElevation(tr);
    let moisture = pickMoisture(we, hy);
    const feature = pickFeature(sf);

    let elevationTier = pickElevationTier(elevation, biome, moisture, sf);
    let climatePattern = pickClimatePattern(latitudeBand, moisture, elevationTier, we);

    // --- APPLY RAIN SHADOW EFFECTS (using prevailing wind) ---
    ({ moisture, climatePattern, biome } = applyRainShadow({
      moisture,
      climatePattern,
      biome,
      elevationTier,
      wind: prevailingWind
    }));

    const role = pickRegionRole(elevationTier, biome, moisture, latitudeBand);

    const region = {
      name,
      latitudeBand,
      climatePattern,
      biome,
      elevation,
      elevationTier,
      moisture,
      feature,
      role,
      prevailingWind,
      hemisphere
    };

    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}

// ------------------------------------------------------------
// HEMISPHERE
// ------------------------------------------------------------
function pickHemisphere(lm) {
  const code = lm.code.toUpperCase();
  return "ABCDEFGHIJKLM".includes(code) ? "Northern" : "Southern";
}

// ------------------------------------------------------------
// PREVAILING WIND SIMULATION
// ------------------------------------------------------------
function pickPrevailingWind(lm, we, hemisphere) {
  const lat = pickLatitudeBand(lm);
  const w = we.primary.toLowerCase();

  let baseWind;

  // Latitude-driven global wind belts
  switch (lat) {
    case "Equatorial":
    case "Tropical":
      baseWind = "east"; // Trade Winds
      break;
    case "Subtropical":
      baseWind = Math.random() < 0.5 ? "east" : "west";
      break;
    case "Temperate":
      baseWind = "west"; // Westerlies
      break;
    case "Subpolar":
    case "Polar":
      baseWind = "east"; // Polar Easterlies
      break;
  }

  // Hemisphere flip
  if (hemisphere === "Southern") {
    if (baseWind === "east") baseWind = "west";
    else baseWind = "east";
  }

  // Weather code influence
  if (w.includes("monsoon")) {
    baseWind = Math.random() < 0.5 ? "west" : "east";
  }
  if (w.includes("cyclonic")) {
    baseWind = Math.random() < 0.5 ? "north" : "south";
  }
  if (w.includes("jetstream")) {
    baseWind = "west";
  }
  if (w.includes("calm")) {
    baseWind = "variable";
  }

  return baseWind;
}

// ------------------------------------------------------------
// LATITUDE BANDS
// ------------------------------------------------------------
function pickLatitudeBand(lm) {
  const code = lm.code.toUpperCase();

  if ("ABC".includes(code)) return "Equatorial";
  if ("DEF".includes(code)) return "Tropical";
  if ("GHI".includes(code)) return "Subtropical";
  if ("JKL".includes(code)) return "Temperate";
  if ("MNO".includes(code)) return "Subpolar";
  return "Polar";
}

// ------------------------------------------------------------
// CLIMATE PATTERNS
// ------------------------------------------------------------
function pickClimatePattern(latitudeBand, moisture, elevationTier, we) {
  const w = we.primary.toLowerCase();
  const m = moisture.toLowerCase();

  if (latitudeBand === "Equatorial") return "Equatorial Convergence";
  if (latitudeBand === "Tropical") return "Tropical Hadley Cell";
  if (latitudeBand === "Subtropical") return "Subtropical High";
  if (latitudeBand === "Temperate") return "Temperate Westerlies";
  if (latitudeBand === "Subpolar") return "Polar Easterlies";
  if (latitudeBand === "Polar") return "Polar Easterlies";

  if (w.includes("monsoon")) return "Monsoon Zone";

  if (elevationTier === "Mountains" && m.includes("dry"))
    return "Rain Shadow Zone";

  if (elevationTier === "Coastal Shelf" && m.includes("humid"))
    return "Oceanic Influence";

  if (
    elevationTier === "Interior" ||
    elevationTier === "Deep Interior Highlands"
  ) {
    return "Continental Interior";
  }

  return "Temperate Westerlies";
}

// ------------------------------------------------------------
// RAIN SHADOW SYSTEM (now uses prevailingWind)
// ------------------------------------------------------------
function applyRainShadow({ moisture, climatePattern, biome, elevationTier, wind }) {
  const m = moisture.toLowerCase();
  const b = biome.toLowerCase();

  if (elevationTier !== "Mountains") {
    return { moisture, climatePattern, biome };
  }

  // Windward side gets wetter
  if (["west"].includes(wind)) {
    if (m === "dry") moisture = "moderate moisture";
    else if (m === "moderate moisture") moisture = "humid";
    else if (m === "humid") moisture = "very wet";

    if (b.includes("forest")) biome = "temperate rainforest";
  }

  // Leeward side gets drier
  if (["east"].includes(wind)) {
    if (m === "humid") moisture = "moderate moisture";
    else if (m === "moderate moisture") moisture = "dry";
    else if (m === "dry") moisture = "very dry";

    climatePattern = "Rain Shadow Zone";

    if (b.includes("forest")) biome = "dry woodland";
    if (b.includes("temperate")) biome = "steppe";
  }

  return { moisture, climatePattern, biome };
}

// ------------------------------------------------------------
// ELEVATION TIERS
// ------------------------------------------------------------
function pickElevationTier(elevation, biome, moisture, sf) {
  const e = elevation.toLowerCase();
  const b = biome.toLowerCase();
  const m = moisture.toLowerCase();
  const f = sf.primary.toLowerCase();

  if (e.includes("mountain")) return "Mountains";
  if (e.includes("plateau")) return "Plateau";
  if (e.includes("rift")) return "Rift Valley";
  if (e.includes("coastal")) return "Coastal Shelf";
  if (e.includes("highland")) return "Uplands";
  if (e.includes("lowland")) return "Lowlands";

  if (b.includes("wetlands") || m.includes("humid")) return "Riverlands";

  if (e.includes("plateau") && m.includes("dry")) return "Badlands";
  if (e.includes("mixed") && m.includes("dry")) return "Badlands";

  if (b.includes("alpine")) return "Mountains";
  if (b.includes("wetlands")) return "Basinlands";
  if (b.includes("tundra")) return "Deep Interior Highlands";
  if (b.includes("forest") && m.includes("humid")) return "Mid Slopes";

  if (e.includes("mixed") && !m.includes("very wet") && !b.includes("desert"))
    return "Rolling Hills";

  if (f.includes("archipelago")) return "Archipelago Cluster";

  if (m.includes("very wet")) return "Basinlands";

  if (!e.includes("coastal")) return "Interior";

  return "Mixed Elevation";
}

// ------------------------------------------------------------
// REGION ROLES
// ------------------------------------------------------------
function pickRegionRole(elevationTier, biome, moisture, latitudeBand) {
  const roles = [];

  if (elevationTier === "Coastal Shelf") roles.push("Near Coast");
  if (elevationTier === "Mountains") roles.push("Frontier");
  if (elevationTier === "Deep Interior Highlands") roles.push("Deep Interior");
  if (elevationTier === "Lowlands") roles.push("Heartland");
  if (elevationTier === "Interior") roles.push("Hinterlands");

  if (biome.includes("rainforest")) roles.push("Rainforest Expanse");
  if (biome.includes("forest")) roles.push("Wildlands");
  if (biome.includes("desert")) roles.push("Deep Interior");

  if (moisture.includes("dry")) roles.push("Deep Interior");

  if (latitudeBand === "Equatorial" && biome.includes("rainforest"))
    roles.push("Rainforest Expanse");

  const special = ["Resource Belt", "Sacred Lands", "Trade Hub"];
  if (Math.random() < 0.15) roles.push(randomItem(special));

  const fallback = [
    "Heartland",
    "Frontier",
    "Hinterlands",
    "Wildlands",
    "Deep Interior",
    "Near Coast"
  ];

  if (roles.length === 0) return randomItem(fallback);
  return randomItem(roles);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------
function generateRegionName(index, tr, sf) {
  const baseNames = [
    "Coast", "Highlands", "Lowlands", "Basin", "Plateau",
    "Forest", "Steppe", "Range", "Valley", "Marches"
  ];

  const tectonicFlavor = tr.primary.split(" ")[0];
  const featureFlavor = sf.primary.split(" ")[0];

  const base = baseNames[index % baseNames.length];

  return `${tectonicFlavor} ${featureFlavor} ${base}`;
}

function pickBiome(lm, we, tr, hy, latitudeBand) {
  const climate = lm.primary.toLowerCase();
  const winds = we.primary.toLowerCase();
  const water = hy.primary.toLowerCase();

  if (latitudeBand === "Equatorial") return "tropical rainforest";
  if (latitudeBand === "Tropical") return "savanna";
  if (latitudeBand === "Subtropical" && water.includes("sparse"))
    return "desert";
  if (latitudeBand === "Temperate") return "temperate forest";
  if (latitudeBand === "Subpolar") return "tundra";
  if (latitudeBand === "Polar") return "polar desert";

  if (climate.includes("hot")) return "tropical rainforest";
  if (climate.includes("cold")) return "tundra";
  if (winds.includes("monsoon")) return "monsoon forest";
  if (water.includes("lake")) return "wetlands";
  if (water.includes("sparse")) return "desert";
  if (tr.primary.toLowerCase().includes("mountain")) return "alpine";

  return "temperate forest";
}

function pickElevation(tr) {
  const t = tr.primary.toLowerCase();
  if (t.includes("mountain")) return "mountain highland";
  if (t.includes("plateau")) return "plateau";
  if (t.includes("rift")) return "rift valley";
  if (t.includes("coastal")) return "coastal lowland";
  return "mixed elevation";
}

function pickMoisture(we, hy) {
  const w = we.primary.toLowerCase();
  const h = hy.primary.toLowerCase();

  if (w.includes("monsoon")) return "seasonally wet";
  if (h.includes("sparse")) return "dry";
  if (h.includes("wetland")) return "very wet";
  if (h.includes("lake")) return "humid";
  return "moderate moisture";
}

function pickFeature(sf) {
  return sf.primary.toLowerCase();
}
