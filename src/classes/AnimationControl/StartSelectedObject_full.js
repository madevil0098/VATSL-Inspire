
export default function starrSelectedObject_full() {
  window.activateTool_sidebar("startAnimationButton_full");
    
  window.animations.forEach((node, index) => {
      window.animations[index].start(); // Remove the animation from the array
    })
    setTimeout(() => {
      window.deactivateTool_sidebar("startAnimationButton_full");
  
    }, 500);
  }