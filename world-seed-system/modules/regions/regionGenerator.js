// regionGenerator.js

import { buildRegionDescription } from "./regionDescription.js";

export function generateRegions(decoded) {
  const { lm, we, tr, hy, sf } = decoded;

  const regionCount = 8 + Math.floor(Math.random() * 5); // 8–12 regions
  const regions = [];

  for (let i = 0; i < regionCount; i++) {
    const name = generateRegionName(i, tr, sf);
    const biome = pickBiome(lm, we, tr, hy);
    const elevation = pickElevation(tr);
    const moisture = pickMoisture(we, hy);
    const feature = pickFeature(sf);

    // NEW: Elevation Tier
    const elevationTier = pickElevationTier(elevation, biome, moisture);

    // NEW: Region Role (now uses elevation tier)
    const role = pickRegionRole(elevationTier, biome, moisture);

    const region = {
      name,
      biome,
      elevation,
      elevationTier,
      moisture,
      feature,
      role
    };

    region.description = buildRegionDescription(region);
    regions.push(region);
  }

  return regions;
}

// ------------------------------------------------------------
// NEW: Elevation Tier System
// ------------------------------------------------------------
function pickElevationTier(elevation, biome, moisture) {
  const e = elevation.toLowerCase();
  const b = biome.toLowerCase();
  const m = moisture.toLowerCase();

  if (e.includes("coastal")) return "Coastal Lowlands";
  if (e.includes("highland")) return "Highlands";
  if (e.includes("plateau")) return "Plateau";
  if (e.includes("rift")) return "Rift Valley";
  if (b.includes("wetland")) return "Lowlands";
  if (m.includes("very wet")) return "Basinlands";

  return "Mixed Elevation";
}

// ------------------------------------------------------------
// UPDATED: Region Roles (now based on elevation tier)
// ------------------------------------------------------------
function pickRegionRole(elevationTier, biome, moisture) {
  const roles = [];

  // Geography-driven roles
  if (elevationTier === "Coastal Lowlands") roles.push("Coastlands");
  if (elevationTier === "Highlands") roles.push("Highlands");
  if (elevationTier === "Lowlands") roles.push("Lowlands");
  if (elevationTier === "Plateau") roles.push("Plateau Realm");
  if (elevationTier === "Rift Valley") roles.push("Rift Zone");
  if (elevationTier === "Basinlands") roles.push("Deep Interior");

  // Biome-driven roles
  if (biome.includes("forest")) roles.push("Wildlands");
  if (biome.includes("tundra")) roles.push("Frontier");
  if (biome.includes("desert")) roles.push("Deep Interior");

  // Moisture-driven roles
  if (moisture.includes("dry")) roles.push("Deep Interior");

  // Fallback roles
  const fallback = [
    "Heartland",
    "Frontier",
    "Wildlands",
    "Deep Interior",
    "Lowlands",
    "Coastlands"
  ];

  if (roles.length === 0) return randomItem(fallback);
  return randomItem(roles);
}

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ------------------------------------------------------------
// Existing helpers unchanged
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

function pickBiome(lm, we, tr, hy) {
  const climate = lm.primary.toLowerCase();
  const winds = we.primary.toLowerCase();
  const water = hy.primary.toLowerCase();

  if (climate.includes("hot")) return "tropical rainforest";
  if (climate.includes("cold")) return "tundra";
  if (winds.includes("monsoon")) return "monsoon forest";
  if (water.includes("lake")) return "wetlands";
  if (water.includes("sparse")) return "desert";
  if (tr.primary.includes("mountain")) return "alpine";

  return "temperate forest";
}

function pickElevation(tr) {
  const t = tr.primary.toLowerCase();
  if (t.includes("mountain")) return "highland";
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
