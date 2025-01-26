import drawImage from "./drawImage";
import canvaImagedown from "../../classes/ImageHandler/canvaImagedown";
import canvaImageup from "../../classes/ImageHandler/canvaImageup";
import canvaImagemove from "../../classes/ImageHandler/canvaImagemove";


const ImageImport = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const buttonIds = ["drawLine_1", "drawLine", "drawGrid","drawCurve"];
  
    // Enable all buttons
    buttonIds.forEach((id) => {
      window.toggleButtonState(id,true);
      
    });
    reader.onload = function (event) {
        window.image_file = new Image();
        window.image_file.src = event.target.result;
        window.image_file.onload = function () {
            window.canvas.width = 1200;
            window.canvas.height = 600;
            window.imgWidth = window.image_file.width;
            window.imgHeight = window.image_file.height;
  
        const widthRatio = (window.canvas.width - 100) / window.imgWidth;
        const heightRatio = (window.canvas.height - 100) / window.imgHeight;
        const scaleFactor = Math.min(widthRatio, heightRatio); // Ensure the image does not scale up
  
        // Scale the image dimensions
        window.imgWidth = window.imgWidth * scaleFactor;
        window.imgHeight = window.imgHeight * scaleFactor;
        if (window.imgWidth > window.canvas.width || window.imgHeight > window.canvas.height) {
          // Image is bigger than the canvas, start from the top-left corner
          window.imgX = 100;
          window.imgY = 100;
        } else {
          // Center the image on the canvas
          window.imgX = Math.max((window.canvas.width - window.imgWidth) / 2, 100);
          window.imgY = Math.max((window.canvas.height - window.imgHeight) / 2, 100);
        }
        // Center the image on the canvas
        // Clear the canvas and draw the new image
        window.ctx.clearRect(0, 0, window.canvas.width + 100, window.canvas.height + 100);
        window.ctx.drawImage(window.image_file, window.imgX, window.imgY, window.imgWidth + 100, window.imgHeight + 100);
        window.isFrozen=false;
  
        window.saveimagecanva = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
        drawImage()
        window.canvas.addEventListener("mousedown", canvaImagedown);
        window.canvas.addEventListener("mouseup", canvaImageup);
        window.canvas.addEventListener("mousemove", canvaImagemove);

        window.showCustomAlert("freeze image before drawing");
      };
    };
  
    reader.readAsDataURL(file);
  }
export default ImageImport;