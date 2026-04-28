// modules/naming/landmarkNames.js
// ------------------------------------------------------------
// Procedural landmark naming engine (distinct from region naming)
// ------------------------------------------------------------

import { BIOME_DESCRIPTORS } from "../data/biomes.js";

// Landform nouns (landmark-specific)
const LANDFORM_NOUNS = {
  mountain: ["Spire", "Peak", "Crown", "Teeth", "Pillar"],
  canyon: ["Chasm", "Gorge", "Rift", "Maw"],
  forest: ["Hollow", "Grove", "Thicket"],
  desert: ["Dune", "Basin", "Wastes"],
  wetland: ["Fen", "Bog", "Pools"],
  coast: ["Cliff", "Strand", "Shoal"],
  marine: ["Reef", "Crest", "Shoals"],
  geothermal: ["Vent", "Caldera", "Flats"],
  subsurface: ["Cavern", "Hollow", "Depths"],
  generic: ["Crown", "Spires", "Maw", "Stone", "Reach"]
};

// Twists add mythic flavor
const TWISTS = [
  "of the Silent Ones",
  "of the First Dawn",
  "of Forgotten Kings",
  "of the Last Tide",
  "of the Deep Wind",
  "of the Old World"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateLandmarkName(region) {
  const biome = region.biome;
  const elevation = region.elevation || "";
  const climate = region.climatePattern || "";
  const landform = region.specialFeature || ""; // e.g. "Volcanic Vent", "Canyon", "Reef"

  // ------------------------------------------------------------
  // Descriptor (biome-aware)
  // ------------------------------------------------------------
  const descriptorPool = BIOME_DESCRIPTORS[biome] || ["Ancient", "Hollow", "Eternal"];
  let descriptor = pick(descriptorPool);

  // Elevation modifiers
  if (elevation.includes("High")) descriptor = "High " + descriptor;
  if (elevation.includes("Low")) descriptor = "Low " + descriptor;

  // Climate modifiers
  if (climate.includes("Arid")) descriptor = "Dry " + descriptor;
  if (climate.includes("Humid")) descriptor = "Green " + descriptor;

  // ------------------------------------------------------------
  // Noun (landform-aware)
  // ------------------------------------------------------------
  let nounPool = LANDFORM_NOUNS.generic;

  if (landform) {
    const key = landform.toLowerCase();
    if (key.includes("mountain")) nounPool = LANDFORM_NOUNS.mountain;
    else if (key.includes("canyon") || key.includes("rift")) nounPool = LANDFORM_NOUNS.canyon;
    else if (key.includes("forest")) nounPool = LANDFORM_NOUNS.forest;
    else if (key.includes("desert")) nounPool = LANDFORM_NOUNS.desert;
    else if (key.includes("wetland") || key.includes("marsh")) nounPool = LANDFORM_NOUNS.wetland;
    else if (key.includes("coast")) nounPool = LANDFORM_NOUNS.coast;
    else if (key.includes("reef") || key.includes("sea")) nounPool = LANDFORM_NOUNS.marine;
    else if (key.includes("vent") || key.includes("lava")) nounPool = LANDFORM_NOUNS.geothermal;
    else if (key.includes("cave") || key.includes("underground")) nounPool = LANDFORM_NOUNS.subsurface;
  }

  const noun = pick(nounPool);

  // ------------------------------------------------------------
  // Optional twist
  // ------------------------------------------------------------
  const twist = Math.random() < 0.4 ? " " + pick(TWISTS) : "";

  // ------------------------------------------------------------
  // Final landmark name
  // ------------------------------------------------------------
  return `The ${descriptor} ${noun}${twist}`;
}
