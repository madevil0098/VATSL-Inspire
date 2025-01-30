import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startColorScrollingEffect(objects_, speed = 1) {
  if (!objects_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
    speed =  1;
  
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      lastUpdateTime: Date.now(),
      hue: 0,
      speed: speed,
      animate() {
  
        this.interval = this.speed * 1000
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime >= this.interval) {
  
          this.hue = (this.hue + 20) % 360;
          const currentColor = `hsl(${this.hue}, 100%, 50%)`; // Use HSL for smooth color transitions
  
          if (objects_.type === "line") {
            objects_.line.drawn_node.forEach((node) => {
              node.node.colour = currentColor;
            });
          } else if (objects_.type === "curve") {
            objects_.curve.drawn_node.forEach((node) => {
              node.colour = currentColor;
            });
          } else if (objects_.type === "grid") {
            objects_.grid.drawn_node.forEach((node) => {
              node.node.colour = currentColor;
            });
          }
          // Update timing
          this.lastUpdateTime = currentTime;
        }
        drawAllObjects_img();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
      start() {
        this.animate();
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
      setSpeed(newSpeed) {
        this.speed = 5 - newSpeed;
      },
    };
  
    window.animations.push(animation);
    animation.start();
  }