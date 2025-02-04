import React, { useState, useEffect } from "react";
import "./Headbar.css";
import node_space_size_upd from "../../classes/Selected_Object_update/Node_Space_Size_upd";
import color_ch from "../../classes/Selected_Object_update/Colour_Change";
import node_size from "../../classes/Selected_Object_update/Node_Size";
import drawAllObjects from "../../classes/Selection/drawAllObjects";
import hideOptions from "../../classes/Selection/Hide_options";
import Dropdown from "./DropDown";
const Headbar = () => {
  // State to manage visibility of sections
  const [visibility, setVisibility] = useState({
    options: false,
    options1: false,
    options2: false,
    options22: false,
    options3: false,
    options4: false,
    options5: false,
  });
  const getNodeControlSize = () => {
    return (
        window.selectedObject?.grid?.node_size ??
        window.selectedObject?.line?.node_size ??
        window.selectednode?.size ??
        window.selectedObject?.curve?.node_size ?? // Add more as needed
        ""
    );
};
  const [gridRows, setGridRows] = useState(window.selectedObject?.grid?.columns ?? "");
  const [changeColor, setChangeColor] = useState(window.selectedObject?.colour ?? "");
  const [nodeControlSize, setNodeControlSize] = useState(getNodeControlSize);
  const [lineNodeControlLength, setLineNodeControlLength] = useState( "");
  const [gridSpaceNodeControl2, setGridSpaceNodeControl2] = useState( "");
  const [gridWidthNodeControl, setGridWidthNodeControl] = useState(window.selectedObject?.grid?.rows  ?? "");
  const [changeAlpha, setChangeAlpha] = useState(window.selectedObject?.curve?.transparency_line ?? "");
  const [curveLength, setCurveLength] = useState(window.selectedObject?.curve?.controlPointCount ?? window.selectedObject?.line?.controlPointCount ??"");
  
  // UseEffect to allow visibility control through the global `window` object
  useEffect(() => {
        setGridRows(window.selectedObject?.grid?.columns  ?? "");
        setChangeColor(window.selectedObject?.colour ?? "");
        setNodeControlSize(getNodeControlSize());
        setLineNodeControlLength("");  // Reset or assign a default value if applicable
        setGridSpaceNodeControl2("");  // Reset or assign a default value if applicable
        setGridWidthNodeControl(window.selectedObject?.grid?.rows ?? "");
        setChangeAlpha(window.selectedObject?.curve?.transparency_line ?? "");
        setCurveLength(window.selectedObject?.curve?.controlPointCount ?? window.selectedObject?.line?.controlPointCount ?? "");
    window.setSectionVisibility = (section, value) => {
      if (visibility.hasOwnProperty(section)) {
        setVisibility((prev) => ({
          ...prev,
          [section]: value,
        }));
      } else {
        console.warn(`Section "${section}" does not exist.`);
      }
    };
  }, [visibility]);

  // Function to toggle visibility of a section
  const renderSection = (sectionId, visibilityKey, children) => {
    return (
      <div
        id={sectionId}
        style={{
          display: visibility[visibilityKey] ? "block" : "none",
          paddingTop: "10px",
        }}
      >
        {children}
      </div>
    );
  };
  const [lineNodeControlDistances, setLineNodeControlDistances] = useState(
    window.selectedObject?.line?.control?.map(() => "") || []
  );
  
  return (
    <div className="main-container">
      <div className="main-navbar">
        <div className="flex-2">
          {renderSection("options", "options", (
            <div className="flex">
              <div id="dropdow5n-container" className="dropdow5n_container">
                
                <Dropdown/>
              </div>
            </div>
          ))}

          {renderSection("options1", "options1", (
            <div className="flex">
              <span>
                <input type="checkbox" id="checkButton" defaultChecked
                onChange={(e) => {
                  window.checked_selection = e.target.checked ? 1 : 0;
                  drawAllObjects();
                }} />
                <label>Hide Object Outline</label>
              </span>
              <span>
                <label>Current Line Color</label>
                <input type="color" id="changeColor" value={changeColor} onChange={(e)=>{color_ch(e);setChangeColor(e.target.value)}}/>
              </span>
              <span>
                <label>Node Size</label>
                <input
                value={nodeControlSize}
                  type="number"
                  id="nodeControl_size"
                  min="1"
                  max="100"
                  style={{ width: "37px" }} 
                  onChange={(e)=>{node_size(e);setNodeControlSize(parseInt(e.target.value))}}
                />
              </span>
            </div>
          ))}

          {renderSection("options2", "options2", (
            <div className="flex">
            {window.selectedObject?.line?.control?.map((controlPoint, index) => (
              <span key={index}>
                <label style={{ display: "block" }}>
                  Number of Nodes ({index + 1})
                </label>
                <input
                  type="number"
                  id={`line_nodeControl_distance_${index}`}
                  value={lineNodeControlDistances[index] || controlPoint}
                  min="2"
                  max="100"
                  style={{ width: "37px" }}
                  onChange={(e) => {
                    const newValues = [...lineNodeControlDistances];
                    newValues[index] = e.target.value;
                    setLineNodeControlDistances(newValues);
                    if (window.selectedObject?.line?.control) {
                      window.selectedObject.line.control[index] = parseInt(e.target.value);
                    }
                    drawAllObjects();

                  }}
                />
              </span>
              
            ))}
            <span>
                <label style={{ display: "block" }}>Control Point</label>
                <input
                  type="number"
                  id="curve_length"
                  value={curveLength}
                  min="1"
                  max="5"
                  style={{ width: "37px" }}
                  onChange={(e)=>{
                    if (parseInt(e.target.value) >5){
                      setCurveLength(5)
                      return
                    }
                    window.selectedObject.line.updateControlPoints(window.ctx, parseInt(e.target.value));
                    drawAllObjects();
                    setCurveLength(e.target.value)

                  }}    
                />
                </span>
          </div>
          
          ))}

          {renderSection("options22", "options22", (
            <div className="flex">
              <span>
                <label style={{ display: "block" }}>Length of Building (In Meter)</label>
                <input type="number" id="line_nodeControl_length" min="2" value={lineNodeControlLength} style={{ width: "37px" }}
                onChange={(e) => {
                  node_space_size_upd(e, "line_nodeControl_length");
                  setLineNodeControlLength(e.target.value)
                }}/>
              </span>
              <span>
                <label style={{ display: "block", whiteSpace: "nowrap" }}>Number of Lights (Per Meter)</label>
                <input type="number" id="grid_space_nodeControl2" value={gridSpaceNodeControl2} min="10" max="30000" style={{ width: "37px" }} 
                onChange={(e) => {
                  node_space_size_upd(e, "grid_space_nodeControl2");
                  setGridSpaceNodeControl2(e.target.value)
                }}/>
              </span>
              <span>
                <input type="checkbox" id="checkButton_line" defaultChecked
                onChange={(e) => {
                  const value = e.target.checked ? 1 : 0; // Assign 1 if checked, 0 otherwise
                  window.selectedObject.line_data.transparency = value;
                  drawAllObjects();
                }}/>
                <label>Hide Distance Line</label>
              </span>
            </div>
          ))}

          {renderSection("options3", "options3", (
            <div className="flex">
              <span>
                <label style={{ display: "block" }}>Rows</label>
                <input
                  type="number"
                  id="grid_length_nodeControl"
                  min="2"
                  value={gridWidthNodeControl}
                  max="30000"
                  style={{ width: "37px" }}
                  onChange={(e) => {
                    node_space_size_upd(e, "grid_length_nodeControl")
                    setGridWidthNodeControl(e.target.value)
                  }}
                />
              </span>
              <span>
                <label style={{ display: "inline-block" }}>Columns</label>
                <input
                  type="number"
                  id="grid_width_nodeControl"
                  value={gridRows}
                  min="2"
                  max="30000"
                  style={{ width: "37px" }}
                  onChange={(e) => {
                    node_space_size_upd(e, "grid_width_nodeControl")
                    setGridRows(e.target.value)
                  }}
                />
              </span>
              <button onClick={() => window.toggleGridPopup(true)}>Rotation Setting
                
              </button>
            </div>
          ))}

          {renderSection("options5", "options5", (
            <div className="flex">
              <label>Alpha (Opacity)</label>
              <input
                type="range"
                id="changeAlpha"
                value={changeAlpha}
                min="0"
                max="1"
                step="0.01"
                onChange={(e)=>{
                  window.selectedObject.curve.transparency_line = e.target.value;
                  drawAllObjects();
                  setChangeAlpha(e.target.value)
                }}
              />
              <span id="alphaValue"></span>
              <span>
                <label style={{ display: "block" }}>Control Point</label>
                <input
                  type="number"
                  id="curve_length"
                  value={curveLength}
                  min="1"
                  max="300"
                  style={{ width: "37px" }}
                  onChange={(e)=>{
                    window.selectedObject.curve.updateControlPoints(window.ctx, parseInt(e.target.value));
                    drawAllObjects();
                    setCurveLength(e.target.value)
                  }}    
                />
              </span>
              <span>
                <input type="checkbox" id="checkButton_curve" defaultChecked
                onChange={(e) => {
                  const value = e.target.checked ? 1 : 0; // Assign 1 if checked, 0 otherwise
                  window.selectedObject.curve.transparency = value;

                  drawAllObjects();
                }}/>
                <label>Hide Distance Line</label>
              </span>
            </div>
          ))}

          {renderSection("options4", "options4", (
            <button
              style={{
                marginBottom: 0,
                padding: "2px",
                fontSize: "12px",
                paddingLeft: "12px",
                paddingTop:"3px",
              }}
              id="doneButton"
              onClick={ () => {
  
                window.selectedObject = null; 
                window.selectednode=null;
                hideOptions();
                drawAllObjects();}}
            >
              Done
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Headbar;
