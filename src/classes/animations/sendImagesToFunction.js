import importAndResizeImage from "./importAndResizeImage";
export default function sendImagesToFunction(object_, imageListData) {
  if (!object_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === object_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
  
    const animation = {
      objectId: object_,
      isAnimating: true,
      animationFrameId: null,
      speed: 1,
      currentIndex: 0,
      imageListData: imageListData,
      animate() {
        if (this.currentIndex >= this.imageListData.length) {
          this.currentIndex = 0;
        }
        if (this.isAnimating && this.currentIndex < this.imageListData.length) {
          // Process current image
          importAndResizeImage(object_, this.imageListData[this.currentIndex]);
  
          // Move to next image based on speed
          this.currentIndex++;
          const timeToNextFrame = (this.speed) * 1000; // Calculate time between frames based on speed
          setTimeout(() => this.animate(), timeToNextFrame); // Schedule next image processing
        }
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