// regionGenerator.js

import { buildRegionDescription } from "./regionDescription.js";

export function generateRegions(decoded) {
  const { lm, we, tr, hy, sf } = decoded;

  const regionCount = 8 + Math.floor(Math.random() * 5); // 8–12 regions
  const regions = [];

  for (let i = 0; i < regionCount; i++) {
    const name = generateRegionName(i, tr, sf);

    const latitudeBand = pickLatitudeBand(lm);
    const biome = pickBiome(lm, we, tr, hy, latitudeBand);
    const elevation = pickElevation(tr);
    const moisture = pickMoisture(we, hy);
    const feature = pickFeature(sf);

    const elevationTier = pickElevationTier(elevation, biome, moisture, sf);
    const role = pickRegionRole(elevationTier, biome, moisture, latitudeBand);

    const region = {
      name,
      latitudeBand,
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
function pickRegionRole(elevationTier, biome, moisture, latitudeBand) {
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

  // Latitude-driven roles
  if (latitudeBand === "Equatorial" && biome.includes("rainforest"))
    roles.push("Rainforest Expanse");

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

function pickBiome(lm, we, tr, hy, latitudeBand) {
  const climate = lm.primary.toLowerCase();
  const winds = we.primary.toLowerCase();
  const water = hy.primary.toLowerCase();

  // Latitude-driven biomes
  if (latitudeBand === "Equatorial") return "tropical rainforest";
  if (latitudeBand === "Tropical") return "savanna";
  if (latitudeBand === "Subtropical" && water.includes("sparse")) return
