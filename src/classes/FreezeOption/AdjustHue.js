import drawImage from "../ImageHandler/drawImage";
import applyAdjustments from "./Filters";

async function HueInput(value) {
  // Set saturation value globally or to window.saturation
  
  window.Hue = value;

  // Adjust the saturation
  applyAdjustments()
  // Redraw image after adjustment
  drawImage()
}



// Export the functions
export default HueInput;
