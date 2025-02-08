export default function isMouseInsideObject(mousePosX, mousePosY, grid) {
  try {
    return (
      mousePosX >= grid.x &&
      mousePosX <= grid.x + grid.width &&
      mousePosY >= grid.y &&
      mousePosY <= grid.y + grid.height
    );
  } catch (error) {
    return false; // Return false in case of an error
  }
}
