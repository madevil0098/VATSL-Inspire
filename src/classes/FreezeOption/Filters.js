import AdjustBrightness from "./AdjustBrightness";
import AdjustContrast from "./AdjustContrast";
import AdjustSaturation  from "./AdjustSaturation";
const applyAdjustments = async () => {
 

  // Get image data as a base64 URL
  
  try {
    // Load the image into image-js
    let imageData = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);

    await AdjustBrightness.adjustBrightness(imageData, Number(window.brightness));
    await AdjustContrast.adjustContrast(imageData, Number(window.contrast));
    await AdjustSaturation.adjustSaturation(imageData, Number(window.saturation));
  
  
    window.ctx.putImageData(imageData, 0, 0);
  } catch (error) {
    console.error('Error applying adjustments:', error);
  }
};
export default applyAdjustments