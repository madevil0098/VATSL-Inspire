import rotatePoint from "./rotatePoint";
import drawButtonHandle from "./drawButtonHandle";
export default function drawResizeHandles_forobject(object) {
    if (object.line) {
      drawButtonHandle(object.line.start.x, object.line.start.y); // Start point
      drawButtonHandle(object.line.end.x, object.line.end.y); // End point
    } else if (object.line_data) {
      drawButtonHandle(object.line_data.start.x, object.line_data.start.y); // Start point
      drawButtonHandle(object.line_data.end.x, object.line_data.end.y); // End point
    } else if (object.grid) {
      const rotation = object.grid.rotation || 0; // Get rotation in radians
      const centerX = object.grid.x + object.grid.width / 2;
      const centerY = object.grid.y + object.grid.height / 2;
  
      // Calculate rotated corners
      const corners = [{
          x: object.grid.x,
          y: object.grid.y
        }, // Top-left
        {
          x: object.grid.x + object.grid.width,
          y: object.grid.y
        }, // Top-right
        {
          x: object.grid.x,
          y: object.grid.y + object.grid.height
        }, // Bottom-left
        {
          x: object.grid.x + object.grid.width,
          y: object.grid.y + object.grid.height
        }, // Bottom-right
      ].map(corner => rotatePoint(corner.x, corner.y, centerX, centerY, rotation));
  
      // Draw handles for each corner
      for (const corner of corners) {
        drawButtonHandle(corner.x, corner.y);
      }
    }
  }