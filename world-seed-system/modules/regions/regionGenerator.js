// regionGenerator.js

import { buildRegionDescription } from "./regionDescription.js";

export function generateRegions(decoded) {
  const { lm, we, tr, hy, sf } = decoded;

  // Decide number of regions (simple for now)
  const regionCount = 8 + Math.floor(Math.random() * 5); // 8–12 regions

  const regions = [];

  for (let i = 0; i < regionCount; i++) {
    const name = generateRegionName(i, tr, sf);
    const biome = pickBiome(lm, we, tr, hy);
    const elevation = pickElevation(tr);
    const moisture = pickMoisture(we, hy);
    const feature = pickFeature(sf);

    const region = {
      name,
      biome,
      elevation,
      moisture,
      feature
    };

    region.description = buildRegionDescription(region);

    regions.push(region);
  }

  return regions;
}

// --- Helper functions ---

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
