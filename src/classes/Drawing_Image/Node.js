export default class Node {
    constructor(x, y, colour, size,image= ".\\assets\\EC-STAR-D70P5.png") {
      this.x = x;
      this.y = y;
      this.colour = colour; // Array of 6 variables
      this.size = size; // A single variable to select
      this.img_dat = image;
    }
    async drawImage(ctx_draw, image) {
      // Ensure the image is loaded before drawing
      if (image.complete) {
        const imgSize = this.size * 4; // Double the size of the node
        const imgX = this.x - imgSize / 2; // Center the image horizontally
        const imgY = this.y - imgSize / 2; // Center the image vertically
        ctx_draw.drawImage(image, imgX, imgY, imgSize, imgSize);
        this.drawNode(ctx_draw);
      } else {
        image.onload = () => {
          this.drawImage(ctx_draw, image); // Redraw once the image is loaded
        };
      }
    }
    async drawimg(ctx_draw) {
      const image = new Image(); // Create an Image object
  
      // Check if img_dat is a valid Blob or URL string
      if (typeof this.img_dat === "string") {
        image.src = this.img_dat; // Directly use the path if it's a valid URL
      } else if (this.img_dat instanceof Blob) {
        const reader = new FileReader();
        reader.onload = function (e) {
          image.src = e.target.result; // Use the base64 data URL from FileReader
        };
        reader.onerror = () => {
          console.error("Failed to read the local file.");
        };
        reader.readAsDataURL(this.img_dat); // Read the Blob as a data URL
      } else {
        console.error("Invalid image data provided.");
        return;
      }
  
      // Draw the image once it's loaded
      image.onload = () => {
  
        // Draw the image first
        this.drawImage(ctx_draw, image);
  
        // Then draw the circle (overlay or highlight)
  
      };
  
      image.onerror = (e) => {
        console.error("Failed to load the image.", e);
      }
  
    }
    drawNode(ctx_draw) {
      ctx_draw.beginPath();
      ctx_draw.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx_draw.fillStyle = this.colour; // Node color
      ctx_draw.fill();
    }
  }