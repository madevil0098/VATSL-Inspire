import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startWaveEffect(objects_, speed = 1, waveLength = 25) {
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
      waveLength: waveLength,
      animate() {
  
        const time = Date.now() * 0.001 * (1 / this.speed);
  
        if (objects_.type === "line") {
          objects_.line.drawn_node.forEach((node, index) => {
            const wave = Math.sin(time + (index / this.waveLength) * Math.PI * 2);
            const r = Math.round((wave + 1) * 127);
            const g = Math.round(
              (Math.sin(time + 2 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const b = Math.round(
              (Math.sin(time + 4 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const currentColor = `rgb(${r}, ${g}, ${b})`;
            node.node.colour = currentColor;
          });
        } else if (objects_.type === "curve") {
          objects_.curve.drawn_node.forEach((node, index) => {
            const wave = Math.sin(time + (index / this.waveLength) * Math.PI * 2);
            const r = Math.round((wave + 1) * 127);
            const g = Math.round(
              (Math.sin(time + 2 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const b = Math.round(
              (Math.sin(time + 4 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const currentColor = `rgb(${r}, ${g}, ${b})`;
            node.colour = currentColor;
          });
        } else if (objects_.type === "grid") {
          objects_.grid.drawn_node.forEach((node, index) => {
            const wave = Math.sin(time + (index / this.waveLength) * Math.PI * 2);
            const r = Math.round((wave + 1) * 127);
            const g = Math.round(
              (Math.sin(time + 2 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const b = Math.round(
              (Math.sin(time + 4 + (index / this.waveLength) * Math.PI) + 1) * 127
            );
            const currentColor = `rgb(${r}, ${g}, ${b})`;
            node.node.colour = currentColor;
          });
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