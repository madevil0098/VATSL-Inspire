import drawAllObjects from "../Selection/drawAllObjects";
export default function Selection_Stop(){
    window.dragStart = false;
    window.selectedPoint = false;
    window.rotationStart = false;
    window.rotating = false;
    window.resizing = false;
    window.resizeHandle = null;
    window.canvas.style.cursor = "default"; // Reset cursor
    setTimeout(() => {
      drawAllObjects()
    }, 100);
    
    drawAllObjects();
  };