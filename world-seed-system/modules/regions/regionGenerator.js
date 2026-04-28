  // ----------------------------------------------------
  // REGION NAMES (placeholder list)
  // ----------------------------------------------------
import { generateRegionName } from "../naming/regionNames.js";
import { generateLandmarkName } from "../naming/landmarkNames.js";

  region.name = generateRegionName(region);
  region.landmark = generateLandmarkName(region);

// regionGenerator.js
import { buildRegionDescription } from "./regionDescription.js";
export function generateRegions(decoded) {
  const regions = [];

  // ----------------------------------------------------
  // TECTONIC TYPE (from seed decoder)
  // ----------------------------------------------------
  const tectonicType = decoded.tr.tectonicType;

  // ----------------------------------------------------
  // PREVAILING WIND SIMULATION
  // ----------------------------------------------------
  const windModel = decoded.we.primary;

  // ----------------------------------------------------
  // LATITUDE MODEL
  // ----------------------------------------------------
  const latitudeModel = decoded.lm.primary;

  // ----------------------------------------------------
  // HYDROLOGY MODEL
  // ----------------------------------------------------
  const hydrologyModel = decoded.hy.primary;



  // ----------------------------------------------------
  // HEMISPHERE
  // ----------------------------------------------------
  function pickHemisphere(index) {
    if (index < 5) return "Northern";
    if (index < 10) return "Equatorial";
    return "Southern";
  }

  // ----------------------------------------------------
  // LATITUDE BANDS
  // ----------------------------------------------------
  function pickLatitudeBand(hemisphere, index) {
    if (hemisphere === "Equatorial") return "Tropical";
    if (index % 3 === 0) return "Temperate";
    if (index % 3 === 1) return "Subtropical";
    return "Polar";
  }

  // ----------------------------------------------------
  // TECTONIC EFFECTS: ELEVATION
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // MOISTURE MODEL (wind + hydrology)
  // ----------------------------------------------------
  function pickMoisture(wind, hydro) {
    const w = wind.toLowerCase();
    const h = hydro.toLowerCase();

    if (w.includes("moist") || h.includes("wetland") || h.includes("lake")) return "Wet";
    if (w.includes("dry") || h.includes("arid")) return "Dry";
    return "Moderate";
  }

  // ----------------------------------------------------
  // CLIMATE PATTERNS
  // ----------------------------------------------------
  function pickClimate(lat, moisture, elevation) {
    if (elevation === "High Mountains") return "Alpine Cold";
    if (lat === "Tropical" && moisture === "Wet") return "Humid Tropical";
    if (lat === "Tropical" && moisture === "Dry") return "Monsoon / Dry Tropical";
    if (lat === "Temperate") return "Temperate Seasonal";
    if (lat === "Subtropical") return "Warm Seasonal";
    if (lat === "Polar") return "Polar Cold";
    return "Mixed Climate";
  }

  // ----------------------------------------------------
  // BIOME SELECTION
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // REGION ROLES (placeholder)
  // ----------------------------------------------------
  function pickRole() {
    return "General Region";
  }

  // ----------------------------------------------------
  // MAIN REGION GENERATION LOOP
  // ----------------------------------------------------
  for (let i = 0; i < regionNames.length; i++) {
    const name = regionNames[i];

    const hemisphere = pickHemisphere(i);
    const latitudeBand = pickLatitudeBand(hemisphere, i);

    const elevation = pickElevation(tectonicType);
    const moisture = pickMoisture(windModel, hydrologyModel);
    const climatePattern = pickClimate(latitudeBand, moisture, elevation);
    const biome = pickBiome(latitudeBand, moisture, elevation);

    const region = {
      name,
      hemisphere,
      latitudeBand,
      tectonicType,
      elevation,
      moisture,
      climatePattern,
      biome,
      role: pickRole(),
      feature: decoded.sf.primary,

      // ------------------------------------------------
      // REGION DESCRIPTION (optional external generator)
      // ------------------------------------------------
      description: buildRegionDescription
        ? buildRegionDescription({
            name,
            tectonicType,
            elevation,
            climatePattern,
            biome,
            hemisphere
          })
        : `${name} is shaped by ${tectonicType.toLowerCase()} tectonics, with ${elevation.toLowerCase()} and a ${climatePattern.toLowerCase()} climate.`,

      // ------------------------------------------------
      // DEBUG PANEL OUTPUT
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

    regions.push(region);
  }

  return regions;
}
