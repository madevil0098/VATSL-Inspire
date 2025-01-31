export default function speedupd(e) {
    const direction = parseFloat(e.target.value); // Set the global default animation speed factor
    if (!window.selectedObject) {
      return;
    }
  
    const animationIndex = window.animations.findIndex(
      (anim) => anim.objectId === window.selectedObject
    );
    if (animationIndex !== -1) {
      window.animations[animationIndex].setSpeed(direction); // Update speed for all active window.animations
    } // Set the new animation speed
  };