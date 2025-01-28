import drawResizeHandles from "../ImageHandler/drawResizeHandles";
import drawSelectionRectangle from "./drawSelectionRectangle";
export default function drawAllObjects_for_curve() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
  
    if (window.savedCanvasState_for_curve) {
      window.ctx.putImageData(window.savedCanvasState_for_curve, 0, 0);
      drawResizeHandles();
  
    } else if (window.savedCanvasState) {
      window.ctx.putImageData(window.savedCanvasState, 0, 0);
      drawResizeHandles();
  
    }
    window.drawn_item.forEach((item) => {
      if (item.line) {
        item.line.redraw(window.ctx);
      } else if (item.grid) {
        item.grid.redraw(window.ctx);
      } else if (item.line_data) {
        item.line_data.redraw(window.ctx);
      } else if (item.curve) {
        item.curve.redraw(window.ctx);
      }
    });
    if (window.selectedObject && window.checked_selection) {
      drawSelectionRectangle(window.selectedObject); // Draw selection highlight
    }
    if (window.selectednode && window.checked_selection) {
      drawSelectionRectangle(window.selectednode); // Draw selection highlight
    }
  }