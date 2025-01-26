import Node from "./Node";

export default class Line extends Node {
    constructor(start, end, colour, lineWidth, spacing) {
      super(start.x, start.y);
      this.start = start;
      this.end = end;
      this.spacing = spacing;
      this.lineWidth = Math.max(Math.abs(20 * 2 / Math.max((window.xRatio + window.yRatio), 2)), 0.1);
      this.dx = this.end.x - this.start.x;
      this.dy = this.end.y - this.start.y;
      this.drawn_node = [];
      this.node_size = this.lineWidth / 3;
      this.colour = colour; // Line color
      const threshold = 5;
  
      if (Math.abs(this.start.y - this.end.y) <= threshold) {
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * window.xRatio / this.spacing + 1); // Number of dots (nodes)
  
      } else if (Math.abs(this.start.x - this.end.x) <= threshold) {
        // Vertical line (y-axis dominant)
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * window.yRatio / this.spacing + 1); // Number of dots (nodes)
  
      } else {
        // Diagonal line: Use Pythagorean theorem
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * ((window.xRatio + window.yRatio) / 2) / this.spacing + 1); // Number of dots (nodes)
      }
      this.node_colour = "white";
      this.numOfDots = Math.min(Math.max(2, this.numOfDots), 1000)
    }
  
    drawLineWithNodes(ctx_draw) {
  
  
      const angle = Math.atan2(this.dy, this.dx); // Angle of the line
      this.drawn_node = [];
      this.dx = this.end.x - this.start.x;
      this.dy = this.end.y - this.start.y;
      // Calculate the spacing between the dots based on the number of dots
      const spacing = Math.sqrt(this.dx * this.dx + this.dy * this.dy) / (this.numOfDots - 1);
  
      // Draw the full line first
  
  
      // Draw white nodes (holes) along the line, excluding the last dot to avoid overlap
      for (let i = 0; i < this.numOfDots - 1; i++) {
        const x = this.start.x + i * spacing * Math.cos(angle);
        const y = this.start.y + i * spacing * Math.sin(angle);
  
        // Create a white node (hole)
        const holeNode = new Node(x, y, this.node_colour, this.node_size); // Smaller white nodes for holes
        holeNode.drawimg(ctx_draw); // Draw the white node (hole)
        this.drawn_node.push({
          node: holeNode
        });
      }
  
      // Ensure the last node is exactly at the end point of the line
      const end = new Node(
        this.end.x,
        this.end.y,
        this.node_colour,
        this.node_size
      ); // Last node at end point
      end.drawimg(ctx_draw); // Draw the last white node
      this.drawn_node.push({
        node: end
      });
    }
    redraw(ctx_draw) {
      // Check if the number of dots matches the drawn nodes
      if (this.drawn_node.length === this.numOfDots) {
        // If equal, just redraw the existing nodes
        this.dx = this.end.x - this.start.x;
        this.dy = this.end.y - this.start.y;
        const angle = Math.atan2(this.dy, this.dx); // Angle of the line
        const spacing = Math.sqrt(this.dx * this.dx + this.dy * this.dy) / (this.numOfDots - 1);
  
        for (let i = 0; i < this.drawn_node.length; i++) {
          this.drawn_node[i].node.x =
            this.start.x + i * spacing * Math.cos(angle);
          this.drawn_node[i].node.y =
            this.start.y + i * spacing * Math.sin(angle);
          this.drawn_node[i].node.drawimg(ctx_draw);
        }
        //this.drawn_node[this.drawn_node.length].node.drawNode();
      } else {
        // If not equal, redraw with new nodes
        this.drawLineWithNodes(ctx_draw);
      }
    }
    updateRow_col(ctx_draw) {
      const threshold = 5;
      this.lineWidth = Math.max(Math.abs((20) * 2 / Math.max((window.xRatio + window.yRatio), 2)), 0.1);
  
      if (Math.abs(this.start.y - this.end.y) <= threshold) {
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * window.xRatio / this.spacing); // Number of dots (nodes)
  
      } else if (Math.abs(this.start.x - this.end.x) <= threshold) {
        // Vertical line (y-axis dominant)
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * window.yRatio / this.spacing); // Number of dots (nodes)
  
      } else {
        // Diagonal line: Use Pythagorean theorem
        this.numOfDots = Math.floor(Math.sqrt(this.dx * this.dx + this.dy * this.dy) * ((window.xRatio + window.yRatio) / 2) / this.spacing); // Number of dots (nodes)
  
      }
      this.numOfDots = Math.min(Math.max(2, this.numOfDots), 1000)
    }
    forcolour(ctx_draw) {
      const angle = Math.atan2(this.dy, this.dx); // Angle of the line
      const spacing = Math.sqrt(this.dx * this.dx + this.dy * this.dy) / (this.numOfDots - 1);
  
      for (let i = 0; i < this.drawn_node.length; i++) {
        this.drawn_node[i].node.x =
          this.start.x + i * spacing * Math.cos(angle);
        this.drawn_node[i].node.y =
          this.start.y + i * spacing * Math.sin(angle);
        this.drawn_node[i].node.drawNode(ctx_draw);
      }
    }
    // Utility function to draw a line segment between two points
    drawLineSegment(x1, y1, x2, y2, ctx_draw) {
      ctx_draw.beginPath();
      ctx_draw.moveTo(x1, y1);
      ctx_draw.lineTo(x2, y2);
      ctx_draw.strokeStyle = "rgb(183, 201, 226)"; // Line color
      ctx_draw.lineWidth = this.lineWidth; // Line thickness
      ctx_draw.stroke();
    }
  }