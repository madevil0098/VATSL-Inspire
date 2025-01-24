
import drawImage from "../ImageHandler/drawImage";


 async function contrastInput(value){
  drawImage()
  window.contrast=value
  let imageData =  window.ctx.getImageData(0, 0,  window.canvas.width,  window.canvas.height);
  await adjustContrast(imageData, Number(value));
  drawImage()

};
async function adjustContrast(imageData, value) {
    if (value === 0) {
      return 0;
    }
  
    const factor = (259 * (value + 255)) / (255 * (259 - value));
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      data[i] = factor * (data[i] - 128) + 128;
      data[i + 1] = factor * (data[i + 1] - 128) + 128;
      data[i + 2] = factor * (data[i + 2] - 128) + 128;
    }
  }

  const AdjustContrast = { contrastInput, adjustContrast };
  export default AdjustContrast;