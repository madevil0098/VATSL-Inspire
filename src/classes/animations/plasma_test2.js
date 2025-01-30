
import drawAllObjects_img from "../Selection/drawAllObjects_img";

export default function plasma_test2(objects_, speed = 1) {
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
      speed: speed,
      animate() {
  
        const time = Date.now() * 0.001 * this.speed;
        const hueBase = (time * 100) % 360; // Base hue value for dynamic shifting
  
        // Grid dimensions
        const gridNodes = objects_.grid.drawn_node;
        const width = objects_.grid.columns;
        const height = objects_.grid.rows;
  
        // Wave properties
        const amplitude = 127;
        const waveNumber = 0.1; // Adjust for wave tightness
        const angularFrequency = 0.2;
  
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const nodeIndex = x * height + y;
            const node = gridNodes[nodeIndex];
  
            if (!node) continue;
  
            // Calculate wave propagation for 8 types of directions
            const waveTopToBottom =
              amplitude * Math.sin(waveNumber * y - angularFrequency * time);
            const waveBottomToTop =
              amplitude *
              Math.sin(waveNumber * (height - y) - angularFrequency * time);
            const waveLeftToRight =
              amplitude * Math.sin(waveNumber * x - angularFrequency * time);
            const waveRightToLeft =
              amplitude *
              Math.sin(waveNumber * (width - x) - angularFrequency * time);
            const waveDiagonal1 =
              amplitude *
              Math.sin(waveNumber * (x + y) - angularFrequency * time);
            const waveDiagonal2 =
              amplitude *
              Math.sin(waveNumber * (x - y) - angularFrequency * time);
            const waveDiagonal3 =
              amplitude *
              Math.sin(waveNumber * (2 * x - y) - angularFrequency * time);
            const waveDiagonal4 =
              amplitude *
              Math.sin(waveNumber * (x + 2 * y) - angularFrequency * time);
  
            // Combine waves for complex 8-directional flow effect
            const combinedAmplitude = Math.sqrt(
              waveTopToBottom ** 2 +
              waveBottomToTop ** 2 +
              waveLeftToRight ** 2 +
              waveRightToLeft ** 2 +
              waveDiagonal1 ** 2 +
              waveDiagonal2 ** 2 +
              waveDiagonal3 ** 2 +
              waveDiagonal4 ** 2
            );
  
            // Normalize and determine color based on combined amplitude
            const normalized = combinedAmplitude / (amplitude * Math.sqrt(8)); // Normalizing based on max combined value
            const hue = (hueBase + normalized * 360) % 360;
            node.node.colour = `hsl(${hue}, 100%, 50%)`;
          }
        }
  
        drawAllObjects_img();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
      start() {
        this.animate();
      },
      setSpeed(newSpeed) {
        this.speed = (5 - newSpeed);
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
  
    };
  
    window.animations.push(animation);
    animation.start();
  }