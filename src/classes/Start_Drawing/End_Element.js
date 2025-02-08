import Line_x from "../Drawing_Image/size";
import Line from "../Drawing_Image/Line";
import Grid from "../Drawing_Image/Grid";
import getMousePos from "./Mouse_position";
import clearEventListeners from "./Reset_Element";
import handleObjectSelection from "../Selection/handleObjectSelection";
import drawAllObjects from "../Selection/drawAllObjects";
import Select_Object from "../Selection/Select_Object";
export default function endDraw(e) {
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
    //hidepopOptions()
    window.selectionMode=false;
    window.toggleSelectionMode("object")
    Select_Object()
    let value_p;
    if (window.isDragging && window.startPoint && window.endPoint && window.activeMode === "line") {
      window.isDragging = false;
  
      // Draw the final line with evenly spaced nodes
      window.spacing = window.node_distance;
      window.linesize = 15;
      window.colour = "rgb(255,0,0)";
      window.linedrawn = new Line(window.startPoint, window.endPoint, window.colour, window.linesize, window.spacing); // Store the line object for redrawing purposes
      value_p = {
        type: "line",
        line: window.linedrawn,
        start: window.startPoint,
        end: window.endPoint,
        colour: window.colour,
        size: window.linesize,
        spacing: window.spacing,
      }
      window.drawn_item.push(value_p);
      window.linedrawn.draw(window.ctx);
  
      window.startPoint = null;
      window.endPoint = null;
      drawAllObjects();
  
      window.selectedObject = value_p
  
      clearEventListeners();
  
      
      setTimeout(() => {handleObjectSelection(window.selectedObject.start);}, 100);
      document.getElementById("drawLine").classList.remove("clicked");
      drawAllObjects(); // Redraw window.canvas

    } else if (window.isDragging && window.startPoint && window.endPoint && window.activeMode === "size") {
      window.isDragging = false;
  
      // Draw the final line with evenly spaced nodes
  
      window.linesize = 15;
      window.colour = "rgb(255,0,0)";
      window.linedrawn = new Line_x(window.startPoint, window.endPoint, 1, window.linesize); // Store the line object for redrawing purposes
      value_p = {
        type: "line_data",
        line_data: window.linedrawn,
        start: window.startPoint,
        end: window.endPoint,
        colour: window.colour,
        size: window.linesize,
  
      }
      window.drawn_item.push(value_p);
      window.linedrawn.drawLineWithNodes(window.ctx);
      // Save the new window.canvas state after drawing the final line
      //now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
  
      // Reset points
      window.startPoint = null;
      window.endPoint = null;
      drawAllObjects();
      //document.getElementById("popoption22").style.display = "block";
  
      // Remove event listeners to prevent further actions after finishing
      window.selectedObject = value_p
  
      //popup1.style.display = 'block';
      //overlay.style.display = 'block';
      clearEventListeners();
      window.showCustomPopup();
      setTimeout(() => {handleObjectSelection(window.selectedObject.start);}, 100);
      document.getElementById("drawLine_1").classList.remove("clicked");
      drawAllObjects(); // Redraw window.canvas
  
    } else if (window.activeMode === "grid") {
        window.isDrawing = false;
  
      // Optionally, save the final window.canvas state if needed
      const pos = getMousePos(window.canvas, e);
      window.endX = pos.x;
      window.endY = pos.y;
  
      const cellSize = window.node_distance;
  
      const width = Math.abs(window.endX - window.startX);
      const height = Math.abs(window.endY - window.startY);
      const x = Math.min(window.startX, window.endX);
      const y = Math.min(window.startY, window.endY);
      window.colour = "rgb(255,255,255)";
      // Draw a temporary rectangle (drag box) to show the grid area
  
      // Create a new grid and draw it dynamically (comment this out for temp box)
      const griddrawn = new Grid(x, y, window.colour, cellSize, width, height);
      value_p = {
        type: "grid",
        grid: griddrawn,
        start: x,
        end: y,
        colour: window.colour,
        size: cellSize,
        width: width,
        height: height,
      }
      window.drawn_item.push(value_p);
      griddrawn.drawDotMatrix(window.ctx);
      //now_canvas = window.ctx.getImageData(0, 0, window.canvas.width, window.canvas.height);
      drawAllObjects();
      // Remove the event listeners once the grid is drawn
      //document.getElementById("popoption").style.display = "block";  // Show popoption panel
  
      //document.getElementById("popoption3").style.display = "block";
      window.selectedObject = value_p
  
      //popup1.style.display = 'block';
      //overlay.style.display = 'block';
      clearEventListeners();
      
      setTimeout(() => {handleObjectSelection({x: window.selectedObject.start,y: window.selectedObject.end});}, 100);
      document.getElementById("drawGrid").classList.remove("clicked");
      drawAllObjects(); // Redraw window.canvas
  
    } else if (window.isDragging && window.currentCurve && window.activeMode === "curve") {
      window.spacing = window.node_distance;
      window.linesize = 15;
      window.colour = "rgb(255,0,0)";
      window.currentCurve.nodes=[];
      window.currentCurve.controls=[];
      window.currentCurve.initializeNodesAndControls()
  
      window.currentCurve.draw(window.ctx);
  
      //drawAllObjects();
      value_p = {
        type: "curve",
        curve: window.currentCurve,
        start: window.startPoint,
        end: window.endPoint,
        colour: window.colour,
        size: window.linesize,
        spacing: window.spacing,
      }
      window.drawn_item.push(value_p);
  
      window.selectedObject = value_p
  
      window.isDragging = false;
      window.currentCurve = null;
        clearEventListeners();
      
      /*popup1.style.display = 'block';
      overlay.style.display = 'block';*/
      
      drawAllObjects(); // Redraw window.canvas
      setTimeout(() => {handleObjectSelection(window.selectedObject.curve.start);}, 100);
      document.getElementById("drawCurve").classList.remove("clicked");
      drawAllObjects(); // Redraw window.canvas
  
    }
  
  }