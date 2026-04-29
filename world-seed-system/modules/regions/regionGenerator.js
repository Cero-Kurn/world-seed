// modules/world/regionGenerator.js
// ------------------------------------------------------------
// Region Generation (new world engine aligned)
// ------------------------------------------------------------

/**
 * @typedef {Object} DecodedSeedPart
 * @property {string} code
 * @property {string} primary
 * @property {string} twist
 */

/**
 * @typedef {Object} DecodedSeed
 * @property {DecodedSeedPart} cc  - Core concept
 * @property {DecodedSeedPart} lm  - Latitudinal model
 * @property {DecodedSeedPart} we  - Wind / weather model
 * @property {DecodedSeedPart} hy  - Hydrology model
 * @property {DecodedSeedPart} sf  - Special feature
 */

/**
 * @typedef {Object} Region
 * @property {string} id
 * @property {string} hemisphere          - "Northern" | "Southern"
 * @property {string} latitudeBand        - "polar" | "subpolar" | "temperate" | "subtropical" | "tropical"
 * @property {string} tectonicType        - "convergent" | "divergent" | "transform" | "craton" | "hotspot"
 * @property {string} elevation           - e.g. "Lowlands", "Highlands", "Mountain Range", "Plateau"
 * @property {string} moisture            - e.g. "Arid", "Semi-Arid", "Moderate", "Humid", "Wet"
 * @property {string} climatePattern      - short label for climate behavior
 * @property {string} biome               - canonical biome name
 * @property {string} role                - narrative / functional role
 * @property {string} specialFeature      - from decoded.sf.primary
 * @property {string} landform            - derived landform classification
 * @property {string | null} name         - to be filled by naming engine
 * @property {string | null} landmark     - to be filled by naming / landmark engine
 * @property {string} description         - short narrative description
 */

/**
 * @typedef {Object} RegionGenerationOptions
 * @property {string} [idPrefix]                      - Optional prefix for region IDs (default: "R")
 * @property {(ctx: {
 *   biome: string;
 *   elevation: string;
 *   climatePattern: string;
 *   hemisphere: string;
 *   latitudeBand: string;
 *   tectonicType: string;
 *   moisture: string;
 *   specialFeature: string;
 *   index: number;
 * }) => string} [buildRegionDescription]             - Optional hook to customize region descriptions
 */

/**
 * Generate the full set of regions for a world, based on the decoded seed.
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
    const tectonicType = pickTectonicType(latitudeBand, i);

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

    /** @type {Region} */
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

      // Naming hooks (to be filled by a separate naming engine)
      name: null,
      landmark: null,

      // Description hook
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

/**
 * Decide how many regions to generate based on the decoded seed.
 *
 * @param {DecodedSeed} decoded
 * @returns {number}
 */
function getRegionCount(decoded) {
  // Simple, deterministic mapping based on core concept + landmass model.
  const base = 12;

  const ccCode = decoded.cc.code || "";
  const lmCode = decoded.lm.code || "";

  let modifier = 0;

  if (ccCode.includes("A")) modifier += 4;
  if (ccCode.includes("B")) modifier += 2;
  if (lmCode.includes("X")) modifier += 6;
  if (lmCode.includes("Y")) modifier += 3;

  const count = base + modifier;
  return Math.max(8, Math.min(40, count));
}

// ------------------------------------------------------------
// HEMISPHERE & LATITUDE
// ------------------------------------------------------------

/**
 * Deterministic hemisphere assignment.
 *
 * @param {number} index
 * @returns {string}
 */
function pickHemisphere(index) {
  return index % 2 === 0 ? "Northern" : "Southern";
}

/**
 * Pick a latitude band based on hemisphere, index, and optional latitude model.
 *
 * @param {string} hemisphere
 * @param {number} index
 * @param {string} latitudeModel
 * @returns {string}
 */
function pickLatitudeBand(hemisphere, index, latitudeModel) {
  const bands = ["polar", "subpolar", "temperate", "subtropical", "tropical"];

  // Slight bias based on latitude model
  let offset = 0;
  if (latitudeModel.includes("E")) offset = 1;
  if (latitudeModel.includes("P")) offset = -1;

  const base = (index + (hemisphere === "Northern" ? 0 : 2) + offset);
  const idx = ((base % bands.length) + bands.length) % bands.length;

  return bands[idx];
}

// ------------------------------------------------------------
// TECTONICS
// ------------------------------------------------------------

/**
 * Pick tectonic type based on latitude band and index.
 *
 * @param {string} latitudeBand
 * @param {number} index
 * @returns {string}
 */
function pickTectonicType(latitudeBand, index) {
  const types = ["convergent", "divergent", "transform", "craton", "hotspot"];

  // Bias: cratons more common in temperate/subtropical interiors
  if (latitudeBand === "temperate" || latitudeBand === "subtropical") {
    if (index % 5 === 0) return "craton";
  }

  // Bias: convergent near subpolar / temperate (mountain belts)
  if (latitudeBand === "subpolar" || latitudeBand === "temperate") {
    if (index % 4 === 1) return "convergent";
  }

  // Bias: divergent near tropical / subtropical (rifts)
  if (latitudeBand === "tropical" || latitudeBand === "subtropical") {
    if (index % 4 === 2) return "divergent";
  }

  return types[index % types.length];
}

// ------------------------------------------------------------
// ELEVATION
// ------------------------------------------------------------

/**
 * Pick elevation tier based on tectonic type and index.
 *
 * @param {string} tectonicType
 * @param {number} index
 * @returns {string}
 */
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

  // craton or default
  return index % 3 === 0 ? "Lowlands" : "Rolling Uplands";
}

// ------------------------------------------------------------
// MOISTURE
// ------------------------------------------------------------

/**
 * Pick moisture level based on wind model, hydrology model, latitude band, and index.
 *
 * @param {string} windModel
 * @param {string} hydrologyModel
 * @param {string} latitudeBand
 * @param {number} index
 * @returns {string}
 */
function pickMoisture(windModel, hydrologyModel, latitudeBand, index) {
  const levels = ["Arid", "Semi-Arid", "Moderate", "Humid", "Wet"];

  let base = 2; // Moderate

  if (windModel.includes("W")) base += 1;
  if (windModel.includes("D")) base -= 1;

  if (hydrologyModel.includes("R")) base += 1; // rivers
  if (hydrologyModel.includes("B")) base += 1; // basins / wetlands
  if (hydrologyModel.includes("S")) base -= 1; // sparse

  if (latitudeBand === "tropical") base += 1;
  if (latitudeBand === "polar") base -= 1;

  base += (index % 3) - 1; // small local variation

  const idx = Math.max(0, Math.min(levels.length - 1, base));
  return levels[idx];
}

// ------------------------------------------------------------
// CLIMATE PATTERN
// ------------------------------------------------------------

/**
 * Derive a simple climate pattern label.
 *
 * @param {string} latitudeBand
 * @param {string} moisture
 * @param {string} elevation
 * @returns {string}
 */
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

  // tropical
  if (moisture === "Wet" || moisture === "Humid") return "Tropical Rainfall";
  if (moisture === "Arid") return "Tropical Drylands";
  return "Tropical Seasonal";
}

// ------------------------------------------------------------
// BIOME SELECTION
// ------------------------------------------------------------

/**
 * @typedef {Object} BiomeContext
 * @property {string} latitudeBand
 * @property {string} moisture
 * @property {string} elevation
 * @property {string} hydrologyModel
 * @property {string} specialFeature
 * @property {string} tectonicType
 */

/**
 * Pick a canonical biome based on climate context.
 *
 * @param {BiomeContext} ctx
 * @returns {string}
 */
function pickCanonicalBiome(ctx) {
  const { latitudeBand, moisture, elevation, specialFeature } = ctx;

  if (specialFeature.includes("Geothermal")) return "Geothermal";
  if (specialFeature.includes("Subsurface")) return "Subsurface";

  if (elevation.includes("Rift") || elevation.includes("Broken")) {
    if (moisture === "Wet" || moisture === "Humid") return "Wetlands";
  }

  if (latitudeBand === "polar") {
    return "Tundra";
  }

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

  // tropical
  if (moisture === "Arid" || moisture === "Semi-Arid") return "Savanna";
  return "Tropical Forests";
}

// ------------------------------------------------------------
// LANDFORM CLASSIFICATION
// ------------------------------------------------------------

/**
 * Classify landform from special feature, elevation, and biome.
 *
 * @param {string} specialFeature
 * @param {string} elevation
 * @param {string} biome
 * @returns {string}
 */
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

/**
 * Pick a narrative / functional role for a region.
 *
 * @param {number} index
 * @returns {string}
 */
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
// DEFAULT DESCRIPTION HOOK
// ------------------------------------------------------------

/**
 * Default region description builder.
 *
 * @param {{
 *   biome: string;
 *   elevation: string;
 *   climatePattern: string;
 *   hemisphere: string;
 *   latitudeBand: string;
 *   tectonicType: string;
 *   moisture: string;
 *   specialFeature: string;
 *   index: number;
 * }} ctx
 * @returns {string}
 */
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
