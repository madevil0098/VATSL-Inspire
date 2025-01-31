export default function stopTwoColorFadingForSelectedObject() {
    if (!window.selectedObject) {
      return;
    }
    const animationIndex = window.animations.findIndex(
      (anim) => anim.objectId === window.selectedObject
    );
    if (animationIndex !== -1) {
      window.animations[animationIndex].stop();
      window.animations.splice(animationIndex, 1); // Remove the animation from the array
    }
  }