export default function stopTwoColorFadingForSelectedObject_full() {
    window.animations.forEach((node, index) => {
      window.animations[index].stop(); // Remove the animation from the array
    })
  }
  