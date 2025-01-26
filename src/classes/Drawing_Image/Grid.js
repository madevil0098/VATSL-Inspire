import Node from "./Node";
export default class Grid extends Node {
    constructor(x, y, colour, cellSize, width, height) {
      super(x, y);
      this.cellSize = cellSize;
      this.nodesCount = 0; // Number of nodes to draw
      this.isDragging = false; // Flag to track dragging
      this.width = width;
      this.height = height;
      this.x_length = width * window.xRatio;
      this.y_height = height * window.yRatio;
      this.colour = colour;
      this.node_colour_ = "white";
      this.columns = Math.floor(this.x_length / this.cellSize);
      this.rows = Math.floor(this.y_height / this.cellSize);
      this.drawn_node = [];
      this.dotRadius = Math.max(Math.abs(20 * 2 / (window.xRatio + window.yRatio)), 1);
      this.columns = Math.min(Math.max(2, this.columns), 1000);
      this.rows = Math.min(Math.max(2, this.rows), 1000);
      this.node_size = this.dotRadius / 3;
      this.isrotation = false
      this.rotation = 0; // Rotation angle in radians
      // Adjust grid size based on node count
      this.adjustGridSize();
    }
    applyRotation(ctx_draw) {
      // Apply rotation transformation around the grid's center
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
      ctx_draw.translate(centerX, centerY);
      ctx_draw.rotate(this.rotation);
      ctx_draw.translate(-centerX, -centerY);
    }
    setRotation(angle) {
      this.rotation = angle * (Math.PI / 180); // Convert degrees to radians
    }
    adjustGridSize() {
      if (this.nodesCount > 0) {
        const totalNodes = this.nodesCount;
        const aspectRatio = this.x_length / this.y_height;
        this.columns = Math.ceil(Math.sqrt(totalNodes * aspectRatio));
        this.rows = Math.ceil(totalNodes / this.columns);
      }
    }
  
    drawDotMatrix(ctx_draw) {
      this.drawn_node = [];
      // Calculate spacing based on the number of rows and columns
      const spacingX = this.width / (this.columns - 1); // Spacing between columns
      const spacingY = this.height / (this.rows - 1); // Spacing between rows
  
  
  
      // Loop through columns and rows, and position dots accordingly
      for (let i = 0; i < this.columns; i++) {
        for (let j = 0; j < this.rows; j++) {
          const xPos = this.x + i * spacingX;
          const yPos = this.y + j * spacingY;
  
          const rotatedPos = this.getRotatedPosition(xPos, yPos); // Apply rotation
          const endNode = new Node(rotatedPos.x, rotatedPos.y, this.node_colour_, this.node_size);
          endNode.drawimg(ctx_draw);
          this.drawn_node.push({
            node: endNode
          });
          ctx_draw.closePath();
        }
      }
    }
    getRotatedPosition(x, y) {
      const centerX = this.x + this.width / 2;
      const centerY = this.y + this.height / 2;
      const dx = x - centerX;
      const dy = y - centerY;
  
      const rotatedX = centerX + dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
      const rotatedY = centerY + dx * Math.sin(this.rotation) + dy * Math.cos(this.rotation);
  
      return {
        x: rotatedX,
        y: rotatedY
      };
    }
    drawDragBox(ctx_draw) {
      ctx_draw.strokeStyle = this.colour; // Blue for drag box
      ctx_draw.lineWidth = 1; // Thinner line for the drag box
      ctx_draw.strokeRect(this.x, this.y, this.width, this.height); // Draw a rectangle showing grid area
    }
    updateRow_col(ctx_draw) {
      this.x_length = this.width * window.xRatio;
      this.y_height = this.height * window.yRatio;
      this.columns = Math.floor(this.y_height / this.cellSize);
      this.rows = Math.floor(this.x_length / this.cellSize);
      this.dotRadius = Math.max(Math.abs(20 * 2 / (window.xRatio + window.yRatio)), 1);
      this.columns = Math.min(Math.max(2, this.columns), 1000);
      this.rows = Math.min(Math.max(2, this.rows), 1000);
    }
    redraw(ctx_draw) {
  
      if (this.columns * this.rows === this.drawn_node.length) {
        // Radius of the dots by constant
        const spacingX = this.width / (this.columns - 1); // Spacing between columns
        const spacingY = this.height / (this.rows - 1); // Spacing between rows
  
  
        // Loop through columns and rows, and position dots accordingly
        for (let i = 0; i < this.columns; i++) {
          for (let j = 0; j < this.rows; j++) {
            // Calculate the position of each dot using responsive spacing
            const index = i * this.rows + j; // Correct indexing
            if (this.drawn_node[index]) {
              const xPos = this.x + i * spacingX;
              const yPos = this.y + j * spacingY;
  
              const rotatedPos = this.getRotatedPosition(xPos, yPos); // Apply rotation
              this.drawn_node[index].node.x = rotatedPos.x;
              this.drawn_node[index].node.y = rotatedPos.y;
  
              this.drawn_node[index].node.drawimg(ctx_draw);
              ctx_draw.closePath();
            }
          }
  
        }
      } else {
        this.drawDotMatrix(ctx_draw);
      }
    }
    forcolour(ctx_draw) {
  
      const spacingX = this.width / (this.columns - 1); // Spacing between columns
      const spacingY = this.height / (this.rows - 1); // Spacing between rows
  
  
      // Loop through columns and rows, and position dots accordingly
      for (let i = 0; i < this.columns; i++) {
        for (let j = 0; j < this.rows; j++) {
          // Calculate the position of each dot using responsive spacing
          const index = i * this.rows + j; // Correct indexing
          if (this.drawn_node[index]) {
            const xPos = this.x + i * spacingX;
            const yPos = this.y + j * spacingY;
  
            const rotatedPos = this.getRotatedPosition(xPos, yPos); // Apply rotation
            this.drawn_node[index].node.x = rotatedPos.x;
            this.drawn_node[index].node.y = rotatedPos.y;
  
            this.drawn_node[index].node.drawNode(ctx_draw);
            ctx_draw.closePath();
          }
        }
      }
    }
  }