export default function isMouseInsideObject(mousePos, grid) {
    return (
      mousePos.x >= grid.x &&
      mousePos.x <= grid.x + grid.width &&
      mousePos.y >= grid.y &&
      mousePos.y <= grid.y + grid.height
    );
  }