
export default function drawDragBox(startX, startY, width, height) {
    window.ctx.strokeStyle = "rgb(255,255,255)"; // Blue for drag box
    window.ctx.lineWidth = 4; // Thinner line for the drag box
    window.ctx.strokeRect(startX, startY, width, height); // Draw a rectangle showing grid area
  }
  