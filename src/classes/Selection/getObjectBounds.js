export default function getObjectBounds(object) {
    if (object.line) {
      // For line objects
      const allPoints = [...object.line.nodes];
      const xMin = Math.min(...allPoints.map(p => p.x));
      const yMin = Math.min(...allPoints.map(p => p.y));
      const xMax = Math.max(...allPoints.map(p => p.x));
      const yMax = Math.max(...allPoints.map(p => p.y));
      
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

    return {
        minX, maxX,
        minY, maxY,
        width: maxX - minX,
        height: maxY - minY,
        centerX: (minX + maxX) / 2,
        centerY: (minY + maxY) / 2
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
        x: xMin - 5, // Add padding
        y: yMin - 5,
        width: xMax - xMin + 10,
        height: yMax - yMin + 10,
      };
    }
  }