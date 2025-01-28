import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function plasma_test1(objects_, speed = 1) {
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
  
            // Calculate wave propagation in 8 directions
            const waveDiagonal1 =
              amplitude *
              Math.sin(waveNumber * (x + y) - angularFrequency * time);
            const waveDiagonal2 =
              amplitude *
              Math.sin(waveNumber * (x - y) - angularFrequency * time);
            const waveX =
              amplitude * Math.sin(waveNumber * x - angularFrequency * time);
            const waveY =
              amplitude * Math.sin(waveNumber * y - angularFrequency * time);
            const waveDiagonal3 =
              amplitude *
              Math.sin(waveNumber * (2 * x - y) - angularFrequency * time);
            const waveDiagonal4 =
              amplitude *
              Math.sin(waveNumber * (x + 2 * y) - angularFrequency * time);
  
            // Combine waves for complex 8-directional effect
            const combinedAmplitude = Math.sqrt(
              waveX ** 2 +
              waveY ** 2 +
              waveDiagonal1 ** 2 +
              waveDiagonal2 ** 2 +
              waveDiagonal3 ** 2 +
              waveDiagonal4 ** 2
            );
  
            // Normalize and determine color based on combined amplitude
            const normalized = combinedAmplitude / (amplitude * Math.sqrt(6)); // Normalizing based on max combined value
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
        this.speed = (newSpeed);
      },
      stop() {
        this.isAnimating = false;
        cancelAnimationFrame(this.animationFrameId);
      },
  
    };
  
    window.animations.push(animation);
    animation.start();
  }