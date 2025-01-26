export default function drawResizeHandles() {
  console.log(window.isFrozen)
    if (!window.isFrozen) {
    console.log(window.isFrozen,"drawing")

        window.ctx.fillStyle = "gray"; // Color for the resize handles
      const handleSize = 10; // Size of the resize handles
  
      // Helper function to draw a handle
      function drawHandle(x, y) {
        window.ctx.fillRect(
          x - handleSize / 2,
          y - handleSize / 2,
          handleSize,
          handleSize
        );
      }
      //let imgY = Math.max((canvas.height - imgHeight) / 2, 50);
      if (window.imgX + window.imgWidth > window.canvas.width) {
        window.imgX = window.imgWidth; // Adjust if it goes beyond the right edge with a 30-pixel margin
      }
  
      // Draw corners
      drawHandle(window.imgX, window.imgY); // Top-left
      drawHandle(window.imgX + window.imgWidth, window.imgY); // Top-right
      drawHandle(window.imgX, window.imgY + window.imgHeight); // Bottom-left
      drawHandle(window.imgX + window.imgWidth, window.imgY + window.imgHeight); // Bottom-right
  
      // Draw sides
      drawHandle(window.imgX + window.imgWidth / 2, window.imgY); // Top-middle
      drawHandle(window.imgX + window.imgWidth / 2, window.imgY + window.imgHeight); // Bottom-middle
      drawHandle(window.imgX, window.imgY + window.imgHeight / 2); // Left-middle
      drawHandle(window.imgX + window.imgWidth, window.imgY + window.imgHeight / 2); // Right-middle
    }
  }