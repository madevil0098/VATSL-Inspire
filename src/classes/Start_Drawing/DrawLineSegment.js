export default function drawLineSegment(x1, y1, x2, y2) {
    window.ctx.beginPath();
    window.ctx.moveTo(x1, y1);
    window.ctx.lineTo(x2, y2);
    window.ctx.strokeStyle = "rgb(183, 201, 226)"; // Use a lighter color for the dynamic line
    window.ctx.lineWidth = 7.5; // Use a thinner line for dynamic drawing
    window.ctx.stroke();
  }