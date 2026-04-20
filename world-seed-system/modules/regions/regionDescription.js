// regionDescription.js

export function buildRegionDescription(region) {
  const {
    type,
    biome,
    elevation,
    moisture,
    climatePattern,
    specialFeature,
    narrativeHook
  } = region;



  return (
    `A ${type.toLowerCase()} dominated by ${biome.toLowerCase()}. ` +
    `The terrain is shaped by ${elevation.toLowerCase()} and influenced by ${moisture.toLowerCase()}. ` +
    `The region experiences ${climatePattern.toLowerCase()}. ` +

    `A notable feature is ${specialFeature.toLowerCase()}. ` +
    `${narrativeHook}`
  );
}
