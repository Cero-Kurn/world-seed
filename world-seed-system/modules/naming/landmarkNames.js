// modules/naming/landmarkNames.js

export function generateLandmarkName(region) {
  const biome = region.biome.toLowerCase();
  const elevation = region.elevation.toLowerCase();
  const climate = region.climatePattern?.toLowerCase() || "";

  // --- DESCRIPTORS ---
  const descriptors = {
    desert: ["Sun‑scorched", "Amber", "Dust‑forged", "Shattered", "Blistered"],
    tundra: ["Frostglass", "Pale", "Silent", "Ice‑bitten", "Glacial"],
    forest: ["Verdant", "Whispering", "Emerald", "Rootbound", "Shadowed"],
    wetlands: ["Mireborn", "Reed‑crowned", "Sodden", "Bog‑shrouded"],
    mountains: ["Storm‑forged", "Rifted", "High", "Broken", "Stone‑crowned"],
    grassland: ["Golden", "Widewind", "Open", "Horizon", "Sun‑touched"],
    savanna: ["Amberwind", "Lion’s", "Drought‑forged", "Redgrass"],
    ocean: ["Coral", "Tide‑shattered", "Deepwater", "Salt‑crowned"]
  };

  // fallback descriptor pool
  const genericDescriptors = ["Ancient", "Hollow", "Eternal", "Forgotten", "Lost"];

  // --- NOUNS ---
  const nouns = {
    desert: ["Dunes", "Teeth", "Crown", "Wastes", "Basin"],
    tundra: ["Expanse", "Fields", "Crown", "Frost", "Reach"],
    forest: ["Woods", "Grove", "Thicket", "Spire", "Hollows"],
    wetlands: ["Marsh", "Fen", "Bog", "Reeds", "Pools"],
    mountains: ["Spires", "Peaks", "Crown", "Ridge", "Maw"],
    grassland: ["Steppe", "Plains", "Horizon", "Reach"],
    savanna: ["Savanna", "Redlands", "Grasslands", "Plateau"],
    ocean: ["Shoals", "Reef", "Crown", "Depths"]
  };

  const genericNouns = ["Crown", "Reach", "Spires", "Maw", "Basin"];

  // --- TWISTS ---
  const twists = [
    "of the First Dawn",
    "of the Silent Ones",
    "of the Last Tide",
    "of the Deep Wind",
    "of the Ancients",
    "of Forgotten Kings",
    "of the Old World"
  ];

  // --- PICK DESCRIPTOR ---
  const biomeKey = Object.keys(descriptors).find(key => biome.includes(key));
  const descriptorPool = biomeKey ? descriptors[biomeKey] : genericDescriptors;
  const descriptor = descriptorPool[Math.floor(Math.random() * descriptorPool.length)];

  // --- PICK NOUN ---
  const nounPool = biomeKey ? nouns[biomeKey] : genericNouns;
  const noun = nounPool[Math.floor(Math.random() * nounPool.length)];

  // --- OPTIONAL TWIST ---
  const twist = Math.random() < 0.4
    ? " " + twists[Math.floor(Math.random() * twists.length)]
    : "";

  return `The ${descriptor} ${noun}${twist}`;
}
