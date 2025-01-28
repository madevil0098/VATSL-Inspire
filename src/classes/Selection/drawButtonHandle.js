export default function drawButtonHandle(x, y) {
    window.ctx.fillStyle = "#3498db"; // Handle fill color (light blue)
    window.ctx.strokeStyle = "#2980b9"; // Handle border color (dark blue)
    window.ctx.lineWidth = 7;
  
    // Draw a filled rectangle with a border (button-like appearance)
    window.ctx.fillRect(x - window.handleSize / 2, y - window.handleSize / 2, window.handleSize, window.handleSize);
    window.ctx.strokeRect(
      x - window.handleSize / 2,
      y - window.handleSize / 2,
      window.handleSize,
      window.handleSize
    );
  }