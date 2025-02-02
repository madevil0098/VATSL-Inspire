import drawResizeHandles_forobject from "./drawResizeHandles_forobject";
import getObjectBounds from "./getObjectBounds";

  
export default function drawSelectionRectangle(object) {
    const bounds = getObjectBounds(object);
  
    if (object.grid ) {
      // Handle rotated grid
      const { minX, maxX, minY, maxY } = bounds;

      // Get all four corner points of the bounding box
      const corners = [
          { x: minX, y: minY }, // Top-left
          { x: maxX, y: minY }, // Top-right
          { x: maxX, y: maxY }, // Bottom-right
          { x: minX, y: maxY }  // Bottom-left
      ];
  
      // Rotate corners using the grid's rotation angles
      const rotatedCorners = corners.map(corner => {
          return object.grid.apply3DRotation(corner.x, corner.y, 0); // z=0 since it's 2D
      });
  
      // Draw the rotated selection rectangle
      window.ctx.strokeStyle = "rgba(0, 128, 255, 0.8)"; // Color of the selection rectangle
      // Selection box color
      window.ctx.lineWidth = 4;

      window.ctx.beginPath();
      window.ctx.moveTo(rotatedCorners[0].x, rotatedCorners[0].y);
  
      for (let i = 1; i < rotatedCorners.length; i++) {
        window.ctx.lineTo(rotatedCorners[i].x, rotatedCorners[i].y);
      }
  
      window.ctx.closePath();
      window.ctx.stroke();
      // Draw the selection rectangle using the rotated bounds
      
        
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