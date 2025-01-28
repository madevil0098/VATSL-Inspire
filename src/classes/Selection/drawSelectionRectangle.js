import drawResizeHandles_forobject from "./drawResizeHandles_forobject";
function getObjectBounds(object) {
    if (object.line) {
      // For line objects
      const xMin = Math.min(object.start.x, object.end.x);
      const yMin = Math.min(object.start.y, object.end.y);
      const xMax = Math.max(object.start.x, object.end.x);
      const yMax = Math.max(object.start.y, object.end.y);
      return {
        x: xMin - 5, // Add padding
        y: yMin - 5,
        width: xMax - xMin + 10,
        height: yMax - yMin + 10,
      };
    } else if (object.line_data) {
      // For line_data objects
      const xMin = Math.min(object.start.x, object.end.x);
      const yMin = Math.min(object.start.y, object.end.y);
      const xMax = Math.max(object.start.x, object.end.x);
      const yMax = Math.max(object.start.y, object.end.y);
      return {
        x: xMin - 5, // Add padding
        y: yMin - 5,
        width: xMax - xMin + 10,
        height: yMax - yMin + 10,
      };
    } else if (object.grid) {
      // For grid objects
      return {
        x: object.grid.x - 5,
        y: object.grid.y - 5,
        width: object.grid.width + 10,
        height: object.grid.height + 10,
        rotation: object.grid.rotation || 0, // Include rotation
      };
    } else if (object.node) {
      // For node objects
      const xMin = object.node.x - object.node.size - 15;
      const yMin = object.node.y - object.node.size - 15;
      const width = 2 * object.node.size;
      return {
        x: xMin,
        y: yMin,
        width: width + 30,
        height: width + 30,
      };
    } else if (object.curve) {
      // For curve objects
      const allPoints = [...object.curve.nodes, ...object.curve.controls];
      const xMin = Math.min(...allPoints.map(p => p.x));
      const yMin = Math.min(...allPoints.map(p => p.y));
      const xMax = Math.max(...allPoints.map(p => p.x));
      const yMax = Math.max(...allPoints.map(p => p.y));
      return {
        x: xMin - 5,
        y: yMin - 5,
        width: xMax - xMin + 10,
        height: yMax - yMin + 10,
      };
    }
  }
  
export default function drawSelectionRectangle(object) {
    const bounds = getObjectBounds(object);
  
    if (object.grid && object.grid.rotation) {
      // Handle rotated grid
      const centerX = bounds.x + bounds.width / 2;
      const centerY = bounds.y + bounds.height / 2;
  
      window.ctx.save(); // Save the current canvas state
      window.ctx.translate(centerX, centerY); // Translate to the center of the grid
      window.ctx.rotate(object.grid.rotation); // Rotate using the given radians
      window.ctx.beginPath();
      window.ctx.rect(-bounds.width / 2, -bounds.height / 2, bounds.width, bounds.height); // Draw the rectangle centered at (0, 0)
      window.ctx.strokeStyle = "rgba(0, 128, 255, 0.8)";
      window.ctx.lineWidth = 4;
      window.ctx.stroke();
      window.ctx.restore(); // Restore the canvas state
    } else {
      // Non-rotated objects
      window.ctx.beginPath();
      window.ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
      window.ctx.strokeStyle = "rgba(0, 128, 255, 0.8)";
      window.ctx.lineWidth = 4;
      window.ctx.stroke();
    }
  
    drawResizeHandles_forobject(object);
  }