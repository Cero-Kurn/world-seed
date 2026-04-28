// modules/regions/regionDescription.js
// ------------------------------------------------------------
// Region Description Generator (canonical flavor text)
// ------------------------------------------------------------
//
// Produces short, evocative descriptions for each region,
// blending biome, climate, elevation, tectonics, and special
// features into a cohesive narrative.
//
// This is the final narrative layer used by region panels,
// world encyclopedias, and map tooltips.
//

import { getBiomeRole } from "../climate/biomeRoles.js";
import { generateClimateBiomeSummary } from "../world/climateBiomeSummary.js";

export function buildRegionDescription({
  biome,
  elevation,
  climatePattern,
  hemisphere,
  latitudeBand,
  tectonicType,
  specialFeature,
  landform
}) {
  const role = getBiomeRole(biome);

  // ------------------------------------------------------------
  // 1. Biome opening line
  // ------------------------------------------------------------
  const biomeLine = `${biome} dominate this region, known for ${role.notes.toLowerCase()}.`;

  // ------------------------------------------------------------
  // 2. Climate + latitude
  // ------------------------------------------------------------
  const climateLine = `${climatePattern} conditions shape the environment, influenced by its position in the ${hemisphere.toLowerCase()} hemisphere and a ${latitudeBand.toLowerCase()} latitude band.`;

  // ------------------------------------------------------------
  // 3. Elevation + tectonics
  // ------------------------------------------------------------
  const elevationLine = describeElevationAndTectonics(elevation, tectonicType);

  // ------------------------------------------------------------
  // 4. Special feature (optional)
  // ------------------------------------------------------------
  const featureLine = describeSpecialFeature(specialFeature, landform);

  // ------------------------------------------------------------
  // 5. Climate-biome summary (from climateBiomeSummary.js)
  // ------------------------------------------------------------
  const climateSummary = generateClimateBiomeSummary({
    biome,
    elevation,
    climatePattern,
    hemisphere,
    latitudeBand,
    tectonicType
  });

  // ------------------------------------------------------------
  // Final combined description
  // ------------------------------------------------------------
  return [
    biomeLine,
    climateLine,
    elevationLine,
    featureLine,
    climateSummary
  ]
    .filter(Boolean)
    .join(" ");
}

// ------------------------------------------------------------
// Helper: elevation + tectonics
// ------------------------------------------------------------
function describeElevationAndTectonics(elevation, tectonicType) {
  const t = tectonicType.toLowerCase();

  let tectonicPhrase = "";

  if (t === "convergent") tectonicPhrase = "where convergent tectonic forces uplift the land";
  else if (t === "divergent") tectonicPhrase = "shaped by divergent rifting and crustal stretching";
  else if (t === "transform") tectonicPhrase = "fractured by transform faulting";
  else if (t === "hotspot") tectonicPhrase = "energized by a volcanic hotspot";
  else if (t === "craton") tectonicPhrase = "resting on ancient, stable cratonic bedrock";
  else tectonicPhrase = "influenced by subtle tectonic forces";

  return `The region sits within ${elevation.toLowerCase()}, ${tectonicPhrase}.`;
}

// ------------------------------------------------------------
// Helper: special feature description
// ------------------------------------------------------------
function describeSpecialFeature(feature, landform) {
  if (!feature || feature === "none") return "";

  const f = feature.toLowerCase();

  if (f.includes("coast")) return "A prominent coastline defines much of its character.";
  if (f.includes("reef")) return "Offshore reefs create vibrant marine ecosystems.";
  if (f.includes("lake")) return "A major lake provides fresh water and fertile surroundings.";
  if (f.includes("river")) return "A significant river system shapes local travel and settlement.";
  if (f.includes("canyon")) return "A dramatic canyon cuts through the landscape.";
  if (f.includes("mountain")) return "Mountainous terrain dominates the skyline.";
  if (f.includes("vent") || f.includes("geyser") || f.includes("lava"))
    return "Geothermal activity marks the land with vents, geysers, or lava fields.";
  if (f.includes("cave") || f.includes("underground") || f.includes("subterranean"))
    return "Subsurface caverns and underground networks lie beneath the region.";

  // fallback
  return `The region is noted for its ${landform} features.`;
}

