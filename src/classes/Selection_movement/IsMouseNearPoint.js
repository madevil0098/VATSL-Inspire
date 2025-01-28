export default function isMouseNearPoint(mouseX, mouseY, point, threshold = 5) {
    const dx = mouseX - point.x;
    const dy = mouseY - point.y;
    return Math.sqrt(dx * dx + dy * dy) <= threshold; // Check within a threshold distance
  }