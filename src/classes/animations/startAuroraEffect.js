
import drawAllObjects_img from "../Selection/drawAllObjects_img";

export default function startAuroraEffect(gridObject) {
    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === gridObject
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
  
    const animation = {
      objectId: gridObject,
      isAnimating: true,
      animationFrameId: null,
      speed: 1,
      animate() {
  
        const time = Date.now() * 0.001 * (1 / this.speed);
  
        if (gridObject.type === "grid") {
          gridObject.grid.drawn_node.forEach((node, index) => {
            ////console.log(node)
            const rowFactor =
              (index / gridObject.grid.columns) * gridObject.grid.rows; // Position-based gradient
            const intensity = Math.random() * 0.3 + 0.7; // Slight random flickering
  
            // Aurora color calculation
            const r = 0; // Aurora typically doesn’t have much red
            const g = Math.round(
              (Math.sin(time + index * 0.5) + 1) * 127 * intensity
            ); // Green with flicker
            const b = Math.round(
              (Math.sin(time + 2 + index * 0.3) + 1) * 107 * rowFactor * intensity
            ); // Blue gradient
            //console.log(r, g, b, 127, rowFactor, intensity);
            node.node.colour = `rgb(${r}, ${g}, ${b})`;
          });
        }
  
        drawAllObjects_img();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
      start() {
        this.animate();
      },
      setSpeed(newSpeed) {
        this.speed = 5 - newSpeed;
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
  
    };
  
    window.animations.push(animation);
    animation.start();
  }