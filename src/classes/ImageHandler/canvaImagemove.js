import updateCursorForResizeDirection from "./updateCursorForResizeDirection";
import drawImage from "./drawImage";
import  autoScroll from "./autoScroll";
import getResizeDirection from "./getResizeDirection";
export default function canvaImagemove(e) {

    updateCursorForResizeDirection();
  
    if (window.isResizing) {
      handleResize(e.offsetX, e.offsetY);
  
      drawImage();
      autoScroll(e);
    } else if (window.isDraggings) {
      handleDrag(e.offsetX, e.offsetY);
      drawImage();
      autoScroll(e);
    } else {
      window.startXX = e.offsetX;
      window.startYY = e.offsetY;
     window.resizeDirection = getResizeDirection(window.startXX, window.startYY);
  
      updateCursorForResizeDirection();
    }
  }

  function handleResize(x, y) {
    // Calculate deltas
    const dx = x - window.startXX;
    const dy = y - window.startYY;
  
    // Calculate aspect ratio (width-to-height ratio)
    const aspectRatio = window.imgWidth / window.imgHeight;
  
    // Helper to constrain dimensions to avoid negatives
    const constrainDimensions = () => {
      if (window.imgWidth < 1) window.imgWidth = 1;
      if (window.imgHeight < 1) window.imgHeight = 1;
    };
  
    switch (window.resizeDirection) {
      case "top-left": {
        const change = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        const proportionalChange = change / aspectRatio;
  
        window.imgX += change;
        window.imgY += proportionalChange;
        window.imgWidth -= change;
        window.imgHeight -= proportionalChange;
  
        break;
      }
      case "top-right": {
        // Calculate the dominant change
        const change = Math.abs(dx) > Math.abs(dy) ? dx : -dy;
  
        // Calculate proportional height change
        const proportionalChange = change / aspectRatio;
  
  
        // Increase width and height
        window.imgY -= proportionalChange; // Move top edge upward
        window.imgWidth += change;
        window.imgHeight += proportionalChange;
  
        // Decrease width and height
        window.imgY -= proportionalChange; // Move top edge upward
  
        window.imgWidth += change; // Shrink width
        window.imgHeight += proportionalChange; // Shrink height, maintaining aspect ratio
  
  
        break;
      }
  
  
      case "bottom-left": {
        // Determine the larger of the two changes
        const change = Math.abs(dx) < Math.abs(dy) ? dx : dy;
  
        // Calculate proportional change based on aspect ratio
        const proportionalChange = Math.abs(change) * aspectRatio;
  
        if (change > 0) {
          // Increase both width and height
          window.imgX -= proportionalChange; // Move x-coordinate left
          window.imgWidth += proportionalChange;
          window.imgHeight += Math.abs(change);
        } else {
          // Decrease both width and height
          window.imgX += proportionalChange; // Move x-coordinate right
          window.imgWidth -= proportionalChange;
          window.imgHeight -= Math.abs(change);
        }
  
        break;
      }
  
      case "bottom-right": {
        const change = Math.abs(dx) > Math.abs(dy) ? dx : dy;
        const proportionalChange = change / aspectRatio;
  
        window.imgWidth += change;
        window.imgHeight += proportionalChange;
  
        break;
      }
      case "top": {
        const proportionalChange = dy * aspectRatio;
  
        window.imgY += dy;
        window.imgHeight -= dy;
        window.imgWidth -= proportionalChange;
  
        break;
      }
      case "bottom": {
        const proportionalChange = dy * aspectRatio;
  
        window.imgHeight += dy;
        window.imgWidth += proportionalChange;
  
        break;
      }
      case "left": {
        const proportionalChange = dx / aspectRatio;
  
        window.imgX += dx;
        window.imgWidth -= dx;
        window.imgHeight -= proportionalChange;
  
        break;
      }
      case "right": {
        const proportionalChange = dx / aspectRatio;
  
        window.imgWidth += dx;
        window.imgHeight += proportionalChange;
  
        break;
      }
      default:
        console.warn(`Unknown resize direction: ${window.resizeDirection}`);
        break;
    }
  
    // Ensure dimensions remain positive and valid
    constrainDimensions();
  
    // Update starting positions for the next move
    window.startXX = x;
    window.startYY = y;
  }

  function handleDrag(mouseX, mouseY) {
    // Update image position based on the mouse movement, considering the initial offset
    window.imgX = mouseX - window.offsetX;
    window.imgY = mouseY - window.offsetY;
  
    // Prevent the image from being dragged out of the window.canvas
    if (window.imgX < 0) window.imgX = 0;
    if (window.imgY < 0) window.imgY = 0;
    if (window.imgX + window.imgWidth > window.canvas.width) window.imgX = window.canvas.width - window.imgWidth;
    if (window.imgY + window.imgHeight > window.canvas.height) window.imgY = window.canvas.height - window.imgHeight;
  }