import drawResizeHandles from "../ImageHandler/drawResizeHandles";
import drawSelectionRectangle from "./drawSelectionRectangle";
import rotatePoint from "./rotatePoint";
import drawButtonHandle from "./drawButtonHandle";
export default async function drawAllObjects() {
    await window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
  
    if (window.savedCanvasState) {
      await window.ctx.putImageData(window.savedCanvasState, 0, 0);
      drawResizeHandles();
  
    }
    window.drawn_item.forEach(async (item) => {
  
    });
    if (!window.selectedObject) {
        window.drawn_item.forEach(async (item) => {
        if (item.curve) {
          item.curve.transparency = 0;
  
        }
      });
    }
    window.drawn_item.forEach(async (item) => {
      if (item.line) {
        await item.line.redraw(window.ctx);
      } else if (item.grid) {
        await item.grid.redraw(window.ctx);
      } else if (item.line_data) {
        await item.line_data.redraw(window.ctx);
      } else if (item.curve) {
  
        await item.curve.draw(window.ctx);
  
      }
    });
    if (window.selectedObject && window.checked_selection) {
      drawSelectionRectangle(window.selectedObject); // Draw selection highlight
      if (window.selectedObject.grid) {
        const rotation = window.selectedObject.grid.rotation || 0; // Get rotation in radians
        const centerX = window.selectedObject.grid.x + window.selectedObject.grid.width / 2;
        const centerY = window.selectedObject.grid.y + window.selectedObject.grid.height / 2;
  
        // Calculate the position directly above the center
        const offsetX = 0; // No horizontal offset
        const offsetY = -(window.selectedObject.grid.height / 2 + 30); // 20 pixels above the center
  
        // Calculate the rotated position for the handle
        const handlePosition = rotatePoint(centerX + offsetX, centerY + offsetY, centerX, centerY, rotation);
  
        // Draw the handle at the calculated position
        drawButtonHandle(handlePosition.x, handlePosition.y);
      }
  
  
    }
    if (window.selectednode && window.checked_selection) {
      drawSelectionRectangle(window.selectednode); // Draw selection highlight
    }
  }