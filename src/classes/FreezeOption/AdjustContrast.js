
import drawImage from "../ImageHandler/drawImage";
import applyAdjustments from "./Filters";


 async function contrastInput(value){
  window.contrast=value
  applyAdjustments()
drawImage()
};


  export default contrastInput;