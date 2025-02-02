import getMousePos from "../Start_Drawing/Mouse_position";
import getResizeHandle from "./GetResizeHandle";
import updateCursorBasedOnHandle from "./UpdateCursorBasedOnHandle";
export default function Update_SelectionCursor(e){
    const pos = getMousePos(window.canvas, e);
  
    if (window.selectedObject) {
  
  
      const hoveredHandle = getResizeHandle(pos, window.selectedObject);
      if (hoveredHandle) {
        // Change cursor style when hovering over a resize handle
        updateCursorBasedOnHandle(pos, window.selectedObject)
      } else if (window.selectedObject.curve) {
        const rect = window.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (window.selectedObject.curve.hitTest(x, y) !== "curve") {
          if (window.selectedObject.curve.hitTest(x, y) != null) {
            window.canvas.style.cursor = "nwse-resize"; // Cursor for resizing start point
  
          }
        }
      } else {
        // Reset to default cursor when not hovering over a handle
        window.canvas.style.cursor = "default";
  
      }
    }
  };