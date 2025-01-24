import drawResizeHandles from "./drawResizeHandles"; 
export default async function drawImage() {
    //let imgY = Math.max((canvas.height - imgHeight) / 2, 50);
  
  
    const requiredWidth = window.imgX + window.imgWidth + 30; // 30px margin for better visibility
    const requiredHeight = window.imgY + window.imgHeight + 30;
    // Resize canvas if the image dimensions exceed the current canvas bounds
    if (requiredWidth > window.canvas.width || requiredHeight > window.canvas.height) {
        window.canvas.width = Math.max(requiredWidth, window.canvas.width);
        window.canvas.height = Math.max(requiredHeight, window.canvas.height);
    }
  
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    window.ctx.drawImage(window.image_file, window.imgX, window.imgY, window.imgWidth, window.imgHeight);
  
    // Draw resize handles (corners and sides)
    drawResizeHandles();
  
    //await applfilter()
    window.savedCanvasState = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
    //drawAllObjects();
  }