import { useRef, useState,useEffect } from "react";
import Bottombar from "./DropSide"
import "./Sidebar.css"
import direction from "../../classes/AnimationControl/direction";
import starrSelectedObject_full from "../../classes/AnimationControl/StartSelectedObject_full";
import stopTwoColorFadingForSelectedObject_full from "../../classes/AnimationControl/StopTwoColorFadingForSelectedObject_full";
import startTwoColorFadingForSelectedObject from "../../classes/animations/fadeAnimation";
import startGridRainEffect from "../../classes/animations/startGridRainEffect";
import startColorScrollingEffect from "../../classes/animations/startColorScrollingEffect";
import numupd from "../../classes/AnimationControl/numupd";
import startColorFlowForLineAndCurve from "../../classes/animations/startColorFlowForLineAndCurve";
import startGridTextScroll from "../../classes/animations/startGridTextScroll";
import startAuroraEffect from "../../classes/animations/startAuroraEffect";
import startRainbowEffect from "../../classes/animations/startRainbowEffect";
import startBlinkingLightsEffect from "../../classes/animations/startBlinkingLightsEffect";
import startOrthogonalWavesEffect from "../../classes/animations/startOrthogonalWavesEffect";
const Sidebar=() =>{
    const fileInputRef = useRef(null);    
    const [activeTools,setActiveTools] = useState(() => window.activeTools || {}); // Maintain global state
    
    const [color1_1, setColor1_1] = useState(window.color1_1 || "#FF0000");
    const [color2_1, setColor2_1] = useState(window.color2_1 || "#0000FF");
    const [color1_2, setColor1_2] = useState(window.color1_2 || "#FF0000");
    const [color2_2, setColor2_2] = useState(window.color2_2 || "#0000FF");
    const [color1_4, setColor1_4] = useState(window.color1_4 || "#FF0000");
    const [color2_4, setColor2_4] = useState(window.color2_4 || "#0000FF");
    const [color1_10, setColor1_10] = useState(window.color1_10 || "#FF0000");
    const [color1_23, setColor1_23] = useState(window.color1_23 || "#FF0000");
    const [color2_23, setColor2_23] = useState(window.color2_23 || "#0000FF");
    const [nodeCount, setNodeCount] = useState(window.nodeCountInput || 3);
    const [rainbowBands, setRainbowBands] = useState(window.rainbowBandsInput || 7);
    const [numInput, setNumInput] = useState(window.numinput10 || 3);
    const [textInput, setTextInput] = useState(window.startTextButtontextInput || "VATSL");
useEffect(() => {
      // Sync with window.activeTool for global state tracking
      window.activeTool_sidebar = activeTools; 
  
      // Remote activation (can be used from any folder)
      window.activateTool_sidebar = (toolName) => {
        console.log(toolName)
        setActiveTools((prev) => {
          const updatedTools = { ...prev, [toolName]: true }; 
          return updatedTools;
        });
      };
      window.deactivateTool_sidebar = (toolName) => {
        console.log(toolName)

        setActiveTools((prev) => {
          const updatedTools = { ...prev };
          delete updatedTools[toolName]; // Remove from active tools
          return updatedTools;
        });
      };
      
    
    }, [activeTools]);
    const handleFileInputClick = () => {
        fileInputRef.current.click();
      };
    return <div className="bottom-navbar">
                <h1 style={{alignself: "flex-end"}}>Effects</h1>
                <div className="bottom-nav" id="tools">
                <Bottombar
                    id="1"
                    icon="./assert/fade.png"
                    used_in="grid line curve"
                    button_click={startTwoColorFadingForSelectedObject}
                    buttonid="startAnimationButton"
                    color1={color1_1}
                    color1_val={(e) => setColor1_1(e.target.value)}
                    color2={color2_1}
                    color2_val={(e) => setColor2_1(e.target.value)}

                    dropdown={<div className="dropdown-item" data-value="3">
                    <label className="direction-select" htmlFor="direction-select">Select Direction:</label>
                    <select className="direction-select_list" id="direction-select" onChange={direction}>
                      <option value="left">Left</option>
                      <option value="right">Right</option>
                      <option value="top">Top</option>
                      <option value="bottom">Bottom</option>
                      <option value="top-left">Top-Left</option>
                      <option value="bottom-right">Bottom-Right</option>
                      <option value="top-right">Top-Right</option>
                      <option value="bottom-left">Bottom-Left</option>
                    </select>
                  </div>}
                />
                <Bottombar
                    id="7"
                    icon="./assert/rainbow.png"
                    used_in="grid line curve"
                    button_click={startRainbowEffect}
                    buttonid="startRainbow"
                    color1={null}
                    color2={null}
                    dropdown={<><div className="dropdown-item">
                        <input className="small-input" type="number" id="nodeCountInput" value={nodeCount} onChange={(e) => setNodeCount(Number(e.target.value))} placeholder="Rainbow Length" />
                      </div>
                      <div className="dropdown-item">
                        <input className="small-input" type="number" id="rainbowBandsInput" value={rainbowBands} onChange={(e) => setRainbowBands(Number(e.target.value))} placeholder="Rainbow colour combination Length" />
                      </div></>}
                />
                <Bottombar
                    id="5"
                    icon="./assert/arrow.png"
                    button_click={startColorScrollingEffect}
                    used_in="grid line curve"
                    buttonid="startColorScrolling"
                    color1={null}
                    color2={null}
                    dropdown={null}
                />
                <Bottombar
                    id="10"
                    icon="./assert/drift.png"
                    used_in="curve"
                    button_click={startColorFlowForLineAndCurve}
                    buttonid="startdrop"
                    color1={color1_10}
                    color1_val={(e) => setColor1_10(e.target.value)}

                    color2={null}
                    dropdown={<div>
                        <label className="Animation-font" htmlFor="speedInput">Number of Nodes in Track</label>
                        <input type="number" id="numinput10" className="num-select_list small-input"  onChange={(e) =>{numupd(e); setNumInput(Number(e.target.value))}} min="1" max="500" step="1"
                          value={numInput} />
                      </div>}
                />
                <Bottombar
                    id="4"
                    icon="./assert/text icon.png" 
                    used_in="grid"
                    button_click={startGridTextScroll}
                    buttonid="startTextButton"
                    color1={color1_4}
                    color1_val={(e) => setColor1_4(e.target.value)}

                    color2={color2_4}
                    color2_val={(e) => setColor2_4(e.target.value)}

                    dropdown={<><div className="dropdown-item">
                        <input className="small-input" type="text" value={textInput} onChange={(e) => setTextInput(Number(e.target.value))} id="startTextButtontextInput"
                          placeholder="Enter text here" />
                      </div>
                      <div className="dropdown-item" data-value="3">
                        <label className="direction-select" htmlFor="direction-select">Select Direction:</label>
                        <select className="direction-select_list" id="direction-select_2" onChange={direction}>
                          <option value="horizontal">Horizontal</option>
                          <option value="vertical">Vertical</option>
                        </select>
                      </div></>}
                />
                <Bottombar
                    id="8"
                    icon="./assert/water-waves.png"
                    used_in="grid"
                    button_click={startAuroraEffect}
                    buttonid="startwaterButton"
                    color1={null}
                    color2={null}
                    dropdown={null}
                />
                <Bottombar
                    id="2"
                    icon="./assert/water.png"
                    used_in="grid"
                    button_click={startGridRainEffect}
                    buttonid="startRainButton"
                    color1={color1_2}
                    color1_val={(e) => setColor1_2(e.target.value)}

                    color2={color2_2}
                    color2_val={(e) => setColor2_2(e.target.value)}

                    dropdown={null}
                />
                <Bottombar
                    id="23"
                    icon="./assert/water.png"
                    used_in="grid"
                    button_click={startBlinkingLightsEffect}
                    buttonid="startsnowButton"
                    color1={color1_23}
                    color1_val={(e) => setColor1_23(e.target.value)}

                    color2={color2_23}
                    color2_val={(e) => setColor2_23(e.target.value)}

                    dropdown={null}
                />
                <Bottombar
                    id="3"
                    icon="./assert/stars.png"
                    button_click={startOrthogonalWavesEffect}
                    used_in="grid"
                    buttonid="startPlasmaButton"
                    color1={null}
                    color2={null}
                    dropdown={null}
                />
                <input type="file" id="imageInput2" style={{display: "none"}} ref={fileInputRef} accept="image/*" />
                <button id="add_imgButton" onClick={handleFileInputClick}
                className="btn btnm  toggleButton btnm-image-upload-grid">
                <img className="icon" src="./assert/image_upload.png" alt="" />
                <img className="btn" alt="" src="./assert/download.png" style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height:" 100%"
                        }} />
                </button>
                <Bottombar
                    id="11"
                    icon="./assert/photo-edit.png"
                    used_in="grid"
                    buttonid="startwaterButton11"
                    color1={null}
                    color2={null}
                    dropdown={<div>
                        <button id="addImageButton11" className="btn btnm  toggleButton add-image-button">Add Image</button>
                        <input type="file" id="imageInput11" accept="image/*" style={{display: "none"}} />
                        <div id="imageList11" className="image-list"></div>
                      </div>}
                />
                        <button id="startAnimationButton_full" className={`btn btnm btnm-start toggleButton ${activeTools["startAnimationButton_full"] ? "clicked" : ""}`} onClick={starrSelectedObject_full}>
                <img className="icon" src="./assert/start-button.png" alt="" />
                <img className="btn" alt="" src="./assert/download.png" style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height:" 100%"
                        }} />
                </button>
                
                <button id="stopAnimationButton_full" className={`btn btnm   btnm-stop  toggleButton ${activeTools["stopAnimationButton_full"] ? "clicked" : ""}`} onClick={stopTwoColorFadingForSelectedObject_full}>
                <img className="icon" src="./assert/stop.png" alt="" />
                <img className="btn" alt="" src="./assert/download.png" style={{
                        position: "absolute",
                        right: 0,
                        bottom: 0,
                        width: "100%",
                        height:" 100%"
                        }} />
                </button>
                </div>
                </div>
}
export default Sidebar