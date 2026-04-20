// regionDescription.js

export function buildRegionDescription(region) {
  const {
    type,
    biome,
    elevation,
    moisture,
    climatePattern,
    subFeatures,
    specialFeature,
    narrativeHook
  } = region;

  const subFeatureText = subFeatures.length
    ? "It contains " + subFeatures.join(" and ") + "."
    : "";

  return (
    `A ${type.toLowerCase()} dominated by ${biome.toLowerCase()}. ` +
    `The terrain is shaped by ${elevation.toLowerCase()} and influenced by ${moisture.toLowerCase()}. ` +
    `The region experiences ${climatePattern.toLowerCase()}. ` +
    `${subFeatureText} ` +
    `A notable feature is ${specialFeature.toLowerCase()}. ` +
    `${narrativeHook}`
  );
}
