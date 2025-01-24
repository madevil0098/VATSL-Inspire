import drawImage from "../ImageHandler/drawImage";

async function saturationInput(value) {
  // Set saturation value globally or to window.saturation
  window.saturation = value;

  // Get image data from canvas before adjustment
  let imageData = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);

  // Adjust the saturation
  await adjustSaturation(imageData, Number(value));

  // Redraw image after adjustment
  drawImage();
}

async function adjustSaturation(imageData, value) {
  if (value === 0) {
    return 0; // No change if value is 0
  }

  const data = imageData.data;
  const adjustment = value / 100;

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];
    const gray = 0.3 * red + 0.59 * green + 0.11 * blue; // Luminosity formula

    // Adjust saturation
    data[i] = gray + adjustment * (red - gray);
    data[i + 1] = gray + adjustment * (green - gray);
    data[i + 2] = gray + adjustment * (blue - gray);

    // Ensure values stay within the 0–255 range
    data[i] = Math.min(255, Math.max(0, data[i]));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1]));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2]));
  }
}

// Export the functions
const AdjustSaturation = { saturationInput, adjustSaturation };
export default AdjustSaturation;
