import isMouseNearPoint from "./IsMouseNearPoint";
import rotatePoint from "../Selection/rotatePoint";
export default function getResizeHandle(mousePos, object) {
    if (object.line) {
      if (isMouseNearPoint(mousePos.x, mousePos.y, object.line.start)) {
        return "start"; // Resizing start point
      } else if (isMouseNearPoint(mousePos.x, mousePos.y, object.line.end)) {
        return "end"; // Resizing end point
      }
    } else if (object.line_data) {
      if (isMouseNearPoint(mousePos.x, mousePos.y, object.line_data.start)) {
        return "start"; // Resizing start point
      } else if (isMouseNearPoint(mousePos.x, mousePos.y, object.line_data.end)) {
        return "end"; // Resizing end point
      }
    } else if (object.grid) {
      const rotation = object.grid.rotation || 0; // Get rotation in radians
      const centerX = object.grid.x + object.grid.width / 2;
      const centerY = object.grid.y + object.grid.height / 2;
  
      // Calculate rotated corners
      const corners = {
        "top-left": rotatePoint(object.grid.x, object.grid.y, centerX, centerY, rotation),
        "top-right": rotatePoint(object.grid.x + object.grid.width, object.grid.y, centerX, centerY, rotation),
        "bottom-left": rotatePoint(object.grid.x, object.grid.y + object.grid.height, centerX, centerY, rotation),
        "bottom-right": rotatePoint(object.grid.x + object.grid.width, object.grid.y + object.grid.height, centerX, centerY, rotation),
      };
  
      // Check if the mouse is near any rotated corner
      for (const [key, corner] of Object.entries(corners)) {
        if (isMouseNearPoint(mousePos.x, mousePos.y, corner)) {
          return key; // Return the corner key (e.g., "top-left", "top-right")
        }
      }
    }
  
    return null; // Not near any handle
  }