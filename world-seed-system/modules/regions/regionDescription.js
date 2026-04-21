// regionDescription.js

export function buildRegionDescription(region) {
  const {
    name,
    latitudeBand,
    climatePattern,
    biome,
    elevation,
    elevationTier,
    moisture,
    feature,
    role
  } = region;

  return `
    ${name} lies within the ${latitudeBand} zone and follows a ${climatePattern} climate pattern.
    It forms part of the ${elevationTier} and serves as a ${role} in the wider world.
    The region is a ${elevation} area with ${moisture} conditions.
    Its dominant biome is ${biome}, and it is known for ${feature}.
  `.trim();
}
