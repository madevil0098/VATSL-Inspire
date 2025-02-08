import Point from "./Point";
function addTransparencyToColor(color, transparency) {
    // Extract RGB values using a regex
    if (color.startsWith("rgb")) {
      // Handle RGB format
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      if (match) {
        // eslint-disable-next-line no-unused-vars
        const [_, r, g, b] = match;
        return `rgba(${r}, ${g}, ${b}, ${transparency})`;
      }
    } else if (color.startsWith("#")) {
      // Handle HEX format
      color = color.replace("#", "");
      const r = parseInt(color.substring(0, 2), 16);
      const g = parseInt(color.substring(2, 4), 16);
      const b = parseInt(color.substring(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${transparency})`;
    }
    // Return original color if no conversion possible
    return color;
  }
export default class BezierCurve  {
    constructor(start, end, controlPointCount = 1, color = "rgb(183, 201, 226)", lineWidth = 2, spacing = 20) {
      this.start = start; // Starting point
      this.end = end; // Ending point
      this.controlPointCount = controlPointCount; // Number of control points
      this.color = color;
      this.lineWidth = lineWidth;
      this.spacing = spacing;
  
      this.nodes = []; // Array of all nodes (start, mids, end)
      this.controls = []; // Array of all control points
  
      this.nodeCount = 0;
      this.drawnNodes = [];
      this.drawn_node = [];
      this.transparency = 1;
      this.transparency_line = 1;
      this.control_colour = "gray";
      this.nose_color = "gray";
      this.node_size = this.lineWidth;
      this.ismoved=false
      this.elevationFactor = 30; // Factor to elevate control points
  
      this.initializeNodesAndControls();
    }
    drawLinedCurve(ctx) {
      ctx.beginPath(); // Start a new path
    
      // Iterate through each segment of the curve
      for (let i = 0; i < this.controls.length; i++) {
        const start = this.nodes[i];        // Start point of the segment
        const control = this.controls[i];  // Control point of the segment
        const end = this.nodes[i + 1];     // End point of the segment
    
        // Move to the starting point of the segment
        ctx.moveTo(start.x, start.y);
    
        // Draw lines between sampled points
        for (let t = 0; t <= 1; t += 1 / this.nodeCount) {
          const point = this.getQuadraticPoint(t, start, control, end); // Get the point on the curve
          ctx.lineTo(point.x, point.y); // Draw a line to the next point
        }
      }
      let r = 183,
        g = 201,
        b = 226;
      if (this.nose_color === "gray") {
        r = 183;
        g = 201; 
        b = 226;
        ctx.strokeStyle= `rgba(${r}, ${g}, ${b}, ${this.transparency_line})`;
  
      } else {
        ctx.strokeStyle = addTransparencyToColor(this.nose_color, this.transparency_line);
      }
      ctx.lineWidth = Math.sqrt(this.node_size *this.node_size+this.node_size*this.node_size);          // Set the line width
      ctx.stroke(); // Render the path
    }
    
    // Initialize nodes and control points dynamically
    initializeNodesAndControls() {
      if (!this.ismoved){
        console.log()
        this.initializeNodesAndControls_Start()
        return 
      }
      // If nodes are empty, initialize with start and end points
      if (this.nodes.length === 0) {
          this.nodes.push(this.start);
          this.nodes.push(this.end);
      }
      if (this.controls.length === 0 && this.nodes.length > 1) {
        const midX = (this.start.x + this.end.x) / 2;
        const midY = (this.start.y + this.end.y) / 2;

        const dx = this.end.x - this.start.x;
        const dy = this.end.y - this.start.y;
        const length = Math.sqrt(dx ** 2 + dy ** 2);

        const offsetX = (dy / length) * this.elevationFactor;
        const offsetY = -(dx / length) * this.elevationFactor;
        this.controls.push(new Point(midX + offsetX, midY + offsetY, this.control_colour));
    }
    
    
      let currentCount = this.nodes.length - 2; // Excluding start and end
      let difference = this.controlPointCount - currentCount-1;
      console.log(currentCount,difference)
    
      if (difference > 0) {
          // Increase: Add nodes and controls at the end side (stack behavior)

          for (let i = 0; i < difference; i++) {
              const t = (currentCount + i + 1) / Math.abs((this.start.x - this.end.x) / 7);
              const x = (1 - t) * this.start.x + t * this.end.x;
              const y = (1 - t) * this.start.y + t * this.end.y;
              this.nodes.splice(1, 0, new Point(x, y, this.control_colour));// Insert before end
              this.controls.reverse();
              // Create a new control point between the new node and its previous one
              if (this.nodes.length > 2) {
                  const midX = (this.nodes[this.nodes.length - 3].x + this.nodes[this.nodes.length - 2].x) / 2;
                  const midY = (this.nodes[this.nodes.length - 3].y + this.nodes[this.nodes.length - 2].y) / 2;
  
                  const dx = this.nodes[this.nodes.length - 2].x - this.nodes[this.nodes.length - 3].x;
                  const dy = this.nodes[this.nodes.length - 2].y - this.nodes[this.nodes.length - 3].y;
                  const length = Math.sqrt(dx ** 2 + dy ** 2);
  
                  const offsetX = (dy / length) * this.elevationFactor;
                  const offsetY = -(dx / length) * this.elevationFactor;
  
                  this.controls.push(new Point(midX + offsetX, midY + offsetY, this.control_colour));
              }
              this.controls.reverse();
          }
      } else if (difference < 0) {
          // Decrease: Remove nodes and corresponding last control point
          this.nodes.splice(1, 1);

          this.controls.reverse();

          this.controls.splice(this.controls.length + difference, -difference); // Remove last control points
          this.controls.reverse();

      }
  }
  
  initializeNodesAndControls_Start() {
    this.nodes = [this.start];
    this.controls = [];

    // Create midpoints based on the number of control points
    for (let i = 1; i < this.controlPointCount; i++) {
      const t = i / (this.controlPointCount ); // Calculate position for mids
      const x = (1 - t) * this.start.x +t * this.end.x;
      const y = (1 - t) * this.start.y + t * this.end.y;
      this.nodes.push(new Point( x, y,  this.control_colour ));
    }

    this.nodes.push(this.end); // Add the end node

    // Create control points between every two adjacent nodes
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const midX = (this.nodes[i].x + this.nodes[i + 1].x) / 2;
      const midY = (this.nodes[i].y + this.nodes[i + 1].y) / 2;

      // Apply elevation to the control point
      const dx = this.nodes[i + 1].x - this.nodes[i].x; // Horizontal difference
      const dy = this.nodes[i + 1].y - this.nodes[i].y; // Vertical difference
      const length = Math.sqrt(dx ** 2 + dy ** 2); // Distance between nodes

      const offsetX = (dy / length) * this.elevationFactor; // Perpendicular offset in x
      const offsetY = -(dx / length) * this.elevationFactor; // Perpendicular offset in y

      this.controls.push(new Point(  midX + offsetX, midY + offsetY, this.control_colour ));
    }
  }

  
    getBezierTangent(t) {
      const n = this.nodes.length;
      let tangent = new Point(0, 0);
  
      // Compute the first derivative (tangent) of the Bezier curve
      for (let i = 0; i < n - 1; i++) {
        const binomialCoefficient = (n - 1) * this.bernsteinBasis(i, n - 1, t);
        const p1 = this.nodes[i];
        const p2 = this.nodes[i + 1];
  
        // Tangent at t is the difference between the weighted control points
        tangent.x += binomialCoefficient * (p2.x - p1.x);
        tangent.y += binomialCoefficient * (p2.y - p1.y);
      }
  
      return tangent;
    }
    binomial(n, k) {
      if (k < 0 || k > n) return 0;
      let result = 1;
      for (let i = 1; i <= k; i++) {
        result *= (n - i + 1) / i;
      }
      return result;
    }
  
    // Get a point on a quadratic Bézier curve for a specific segment
    getQuadraticTangent(t, start, control, end) {
      const dx = 2 * (1 - t) * (control.x - start.x) +
        2 * t * (end.x - control.x);
      const dy = 2 * (1 - t) * (control.y - start.y) +
        2 * t * (end.y - control.y);
      return Math.atan2(dy, dx); // Angle in radians
    }
  
  
    
  
    // Calculate the total length of the curve by summing segment lengths
    calculateCurveLength() {
      const steps = 100000; // More steps = better approximation
      let totalLength = 0;
  
      for (let i = 0; i < this.controls.length; i++) {
        const start = this.nodes[i];
        const control = this.controls[i];
        const end = this.nodes[i + 1];
  
        let segmentLength = 0;
        let prevPoint = this.getQuadraticPoint(0, start, control, end);
  
        for (let j = 1; j <= steps; j++) {
          const t = j / steps;
          const currentPoint = this.getQuadraticPoint(t, start, control, end);
          segmentLength += Math.hypot(
            currentPoint.x - prevPoint.x,
            currentPoint.y - prevPoint.y
          );
          prevPoint = currentPoint;
        }
  
        totalLength += segmentLength;
      }
  
      return totalLength;
    }
    calculateCurveLength_parts(start,control,end) {
      const steps = 100000; // More steps = better approximation
      let totalLength = 0;
  
      
  
        let segmentLength = 0;
        let prevPoint = this.getQuadraticPoint(0, start, control, end);
  
        for (let j = 1; j <= steps; j++) {
          const t = j / steps;
          const currentPoint = this.getQuadraticPoint(t, start, control, end);
          segmentLength += Math.hypot(
            currentPoint.x - prevPoint.x,
            currentPoint.y - prevPoint.y
          );
          prevPoint = currentPoint;
        }
  
        totalLength += segmentLength;
      
  
      return totalLength;
    }
    // Populate all nodes for drawing purposes
    populateNodes() {
      this.drawnNodes = [];
      for (let i = 0; i < this.controls.length; i++) {
        const start = this.nodes[i];
        const control = this.controls[i];
        const end = this.nodes[i + 1];
  
        for (let t = 0; t <= 1; t += 1 / this.spacing) {
          const point = this.getQuadraticPoint(t, start, control, end);
          this.drawnNodes.push(point);
        }
      }
    }
    getQuadraticPoint(t, start, control, end) {
      const x = (1 - t) * (1 - t) * start.x +
        2 * (1 - t) * t * control.x +
        t * t * end.x;
      const y = (1 - t) * (1 - t) * start.y +
        2 * (1 - t) * t * control.y +
        t * t * end.y;
      return {
        x,
        y
      };
    }
    
    
    
  
    // Draw the entire curve
    draw(ctx) {
      // Draw connections from control points to nodes
      this.drawControlConnections(ctx);
      this.drawLinedCurve(ctx);
      // Draw control points and nodes
      this.drawControlPoints(ctx);
      this.drawNodes(ctx);
      this.drawCurve(ctx);
  
    }
    hitTest(x, y) {
      // Check if the mouse is near the start node
      for (let i = 0; i < this.nodes.length; i++) {
        if (this.isPointNear(this.nodes[i], x, y)) {
            window.canvas.style.cursor = "nesw-resize";
          return this.nodes[i];
        }
      }
  
      for (let i = 0; i < this.controls.length; i++) {
        if (this.isPointNear(this.controls[i], x, y)) {
            window.canvas.style.cursor = "nesw-resize";
          return this.controls[i];
        }
      }
  
      const curveLength = this.calculateCurveLength();
      const nodeCount = Math.floor(curveLength / this.node_size); // Calculate how many segments to check
      const halfWidth = this.node_size / 2;
  
      for (let i = 0; i < this.controls.length; i++) {
        const start = this.nodes[i];
        const control = this.controls[i];
        const end = this.nodes[i + 1];
  
        // Iterate through the segments of the curve for the current control point
        for (let t = 0; t <= 1; t += 1 / nodeCount) {
          const curvePoint = this.getQuadraticPoint(t, start, control, end);
  
          const distToCurve = Math.sqrt(
            (x - curvePoint.x) ** 2 + (y - curvePoint.y) ** 2
          );
  
          if (distToCurve <= halfWidth) {
            window.canvas.style.cursor = "pointer"; // Change cursor to indicate interaction with the curve
            return "curve";
          }
        }
      }
  
      // Return null if no hit is detected
      window.canvas.style.cursor = "default";
      return null;
    }
  
    // Utility function to check if the mouse is near a point
    isPointNear(point, x, y, radius = 10) {
      return (
        Math.sqrt((point.x - x) ** 2 + (point.y - y) ** 2) <= radius
      );
    }
  
    // Draw lines connecting control points to their respective nodes
    drawControlConnections(ctx) {
      ctx.lineWidth = 1;
      const r = 183,
        g = 201,
        b = 226;
      ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${this.transparency})`;
  
  
      for (let i = 0; i < this.controls.length; i++) {
        const control = this.controls[i];
        const start = this.nodes[i];
        const end = this.nodes[i + 1];
  
        // Line from control point to start node
        ctx.beginPath();
        ctx.moveTo(control.x, control.y);
        ctx.lineTo(start.x, start.y);
        ctx.stroke();
  
        // Line from control point to end node
        ctx.beginPath();
        ctx.moveTo(control.x, control.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }
    }
  
    // Draw control points as small circles
    drawControlPoints(ctx) {
      for (const control of this.controls) {
        this.drawNode(ctx, control, this.control_colour, 5);
      }
    }
  
    // Draw all nodes as small circles
    drawNodes(ctx) {
      for (const node of this.nodes) {
        this.drawNode(ctx, node, this.control_colour, 5);
      }
    }
  
    // Draw a single node
    drawNode(ctx, point, color = "gray", nodeSize = 3) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, nodeSize, 0, Math.PI * 2);
      const r = 183,
        g = 201,
        b = 226;
  
  
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.transparency})`;
      ctx.fill();
    }
  
    // Redraw the curve with previously calculated nodes
    redraw(ctx) {
      if (Math.abs(this.nodeCount - this.drawn_node.length) <= 1) {
  
  
        // Draw control points
  
        // Draw connections from control points to nodes
        this.drawControlConnections(ctx);
        this.drawLinedCurve(ctx);
  
        // Draw control points and nodes
        this.drawControlPoints(ctx);
        this.drawNodes(ctx);
        // Populate and draw nodes (boxes) along the curve
  
        for (const node of this.drawn_node) {
          this.drawsqrNode(ctx, node.point, node.tangent, node.colour, node.transparency, node.size);
        }
      } else {
        this.draw(ctx);
      }
    }
    bernsteinBasis(i, n, t) {
      return this.combinatoric(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - 1 - i);
    }
  
    // Combinatoric function (n choose k)
    combinatoric(n, k) {
      let res = 1;
      for (let i = 1; i <= k; i++) {
        res *= (n - (k - i)) / i;
      }
      return res;
    }
  
    // Draw a square node at a point with the given tangent and size
    drawsqrNode(ctx, point, tangent, color, transparency, size) {
      const angle = Math.atan2(tangent.y, tangent.x); // Get angle of tangent
  
      ctx.save();
      ctx.translate(point.x, point.y); // Translate to the point
  
      // Rotate the node according to the tangent
      ctx.rotate(angle);
      let r = 183,
        g = 201,
        b = 226;
      // Set the color and size for the node
      if (color === "gray") {
        r = 183;
        g = 201; 
        b = 226;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${transparency})`;
  
      } else {
        ctx.fillStyle = addTransparencyToColor(color, transparency);
      }
  
      ctx.fillRect(-size / 2, -size / 2, size, size); // Draw square node centered at point
  
      ctx.restore();
    }
  
    // Function to calculate and draw nodes along the curve
    drawCurve(ctx) {
      this.drawn_node = []; // Reset the drawn nodes array
  
      // Loop through each segment of the curve
      for (let i = 0; i < this.controls.length; i++) {
        const start = this.nodes[i]; // Start point of the segment
        const control = this.controls[i]; // Control point of the segment
        const end = this.nodes[i + 1]; // End point of the segment
        const curveLength = this.calculateCurveLength_parts(start, control, end); // Calculate the total length of the curve
        this.nodeCount = Math.floor(curveLength *1.5/ (this.node_size)); // Determine the number of nodes based on line width
        console.log(curveLength,this.nodeCount)
        
        // Populate and draw nodes along the current segment
        for (let t = 0; t <= 1; t += 1 / this.nodeCount) {
          // Calculate the point and tangent for the current segment
          const point = this.getQuadraticPoint(t, start, control, end); // Point on the curve
          const tangent = this.getQuadraticTangent(t, start, control, end); // Tangent at the point
  
          // Create a node with properties: position, tangent, color, and size
          const node = {
            point,
            tangent,
            colour: this.nose_color, // Node color
            size: this.node_size, // Node size
            transparency: this.transparency_line
          };
  
          // Add the node to the drawn nodes array
          this.drawn_node.push(node);
  
          // Draw the square node
          this.drawsqrNode(ctx, node.point, node.tangent, node.colour, node.transparency, node.size);
  
        }
      }
      this.nodeCount = this.drawn_node.length
    }
  
  
    // Calculate the total length of the Bezier curve (approximate by dividing into segments)
  
    // Update the number of control points and redraw
    updateControlPoints(ctx, newControlPointCount) {
      this.controlPointCount = newControlPointCount;
      this.initializeNodesAndControls();
      this.redraw(ctx);
    }
    updateRow_col(ctx_draw) {
  
      const curveLength = this.calculateCurveLength();
      this.nodeCount = Math.floor(curveLength / this.node_size);
    }
  }