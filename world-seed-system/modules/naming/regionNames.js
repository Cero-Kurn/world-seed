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
  mountain: ["Range", "Highlands", "Crest", "Spine"],
  canyon: ["Chasm", "Gorge", "Rift", "Breaks"],
  forest: ["Woods", "Wilds", "Timberlands"],
  desert: ["Wastes", "Dunes", "Barrens"],
  wetland: ["Marsh", "Fen", "Boglands"],
  coast: ["Coast", "Shore", "Strand"],
  marine: ["Sea", "Waters", "Deeps"],
  geothermal: ["Vents", "Firelands", "Ashfields"],
  subsurface: ["Depths", "Hollows", "Underlands"],
  generic: ["Reach", "Expanse", "Territory"]
};

const HEMISPHERE_PREFIX = {
  Northern: ["North", "Northern", "Frostbound"],
  Equatorial: ["Equatorial", "Sunbelt", "Midworld"],
  Southern: ["South", "Southern", "Starbound"]
};

const LATITUDE_DESCRIPTORS = {
  Tropical: ["Tropic", "Suncrest", "Warmwind"],
  Subtropical: ["Sunward", "Brightwind", "Mildreach"],
  Temperate: ["Greenwind", "Middlereach", "Seasonal"],
  Polar: ["Frost", "Icebound", "Chillwind"]
};

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
  const {
    biome,
    landform,
    hemisphere,
    latitudeBand
  } = region;

  // 1. Biome-based core title
  const biomeTitle = pick(BIOME_TITLES[biome] || ["Unknown Lands"]);

  // 2. Landform-based suffix
  const landformTitle = pick(LANDFORM_TITLES[landform] || LANDFORM_TITLES.generic);

  // 3. Hemisphere prefix
  const hemiPrefix = pick(HEMISPHERE_PREFIX[hemisphere] || []);

  // 4. Latitude descriptor
  const latDescriptor = pick(LATITUDE_DESCRIPTORS[latitudeBand] || []);

  // ------------------------------------------------------------
  // Name assembly logic
  // ------------------------------------------------------------

  // Pattern A: Hemisphere + Biome Title
  if (Math.random() < 0.33) {
    return `${hemiPrefix} ${biomeTitle}`;
  }

  // Pattern B: Latitude Descriptor + Landform Title
  if (Math.random() < 0.5) {
    return `${latDescriptor} ${landformTitle}`;
  }

  // Pattern C: Biome Title + Landform Title
  return `${biomeTitle} ${landformTitle}`;
}
