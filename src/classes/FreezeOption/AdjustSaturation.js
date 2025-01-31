import drawImage from "../ImageHandler/drawImage";
import applyAdjustments from "./Filters";

async function saturationInput(value) {
  // Set saturation value globally or to window.saturation
  
  window.saturation = value;

  // Adjust the saturation
  applyAdjustments()
  // Redraw image after adjustment
  drawImage()
}



// Export the functions
export default saturationInput;
