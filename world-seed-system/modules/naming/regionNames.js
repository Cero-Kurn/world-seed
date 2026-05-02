// modules/naming/regionNames.js
// ------------------------------------------------------------
// Region Name Generator (canonical biomes + landforms)
// ------------------------------------------------------------
//
// Generates evocative region names based on biome, landform,
// climate, and tectonic context. Designed to be modular,
// lore-friendly, and consistent with the world engine.
// modules/naming/regionNames.js
import { pick } from "../util/pick.js";

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
// MAIN NAME GENERATOR (DETERMINISTIC)
// ------------------------------------------------------------
export function generateRegionName(region, rng) {
  const biomeTitle = pick(BIOME_TITLES[region.biome] || ["Unknown Lands"], rng);

  const landformKey = normalizeLandform(region.landform);
  const landformTitle = pick(LANDFORM_TITLES[landformKey] || LANDFORM_TITLES.generic, rng);

  const hemiPrefix = pick(HEMISPHERE_PREFIX[region.hemisphere] || [], rng);

  const latKey = normalizeLatitude(region.latitudeBand);
  const latDescriptor = pick(LATITUDE_DESCRIPTORS[latKey] || [], rng);

  // Pattern A: Hemisphere + Biome Title
  if (rng() < 0.33 && hemiPrefix) {
    return `${hemiPrefix} ${biomeTitle}`;
  }

  // Pattern B: Latitude Descriptor + Landform Title
  if (rng() < 0.5 && latDescriptor) {
    return `${latDescriptor} ${landformTitle}`;
  }

  // Pattern C: Biome Title + Landform Title
  return `${biomeTitle} ${landformTitle}`;
}
