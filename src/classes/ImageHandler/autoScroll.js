const scrollSpeed = 10; // Speed of auto-scroll
const edgeThreshold = 300; // Distance from the edge to trigger auto-scroll

export default function autoScroll(e) {
  const {
    offsetX,
    offsetY
  } = e;

  // Check if mouse is close to the edges and scroll the container accordingly
  if (offsetX < edgeThreshold) {
    // Scroll left
    window.workArea.scrollLeft -= scrollSpeed;
  } else if (offsetX > window.canvas.width - edgeThreshold) {
    // Scroll right
    window.workArea.scrollLeft += scrollSpeed;
  }

  if (offsetY < edgeThreshold) {
    // Scroll up
    window.workArea.scrollTop -= scrollSpeed;
  } else if (offsetY > window.canvas.height - edgeThreshold) {
    // Scroll down
    window.workArea.scrollTop += scrollSpeed;
  }
}