import drawResizeHandles from "../ImageHandler/drawResizeHandles";
import drawSelectionRectangle from "./drawSelectionRectangle";
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
     
  
  
    }
    if (window.selectednode && window.checked_selection) {
      drawSelectionRectangle(window.selectednode); // Draw selection highlight
    }
  }