import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startBlinkingLightsEffect(objects_, interval = 500, newSpotInterval = 500) {
  if (!objects_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Remove existing animation
    }
  
    const gridNodes = objects_.grid.drawn_node;
    const totalNodes = gridNodes.length;
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      color1: window.color1_23 || "#FFFFFF",
      color2: window.color2_23 || "#000000",
      blinkInterval:  interval,
      newSpotInterval, // Time to add new spots
      holdTime: 2000, // Time to keep spots blinking
      activeNodes: [],
      lastNewSpotTime: Date.now(),
  
      animate() {
        if (!this.isAnimating) return;
  
        const currentTime = Date.now();
        this.color1= window.color1_23 || "#FFFFFF";
        this.color2=window.color2_23 || "#000000";
        this.blinkInterval= interval;
        
        // Blink currently active nodes
        this.activeNodes.forEach((activeNode) => {
          const node = gridNodes[activeNode.index];
          if (node) {
            // Alternate color between color1 and color2
            const elapsed = currentTime - activeNode.lastBlinkTime;
            if (elapsed >= this.blinkInterval) {
              node.node.colour =
                node.node.colour === this.color1 ? this.color2 : this.color1;
              activeNode.lastBlinkTime = currentTime;
            }
          }
        });
  
        // Remove nodes that have finished their hold time
        this.activeNodes = this.activeNodes.filter((activeNode) => {
          if (currentTime - activeNode.startTime >= this.holdTime) {
            // Reset the node color to default
            const node = gridNodes[activeNode.index];
            if (node) node.node.colour = this.color1;
            return false; // Remove node from the active list
          }
          return true;
        });
  
        // Add new nodes every `newSpotInterval`
        if (currentTime - this.lastNewSpotTime >= this.newSpotInterval) {
          const nodesToActivate = Math.min(Math.floor(totalNodes/10), totalNodes); // Add up to 3 new spots
          for (let i = 0; i < nodesToActivate; i++) {
            const randomIndex = Math.floor(Math.random() * totalNodes);
            if (!this.activeNodes.some((node) => node.index === randomIndex)) {
              this.activeNodes.push({
                index: randomIndex,
                startTime: currentTime,
                lastBlinkTime: currentTime, // Track when the node last blinked
              });
            }
          }
          this.lastNewSpotTime = currentTime;
        }
  
        drawAllObjects_img();
        this.animationFrameId = requestAnimationFrame(() => this.animate());
      },
  
      start() {
        this.isAnimating = true;
        this.animate();
      },
      setcolor1(val) {
        this.color1 = val;
      },
  
      stop() {
        this.isAnimating = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      },
    };
  
    window.animations.push(animation);
    animation.start();
  }