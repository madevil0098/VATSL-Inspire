import rotatePoint from "./rotatePoint";
export default function isMouseNearObject(mouseX, mouseY, object, tolerance = 0.5) {
    if (object.line) {
      const {
        start,
        lineWidth,
        end
      } = object.line;
      const halfWidth = lineWidth / 2;
      const extension = 5; // Extend 5 units on each end
  
      // Calculate the unit vector for the line direction
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const lineLength = Math.sqrt(dx ** 2 + dy ** 2);
  
      // Early exit if lineLength is 0 (degenerate case)
      if (lineLength === 0) return false;
  
      const unitVector = {
        x: dx / lineLength,
        y: dy / lineLength
      };
  
      // Extend the start and end points
      const extendedStart = {
        x: start.x - unitVector.x * extension,
        y: start.y - unitVector.y * extension,
      };
      const extendedEnd = {
        x: end.x + unitVector.x * extension,
        y: end.y + unitVector.y * extension,
      };
  
      // Calculate the projection of the point onto the extended line
      const t =
        ((mouseX - extendedStart.x) * (extendedEnd.x - extendedStart.x) +
          (mouseY - extendedStart.y) * (extendedEnd.y - extendedStart.y)) /
        ((extendedEnd.x - extendedStart.x) ** 2 +
          (extendedEnd.y - extendedStart.y) ** 2);
  
      // Find the closest point on the extended line (clamped to the extended segment)
      const closestPoint = {
        x: extendedStart.x +
          Math.max(0, Math.min(1, t)) * (extendedEnd.x - extendedStart.x),
        y: extendedStart.y +
          Math.max(0, Math.min(1, t)) * (extendedEnd.y - extendedStart.y),
      };
  
      // Calculate the perpendicular distance from the point to the line
      const distToLine = Math.sqrt(
        (mouseX - closestPoint.x) ** 2 + (mouseY - closestPoint.y) ** 2
      );
  
      // Check if the point is within the width of the line
      return distToLine <= halfWidth;
    } else if (object.line_data) {
      const {
        start,
        lineWidth,
        end
      } = object.line_data;
      const halfWidth = lineWidth / 2;
      const extension = 5; // Extend 5 units on each end
  
      // Calculate the unit vector for the line direction
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const lineLength = Math.sqrt(dx ** 2 + dy ** 2);
  
      // Early exit if lineLength is 0 (degenerate case)
      if (lineLength === 0) return false;
  
      const unitVector = {
        x: dx / lineLength,
        y: dy / lineLength
      };
  
      // Extend the start and end points
      const extendedStart = {
        x: start.x - unitVector.x * extension,
        y: start.y - unitVector.y * extension,
      };
      const extendedEnd = {
        x: end.x + unitVector.x * extension,
        y: end.y + unitVector.y * extension,
      };
  
      // Calculate the projection of the point onto the extended line
      const t =
        ((mouseX - extendedStart.x) * (extendedEnd.x - extendedStart.x) +
          (mouseY - extendedStart.y) * (extendedEnd.y - extendedStart.y)) /
        ((extendedEnd.x - extendedStart.x) ** 2 +
          (extendedEnd.y - extendedStart.y) ** 2);
  
      // Find the closest point on the extended line (clamped to the extended segment)
      const closestPoint = {
        x: extendedStart.x +
          Math.max(0, Math.min(1, t)) * (extendedEnd.x - extendedStart.x),
        y: extendedStart.y +
          Math.max(0, Math.min(1, t)) * (extendedEnd.y - extendedStart.y),
      };
  
      // Calculate the perpendicular distance from the point to the line
      const distToLine = Math.sqrt(
        (mouseX - closestPoint.x) ** 2 + (mouseY - closestPoint.y) ** 2
      );
  
      // Check if the point is within the width of the line
      return distToLine <= halfWidth;
    } else if (object.grid) {
      const rotation = object.grid.rotation || 0; // Get the grid rotation in radians
      const {
        x,
        y,
        width,
        height
      } = object.grid;
  
      // Calculate the grid's center point
      const centerX = x + width / 2;
      const centerY = y + height / 2;
  
      // Rotate the mouse position to check if it's inside the rotated grid
      const rotatedMouse = rotatePoint(mouseX, mouseY, centerX, centerY, -rotation); // Rotate mouse position by -rotation to match the grid's rotation
  
      // Calculate grid boundaries with threshold
      const threshold = 7; // Set the threshold value
      const gridStartX = x - threshold;
      const gridEndX = x + width + threshold;
      const gridStartY = y - threshold;
      const gridEndY = y + height + threshold;
  
      // Check if the rotated mouse position is within the grid's bounding box (with threshold)
      return (
        rotatedMouse.x >= gridStartX &&
        rotatedMouse.x <= gridEndX &&
        rotatedMouse.y >= gridStartY &&
        rotatedMouse.y <= gridEndY
      );
    } else if (object.node) {
      const distance = Math.sqrt(
        (object.node.x - mouseX) ** 2 + (object.node.y - mouseY) ** 2
      );
      // If click is within a certain distance (e.g., 5 pixels), change the color
      return distance < object.node.size + 5;
    } else if (object.curve) {
      if (object.curve.hitTest(mouseX, mouseY)) {
        return true;
      } // Mouse is not near the curve, points, or lines
    }
  
    // Extend logic for other object types as needed
    return false;
  }