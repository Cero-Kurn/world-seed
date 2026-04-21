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
    const elevationTier = pickElevationTier(elevation, biome, moisture, sf);

    // NEW: Region Role
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
// ELEVATION TIERS
// ------------------------------------------------------------
function pickElevationTier(elevation, biome, moisture, sf) {
  const e = elevation.toLowerCase();
  const b = biome.toLowerCase();
  const m = moisture.toLowerCase();
  const f = sf.primary.toLowerCase();

  // Direct elevation matches
  if (e.includes("mountain")) return "Mountains";
  if (e.includes("plateau")) return "Plateau";
  if (e.includes("rift")) return "Rift Valley";
  if (e.includes("coastal")) return "Coastal Shelf";
  if (e.includes("highland")) return "Uplands";
  if (e.includes("lowland")) return "Lowlands";

  // Riverlands (wet + low)
  if (b.includes("wetlands") || m.includes("humid")) return "Riverlands";

  // Badlands (dry + eroded)
  if (e.includes("plateau") && m.includes("dry")) return "Badlands";
  if (e.includes("mixed") && m.includes("dry")) return "Badlands";

  // Biome-driven elevation tiers
  if (b.includes("alpine")) return "Mountains";
  if (b.includes("wetlands")) return "Basinlands";
  if (b.includes("tundra")) return "Deep Interior Highlands";
  if (b.includes("forest") && m.includes("humid")) return "Mid Slopes";

  // Rolling Hills (moderate elevation + moderate moisture)
  if (e.includes("mixed") && !m.includes("very wet") && !b.includes("desert"))
    return "Rolling Hills";

  // Feature-driven (archipelago)
  if (f.includes("archipelago")) return "Archipelago Cluster";

  // Moisture-driven
  if (m.includes("very wet")) return "Basinlands";

  // General inland
  if (!e.includes("coastal")) return "Interior";

  return "Mixed Elevation";
}


// ------------------------------------------------------------
// REGION ROLES
// ------------------------------------------------------------
function pickRegionRole(elevationTier, biome, moisture) {
  const roles = [];

  // Geography-driven roles
  if (elevationTier === "Coastal Shelf") roles.push("Near Coast");
  if (elevationTier === "Mountains") roles.push("Frontier");
  if (elevationTier === "Deep Interior Highlands") roles.push("Deep Interior");
  if (elevationTier === "Lowlands") roles.push("Heartland");
  if (elevationTier === "Interior") roles.push("Hinterlands");

  // Biome-driven roles
  if (biome.includes("rainforest")) roles.push("Rainforest Expanse");
  if (biome.includes("forest")) roles.push("Wildlands");
  if (biome.includes("desert")) roles.push("Deep Interior");

  // Moisture-driven roles
  if (moisture.includes("dry")) roles.push("Deep Interior");

  // Random special roles
  const special = ["Resource Belt", "Sacred Lands", "Trade Hub"];
  if (Math.random() < 0.15) roles.push(randomItem(special));

  // Fallback roles
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
