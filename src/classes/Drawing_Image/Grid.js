import Node from "./Node";

export default class Grid extends Node {
  constructor(x, y, colour, cellSize, width, height) {
    super(x, y);
    this.cellSize = cellSize;
    this.width = width;
    this.height = height;
    this.depth = 100; // Simulated depth for 3D effect
    this.colour = colour;
    this.dotRadius = Math.max(Math.abs(20 * 2 / (window.xRatio + window.yRatio)), 1);
    this.node_size = Math.abs(this.dotRadius / 3);
    this.node_colour_ = "white";
    this.columns = Math.floor(width / cellSize);
    this.rows = Math.floor(height / cellSize);
    this.nodes = [];
    this.rotationX = 0;
    this.rotationY = 0;
    this.rotationZ = 0;
    this.isDragging = false;
    this.nodesCount = 0;
    this.drawn_node = [];
    this.img_dat =  ".\\assets\\EC-STAR-D70P5.png";
    this.updateRow_col_val=false;
  }

  initGrid() {
    this.nodes = [];
    const spacingX = this.width / (this.columns - 1); // Spacing between columns
      const spacingY = this.height / (this.rows - 1); // Spacing between rows
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.nodes.push({
          x: this.x + i * spacingX,
          y: this.y + j * spacingY,
          z: 0
        });
      }
    }
  }

  setRotation(xAngle, yAngle, zAngle) {
    this.rotationX = xAngle * (Math.PI / 180);
    this.rotationY = yAngle * (Math.PI / 180);
    this.rotationZ = zAngle * (Math.PI / 180);
  }

  apply3DRotation(x, y, z) {
    // Calculate the center of the grid relative to its position
    let centerX = this.x + this.width / 2;
    let centerY = this.y + this.height / 2;
    let centerZ = this.depth / 2;

    // Translate point to the grid's local center
    let dx = x - centerX;
    let dy = y - centerY;
    let dz = z - centerZ;

    // Rotate around X axis
    let y1 = dy * Math.cos(this.rotationX) - dz * Math.sin(this.rotationX);
    let z1 = dy * Math.sin(this.rotationX) + dz * Math.cos(this.rotationX);

    // Rotate around Y axis
    let x2 = dx * Math.cos(this.rotationY) + z1 * Math.sin(this.rotationY);
    let z2 = -dx * Math.sin(this.rotationY) + z1 * Math.cos(this.rotationY);

    // Rotate around Z axis
    let x3 = x2 * Math.cos(this.rotationZ) - y1 * Math.sin(this.rotationZ);
    let y3 = x2 * Math.sin(this.rotationZ) + y1 * Math.cos(this.rotationZ);

    // Translate back to the original position
    return { x: centerX + x3, y: centerY + y3, z: centerZ + z2 };
}



  drawDotMatrix(ctx_draw) {
    this.initGrid();

    this.drawn_node = [];
    for (let node of this.nodes) {
      let rotatedPos = this.apply3DRotation(node.x, node.y, node.z);
      const endNode = new Node(rotatedPos.x, rotatedPos.y, this.node_colour_, this.node_size,this.img_dat);
      endNode.drawimg(ctx_draw);
      this.drawn_node.push({ node: endNode });
    }
  }

  drawDragBox(ctx_draw) {
    ctx_draw.strokeStyle = this.colour;
    ctx_draw.lineWidth = 1;
    ctx_draw.strokeRect(this.x, this.y, this.width, this.height);
  }

  updateRow_col() {
    this.columns = Math.floor(this.height / this.cellSize);
    this.rows = Math.floor(this.width / this.cellSize);
  }

  redraw(ctx_draw) {
  
   
      this.drawDotMatrix(ctx_draw);
    
  }
  forcolour(ctx_draw) {

    
    for (let i = 0; i < this.nodes.length; i++) {
      let rotatedPos = this.apply3DRotation(this.nodes[i].x, this.nodes[i].y, this.nodes[i].z);
      

          this.drawn_node[i].node.x = rotatedPos.x;
          this.drawn_node[i].node.y = rotatedPos.y;

          this.drawn_node[i].node.drawNode(ctx_draw);
        }
    // Loop through columns and rows, and position dots accordingly
    
  }
}