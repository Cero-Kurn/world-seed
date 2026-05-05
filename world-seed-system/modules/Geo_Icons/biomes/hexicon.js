// -----------------------------
// Constants
// -----------------------------
export function HexMapIcon(decoded) {
  const { lm, we, tr, hy } = decoded;

const icons = {
  mountain: new Image(),
  forest: new Image(),
  desert: new Image(),
  city: new Image()
};

icons.mountain.src = "modules/Geo_Icons/alpine/Mountain1.png";
icons.forest.src = "icons/forest.png";
icons.desert.src = "icons/desert.png";
icons.city.src = "icons/city.png";


// -----------------------------
// Main Map Generation
// -----------------------------
function drawIcon(ctx, img, x, y, size) {
  const iconSize = size * 1.2; // scale relative to hex size
  ctx.drawImage(
    img,
    x - iconSize / 2,
    y - iconSize / 2,
    iconSize,
    iconSize
  );
}

// After drawHex(...)
if (hex.elevation === "mountains") {
  drawIcon(ctx, icons.mountain, x, y, size);
}

if (hex.biome === "tropical rainforest") {
  drawIcon(ctx, icons.forest, x, y, size);
}

if (hex.biome === "desert") {
  drawIcon(ctx, icons.desert, x, y, size);
}
