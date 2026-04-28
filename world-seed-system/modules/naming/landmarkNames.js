// modules/naming/landmarkNames.js
// ------------------------------------------------------------
// Procedural landmark naming engine (distinct from region naming)
// ------------------------------------------------------------

import { BIOME_DESCRIPTORS } from "../data/biomes.js";

// Landform nouns (landmark-specific)
const LANDFORM_NOUNS = {
    canyon: ["Chasm", "Gorge", "Rift", "Maw"],
    coast: ["Cliff", "Strand", "Shoal"],
    desert: ["Dunes", "Teeth", "Crown", "Wastes", "Basin"],
    forest: ["Woods", "Grove", "Thicket", "Spire", "Hollows"],
    generic: ["Crown", "Spires", "Maw", "Stone", "Reach"],
    geothermal: ["Vent", "Caldera", "Flats"],
    grassland: ["Steppe", "Plains", "Horizon", "Reach"],
    marine: ["Reef", "Crest", "Shoals"],
    mountains: ["Spires", "Peaks", "Crown", "Ridge", "Maw", "Teeth", "Pillar"],
    ocean: ["Shoals", "Reef", "Crown", "Depths"],
    savanna: ["Savanna", "Redlands", "Grasslands", "Plateau"],
    subsurface: ["Cavern", "Hollow", "Depths"],
    tundra: ["Expanse", "Fields", "Crown", "Frost", "Reach"],
    wetlands: ["Marsh", "Fen", "Bog", "Reeds", "Pools"]
};

// Twists add mythic flavor
const TWISTS = [
    "of Forgotten Kings",
    "of the Ancients",
    "of the Deep Wind",
    "of the First Dawn",
    "of the Last Tide",
    "of the Old World",
    "of the Silent Ones"
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
