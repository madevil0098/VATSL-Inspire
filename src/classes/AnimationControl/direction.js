export default function direction(event) {
    const direction = event.target.value.toLowerCase(); // Set the global default animation speed factor
    if (!window.selectedObject) {
      return;
    }
  
    const animationIndex = window.animations.findIndex(
      (anim) => anim.objectId === window.selectedObject
    );
    if (animationIndex !== -1) {
      window.animations[animationIndex].setdirectio(direction); // Update speed for all active window.animations
    } // Set the new animation speed
  };