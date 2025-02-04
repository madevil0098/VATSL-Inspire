import Point from "./Point";
import Node from "./Node";

export default class Line {
  constructor(start, end,colour, lineWidth, spacing, controlPointCount = 1, ) {
    this.start = start;
    this.end = end;
    this.controlPointCount = controlPointCount;
    this.color = colour;
    this.lineWidth = lineWidth;
    this.spacing = spacing;
    this.dx = this.end.x - this.start.x;
    this.dy = this.end.y - this.start.y;
    this.nodes = [];
    this.control=[]
    this.transparency = 1;
    this.node_size = parseInt(this.lineWidth/2);
    this.initializeNodes();
    this.node_colour = "white";
    this.img_dat =  ".\\assets\\EC-STAR-D70P5.png";
    
    }
  

  initializeNodes() {
    this.nodes = [this.start];

    for (let i = 1; i < this.controlPointCount; i++) {
      const t = i / this.controlPointCount;
      const x = (1 - t) * this.start.x + t * this.end.x;
      const y = (1 - t) * this.start.y + t * this.end.y;
      this.nodes.push(new Point(x, y, "gray"));
    }

    this.nodes.push(this.end);
    this.control=[]

    for (let i = 0; i < this.nodes.length-1; i++){
      const node_value=this.NodeInitilization(this.nodes[i], this.nodes[i + 1])
      this.control.push(node_value)}
    
  }
  NodeInitilization(start, end) {
    const threshold = 5;
    let numOfDots=2;
    let dx = end.x - start.x;
    let dy = end.y - start.y;
      if (Math.abs(start.y - end.y) <= threshold) {
        numOfDots = Math.floor(Math.sqrt(dx * dx + dy * dy) * window.xRatio / this.spacing + 1); // Number of dots (nodes)
  
      } else if (Math.abs(start.x - end.x) <= threshold) {
        // Vertical line (y-axis dominant)
        numOfDots = Math.floor(Math.sqrt(dx * dx + dy * dy) * window.yRatio / this.spacing + 1); // Number of dots (nodes)
  
      } else {
        // Diagonal line: Use Pythagorean theorem
        numOfDots = Math.floor(Math.sqrt(dx * dx + dy * dy) * ((window.xRatio + window.yRatio) / 2) / this.spacing + 1); // Number of dots (nodes)
      }
      numOfDots = Math.min(Math.max(2, numOfDots), 1000);
      
    return numOfDots
  }
  drawLineSegment(start, end, ctx) {
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;
    ctx.stroke();
  }

  drawCurve(ctx) {
    ctx.beginPath();
    for (let i = 0; i < this.nodes.length-1; i++) {
      this.drawLineSegment(this.nodes[i], this.nodes[i + 1], ctx);
    }
  }
  drawLineWithNodes(start, end,numOfDots, ctx_draw) {
    this.dx = end.x - start.x;
    this.dy = end.y - start.y;
    const angle = Math.atan2(this.dy, this.dx); // Angle of the line
    
    // Calculate the spacing between the dots based on the number of dots
    const spacing = Math.sqrt(this.dx * this.dx + this.dy * this.dy) / (numOfDots - 1);

      // Draw the full line first
  
  
      // Draw white nodes (holes) along the line, excluding the last dot to avoid overlap
      for (let i = 0; i < numOfDots - 1; i++) {
        const x = start.x + i * spacing * Math.cos(angle);
        const y = start.y + i * spacing * Math.sin(angle);
  
        // Create a white node (hole)
        const holeNode = new Node(x, y, this.node_colour, this.node_size,this.img_dat); // Smaller white nodes for holes
        holeNode.drawimg(ctx_draw); // Draw the white node (hole)
        this.drawn_node.push({
          node: holeNode
        });
      }
  
      // Ensure the last node is exactly at the end point of the line
      const holeNode = new Node(
        end.x,
        end.y,
        this.node_colour,
        this.node_size,this.img_dat
      ); // Last node at end point
      holeNode.drawimg(ctx_draw); // Draw the last white node
      this.drawn_node.push({
        node: holeNode
      });
    }
  async draw(ctx) {

    //this.drawCurve(ctx);
    this.drawn_node = [];

    for (let i = 0; i < this.nodes.length-1; i++){
      await this.drawLineWithNodes(this.nodes[i], this.nodes[i + 1],this.control[i], ctx)
    }
   await this.drawNodes(ctx);

  }

  drawNodes(ctx) {
    console.log(this.nodes,this.node_size)
    for (const node of this.nodes) {
      this.drawNode(ctx, node);
    }
  }

  drawNode(ctx, point) {
    ctx.beginPath();
    console.log(this.node_size+2.5)
    ctx.arc(point.x, point.y, this.node_size*2.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(183, 201, 226, ${this.transparency})`;
 
    ctx.fill();
    
  }

  hitTest(x, y) {
    for (const node of this.nodes) {
      if (this.isPointNear(node, x, y)) {
        window.canvas.style.cursor = "nesw-resize";
        return node;
      }
    }
    window.canvas.style.cursor = "default";
    return null;
  }

  isPointNear(point, x, y, radius = 10) {
    return Math.hypot(point.x - x, point.y - y) <= radius;
  }
  redraw(ctx) {
    
    this.drawNodes(ctx);
    
    
  }
  forcolour(ctx_draw) {
    
    for (let i = 0; i < this.drawn_node.length; i++) {
      this.drawn_node[i].node.drawNode(ctx_draw);
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
  updateControlPoints(ctx, newCount) {
    this.controlPointCount = newCount;
    this.initializeNodes();
    requestAnimationFrame(() => this.draw(ctx));
  }
}
