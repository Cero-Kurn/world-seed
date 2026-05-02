// modules/naming/regionNames.js
// ------------------------------------------------------------
// Region Name Generator (canonical biomes + landforms)
// ------------------------------------------------------------
//
// Generates evocative region names based on biome, landform,
// climate, and tectonic context. Designed to be modular,
// lore-friendly, and consistent with the world engine.
//

// ------------------------------------------------------------
// WORD POOLS
// ------------------------------------------------------------

const BIOME_TITLES = {
  "Tundra": ["Frostlands", "Pale Expanse", "Glacier Reach"],
  "Alpine": ["High Peaks", "Skybound Range", "Silver Heights"],
  "Taiga Forests": ["Pinewilds", "Needlewood", "Frostpine Expanse"],
  "Temperate Forests": ["Greenwood", "Leafshade", "Verdant Reach"],
  "Tropical Forests": ["Emerald Canopy", "Deepwild", "Jade Thicket"],
  "Grassland": ["Open Plains", "Windsteppe", "Golden Fields"],
  "Savanna": ["Sunplains", "Liongrass Expanse", "Amber Savanna"],
  "Shrubland": ["Scrublands", "Drybrush Expanse", "Thornwild"],
  "Wetlands": ["Mirelands", "Reedmarsh", "Fenreach"],
  "Desert": ["Dunesea", "Sunwaste", "Golden Barrens"],
  "Coastal": ["Shorelands", "Saltwind Coast", "Tidebound Reach"],
  "Freshwater": ["Riverlands", "Lakeward Expanse", "Delta Plains"],
  "Marine": ["Blue Expanse", "Open Sea", "Deepwater Reach"],
  "Geothermal": ["Fireplains", "Ashen Rise", "Steamwild"],
  "Subsurface": ["Underdeep", "Hollowlands", "Cavern Expanse"]
};

const LANDFORM_TITLES = {
  basin: ["Basin", "Lowlands", "Hollow"],
  canyon: ["Chasm", "Gorge", "Rift", "Breaks"],
  coast: ["Coast", "Shore", "Strand"],
  desert: ["Wastes", "Dunes", "Barrens"],
  forest: ["Woods", "Wilds", "Timberlands"],
  generic: ["Reach", "Expanse", "Territory"],
  geothermal: ["Vents", "Firelands", "Ashfields"],
  marine: ["Sea", "Waters", "Deeps"],
  mountain: ["Range", "Highlands", "Crest", "Spine"],
  plateau: ["Plateau", "High Table", "Uplands"],
  rift: ["Rift", "Chasm", "Breaks"],
  subsurface: ["Depths", "Hollows", "Underlands"],
  uplands: ["Uplands", "High Country", "Ridges"],
  wetlands: ["Marsh", "Fen", "Boglands"]
};

const HEMISPHERE_PREFIX = {
  Northern: ["North", "Northern", "Frostbound"],
  Southern: ["South", "Southern", "Starbound"],
  Equatorial: ["Equatorial", "Sunbelt", "Midworld"]
};

const LATITUDE_DESCRIPTORS = {
  tropical: ["Tropic", "Suncrest", "Warmwind"],
  subtropical: ["Sunward", "Brightwind", "Mildreach"],
  temperate: ["Greenwind", "Middlereach", "Seasonal"],
  polar: ["Frost", "Icebound", "Chillwind"]
};

// ------------------------------------------------------------
// NORMALIZATION HELPERS
// ------------------------------------------------------------
function normalizeLandform(raw) {
  if (!raw) return "generic";
  const f = raw.toLowerCase();

  if (f.includes("mountain")) return "mountain";
  if (f.includes("plateau")) return "plateau";
  if (f.includes("rift")) return "rift";
  if (f.includes("basin")) return "basin";
  if (f.includes("upland")) return "uplands";
  if (f.includes("coast")) return "coast";
  if (f.includes("marine")) return "marine";
  if (f.includes("wetland") || f.includes("flood")) return "wetlands";
  if (f.includes("geo") || f.includes("volcan")) return "geothermal";
  if (f.includes("subsurface") || f.includes("cavern")) return "subsurface";

  return "generic";
}

function normalizeLatitude(lat) {
  if (!lat) return "temperate";
  return lat.toLowerCase();
}

// ------------------------------------------------------------
// UTILITY
// ------------------------------------------------------------
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ------------------------------------------------------------
// MAIN NAME GENERATOR
// ------------------------------------------------------------
export function generateRegionName(region) {
  const biomeTitle = pick(BIOME_TITLES[region.biome] || ["Unknown Lands"]);
  const landformKey = normalizeLandform(region.landform);
  const landformTitle = pick(LANDFORM_TITLES[landformKey] || LANDFORM_TITLES.generic);

  const hemiPrefix = pick(HEMISPHERE_PREFIX[region.hemisphere] || []);
  const latKey = normalizeLatitude(region.latitudeBand);
  const latDescriptor = pick(LATITUDE_DESCRIPTORS[latKey] || []);

  // Pattern A: Hemisphere + Biome Title
  if (Math.random() < 0.33 && hemiPrefix) {
    return `${hemiPrefix} ${biomeTitle}`;
  }

  // Pattern B: Latitude Descriptor + Landform Title
  if (Math.random() < 0.5 && latDescriptor) {
    return `${latDescriptor} ${landformTitle}`;
  }

  // Pattern C: Biome Title + Landform Title
  return `${biomeTitle} ${landformTitle}`;
}
⭐ NEW landmarkNames.js (fully fixed)
js
// modules/naming/landmarkNames.js
// ------------------------------------------------------------
// Landmark Name Generator (fixed + normalized)
// ------------------------------------------------------------

const FEATURE_ROOTS = {
  coast: ["Cliffs", "Shoals", "Tidewall", "Saltspires"],
  marine: ["Reef", "Deeps", "Blue Shoals", "Sea Arches"],
  freshwater: ["Falls", "Delta", "Riverbend", "Lakeward Stones"],
  canyon: ["Rift", "Chasm", "Gorge", "Break"],
  mountain: ["Peak", "Crest", "Highspire", "Crown"],
  desert: ["Dunecrest", "Sunspire", "Sandwall", "Mirage Flats"],
  wetland: ["Reedfen", "Boglight", "Mirestone", "Fenreach"],
  forest: ["Greenwall", "Timberfall", "Leafspire", "Rootspire"],
  geothermal: ["Ember Vents", "Ashen Rise", "Steam Pits", "Fireholes"],
  subsurface: ["Hollow", "Underdeep", "Cavern Gate", "Shadow Vault"],
  generic: ["Stone", "Reach", "Spire", "Rise"]
};

const BIOME_ADJECTIVES = {
  "Tundra": ["Frost", "Pale", "Icebound"],
  "Alpine": ["Sky", "Silver", "High"],
  "Taiga Forests": ["Pine", "Frostpine", "Needle"],
  "Temperate Forests": ["Green", "Leaf", "Verdant"],
  "Tropical Forests": ["Emerald", "Jade", "Deep"],
  "Grassland": ["Golden", "Wind", "Open"],
  "Savanna": ["Amber", "Sun", "Lion"],
  "Shrubland": ["Dry", "Thorn", "Scrub"],
  "Wetlands": ["Reed", "Mire", "Fen"],
  "Desert": ["Sun", "Dune", "Sand"],
  "Coastal": ["Salt", "Tide", "Wave"],
  "Freshwater": ["River", "Lake", "Delta"],
  "Marine": ["Blue", "Deep", "Sea"],
  "Geothermal": ["Ember", "Ash", "Fire"],
  "Subsurface": ["Shadow", "Hollow", "Under"]
};

// ------------------------------------------------------------
// NORMALIZATION
// ------------------------------------------------------------
function normalizeFeatureKey(landform, specialFeature) {
  const f = (specialFeature || "").toLowerCase();
  const l = (landform || "").toLowerCase();

  if (f.includes("coast") || l.includes("coast")) return "coast";
  if (f.includes("reef") || f.includes("sea") || l.includes("marine")) return "marine";
  if (f.includes("lake") || f.includes("river") || f.includes("delta")) return "freshwater";
  if (f.includes("canyon") || f.includes("gorge") || f.includes("rift")) return "canyon";
  if (f.includes("mountain") || l.includes("mountain")) return "mountain";
  if (f.includes("desert") || l.includes("desert")) return "desert";
  if (f.includes("marsh") || f.includes("bog") || l.includes("wetland")) return "wetland";
  if (f.includes("forest") || l.includes("forest")) return "forest";
  if (f.includes("vent") || f.includes("lava") || l.includes("geo")) return "geothermal";
  if (f.includes("cave") || f.includes("subterr") || l.includes("subsurface")) return "subsurface";

  return "generic";
}

// ------------------------------------------------------------
// UTILITY
// ------------------------------------------------------------
function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// ------------------------------------------------------------
// MAIN LANDMARK NAME GENERATOR
// ------------------------------------------------------------
export function generateLandmarkName(region) {
  const biomeAdj = pick(BIOME_ADJECTIVES[region.biome] || ["Ancient"]);
  const featureKey = normalizeFeatureKey(region.landform, region.specialFeature);
  const featureRoot = pick(FEATURE_ROOTS[featureKey] || FEATURE_ROOTS.generic);

  // Pattern A
  if (Math.random() < 0.4) {
    return `The ${biomeAdj} ${featureRoot}`;
  }

  // Pattern B
  if (Math.random() < 0.7) {
    return `The ${featureRoot} of ${biomeAdj}`;
  }

  // Pattern C
  return `The ${featureRoot}`;
}
