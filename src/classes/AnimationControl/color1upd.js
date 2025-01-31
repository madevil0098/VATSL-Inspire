export default function color1upd(e) {
    const direction = e.target.value; // Set the global default animation speed factor
    if (!window.selectedObject) {
      return;
    }
  
    const animationIndex = window.animations.findIndex(
      (anim) => anim.objectId === window.selectedObject
    );
    if (animationIndex !== -1) {
      window.animations[animationIndex].setcolor1(direction); // Update speed for all active window.animations
    } // Set the new animation speed
  };
  