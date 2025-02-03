import drawAllObjects_img from "../Selection/drawAllObjects_img";

export default function startColorFlowForLineAndCurve(objects_, direction = "left", time = 0.016) {
  if (!objects_) return;

    // Check if an animation already exists for this object
    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Remove existing animation
    }
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      color: window.color1_10 || "#FF0000",
      blockSize: window.numinput10 || 2, // Size of the flowing block
      progress: 0, // Progress position of the block
      speed:  1,
      lastUpdateTime: Date.now(),
      frameInterval: time * 1000, // Convert time to milliseconds
      accumulatedTime: 0,
      animate() {
        // Ensure valid object
        if (!objects_ || !objects_.type) return;
        window.savedCanvasState_for_curve = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);

        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastUpdateTime;
        this.lastUpdateTime = currentTime;
  
        // Accumulate time since last update
        this.accumulatedTime += deltaTime;
  
        // Only update when accumulated time exceeds the frame interval
        if (this.accumulatedTime < this.frameInterval) {
          this.animationFrameId = requestAnimationFrame(() => this.animate());
          return;
        }
  
        // Reset accumulated time
        this.accumulatedTime = 0;
  
        // Update speed and progress
  
        this.progress += this.speed * (deltaTime / 100); // Update progress
  
        const length = objects_.curve.drawn_node.length;
  
        if (this.progress >= length) {
          this.progress = 0; // Loop back to the start
        }
  
        // Handle "left" direction
  
  
  
        // Apply color flow pattern
        // Fixed size for "rr"
        const startBlockPosition = Math.floor(this.progress); // Starting position of the "rr" block
        objects_.curve.drawn_node.forEach((node, index) => {
          // Determine if the node is in the "rr" block
          const relativeIndex = (index - startBlockPosition + length) % length;
  
          if (relativeIndex < this.blockSize) {
            node.colour = this.color; // Apply "rr" color
            node.transparency = 1; // Apply "rr" color
  
  
          } else {
            node.colour = objects_.curve.nose_color; // Default to white
            node.transparency = objects_.curve.transparency_line; // Apply "rr" color
  
          }
        });
  
        drawAllObjects_img(); // Redraw objects
  
        // Continue the animation
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      }
  
  
      ,
  
      start() {
        this.animate();
      },
      setSpeed(newSpeed) {
        this.speed = newSpeed;
      },
      setnum(val) {
        this.blockSize = Math.max(2, val);
      },
      setcolor1(val) {
        this.color = val;
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
    };
  
    window.animations.push(animation);
    animation.start(); // Start the animation
  }
  