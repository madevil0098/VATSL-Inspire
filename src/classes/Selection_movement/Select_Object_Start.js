import getMousePos from "../Start_Drawing/Mouse_position";
import getResizeHandle from "./GetResizeHandle";
import updateCursorBasedOnHandle from "./UpdateCursorBasedOnHandle";
import isMouseNearRotationHandle from "./IsMouseNearRotationHandle";
import isMouseInsideObject from "./IsMouseInsideObject";
export default function Selection_MouseDown(e){
    const pos = getMousePos(window.canvas, e);
  
    if (window.selectedObject) {
      const clickedHandle = getResizeHandle(pos, window.selectedObject);
      if (window.selectedObject.curve) {
        const rect = window.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        window.selectedPoint = window.selectedObject.curve.hitTest(x, y);
        if (window.selectedObject.curve.hitTest(x, y) !== "curve") {
          if (window.selectedObject.curve.hitTest(x, y) != null) {
            window.canvas.style.cursor = "nesw-resize";
          }
        }
  
      } else if (clickedHandle) {
        updateCursorBasedOnHandle(pos, window.selectedObject)
  
        window.resizeHandle = clickedHandle;
        window.resizing = true;
        window.dragOffset = {
          x: pos.x,
          y: pos.y
        }; // Set initial drag offset
      } else if (window.selectedObject.grid && isMouseNearRotationHandle(pos, window.selectedObject.grid)) {
        // Start rotating the grid
        console.log(isMouseNearRotationHandle(pos, window.selectedObject.grid))
        window.rotating = true;
        window.rotationStart = {
          x: pos.x,
          y: pos.y
        };
        window.selectedObject.grid.initialRotation = window.selectedObject.grid.rotation || 0; // Store the initial rotation
        window.canvas.style.cursor = "crosshair";
      } else if (window.selectedObject.grid && isMouseInsideObject(pos, window.selectedObject.grid)) {
        // Start dragging the grid
        window.dragging = true;
        window.dragStart = pos;
        window.canvas.style.cursor = "move";
      }
    }
  }