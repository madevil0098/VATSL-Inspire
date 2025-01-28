import getResizeHandle from "./GetResizeHandle";
export default function updateCursorBasedOnHandle(mousePos, object) {
    const resizeHandle = getResizeHandle(mousePos, object);
    console.log(resizeHandle)
    // Change the cursor based on the resize handle
    switch (resizeHandle) {
      case "start":
        window.canvas.style.cursor = "nwse-resize"; // Cursor for resizing start point
        break;
      case "end":
        window.canvas.style.cursor = "nwse-resize"; // Cursor for resizing end point
        break;
      case "top-left":
        window.canvas.style.cursor = "nwse-resize";
        break;
      case "top-right":
        window.canvas.style.cursor = "nesw-resize";
        break;
      case "bottom-left":
        window.canvas.style.cursor = "nesw-resize";
        break;
      case "bottom-right":
        window.canvas.style.cursor = "nwse-resize";
        break;
      default:
        window.canvas.style.cursor = "default"; // Default cursor when not near any handle
        break;
    }
  }