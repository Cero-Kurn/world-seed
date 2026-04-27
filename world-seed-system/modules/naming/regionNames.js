// modules/naming/regionNames.js
// ------------------------------------------------------------
// Procedural region naming engine
// ------------------------------------------------------------

import { BIOME_DESCRIPTORS, BIOME_NOUNS } from "../data/biomes.js";

const twists = [
  "of the First Dawn",
  "of the Silent Wind",
  "of the Old World",
  "of Forgotten Kings",
  "of the Deep Earth",
  "of the Last Tide",
  "of the Ancient Sky"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRegionName(region) {
  const biome = region.biome;
  const elevation = region.elevation || "";
  const climate = region.climatePattern || "";
  const latitude = region.latitude || "";
  const tectonics = region.tectonics || "";

  // ------------------------------------------------------------
  // Descriptor pool
  // ------------------------------------------------------------
  const descriptorPool = BIOME_DESCRIPTORS[biome] || ["Ancient", "Hollow", "Eternal"];
  let descriptor = pick(descriptorPool);

  // Elevation modifiers
  if (elevation.includes("High")) descriptor = "High " + descriptor;
  if (elevation.includes("Low")) descriptor = "Low " + descriptor;

  // Climate modifiers
  if (climate.includes("Arid")) descriptor = "Dry " + descriptor;
  if (climate.includes("Humid")) descriptor = "Green " + descriptor;

  // Latitude modifiers
  if (latitude < -40) descriptor = "Southern " + descriptor;
  if (latitude > 40) descriptor = "Northern " + descriptor;

  // Tectonic modifiers
  if (tectonics.includes("Convergent")) descriptor = "Rifted " + descriptor;
  if (tectonics.includes("Divergent")) descriptor = "Sundered " + descriptor;

  // ------------------------------------------------------------
  // Noun pool
  // ------------------------------------------------------------
  const nounPool = BIOME_NOUNS[biome] || ["Reach", "Crown", "Spires"];
  const noun = pick(nounPool);

  // ------------------------------------------------------------
  // Optional twist
  // ------------------------------------------------------------
  const twist = Math.random() < 0.35 ? " " + pick(twists) : "";

  return `The ${descriptor} ${noun}${twist}`;
}

