export default function rotatePoint(x, y, centerX, centerY, angle) {
    const cosTheta = Math.cos(angle);
    const sinTheta = Math.sin(angle);
  
    const dx = x - centerX;
    const dy = y - centerY;
  
    return {
      x: centerX + dx * cosTheta - dy * sinTheta,
      y: centerY + dx * sinTheta + dy * cosTheta,
    };
  }