import drawSelectionRectangle from "./drawSelectionRectangle";
export default function drawAllObjects_img() {

    window.drawn_item.forEach((item) => {
      if (item.line) {
        item.line.forcolour(window.ctx);
      } else if (item.grid) {
        item.grid.forcolour(window.ctx);
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