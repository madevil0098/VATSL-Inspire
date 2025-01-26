import React, { useRef,useState,useEffect } from "react";
import "./Navbar.css";
import ImageImport from "../../classes/ImageHandler/ImageImport"
import startDraw from "../../classes/Start_Drawing/Start_Element";
import continueDraw from "../../classes/Start_Drawing/Continue_Element";
import endDraw from "../../classes/Start_Drawing/End_Element";
import clearEventListeners from "../../classes/Start_Drawing/Reset_Element";
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


        <button id="selectButton" className="btn btn-select toggleButton">
          <img className="icon" src="./assert/select.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>


        <button id="selectnode" className="btn btn-node toggleButton">
          <img className="icon" src="./assert/touchscreen.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png"  alt=""/>
        </button>
        <button id="saveCanvas" className="btn btn-save toggleButton">
          <img className="icon" src="./assert/save.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button id="importJson" className="btn btn-reupload toggleButton">
          <img className="icon" src="./assert/file.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
        <button id="clearobj" className="btn btn-erase toggleButton">
          <img className="icon" src="./assert/eraser.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt=""/>
        </button>
        <button id="clearCanvas" className="btn btn-clear toggleButton">
          <img className="icon" src="./assert/broom.png" alt="" />
          <img className="btn btn-logo" src="./assert/download.png" alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
