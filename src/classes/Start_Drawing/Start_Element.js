import Node from "../Drawing_Image/Node"
import Point from "../Drawing_Image/Point";
import BezierCurve from "../Drawing_Image/BezierCurve"
import getMousePos from "./Mouse_position";
export default function startDraw(e) {
    window.selectedObject = null;
    document.getElementById("selectButton").classList.add("clicked");
    document.getElementById("selectnode").classList.remove("clicked");
  
  
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
    if (!window.isDragging && window.activeMode === "line") {
      window.isDragging = true;
      const pos = getMousePos(window.canvas, e); // Get initial mouse position
      window.startPoint = new Node(pos.x, pos.y, "rgb(255,255,255)", 5); // Create a new Node for start
      window.startPoint.drawNode(window.ctx); // Draw the starting node (circle)
  
      // Save the current window.canvas state so we can restore it during dragging
      window.now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
    } else if (!window.isDragging && window.activeMode === "size") {
      window.isDragging = true;
      const pos = getMousePos(window.canvas, e); // Get initial mouse position
      window.startPoint = new Node(pos.x, pos.y, "rgb(255,255,255)", 5); // Create a new Node for start
      window.startPoint.drawNode(window.ctx); // Draw the starting node (circle)
  
      // Save the current window.canvas state so we can restore it during dragging
      window.now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
    } else if (window.activeMode === "grid") {
        window.isDrawing = true;
      const pos = getMousePos(window.canvas, e);
      window.startX = pos.x;
      window.startY = pos.y;
      window.startPoint = new Node(window.startX, window.startY, "rgb(255,255,255)", 5); // Create a new Node for start
      window.startPoint.drawNode(window.ctx); // Draw the starting node (circle)
  
      // Save the window.canvas state before starting to draw the grid
      window.now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
    } else if (!window.isDragging && window.activeMode === "curve") {
      const pos = getMousePos(window.canvas, e);
  
      window.startPoint = new Point(pos.x, pos.y, "red");
      window.controlPoint = new Point(pos.x, pos.y, "blue");
      window.endPoint = new Point(pos.x, pos.y, "red");
      window.currentCurve = new BezierCurve(window.startPoint, window.endPoint, 1);
      window.isDragging = true;
      window.now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
  
    }
  }