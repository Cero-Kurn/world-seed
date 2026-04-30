// modules/regions/regionGenerator.js
// ------------------------------------------------------------
// Region Generator (Aligned with New World Engine)
// ------------------------------------------------------------

/**
 * @typedef {Object} DecodedSeedPart
 * @property {string} code
 * @property {string} primary
 * @property {string} twist
 */

/**
 * @typedef {Object} DecodedSeed
 * @property {DecodedSeedPart} cc
 * @property {DecodedSeedPart} lm
 * @property {DecodedSeedPart} we
 * @property {DecodedSeedPart} hy
 * @property {DecodedSeedPart} sf
 */

/**
 * @typedef {Object} Region
 * @property {string} id
 * @property {string} hemisphere
 * @property {string} latitudeBand
 * @property {string} tectonicType
 * @property {string} elevation
 * @property {string} moisture
 * @property {string} climatePattern
 * @property {string} biome
 * @property {string} role
 * @property {string} specialFeature
 * @property {string} landform
 * @property {string|null} name
 * @property {string|null} landmark
 * @property {string} description
 */

/**
 * @typedef {Object} RegionGenerationOptions
 * @property {string} [idPrefix]
 * @property {(ctx: any) => string} [buildRegionDescription]
 */

/**
 * Generate all regions for a world.
 *
 * @param {DecodedSeed} decoded
 * @param {RegionGenerationOptions} [options]
 * @returns {Region[]}
 */
export function generateRegions(decoded, options = {}) {
  const regions = [];

  const windModel = decoded.we.primary;
  const latitudeModel = decoded.lm?.primary || "";
  const hydrologyModel = decoded.hy.primary;
  const specialFeature = decoded.sf?.primary || "";

  const idPrefix = options.idPrefix || "R";
  const buildRegionDescription = options.buildRegionDescription || defaultRegionDescription;

  const REGION_COUNT = getRegionCount(decoded);

  for (let i = 0; i < REGION_COUNT; i++) {
    const hemisphere = pickHemisphere(i);
    const latitudeBand = pickLatitudeBand(hemisphere, i, latitudeModel);
    const tectonicCounts = regions.reduce((acc, r) => {
      acc[r.tectonicType] = (acc[r.tectonicType] || 0) + 1;
      return acc;
    }, {});
    
    const tectonicType = Object.entries(tectonicCounts)
      .sort((a, b) => b[1] - a[1])[0][0];


    const elevation = pickElevation(tectonicType, i);
    const moisture = pickMoisture(windModel, hydrologyModel, latitudeBand, i);
    const climatePattern = pickClimate(latitudeBand, moisture, elevation);

    const biome = pickCanonicalBiome({
      latitudeBand,
      moisture,
      elevation,
      hydrologyModel,
      specialFeature,
      tectonicType
    });

    const landform = classifyLandform(specialFeature, elevation, biome);

    const region = {
      id: `${idPrefix}${i + 1}`,
      hemisphere,
      latitudeBand,
      tectonicType,
      elevation,
      moisture,
      climatePattern,
      biome,
      role: pickRole(i),
      specialFeature,
      landform,

      // Naming hooks
      name: null,
      landmark: null,

      // Description
      description: buildRegionDescription({
        biome,
        elevation,
        climatePattern,
        hemisphere,
        latitudeBand,
        tectonicType,
        moisture,
        specialFeature,
        index: i
      })
    };

    regions.push(region);
  }

  return regions;
}

// ------------------------------------------------------------
// REGION COUNT
// ------------------------------------------------------------
function getRegionCount(decoded) {
  const base = 12;

  const cc = decoded.cc.code || "";
  const lm = decoded.lm.code || "";

  let modifier = 0;

  if (cc.includes("A")) modifier += 4;
  if (cc.includes("B")) modifier += 2;
  if (lm.includes("X")) modifier += 6;
  if (lm.includes("Y")) modifier += 3;

  return Math.max(8, Math.min(40, base + modifier));
}

// ------------------------------------------------------------
// HEMISPHERE & LATITUDE
// ------------------------------------------------------------
function pickHemisphere(index) {
  return index % 2 === 0 ? "Northern" : "Southern";
}

function pickLatitudeBand(hemisphere, index, latitudeModel) {
  const bands = ["polar", "subpolar", "temperate", "subtropical", "tropical"];

  let offset = 0;
  if (latitudeModel.includes("E")) offset = 1;
  if (latitudeModel.includes("P")) offset = -1;

  const base = index + (hemisphere === "Northern" ? 0 : 2) + offset;
  const idx = ((base % bands.length) + bands.length) % bands.length;

  return bands[idx];
}

// ------------------------------------------------------------
// TECTONICS
// ------------------------------------------------------------
function pickTectonicType(latitudeBand, index) {
  const types = ["convergent", "divergent", "transform", "craton", "hotspot"];

  if (latitudeBand === "temperate" || latitudeBand === "subtropical") {
    if (index % 5 === 0) return "craton";
  }

  if (latitudeBand === "subpolar" || latitudeBand === "temperate") {
    if (index % 4 === 1) return "convergent";
  }

  if (latitudeBand === "tropical" || latitudeBand === "subtropical") {
    if (index % 4 === 2) return "divergent";
  }

  return types[index % types.length];
}

// ------------------------------------------------------------
// ELEVATION
// ------------------------------------------------------------
function pickElevation(tectonicType, index) {
  if (tectonicType === "convergent") {
    return index % 3 === 0 ? "Mountain Range" : "Highlands";
  }
  if (tectonicType === "divergent") {
    return index % 2 === 0 ? "Rift Valley" : "Plateau";
  }
  if (tectonicType === "transform") {
    return "Broken Highlands";
  }
  if (tectonicType === "hotspot") {
    return index % 2 === 0 ? "Volcanic Plateau" : "Shield Volcanoes";
  }
  return index % 3 === 0 ? "Lowlands" : "Rolling Uplands";
}

// ------------------------------------------------------------
// MOISTURE
// ------------------------------------------------------------
function pickMoisture(windModel, hydrologyModel, latitudeBand, index) {
  const levels = ["Arid", "Semi-Arid", "Moderate", "Humid", "Wet"];

  let base = 2;

  if (windModel.includes("W")) base += 1;
  if (windModel.includes("D")) base -= 1;

  if (hydrologyModel.includes("R")) base += 1;
  if (hydrologyModel.includes("B")) base += 1;
  if (hydrologyModel.includes("S")) base -= 1;

  if (latitudeBand === "tropical") base += 1;
  if (latitudeBand === "polar") base -= 1;

  base += (index % 3) - 1;

  return levels[Math.max(0, Math.min(levels.length - 1, base))];
}

// ------------------------------------------------------------
// CLIMATE PATTERN
// ------------------------------------------------------------
function pickClimate(latitudeBand, moisture, elevation) {
  if (latitudeBand === "polar") {
    return moisture === "Wet" || moisture === "Humid"
      ? "Glacial Maritime"
      : "Polar Desert";
  }

  if (latitudeBand === "subpolar") {
    return elevation.includes("Mountain")
      ? "Cold Highland"
      : "Subpolar Maritime";
  }

  if (latitudeBand === "temperate") {
    if (moisture === "Arid" || moisture === "Semi-Arid") return "Temperate Steppe";
    if (moisture === "Wet" || moisture === "Humid") return "Temperate Oceanic";
    return "Temperate Mixed";
  }

  if (latitudeBand === "subtropical") {
    if (moisture === "Arid") return "Subtropical Desert";
    if (moisture === "Semi-Arid") return "Subtropical Steppe";
    return "Subtropical Monsoon";
  }

  if (moisture === "Wet" || moisture === "Humid") return "Tropical Rainfall";
  if (moisture === "Arid") return "Tropical Drylands";
  return "Tropical Seasonal";
}

// ------------------------------------------------------------
// BIOME SELECTION
// ------------------------------------------------------------
function pickCanonicalBiome(ctx) {
  const { latitudeBand, moisture, elevation, specialFeature } = ctx;

  if (specialFeature.includes("Geothermal")) return "Geothermal";
  if (specialFeature.includes("Subsurface")) return "Subsurface";

  if (elevation.includes("Rift") && (moisture === "Wet" || moisture === "Humid")) {
    return "Wetlands";
  }

  if (latitudeBand === "polar") return "Tundra";

  if (latitudeBand === "subpolar") {
    if (moisture === "Arid") return "Shrubland";
    return "Taiga Forests";
  }

  if (latitudeBand === "temperate") {
    if (moisture === "Arid") return "Shrubland";
    if (moisture === "Semi-Arid") return "Grassland";
    return "Temperate Forests";
  }

  if (latitudeBand === "subtropical") {
    if (moisture === "Arid") return "Desert";
    if (moisture === "Semi-Arid") return "Shrubland";
    return "Savanna";
  }

  if (moisture === "Arid" || moisture === "Semi-Arid") return "Savanna";
  return "Tropical Forests";
}

// ------------------------------------------------------------
// LANDFORM CLASSIFICATION
// ------------------------------------------------------------
function classifyLandform(specialFeature, elevation, biome) {
  if (specialFeature.includes("Archipelago")) return "Island Chain";
  if (specialFeature.includes("Rift")) return "Rift Valley";
  if (specialFeature.includes("Shield")) return "Shield Plateau";

  if (elevation.includes("Mountain")) return "Mountain Belt";
  if (elevation.includes("Rift")) return "Rifted Basin";
  if (elevation.includes("Plateau")) return "High Plateau";

  if (biome === "Wetlands") return "Floodplain";
  if (biome === "Desert") return "Desert Basin";

  return "Mixed Uplands";
}

// ------------------------------------------------------------
// ROLE SELECTION
// ------------------------------------------------------------
function pickRole(index) {
  const roles = [
    "Heartland",
    "Frontier",
    "Trade Nexus",
    "Sacred Ground",
    "Borderland",
    "Wilds",
    "Old Kingdom",
    "New Colony"
  ];

  return roles[index % roles.length];
}

// ------------------------------------------------------------
// DEFAULT DESCRIPTION
// ------------------------------------------------------------
function defaultRegionDescription(ctx) {
  const {
    biome,
    elevation,
    climatePattern,
    hemisphere,
    latitudeBand,
    tectonicType,
    specialFeature
  } = ctx;

  const featurePart = specialFeature
    ? `marked by ${specialFeature.toLowerCase()}`
    : "with no singular defining feature";

  return `A ${biome.toLowerCase()} region in the ${hemisphere.toLowerCase()} hemisphere, ` +
    `within the ${latitudeBand} band, shaped by ${tectonicType.toLowerCase()} tectonics, ` +
    `set in ${elevation.toLowerCase()} and a ${climatePattern.toLowerCase()} climate, ${featurePart}.`;
}
