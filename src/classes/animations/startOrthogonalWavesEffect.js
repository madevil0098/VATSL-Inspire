import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startOrthogonalWavesEffect(objects_) {
  if (!objects_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
  
    const gridNodes = objects_.grid.drawn_node;

    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      speed: 1,
      
      animate() {
  
        const time = Date.now() * 0.001 * (1 / this.speed);
  
        // Constants for wave properties
        const amplitudeX = 127; // Amplitude in X-direction
        const amplitudeY = 127; // Amplitude in Y-direction
        const waveNumberX = 0.1; // Wave number in X-direction
        const waveNumberY = 0.1; // Wave number in Y-direction
        const angularFrequency = 0.2; // Angular frequency
  
        const width = objects_.grid.columns;
        const height = objects_.grid.rows;
  
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            const nodeIndex = x * height + y;
            const node = gridNodes[nodeIndex];
  
            if (!node) continue;
  
            // Calculate the wave components
            const waveX =
              amplitudeX * Math.sin(waveNumberX * x - angularFrequency * time);
            const waveY =
              amplitudeY * Math.sin(waveNumberY * y - angularFrequency * time);
  
            // Combine the waves
            const combinedAmplitude = Math.sqrt(waveX ** 2 + waveY ** 2);
  
            // Normalize and convert to color
            const normalized = combinedAmplitude / (amplitudeX + amplitudeY);
            const r = Math.round(normalized * 255);
            const g = Math.round((1 - normalized) * 255);
            const b = Math.round(Math.abs(Math.sin(normalized * Math.PI)) * 255);
  
            node.node.colour = `rgb(${r}, ${g}, ${b})`;
          }
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