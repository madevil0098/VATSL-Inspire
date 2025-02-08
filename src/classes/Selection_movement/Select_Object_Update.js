import getMousePos from "../Start_Drawing/Mouse_position";
import drawAllObjects from "../Selection/drawAllObjects";
function resizeLine(line, handle, dx, dy) {
    if (handle === "start") {
      line.start.x += dx;
      line.start.y += dy;
    } else if (handle === "end") {
      line.end.x += dx;
      line.end.y += dy;
    }
  }
  
  function resizeGrid(grid, handle, dx, dy) {
    if (handle === "top-left") {
      grid.x += dx;
      grid.y += dy;
      grid.width -= dx;
      grid.height -= dy;
    } else if (handle ==="top-right" ) {
      grid.width += dx;
      grid.y += dy;  // Ensuring movement is properly adjusted
      grid.height -= dy;
    } else if (handle ==="bottom-right" ) {
      grid.x += dx;
      grid.width -= dx;
      grid.height += dy; // Keeps the bottom growing properly
    } else if (handle === "bottom-left") {
      grid.width += dx;
      grid.height += dy;
    }
  }
  
  export default async function Update_selected_Object(e) {
    const pos = getMousePos(window.canvas, e);
  
    if (window.selectedObject) {
      // Throttle drag updates (12 per second)
      const now = Date.now();
      if (window.lastDragUpdate && now - window.lastDragUpdate < 1000 / 12) {
        // If not enough time has passed (less than ~83ms), do nothing
        return;
      }
      window.lastDragUpdate = now; // Update the last drag update time
  
      if (window.selectedPoint) {
        const rect = window.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Move the selected point
        window.selectedPoint.x = x;
        window.selectedPoint.y = y;
        window.selectedObject.curve.ismoved=true;
        drawAllObjects(); // Redraw objects with updated sizes
      } else if (window.resizing && window.resizeHandle) {
        const pos = getMousePos(window.canvas, e);
        const dx = pos.x - window.dragOffset.x;
        const dy = pos.y - window.dragOffset.y;
  
        if (window.selectedObject.line) {
          resizeLine(window.selectedObject.line, window.resizeHandle, dx, dy);
        } else if (window.selectedObject.line_data) {
          resizeLine(window.selectedObject.line_data, window.resizeHandle, dx, dy);
        } else if (window.selectedObject.grid) {
          resizeGrid(window.selectedObject.grid, window.resizeHandle, dx, dy);
          if (window.selectedObject.grid.updateRow_col_val){
            window.selectedObject.grid.updateRow_col()
          }
        }
        window.dragOffset = {
          x: pos.x,
          y: pos.y
        }; // Update drag offset
        drawAllObjects(); // Redraw objects with updated sizes
      } else if (window.dragging && window.dragStart && window.selectedObject.grid) {
        const dx = pos.x - window.dragStart.x;
        const dy = pos.y - window.dragStart.y;
  
        window.selectedObject.grid.x += dx;
        window.selectedObject.grid.y += dy;
        window.dragStart = pos; // Update drag start position
        await drawAllObjects();
      }
    }
  };
  