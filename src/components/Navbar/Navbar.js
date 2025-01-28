import React, { useRef,useState,useEffect } from "react";
import "./Navbar.css";
import ImageImport from "../../classes/ImageHandler/ImageImport"
import startDraw from "../../classes/Start_Drawing/Start_Element";
import continueDraw from "../../classes/Start_Drawing/Continue_Element";
import endDraw from "../../classes/Start_Drawing/End_Element";
import clearEventListeners from "../../classes/Start_Drawing/Reset_Element";
import drawImage from "../../classes/ImageHandler/drawImage";
import hideOptions from "../../classes/Selection/Hide_options";
import getMousePos from "../../classes/Start_Drawing/Mouse_position";
import drawAllObjects from "../../classes/Selection/drawAllObjects";
import handleNodeSelection from "../../classes/Selection/HandleNodeSelection";
import handleObjectSelection from "../../classes/Selection/handleObjectSelection";
import Selection_MouseDown from "../../classes/Selection_movement/Select_Object_Start";
import Selection_Stop from "../../classes/Selection_movement/Select_Object_Stop";
import Update_selected_Object from "../../classes/Selection_movement/Select_Object_Update";
import Update_SelectionCursor from "../../classes/Selection_movement/Select_Object_Cursor";
const Navbar = () => {
    const fileInputRef = useRef(null);

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };
  const [isDisabled, setIsDisabled] = useState({
    drawLine_1: true,
    drawLine: true,
    drawCurve: true,
    drawGrid: true,
  });
  const toggleSelectionMode = (mode) => {
    // Ensure no event listeners are attached before toggling
    clearEventListeners();
    window.isSelecting = false; // Reset selection flag
    window.selectedElement = null;
    window.selectedObject = null;
    window.selectednode = null;
    window.checked_selection = true;
  
    // Hide options for cleaner UI
    hideOptions();
    drawAllObjects(); // Redraw everything
  
    // Toggle selection modes
    if (mode === "object") {
      window.selectionMode = !window.selectionMode;
      window.selectednodeMode = false;
    } else if (mode === "node") {
      window.selectednodeMode = !window.selectednodeMode;
      window.selectionMode = false;
    }
  
    // Add event listeners based on the active selection mode
    if (window.canvas) {
      console.log("window.selectionMode",window.selectionMode)
      window.canvas.addEventListener("mousedown", (e) => {
        const pos = getMousePos(window.canvas, e);
        
        if (window.selectionMode) {
          handleObjectSelection(pos); // Handle object selection
        }
    
        if (window.selectednodeMode) {
          handleNodeSelection(pos); // Handle node selection
        }
      }
      
    );
    window.canvas.addEventListener("mousedown", Selection_MouseDown);
    window.canvas.addEventListener("mousemove", Update_SelectionCursor);
    window.canvas.addEventListener("mousemove", Update_selected_Object);
    window.canvas.addEventListener("mouseup", Selection_Stop);
  
    }
    // Update button styles based on the selection mode
    document.getElementById("selectButton").classList.toggle("clicked", window.selectionMode);
    document.getElementById("selectnode").classList.toggle("clicked", window.selectednodeMode);
  };
  
  // Handling the onClick for selection mode buttons
  
  useEffect(() => {
    
      // Assign the function to the global `window` object
      window.toggleButtonState = (buttonId,value) => {
        setIsDisabled((prevState) => ({
          ...prevState,
          [buttonId]: value,
        }));
      };
    }, []); // Empty dependency array ensures this runs once on component mount

  // Function to enable or disable a specific button
  
  
  return (
    <div className="navbar" >
      <h1>Tools</h1>
      <div className="nav" id="tools" >
      <input
      aria-label="image"
      accept="image/*"
          type="file"
          id="importImage"
          className="btn"
          ref={fileInputRef}
          onChange={ImageImport}
          style={{ display: "none" }}
        />
        <button className="btn btn-image" aria-label="IMAGE INPORT" onClick={handleFileInputClick}>
          <img className="icon" src="./assert/upload.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>

          <button className="btn btn-freeze toggle open-popup-btn toggleButton" aria-haspopup="true" aria-expanded="false"
            id="openPopup" onClick={window.openPopup}>
            <img className="icon" src="./assert/freezing.png" alt="" />
            <img className="btn btn-logo" src="./assert/download.png" alt=""/>
          </button>

          <button
          id="drawLine_1"
          className="btn btn-dist toggleButton"
          disabled={isDisabled.drawLine_1}
          onClick={() => {
            clearEventListeners();
            window.activeMode = "size"; // Set active mode to 'line'
            window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
          
            // Add event listeners for drawing on canvas
            window.canvas.addEventListener("mousedown", startDraw);
            window.canvas.addEventListener("mousemove", continueDraw);
            window.canvas.addEventListener("mouseup", endDraw);}}
        >
          <img className="icon" src="./assert/measurement.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button
          id="drawLine"
          className="btn btn-draw toggleButton"
          disabled={isDisabled.drawLine}
          onClick={() => {
            clearEventListeners();
            window.activeMode = "line"; // Set active mode to 'line'
            window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
          
            // Add event listeners for drawing on canvas
            window.canvas.addEventListener("mousedown", startDraw);
            window.canvas.addEventListener("mousemove", continueDraw);
            window.canvas.addEventListener("mouseup", endDraw);}}
        >
          <img className="icon" src="./assert/pencil.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button
          id="drawCurve"
          className="btn btn-curve toggleButton"
          disabled={isDisabled.drawCurve}
          onClick={() =>{
            clearEventListeners();
            window.activeMode = "curve"; // Set active mode to 'line'
            window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
          
            // Add event listeners for drawing on canvas
            window.canvas.addEventListener("mousedown", startDraw);
            window.canvas.addEventListener("mousemove", continueDraw);
            window.canvas.addEventListener("mouseup", endDraw);}}
        >
          <img className="icon" src="./assert/curve-line.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button
          id="drawGrid"
          className="btn btn-grid toggleButton"
          disabled={isDisabled.drawGrid}
          onClick={() =>{
            clearEventListeners();
            window.activeMode = "grid"; // Set active mode to 'line'
            window.canvas.style.cursor = "crosshair"; // Crosshair cursor for drawing lines
          
            // Add event listeners for drawing on canvas
            window.canvas.addEventListener("mousedown", startDraw);
            window.canvas.addEventListener("mousemove", continueDraw);
            window.canvas.addEventListener("mouseup", endDraw);}}
        >
          <img className="icon" src="./assert/grid.line.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>


        <button 
          id="selectButton" 
          className="btn btn-select toggleButton" 
          onClick={() => toggleSelectionMode("object")}>
          <img className="icon" src="./assert/select.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        
        <button 
          id="selectnode" 
          className="btn btn-node toggleButton" 
          onClick={() => toggleSelectionMode("node")}>
          <img className="icon" src="./assert/touchscreen.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button id="saveCanvas" className="btn btn-save toggleButton">
          <img className="icon" src="./assert/save.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button id="importJson" className="btn btn-reupload toggleButton">
          <img className="icon" src="./assert/file.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button id="clearobj" className="btn btn-erase toggleButton" onClick={()=>{
          window.drawn_item = [];
          window.animations = [];
          window.isSelecting = false; // Flag to track if we're in selection mode
          window.selectedElement = null; // To store the selected line or grid
          window.selectionMode = false; // Tracks whether we're in selection mode
          window.selectednodeMode = false;
          window.selectedObject = null;
          window.selectednode = null; // Stores the selected line or grid
          window.checked_selection = true;
          drawImage();
}
        }>
          <img className="icon" src="./assert/eraser.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt=""/>
        </button>
        <button id="clearCanvas" className="btn btn-clear toggleButton"  onClick={()=>{
        window.location.reload();

        }}>
          <img className="icon" src="./assert/broom.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
