// regionDescription.js
// ------------------------------------------------------------
// Simple description builder matching the older regionGenerator
// ------------------------------------------------------------

export function buildRegionDescription(region) {
  const {
    name,
    biome,
    elevation,
    moisture,
    feature
  } = region;

  return `
    ${name} is a ${elevation} region with ${moisture} conditions.
    Its dominant biome is ${biome}, and it is known for ${feature}.
  `.trim();
}
