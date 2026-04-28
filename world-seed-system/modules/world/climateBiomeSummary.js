// modules/climate/climateBiomeSummary.js
// ------------------------------------------------------------
// Climate + Biome Summary Generator (canonical biomes)
// ------------------------------------------------------------
//
// Produces readable summaries describing how climate, elevation,
// moisture, and tectonics shape each region's biome.
//
// Used by:
// - region panels
// - world encyclopedia
// - narrative modules
// - climate UI overlays
//

import { getBiomeRole } from "./biomeRoles.js";

export function generateClimateBiomeSummary(region) {
  const {
    biome,
    elevation,
    moisture,
    climatePattern,
    hemisphere,
    latitudeBand,
    tectonicType
  } = region;

  const role = getBiomeRole(biome);

  // ------------------------------------------------------------
  // Build summary components
  // ------------------------------------------------------------

  const climateLine = `${climatePattern} conditions dominate this part of the ${hemisphere.toLowerCase()} hemisphere.`;

  const latitudeLine = `Situated in a ${latitudeBand.toLowerCase()} latitude band, the region experiences ${describeLatitude(latitudeBand)}.`;

  const elevationLine = describeElevation(elevation);

  const moistureLine = describeMoisture(moisture);

  const biomeLine = describeBiome(biome, role);

  const tectonicLine = describeTectonics(tectonicType);

  // ------------------------------------------------------------
  // Final summary paragraph
  // ------------------------------------------------------------
  return [
    biomeLine,
    climateLine,
    latitudeLine,
    elevationLine,
    moistureLine,
    tectonicLine
  ]
    .filter(Boolean)
    .join(" ");
}

// ------------------------------------------------------------
// Helper: latitude description
// ------------------------------------------------------------
function describeLatitude(lat) {
  switch (lat) {
    case "Tropical":
      return "warm temperatures and strong seasonal rainfall patterns";
    case "Subtropical":
      return "warm seasons with moderate rainfall";
    case "Temperate":
      return "balanced seasons with moderate temperature swings";
    case "Polar":
      return "long winters, short summers, and low solar energy";
    default:
      return "a climate typical for its latitude";
  }
}

// ------------------------------------------------------------
// Helper: elevation description
// ------------------------------------------------------------
function describeElevation(elev) {
  if (elev.includes("Mountain"))
    return "High elevations create cooler temperatures and strong wind exposure.";

  if (elev.includes("Highlands"))
    return "Elevated terrain moderates temperatures and shapes local weather patterns.";

  if (elev.includes("Uplands"))
    return "Upland terrain introduces mild elevation effects on climate.";

  return "Lowland terrain allows climate patterns to express fully.";
}

// ------------------------------------------------------------
// Helper: moisture description
// ------------------------------------------------------------
function describeMoisture(moist) {
  switch (moist) {
    case "Wet":
      return "Abundant moisture supports lush vegetation and high biodiversity.";
    case "Moderate":
      return "Moderate moisture levels support a balanced ecological mix.";
    case "Dry":
      return "Limited moisture restricts vegetation and favors drought-adapted species.";
    default:
      return "Moisture levels vary across the region.";
  }
}

// ------------------------------------------------------------
// Helper: biome description
// ------------------------------------------------------------
function describeBiome(biome, role) {
  return `${biome} dominate the landscape, characterized by ${role.notes.toLowerCase()}`;
}

// ------------------------------------------------------------
// Helper: tectonic description
// ------------------------------------------------------------
function describeTectonics(type) {
  const t = type.toLowerCase();

  if (t === "convergent")
    return "Convergent tectonic forces uplift the land and create rugged terrain.";

  if (t === "divergent")
    return "Divergent tectonics stretch the crust, forming rifts and highlands.";

  if (t === "transform")
    return "Transform boundaries fracture the land into faulted uplands.";

  if (t === "hotspot")
    return "A volcanic hotspot fuels geothermal activity and reshapes the landscape.";

  if (t === "craton")
    return "Ancient cratonic bedrock provides long-term geological stability.";

  return "Tectonic forces subtly influence the region's long-term evolution.";
}
