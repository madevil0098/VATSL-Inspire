import isMouseNearPoint from "./IsMouseNearPoint";
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
      let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;

    // Iterate through all visible nodes
    for (let node of object.grid.nodes) {
      let rotatedPos = node;
      
        // Update bounding box limits
        minX = Math.min(minX, rotatedPos.x);
        maxX = Math.max(maxX, rotatedPos.x);
        minY = Math.min(minY, rotatedPos.y);
        maxY = Math.max(maxY, rotatedPos.y);
    }
    const corner = [
      { x: minX, y: minY }, // Top-left
      { x: maxX, y: minY }, // Top-right
      { x: maxX, y: maxY }, // Bottom-right
      { x: minX, y: maxY }  // Bottom-left
  ];

  // Rotate corners using the grid's rotation angles
      const rotatedCorners = corner.map(corner => {
          return object.grid.apply3DRotation(corner.x, corner.y, 0); // z=0 since it's 2D
      });
      // Calculate rotated corners
      const corners = {
        "top-left": rotatedCorners[0],
        "top-right": rotatedCorners[1],
        "bottom-left": rotatedCorners[2],
        "bottom-right": rotatedCorners[3],
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