import drawButtonHandle from "./drawButtonHandle";
export default function drawResizeHandles_forobject(object) {
    if (object.line) {
      drawButtonHandle(object.line.start.x, object.line.start.y); // Start point
      drawButtonHandle(object.line.end.x, object.line.end.y); // End point
    } else if (object.line_data) {
      drawButtonHandle(object.line_data.start.x, object.line_data.start.y); // Start point
      drawButtonHandle(object.line_data.end.x, object.line_data.end.y); // End point
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
      // Draw handles for each corner
      for (const corner of rotatedCorners) {
        drawButtonHandle(corner.x, corner.y);
      }
    }
  }