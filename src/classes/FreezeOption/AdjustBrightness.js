
import drawImage from "../ImageHandler/drawImage";
import applyAdjustments from "./Filters";
async function brightnessInput(value){
  window.brightness=value
applyAdjustments()
drawImage()
};

export default brightnessInput;