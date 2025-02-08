import isMouseInsideObject from "../Selection_movement/IsMouseInsideObject";

export default function isMouseNearObject(mouseX, mouseY, object, tolerance = 0.5) {
    if (object.line) {
      if (object.line.hitTest(mouseX, mouseY)) {
        return true;
      }
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
      for (let node of object.grid.drawn_node) {
        const { x, y } = node.node; // Get transformed (visible) node position
        const nodeSize = object.grid.node_size;
        const cellSize = object.grid.cellSize;

        // Effective selection area: max(nodeSize, cellSize * 0.5) ensures grid spaces are clickable
        const selectionRange = Math.max(nodeSize, cellSize * 0.5) + tolerance;
        
        if (
            Math.abs(mouseX - x) <= selectionRange &&
            Math.abs(mouseY - y) <= selectionRange
        ) {
            return true; // Mouse click is close enough to a visible node
        }
        if (isMouseInsideObject(mouseX,mouseY,object.grid)){
          return true
        }
    }
  }
else if (object.node) {
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