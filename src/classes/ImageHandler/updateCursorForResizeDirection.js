export default function updateCursorForResizeDirection() {

    switch (window.resizeDirection) {
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
      case "top":
        window.canvas.style.cursor = "ns-resize";
        break;
      case "bottom":
        window.canvas.style.cursor = "ns-resize";
        break;
      case "left":
        window.canvas.style.cursor = "ew-resize";
        break;
      case "right":
        window.canvas.style.cursor = "ew-resize";
        break;
      default:
        window.canvas.style.cursor = "default";
        break;
    }
  }
  