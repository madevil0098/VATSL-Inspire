import rotatePoint from "../Selection/rotatePoint";
import isMouseNearPoint from "./IsMouseNearPoint";
export default function isMouseNearRotationHandle(mousePos, grid) {
    if (window.selectedObject && window.selectedObject.grid){
    const rotation = window.selectedObject.grid.rotation || 0; // Get rotation in radians
    const centerX = window.selectedObject.grid.x + window.selectedObject.grid.width / 2;
    const centerY = window.selectedObject.grid.y + window.selectedObject.grid.height / 2;
  
    // Calculate the position directly above the center
    const offsetX = 0; // No horizontal offset
    const offsetY = -(window.selectedObject.grid.height / 2 + 30); // 20 pixels above the center
  
    // Calculate the rotated position for the handle
    const handlePosition = rotatePoint(centerX + offsetX, centerY + offsetY, centerX, centerY, rotation);
  
  
    return isMouseNearPoint(mousePos.x, mousePos.y, handlePosition);}
  }