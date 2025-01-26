import getMousePos from "./Mouse_position";
import drawLineSegment from "./DrawLineSegment";
import drawDragBox from "./DrawDragBox";
import Node from "../Drawing_Image/Node";
export default function continueDraw(e) {
    if (window.activeMode === "line") {
      window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
    } else if (window.activeMode === "size") {
      window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
      // Resize cursor for size adjustment
    } else if (window.activeMode === "grid") {
      window.canvas.style.cursor = "move"; // Move cursor for grid operations
    } else if (window.activeMode === "curve") {
      window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
      // Pointer cursor for curves
    } else {
      window.canvas.style.cursor = "default"; // Default cursor for other modes
    }
  
    if (window.isDragging && window.activeMode === "line") {
      // Clear the window.canvas before restoring the saved state
      window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height); // Clear the window.canvas
  
      // Restore the saved window.canvas state to clear previous dynamic lines
      window.ctx.putImageData(window.now_canvas, 0, 0);
  
      window.pos = getMousePos(window.canvas, e); // Get current mouse position
      drawLineSegment(window.startPoint.x, window.startPoint.y, window.pos.x, window.pos.y);
  
      window.endPoint = new Node(window.pos.x, window.pos.y, "rgb(255,0,0)", 5); // Create a new Node for end
      //drawAllObjects();
  
      // Redraw all previously drawn lines
      //drawn_item.forEach(line => line.drawLine(window.ctx));
  
      // Draw the dynamic line from start to current mouse position
    } else if (window.isDragging && window.activeMode === "size") {
      // Clear the window.canvas before restoring the saved state
      window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height); // Clear the window.canvas
  
      // Restore the saved window.canvas state to clear previous dynamic lines
      window.ctx.putImageData(window.now_canvas, 0, 0);
  
      window.pos = getMousePos(window.canvas, e); // Get current mouse position
      drawLineSegment(window.startPoint.x, window.startPoint.y, window.pos.x, window.pos.y);
  
      window.endPoint = new Node(window.pos.x, window.pos.y, "rgb(255,0,0)", 5); // Create a new Node for end
      //drawAllObjects();
  
      // Redraw all previously drawn lines
      //drawn_item.forEach(line => line.drawLine(window.ctx));
  
      // Draw the dynamic line from start to current mouse position
    } else if (window.isDrawing && window.activeMode === "grid") {
      // Restore the saved window.canvas state to avoid background distortion
      window.ctx.putImageData(window.now_canvas, 0, 0);
  
      window.pos = getMousePos(window.canvas, e);
      window.endX = window.pos.x;
      window.endY = window.pos.y;
  
      window.cellSize = parseInt(
        document.getElementById("cellSize") ?
        document.getElementById("cellSize").value :
        50
      );
  
      window.width = Math.abs(window.endX - window.startX);
      window.height = Math.abs(window.endY - window.startY);
      window.x = Math.min(window.startX, window.endX);
      window.y = Math.min(window.startY, window.endY);
  
      // Draw a temporary rectangle (drag box) to show the grid area
  
      window.colour = "rgb(255,255,255)";
      // Create a new grid and draw it dynamically (comment this out for temp box)
      drawDragBox(window.startX, window.startY, Math.abs(window.startX - window.pos.x), Math.abs(window.startY - window.pos.y));
      window.endPoint = new Node(window.startX, window.startY, "rgb(255,0,0)", 5); // Create a new Node for end
      //drawAllObjects();
  
    } else if (window.isDragging && window.activeMode === "curve") {
      // Clear the window.canvas before restoring the saved state
      window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height); // Clear the window.canvas
      window.pos = getMousePos(window.canvas, e);
  
      // Restore the saved window.canvas state to clear previous dynamic lines
      window.ctx.putImageData(window.now_canvas, 0, 0);
      window.currentCurve.end.x = window.pos.x;
      window.currentCurve.end.y = window.pos.y;
      window.currentCurve.initializeNodesAndControls()
      window.currentCurve.draw(window.ctx)
    }
  }