// modules/regions/regionGenerator.js
// ------------------------------------------------------------
// Region Generator (Clean, Modern Rewrite)
// ------------------------------------------------------------

import { buildRegionDescription } from "./regionDescription.js";
import { generateRegionName } from "../naming/regionNames.js";
import { generateLandmarkName } from "../naming/landmarkNames.js";

export function generateRegions(decoded) {
  const regions = [];

  // ------------------------------------------------------------
  // MODELS FROM SEED DECODER
  // ------------------------------------------------------------
  const tectonicType = decoded.tr.tectonicType;
  const windModel = decoded.we.primary;
  const latitudeModel = decoded.lm.primary;
  const hydrologyModel = decoded.hy.primary;
  const specialFeature = decoded.sf.primary;

  // ------------------------------------------------------------
  // HEMISPHERE
  // ------------------------------------------------------------
  function pickHemisphere(index) {
    if (index < 5) return "Northern";
    if (index < 10) return "Equatorial";
    return "Southern";
  }

  // ------------------------------------------------------------
  // LATITUDE BANDS
  // ------------------------------------------------------------
  function pickLatitudeBand(hemisphere, index) {
    if (hemisphere === "Equatorial") return "Tropical";
    if (index % 3 === 0) return "Temperate";
    if (index % 3 === 1) return "Subtropical";
    return "Polar";
  }

  // ------------------------------------------------------------
  // TECTONIC EFFECTS → ELEVATION
  // ------------------------------------------------------------
  function pickElevation(tectonicType) {
    switch (tectonicType) {
      case "convergent": return "Mountains";
      case "divergent": return "Rift Highlands";
      case "transform": return "Faulted Uplands";
      case "hotspot": return "Volcanic Highlands";
      case "craton":
      default: return "Lowlands";
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
  // CLIMATE PATTERNS
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
  // BIOME SELECTION (legacy → canonical mapping happens later)
  // ------------------------------------------------------------
  function pickBiome(lat, moisture, elevation) {
    if (elevation === "High Mountains") return "Alpine";
    if (elevation === "Mountains") return "Montane Forest";

    if (lat === "Tropical") {
      if (moisture === "Wet") return "Rainforest";
      if (moisture === "Moderate") return "Savanna";
      return "Dry Forest";
    }

    if (lat === "Temperate") {
      if (moisture === "Wet") return "Temperate Rainforest";
      if (moisture === "Moderate") return "Deciduous Forest";
      return "Steppe";
    }

    if (lat === "Subtropical") {
      if (moisture === "Wet") return "Subtropical Forest";
      if (moisture === "Moderate") return "Scrubland";
      return "Desert";
    }

    if (lat === "Polar") {
      if (moisture === "Wet") return "Tundra Wetlands";
      return "Tundra";
    }

    return "Mixed Terrain";
  }

  // ------------------------------------------------------------
  // REGION ROLE (placeholder)
  // ------------------------------------------------------------
  function pickRole() {
    return "General Region";
  }

  // ------------------------------------------------------------
  // MAIN REGION GENERATION LOOP
  // ------------------------------------------------------------
  for (let i = 0; i < 15; i++) {
    const hemisphere = pickHemisphere(i);
    const latitudeBand = pickLatitudeBand(hemisphere, i);

    const elevation = pickElevation(tectonicType);
    const moisture = pickMoisture(windModel, hydrologyModel);
    const climatePattern = pickClimate(latitudeBand, moisture, elevation);
    const biome = pickBiome(latitudeBand, moisture, elevation);

    const region = {
      hemisphere,
      latitudeBand,
      tectonicType,
      elevation,
      moisture,
      climatePattern,
      biome,
      role: pickRole(),
      specialFeature,

      // ------------------------------------------------
      // PROCEDURAL NAMING
      // ------------------------------------------------
      name: null,      // assigned below
      landmark: null,  // assigned below

      // ------------------------------------------------
      // REGION DESCRIPTION
      // ------------------------------------------------
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

      // ------------------------------------------------
      // DEBUG PANEL
      // ------------------------------------------------
      debug: {
        tectonic: `Tectonic type "${tectonicType}" determined from TR seed.`,
        wind: `Wind model "${decoded.we.primary}" influenced moisture.`,
        rainShadow: elevation.includes("Mountain")
          ? `Mountains modify moisture → ${moisture}.`
          : `No major rain shadow effects.`,
        elevationTier: `Elevation determined by tectonics → ${elevation}.`,
        biome: `Biome chosen from latitude "${latitudeBand}", moisture "${moisture}", and elevation "${elevation}".`,
        moisture: `Moisture derived from wind "${decoded.we.primary}" and hydrology "${decoded.hy.primary}".`,
        climate: `Climate pattern derived from latitude "${latitudeBand}", moisture "${moisture}", and elevation "${elevation}".`
      }
    };

    // ------------------------------------------------
    // PROCEDURAL NAMES (AFTER REGION OBJECT EXISTS)
    // ------------------------------------------------
    region.name = generateRegionName(region);
    region.landmark = generateLandmarkName(region);

    regions.push(region);
  }

  return regions;
}
