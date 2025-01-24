import getResizeDirection from "./getResizeDirection";
import updateCursorForResizeDirection from "./updateCursorForResizeDirection";


// Mouse down event to detect resizing or dragging

export default function canvaImagedown(e) {
  if (window.selectionMode) return;
  if (window.selectednodeMode) return;
  window.startXX = e.offsetX;
  window.startYY = e.offsetY;

  // Check if the mouse is near one of the resize handles
  window.resizeDirection = getResizeDirection(window.startXX, window.startYY);
  if (window.resizeDirection) {
    window.isResizing = true;
    updateCursorForResizeDirection();
  } else if (isInsideImage(window.startXX, window.startYY)) {
    window.isDraggings = true;

    // Calculate the offset between the mouse position and the image's top-left corner
    window.offsetX = window.startXX - window.imgX;
    window.offsetY = window.startYY - window.imgY;
  }
}


function isInsideImage(x, y) {
  return (
    x >= window.imgX && x <= window.imgX + window.imgWidth && y >= window.imgY && y <= window.imgY + window.imgHeight
  );
}

// Function to detect the direction of resizing

// Function to resize the image based on mouse movement



// Function to drag the image

