// modules/regions/regionGenerator.js
// ------------------------------------------------------------
// Region Generator (canonical biomes + naming + dynamic size)
// ------------------------------------------------------------

import { buildRegionDescription } from "./regionDescription.js";
import { generateRegionName } from "../naming/regionNames.js";
import { generateLandmarkName } from "../naming/landmarkNames.js";

// ------------------------------------------------------------
// WORLD SIZE → REGION COUNT (with safe fallbacks)
// ------------------------------------------------------------
function getWorldSize(decoded) {
  // Try several likely locations; fall back to "medium"
  return (
    decoded.worldSize ||
    decoded.ws?.primary ||
    decoded.world?.size ||
    "medium"
  );
}

function getRegionCount(decoded) {
  const size = String(getWorldSize(decoded)).toLowerCase();

  switch (size) {
    case "small":
      return 8;
    case "large":
      return 18;
    case "huge":
      return 24;
    case "medium":
    default:
      return 12;
  }
}

// ------------------------------------------------------------
// HYDROLOGY + SPECIAL FEATURE CLASSIFIERS
// ------------------------------------------------------------
function isMarine(hydro, feature) {
  const h = hydro.toLowerCase();
  const f = feature.toLowerCase();
  return (
    h.includes("ocean") ||
    h.includes("sea") ||
    f.includes("ocean") ||
    f.includes("sea") ||
    f.includes("reef")
  );
}

function isCoastal(hydro, feature) {
  const h = hydro.toLowerCase();
  const f = feature.toLowerCase();
  return (
    h.includes("coast") ||
    h.includes("shore") ||
    h.includes("bay") ||
    f.includes("coast") ||
    f.includes("shore") ||
    f.includes("bay")
  );
}

function isFreshwater(hydro, feature) {
  const h = hydro.toLowerCase();
  const f = feature.toLowerCase();
  return (
    h.includes("lake") ||
    h.includes("river") ||
    h.includes("delta") ||
    f.includes("lake") ||
    f.includes("river") ||
    f.includes("delta")
  );
}

function isGeothermal(tectonicType, feature) {
  const t = String(tectonicType).toLowerCase();
  const f = feature.toLowerCase();
  return (
    t.includes("hotspot") ||
    f.includes("vent") ||
    f.includes("geyser") ||
    f.includes("lava")
  );
}

function isSubsurface(feature) {
  const f = feature.toLowerCase();
  return (
    f.includes("cave") ||
    f.includes("underground") ||
    f.includes("subterranean") ||
    f.includes("underdeep")
  );
}

// ------------------------------------------------------------
// LAND FORM CLASSIFIER (for consistency + future use)
// ------------------------------------------------------------
function classifyLandform(feature) {
  const f = feature.toLowerCase();

  if (f.includes("mountain") || f.includes("range")) return "mountain";
  if (f.includes("canyon") || f.includes("gorge") || f.includes("rift")) return "canyon";
  if (f.includes("forest") || f.includes("woods")) return "forest";
  if (f.includes("desert") || f.includes("dune")) return "desert";
  if (f.includes("marsh") || f.includes("bog") || f.includes("fen") || f.includes("wetland")) return "wetland";
  if (f.includes("coast") || f.includes("shore") || f.includes("cliff") || f.includes("strand")) return "coast";
  if (f.includes("reef") || f.includes("shoal") || f.includes("sea")) return "marine";
  if (f.includes("vent") || f.includes("geyser") || f.includes("lava")) return "geothermal";
  if (f.includes("cave") || f.includes("underground") || f.includes("subterranean")) return "subsurface";

  return "generic";
}

// ------------------------------------------------------------
// HEMISPHERE & LATITUDE
// ------------------------------------------------------------
function pickHemisphere(index) {
  if (index < 5) return "Northern";
  if (index < 10) return "Equatorial";
  return "Southern";
}

function pickLatitudeBand(hemisphere, index) {
  if (hemisphere === "Equatorial") return "Tropical";
  if (index % 3 === 0) return "Temperate";
  if (index % 3 === 1) return "Subtropical";
  return "Polar";
}

// ------------------------------------------------------------
// TECTONICS → ELEVATION
// ------------------------------------------------------------
function pickElevation(tectonicType) {
  switch (tectonicType) {
    case "convergent":
      return "Mountains";
    case "divergent":
      return "Rift Highlands";
    case "transform":
      return "Faulted Uplands";
    case "hotspot":
      return "Volcanic Highlands";
    case "craton":
    default:
      return "Lowlands";
  }
}

// ------------------------------------------------------------
// MOISTURE MODEL (wind + hydrology)
// ------------------------------------------------------------
function pickMoisture(wind, hydro) {
  const w = wind.toLowerCase();
  const h = hydro.toLowerCase();

  if (w.includes("moist") || h.includes("wetland") || h.includes("lake")) return "Wet";
  if (w.includes("dry") || h.includes("arid")) return "Dry";
  return "Moderate";
}

// ------------------------------------------------------------
// CLIMATE PATTERNS (kept simple, biome does the heavy lifting)
// ------------------------------------------------------------
function pickClimate(lat, moisture, elevation) {
  if (elevation === "High Mountains") return "Alpine Cold";
  if (lat === "Tropical" && moisture === "Wet") return "Humid Tropical";
  if (lat === "Tropical" && moisture === "Dry") return "Monsoon / Dry Tropical";
  if (lat === "Temperate") return "Temperate Seasonal";
  if (lat === "Subtropical") return "Warm Seasonal";
  if (lat === "Polar") return "Polar Cold";
  return "Mixed Climate";
}

// ------------------------------------------------------------
// CANONICAL BIOME PICKER (one biome per region)
// ------------------------------------------------------------
function pickCanonicalBiome({
  latitudeBand,
  moisture,
  elevation,
  hydrologyModel,
  specialFeature,
  tectonicType
}) {
  const lat = latitudeBand;
  const elev = elevation;
  const moist = moisture;

  // 1) Hard overrides: water + special environments
  if (isMarine(hydrologyModel, specialFeature)) return "Marine";
  if (isCoastal(hydrologyModel, specialFeature)) return "Coastal";
  if (isFreshwater(hydrologyModel, specialFeature)) return "Freshwater";
  if (isGeothermal(tectonicType, specialFeature)) return "Geothermal";
  if (isSubsurface(specialFeature)) return "Subsurface";

  // 2) Polar logic
  if (lat === "Polar") {
    return "Tundra";
  }

  // 3) High elevation logic
  const isHigh =
    elev.includes("Mountain") ||
    elev.includes("Highlands") ||
    elev.includes("Uplands");

  if (isHigh) {
    if (lat === "Tropical") return "Tropical Forests";
    if (lat === "Temperate" || lat === "Subtropical") return "Taiga Forests";
    return "Alpine";
  }

  // 4) Latitude + moisture logic for lowlands
  if (lat === "Tropical") {
    if (moist === "Wet") return "Tropical Forests";
    if (moist === "Moderate") return "Savanna";
    return "Shrubland"; // dry tropical → scrub
  }

  if (lat === "Temperate") {
    if (moist === "Wet") return "Temperate Forests";
    if (moist === "Moderate") return "Grassland";
    return "Shrubland"; // dry temperate → scrub
  }

  if (lat === "Subtropical") {
    if (moist === "Wet") return "Temperate Forests";
    if (moist === "Moderate") return "Shrubland";
    return "Desert";
  }

  // 5) Fallback
  return "Grassland";
}

// ------------------------------------------------------------
// REGION ROLE (placeholder for future specialization)
// ------------------------------------------------------------
function pickRole() {
  return "General Region";
}

// ------------------------------------------------------------
// MAIN REGION GENERATION
// ------------------------------------------------------------
export function generateRegions(decoded) {
  const regions = [];

  // NEW — tectonics are no longer seed‑based
  // They are generated per‑region
  const windModel = decoded.we.primary;
  const latitudeModel = decoded.lm?.primary || "";
  const hydrologyModel = decoded.hy.primary;
  const specialFeature = decoded.sf?.primary || "";

  const REGION_COUNT = getRegionCount(decoded);

  for (let i = 0; i < REGION_COUNT; i++) {
    const hemisphere = pickHemisphere(i);
    const latitudeBand = pickLatitudeBand(hemisphere, i);

    // NEW — tectonic type is generated here
    const tectonicType = pickTectonicType(latitudeBand, i);

    const elevation = pickElevation(tectonicType);
    const moisture = pickMoisture(windModel, hydrologyModel);
    const climatePattern = pickClimate(latitudeBand, moisture, elevation);

    const biome = pickCanonicalBiome({
      latitudeBand,
      moisture,
      elevation,
      hydrologyModel,
      specialFeature,
      tectonicType
    });

    const landform = classifyLandform(specialFeature);

      // Names (assigned after core properties)
      name: null,
      landmark: null,

      // Description
      description: buildRegionDescription
        ? buildRegionDescription({
            biome,
            elevation,
            climatePattern,
            hemisphere,
            latitudeBand,
            tectonicType
          })
        : `A region shaped by ${tectonicType.toLowerCase()} tectonics, with ${elevation.toLowerCase()} and a ${climatePattern.toLowerCase()} climate.`,

      // Debug
      debug: {
        tectonic: `Tectonic type "${tectonicType}" determined from TR seed.`,
        wind: `Wind model "${decoded.we.primary}" influenced moisture.`,
        rainShadow: elevation.includes("Mountain")
          ? `Mountains modify moisture → ${moisture}.`
          : `No major rain shadow effects.`,
        elevationTier: `Elevation determined by tectonics → ${elevation}.`,
        biome: `Canonical biome "${biome}" chosen from latitude "${latitudeBand}", moisture "${moisture}", elevation "${elevation}", hydrology "${hydrologyModel}", and feature "${specialFeature}".`,
        moisture: `Moisture derived from wind "${decoded.we.primary}" and hydrology "${decoded.hy.primary}".`,
        climate: `Climate pattern derived from latitude "${latitudeBand}", moisture "${moisture}", and elevation "${elevation}".`
      }
    };

    // Procedural names
    region.name = generateRegionName(region);
    region.landmark = generateLandmarkName(region);

    regions.push(region);
  }

  return regions;
}
