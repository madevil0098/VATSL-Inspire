import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startTwoColorFadingForSelectedObject(objects_, direction = "bottom-right") {
    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    } // Prevent starting a new animation if one already exists for this object
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      frameInterval:0.016*  1000, // Convert time to milliseconds
      accumulatedTime: 0,
      lastUpdateTime: Date.now(),
      color1: document.getElementById("startAnimationcolor1_1").value || "#FF0000",
      color2: document.getElementById("startAnimationcolor2_1").value || "#0000FF",
  
      speed:document.getElementById("speedInput0").value || 1,
      direction: document.getElementById("direction-select").value.toLowerCase(),
  
      animate() {
        const colorTransition = (ratio) => {
          const r = Math.round(
            (1 - ratio) * parseInt(this.color1.slice(1, 3), 16) +
            ratio * parseInt(this.color2.slice(1, 3), 16)
          );
          const g = Math.round(
            (1 - ratio) * parseInt(this.color1.slice(3, 5), 16) +
            ratio * parseInt(this.color2.slice(3, 5), 16)
          );
          const b = Math.round(
            (1 - ratio) * parseInt(this.color1.slice(5, 7), 16) +
            ratio * parseInt(this.color2.slice(5, 7), 16)
          );
          return `rgb(${r}, ${g}, ${b})`;
        };
  
        if (!objects_ || !objects_.type) return;
        const currentTime = Date.now();
  
        // Update animation parameters
        this.color1 = document.getElementById("startAnimationcolor1_1").value || "#FF0000";
        this.color2 = document.getElementById("startAnimationcolor2_1").value || "#0000FF";
        const deltaTime = currentTime - this.lastUpdateTime;
        this.frameInterval=this.speed *1000
        this.accumulatedTime += deltaTime;
        if (this.accumulatedTime < this.frameInterval) {
          this.animationFrameId = requestAnimationFrame(() => this.animate());
          return;
        }
        this.accumulatedTime = 0;
        const time = (Math.sin(currentTime * 0.0002 * this.speed * Math.PI) + 1); // Oscillates from 0 -> 1 -> 0
  
        // Handle lines
        if (objects_.type === "line") {
          const length = objects_.line.drawn_node.length;
          objects_.line.drawn_node.forEach((node, index) => {
            let ratio;
            switch (direction) {
              case "left":
                ratio = (index / (length - 1)) * time;
                break;
              case "right":
                ratio = ((length - 1 - index) / (length - 1)) * time;
                break;
              default:
                ratio = time;
                break;
            }
            node.node.colour = colorTransition(ratio);
          });
        } else if (objects_.type === "curve") {
          const length = objects_.curve.drawn_node.length;
          objects_.curve.drawn_node.forEach((node, index) => {
            let ratio;
            switch (direction) {
              case "left":
                ratio = (index / (length - 1)) * time;
                break;
              case "right":
                ratio = ((length - 1 - index) / (length - 1)) * time;
                break;
              default:
                ratio = time;
                break;
            }
            node.colour = colorTransition(ratio);
          });
        } else if (objects_.type === "grid") {
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
          const rows = objects_.grid.columns;
          const cols = objects_.grid.rows;
  
          twoDList.forEach((rowArray, rowIndex) => {
            rowArray.forEach((node, colIndex) => {
            if (!node) return;
            let ratio;
            switch (this.direction) {
              case "top":
                  ratio = (colIndex + 1 / (cols - 1)) * time; // Ensures range [0, 1]
                break;
              case "bottom":
                  ratio = ((cols - 1 - colIndex + 1) / (cols - 1)) * time; // Ensures range [0, 1]
                break;
              case "left":
                  ratio = (rowIndex + 1 / (rows - 1)) * time; // Ensures range [0, 1]
                break;
              case "right":
                  ratio = ((rows - 1 - rowIndex + 1) / (rows - 1)) * time; // Ensures range [0, 1]
                  break;
                case "top-left":
                  ratio = ((rowIndex + colIndex + 1) / (rows + cols - -1)) * time; // Sum of indices over max
                  break;
                case "bottom-right":
                  ratio =
                    ((rows - 1 - rowIndex + (cols - 1 - colIndex + 1)) /
                      (rows + cols - 1)) *
                    time;
                  break;
                case "top-right":
                  ratio =
                    ((rowIndex + (cols - 1 - colIndex + 1)) / (rows + cols - 1)) *
                    time;
                  break;
                case "bottom-left":
                  ratio =
                    ((rows - 1 - rowIndex + colIndex + 1) / (rows + cols - 1)) *
                    time;
                break;
              default:
                ratio = time;
                break;
            }
              ratio = Math.min(Math.max(ratio, 0), 1); // Clamp ratio between 0 and 1
  
            node.node.colour = colorTransition(ratio);
            });
          });
        }
  
        drawAllObjects_img();
  
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
  
      start() {
        this.lastUpdateTime = Date.now();
        this.animate();
      },
  
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
  
      setSpeed(newSpeed) {
        this.speed = Math.max(Math.min(newSpeed, 5), 0.1); // Clamp to 0.1-5
      },
    };
  
    window.animations.push(animation);
    animation.start();
  }