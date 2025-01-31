export default function stopTwoColorFadingForSelectedObject_full() {
  window.activateTool_sidebar("stopAnimationButton_full");
  window.animations.forEach((node, index) => {
      window.animations[index].stop(); // Remove the animation from the array
    })
    setTimeout(() => {
      window.deactivateTool_sidebar("stopAnimationButton_full");
  
    }, 500);
  }
  