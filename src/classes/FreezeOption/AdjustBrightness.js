
import drawImage from "../ImageHandler/drawImage";
async function brightnessInput(value){
  drawImage()
  window.brightness=value

  let imageData =  window.ctx.getImageData(0, 0,  window.canvas.width,  window.canvas.height);
  await adjustBrightness(imageData, Number(brightnessInput.value));
  drawImage()

};
async function adjustBrightness(imageData, value) {
    if (value === 0) {
      return 0;
    }
  
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] += value;
      data[i + 1] += value;
      data[i + 2] += value;
    }
  
  
  }
const AdjustBrightness = {brightnessInput,adjustBrightness};
export default AdjustBrightness;