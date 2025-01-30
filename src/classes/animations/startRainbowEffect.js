import drawAllObjects_img from "../Selection/drawAllObjects_img";

export default function startRainbowEffect(objects_, speed = 1) {
  if (!objects_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      speed: Math.max(0.1, Math.min(10, 5 - speed)),
      animate() {
        const nodeCountInput = Math.max(1, parseInt(window.nodeCountInput) || 1); // Bandwidth of colors
        const rainbowBands = parseInt(window.rainbowBandsInput) || 7; // Number of rainbow colors
        const time = Date.now() * 0.001 * (1 / this.speed); // Time factor for sliding
        const hueBase = (time * 100) % 360; // Base hue for smooth animation
        if (objects_.type === "grid") {
          const gridNodes = objects_.grid.drawn_node;
          let twoDList = [];
  
          // Create a 2D array for grid nodes
          for (let row = 0; row < objects_.grid.columns; row++) {
            let rowArray = [];
            for (let col = 0; col < objects_.grid.rows; col++) {
              const index = row * objects_.grid.rows + col;
              rowArray.push(index < gridNodes.length ? gridNodes[index] : null);
            }
            twoDList.push(rowArray);
          }
          this.applyDiagonalRainbow(twoDList, nodeCountInput, rainbowBands, hueBase);

        } else if (objects_.type === "line") {
          objects_.line.drawn_node.forEach((node, index) => {
            // For lines, we treat index directly as the diagonal index
            const diagonalIndex = index;
  
            // Add a sliding effect based on time
            const slidingIndex = diagonalIndex + Math.floor(time * nodeCountInput);
  
            // Determine the color band index
            const bandIndex = Math.floor(slidingIndex / nodeCountInput) % rainbowBands;
  
            // Calculate the hue for the current band
            const hue = (hueBase + bandIndex * (360 / rainbowBands)) % 360;
  
            // Apply the color to the node
            node.node.colour = `hsl(${hue}, 100%, 50%)`;
          });
        } else if (objects_.type === "curve") {
          objects_.curve.drawn_node.forEach((node, index) => {
            // For lines, we treat index directly as the diagonal index
            const diagonalIndex = index;
  
            // Add a sliding effect based on time
            const slidingIndex = diagonalIndex + Math.floor(time * nodeCountInput);
  
            // Determine the color band index
            const bandIndex = Math.floor(slidingIndex / nodeCountInput) % rainbowBands;
  
            // Calculate the hue for the current band
            const hue = (hueBase + bandIndex * (360 / rainbowBands)) % 360;
  
            // Apply the color to the node
            node.colour = `hsl(${hue}, 100%, 50%)`;
          });
        }
  
        
          drawAllObjects_img();
        
  
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
      start() {
        this.animate();
      },
      setSpeed(newSpeed) {
        this.speed = Math.max(0.1, Math.min(10, 5 - newSpeed));
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
      applyDiagonalRainbow(matrix, nodeCountInput, rainbowBands, hueBase) {
        const rows = matrix.length;
        const cols = matrix[0].length;
  
        // Loop through each cell in the matrix
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            // Calculate the diagonal index (top-left to bottom-right)
            const diagonalIndex = row + col;
  
            // Determine the band index based on the diagonal index and bandwidth
            const bandIndex = Math.floor(diagonalIndex / nodeCountInput) % rainbowBands;
  
            // Calculate the hue for the current band
            const hue = (hueBase + bandIndex * (360 / rainbowBands)) % 360;
  
            // Assign the color (HSL format) to the current cell
            matrix[row][col].node.colour = `hsl(${hue}, 100%, 50%)`;
          }
        }
  
  
      }
    }
  
    window.animations.push(animation);
    animation.start();
  }