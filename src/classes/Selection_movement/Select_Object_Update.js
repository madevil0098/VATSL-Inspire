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
  function drawRotationIndicator(center) {
    const ctx = window.canvas.getContext("2d");
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.lineWidth = 1;
  
    // Draw a line from the center to the mouse position
    ctx.moveTo(center.x, center.y);
  
    // Draw a small circle at the center
    ctx.arc(center.x, center.y, 5, 0, 2 * Math.PI);
  
    ctx.stroke();
    ctx.restore();
  }
  function resizeGrid(grid, handle, dx, dy) {
    if (handle === "top-left") {
      grid.x += dx;
      grid.y += dy;
      grid.width -= dx;
      grid.height -= dy;
    } else if (handle === "top-right") {
      grid.width += dx;
      grid.y += dy;
      grid.height -= dy;
    } else if (handle === "bottom-left") {
      grid.x += dx;
      grid.width -= dx;
      grid.height += dy;
    } else if (handle === "bottom-right") {
      grid.width += dx;
      grid.height += dy;
    }
  }
export default function Update_selected_Object(e){
    const pos = getMousePos(window.canvas, e);
    if (window.selectedObject) {
      if (window.selectedPoint) {
  
        const rect = window.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // Move the selected point
        window.selectedPoint.x = x;
        window.selectedPoint.y = y;
        drawAllObjects(); // Redraw objects with updated sizes
  
      }
      if (window.resizing && window.resizeHandle) {
        const pos = getMousePos(window.canvas, e);
        const dx = pos.x - window.dragOffset.x;
        const dy = pos.y - window.dragOffset.y;
  
        if (window.selectedObject.line) {
          resizeLine(window.selectedObject.line, window.resizeHandle, dx, dy);
          //window.selectedObject.line.updateRow_col()
  
        } else if (window.selectedObject.line_data) {
          resizeLine(window.selectedObject.line_data, window.resizeHandle, dx, dy);
        } else if (window.selectedObject.grid) {
          resizeGrid(window.selectedObject.grid, window.resizeHandle, dx, dy);
          //window.selectedObject.grid.updateRow_col()
  
        }
        window.dragOffset = {
          x: pos.x,
          y: pos.y
        }; // Update drag offset
        drawAllObjects(); // Redraw objects with updated sizes
      } else if (window.rotationStart && window.rotating && window.selectedObject.grid) {
        const center = {
          x: window.selectedObject.grid.x + window.selectedObject.grid.width / 2,
          y: window.selectedObject.grid.y + window.selectedObject.grid.height / 2,
        };
  
        const angle = Math.atan2(pos.y - center.y, pos.x - center.x);
        const startAngle = Math.atan2(window.rotationStart.y - center.y, window.rotationStart.x - center.x);
  
        // Calculate the rotation delta
        let rotationDelta = angle - startAngle;
  
        // Normalize the angle to handle wrapping around 360 degrees
        if (rotationDelta > Math.PI) {
          rotationDelta -= 2 * Math.PI;
        } else if (rotationDelta < -Math.PI) {
          rotationDelta += 2 * Math.PI;
        }
  
        // Apply a scaling factor to make rotation slower
        const rotationSpeedFactor = 0.5; // Adjust this value for slower or faster rotation
        rotationDelta *= rotationSpeedFactor;
  
        // Update rotation (with optional snapping)
        const snapToAngle = 1; // Snap interval in degrees
        const newRotation = window.selectedObject.grid.initialRotation + rotationDelta;
  
        window.selectedObject.grid.rotation = snapToAngle ?
          Math.round((newRotation * 180) / Math.PI / snapToAngle) * snapToAngle * (Math.PI / 180) :
          newRotation;
        window.selectedObject.grid.isrotation = true;
  
        drawAllObjects(); // Redraw objects with rotation
        drawRotationIndicator(center); // Draw visual feedback for rotation
      } else if (window.dragging && window.dragStart && window.selectedObject.grid) {
        const dx = pos.x - window.dragStart.x;
        const dy = pos.y - window.dragStart.y;
  
        window.selectedObject.grid.x += dx;
        window.selectedObject.grid.y += dy;
        window.dragStart = pos; // Update drag start position
        drawAllObjects();
      }
    }
  };