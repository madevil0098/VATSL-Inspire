
export default class Line_x  {
    constructor(start, end, transparency, lineWidth) {
      this.start = start;
      this.end = end;
      this.lineWidth = lineWidth;
      this.colour = "rgb(183, 201, 226)"; // Line color
      this.node_colour = "white";
      this.transparency = transparency; // Transparency (0.0 = fully transparent, 1.0 = fully opaque)
    }
    calculateLength() {
      const dx = this.end.x - this.start.x;
      const dy = this.end.y - this.start.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  
    // Method to calculate the ratio of line length to canvas dimensions
    calculateRatio(canvasDimensionX, unitConversionFactor = 1) {
  
  
      // Threshold for condition checking
      const threshold = 50;
  
      // Determine the orientation of the line
      if (Math.abs(this.start.y - this.end.y) <= threshold) {
        // Horizontal line (x-axis dominant)
        let lineLength = Math.abs(this.end.x - this.start.x);
        window.xRatio = canvasDimensionX / (lineLength * unitConversionFactor);
  
  
      } else if (Math.abs(this.start.x - this.end.x) <= threshold) {
        // Vertical line (y-axis dominant)
        let lineLength = Math.abs(this.end.y - this.start.y);
        window.yRatio = canvasDimensionX / (lineLength * unitConversionFactor);
  
  
      } else {
        // Diagonal line: Use Pythagorean theorem
        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        const angle = Math.atan2(dy, dx); // Angle in radians
  
        // Decompose length into x and y components
        const xLength = Math.abs(canvasDimensionX * Math.cos(angle)); // Adjusted length in x
        const yLength = Math.abs(canvasDimensionX * Math.sin(angle)); // Adjusted length in y
  
        // Compute ratios using the adjusted lengths
        window.xRatio = xLength / (Math.abs(dx) * unitConversionFactor);
        window.yRatio = yLength / (Math.abs(dy) * unitConversionFactor);
  
      }
  
    }
  
    drawLineWithNodes(ctx_draw) {
      // Draw the full line first
      this.drawLineSegment(
        this.start.x,
        this.start.y,
        this.end.x,
        this.end.y,
        ctx_draw
      );
  
      // Draw white nodes (holes) along the line, excluding the last dot to avoid overlap
    }
    redraw(ctx_draw) {
      // Check if the number of dots matches the drawn nodes
  
      this.drawLineWithNodes(ctx_draw);
  
    }
  
    forcolour(ctx_draw) {
      
      this.drawLineSegment(
        this.start.x,
        this.start.y,
        this.end.x,
        this.end.y,
        ctx_draw
      );
  
    }
    // Utility function to draw a line segment between two points
    drawLineSegment(x1, y1, x2, y2, ctx_draw) {
      ctx_draw.beginPath();
      ctx_draw.moveTo(x1, y1);
      ctx_draw.lineTo(x2, y2);
      const r = 183,
        g = 201,
        b = 226;
      ctx_draw.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.transparency})`;
  
      ctx_draw.lineWidth = this.lineWidth; // Line thickness
      ctx_draw.stroke();
    }
  }