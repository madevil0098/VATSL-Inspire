import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startGridRainEffect(objects_, interval = 1000) {
    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
  
    const gridNodes = objects_.grid.drawn_node;
    let twoDList = [];
  
    // Initialize 2D grid layout
    for (let row = 0; row < objects_.grid.columns; row++) {
      let rowArray = [];
      for (let col = 0; col < objects_.grid.rows; col++) {
        const index = row * objects_.grid.rows + col;
        rowArray.push(index < gridNodes.length ? gridNodes[index] : null);
      }
      twoDList.push(rowArray);
    }
    let previousColoredNodes = [];
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      color1: document.getElementById("startAnimationcolor1_2").value || "#FF0000",
      color2: document.getElementById("startAnimationcolor2_2").value || "#0000FF",
      interval: (document.getElementById("speedInput2").value * 1000) || 1000,
      
      lastUpdateTime: Date.now(),
      activeDrops: [],
      dropsPerFrame: parseInt(Math.sqrt(objects_.grid.columns)),
  
      animate() {
        this.color1 = document.getElementById("startAnimationcolor1_2").value || "#FF0000"; // Default color if empty
        this.color2 = document.getElementById("startAnimationcolor2_2").value || "#0000FF"; // You can similarly add for the second color
  
        if (!this.isAnimating) return;
  
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime >= this.interval) {
          // Reset colors of previously colored nodes
          previousColoredNodes.forEach(node => {
            if (node) node.node.colour = this.color1;
          });
          previousColoredNodes = [];
  
          // Move existing active drops down by one row in their assigned column
          this.activeDrops.forEach((drop) => {
            const {
              row,
              col
            } = drop;
  
            // Reset color of the current position before moving
            if (twoDList[row] && twoDList[row][col]) {
              twoDList[row][col].node.colour = this.color1;
            }
  
            // Move drop to the next row if not at the last row
            if (col < objects_.grid.rows - 1) {
              drop.col++; // Increment row to move down
              const newcol = drop.col;
  
              // Set color for the new position
              if (twoDList[row] && twoDList[row][newcol]) {
                twoDList[row][newcol].node.colour = this.color2;
                previousColoredNodes.push(twoDList[row][newcol]);
              }
            } else {
              // If drop reaches the last row, reset it to the top
              drop.col = 0;
            }
          });
  
          // Add new drops at the top row in random columns
          for (let i = 0; i < parseInt(Math.sqrt(objects_.grid.columns)); i++) {
            const randomCol = Math.floor(Math.random() * objects_.grid.columns);
            const newDrop = {
              row: randomCol,
              col: 0
            };
  
            // Color the starting position of the new drop
            if (twoDList[newDrop.row] && twoDList[newDrop.row][newDrop.col]) {
              twoDList[newDrop.row][newDrop.col].node.colour = this.color2;
              previousColoredNodes.push(twoDList[newDrop.row][newDrop.col]);
            }
            //console.log(newDrop);
            // Add the new drop to active drops
            this.activeDrops.push(newDrop);
          }
  
          // Update timing
          this.lastUpdateTime = currentTime;
        }
  
        drawAllObjects_img();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
  
      start() {
        this.isAnimating = true;
        this.animate();
      },
      setSpeed(newSpeed) {
        this.interval = (5 - newSpeed) * 1000;
      },
      stop() {
        this.isAnimating = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      },
  
    };
  
    window.animations.push(animation);
    animation.start();
  }