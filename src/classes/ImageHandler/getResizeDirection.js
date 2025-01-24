export default function getResizeDirection(x, y) {
    const handleSize = 10;
  
    // Corners
    if (
      x >= window.imgX - handleSize / 2 &&
      x <= window.imgX + handleSize / 2 &&
      y >= window.imgY - handleSize / 2 &&
      y <= window.imgY + handleSize / 2
    ) {
      return "top-left";
    }
    if (
      x >= window.imgX + window.imgWidth - handleSize / 2 &&
      x <= window.imgX + window.imgWidth + handleSize / 2 &&
      y >= window.imgY - handleSize / 2 &&
      y <= window.imgY + handleSize / 2
    ) {
      return "top-right";
    }
    if (
      x >= window.imgX - handleSize / 2 &&
      x <= window.imgX + handleSize / 2 &&
      y >= window.imgY + window.imgHeight - handleSize / 2 &&
      y <= window.imgY + window.imgHeight + handleSize / 2
    ) {
      return "bottom-left";
    }
    if (
      x >= window.imgX + window.imgWidth - handleSize / 2 &&
      x <= window.imgX + window.imgWidth + handleSize / 2 &&
      y >= window.imgY + window.imgHeight - handleSize / 2 &&
      y <= window.imgY + window.imgHeight + handleSize / 2
    ) {
      return "bottom-right";
    }
  
    // Edges (sides)
    if (
      x >= window.imgX + window.imgWidth / 2 - handleSize / 2 &&
      x <= window.imgX + window.imgWidth / 2 + handleSize / 2 &&
      y >= window.imgY - handleSize / 2 &&
      y <= window.imgY + handleSize / 2
    ) {
      return "top";
    }
    if (
      x >= window.imgX + window.imgWidth / 2 - handleSize / 2 &&
      x <= window.imgX + window.imgWidth / 2 + handleSize / 2 &&
      y >= window.imgY + window.imgHeight - handleSize / 2 &&
      y <= window.imgY + window.imgHeight + handleSize / 2
    ) {
      return "bottom";
    }
    if (
      x >= window.imgX - handleSize / 2 &&
      x <= window.imgX + handleSize / 2 &&
      y >= window.imgY + window.imgHeight / 2 - handleSize / 2 &&
      y <= window.imgY + window.imgHeight / 2 + handleSize / 2
    ) {
      return "left";
    }
    if (
      x >= window.imgX + window.imgWidth - handleSize / 2 &&
      x <= window.imgX + window.imgWidth + handleSize / 2 &&
      y >= window.imgY + window.imgHeight / 2 - handleSize / 2 &&
      y <= window.imgY + window.imgHeight / 2 + handleSize / 2
    ) {
      return "right";
    }
  
    return "";
  }
  