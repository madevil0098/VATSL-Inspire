import updateCursorForResizeDirection from "./updateCursorForResizeDirection";
import drawImage from "./FastDrawImage";
import autoScroll from "./autoScroll";
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
    let dx = x - window.startXX;
    let dy = y - window.startYY;

    // Adjust speed if user moves fast
    
    // Cap movement per iteration to avoid jumps, adjust for fast movement


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
        if (change > 0) {
  
        // Increase width and height
        window.imgY -= proportionalChange; // Move top edge upward
        window.imgWidth += change;
        window.imgHeight += proportionalChange;
      } else {
        // Decrease width and height
        window.imgY -= proportionalChange; // Move top edge upward
  
        window.imgWidth += change; // Shrink width
        window.imgHeight += proportionalChange; // Shrink height, maintaining aspect ratio
      }
  
  
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
    // Calculate movement deltas
    let dx = mouseX - window.offsetX - window.imgX;
    let dy = mouseY - window.offsetY - window.imgY;

    // Adjust speed if user moves fast
    let speedFactor = Math.max(1, Math.min(3, Math.abs(dx) / 10, Math.abs(dy) / 10));

    // Cap movement to prevent sudden jumps, adjust for speed
    dx = Math.sign(dx) * Math.min(10 * speedFactor, Math.abs(dx));
    dy = Math.sign(dy) * Math.min(10 * speedFactor, Math.abs(dy));

    // Update image position
    window.imgX += dx;
    window.imgY += dy;

    // Prevent dragging outside canvas boundaries
    window.imgX = Math.max(0, Math.min(window.imgX, window.canvas.width - window.imgWidth));
    window.imgY = Math.max(0, Math.min(window.imgY, window.canvas.height - window.imgHeight));
}
