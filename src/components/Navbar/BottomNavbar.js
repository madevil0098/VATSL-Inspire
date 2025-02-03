import React, { useState } from "react";
import "./BottomNavbar.css";

const Dropdown = ({ id, icon, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => setIsExpanded(!isExpanded);

  return (
    <div className={`dropdown grid line curve`} id={`dropdown${id}`}>
      <div className="dropdown-toggle" onClick={toggleDropdown} aria-expanded={isExpanded}>
        <button className={`btn btnm toggleButton`} id={`Animation${id}`}>
          <img className="icon" src={icon} alt={`Dropdown ${id}`} />
          <img
            className="btn"
            src="./assert/download.png"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
            alt=""
          />
        </button>
      </div>
      {isExpanded && <div className="dropdown-menu">{children}</div>}
    </div>
  );
};

const BottomNavbar = () => {
  return (
    <div className="bottom-navbar">
      <h1 style={{ alignSelf: "flex-end" }}>Effects</h1>
      <div className="bottom-nav" id="tools">
        {/* Example Dropdown 1 */}
        <Dropdown id={0} icon="./assert/fade.png">
          <div className="dropdown-item" data-value="1">
            <label htmlFor="color1">Select Color 1:</label>
            <input className="input-color" type="color" id="startAnimationcolor0" defaultValue="#7BEAC9" />
          </div>
          <div className="dropdown-item" data-value="2">
            <label htmlFor="color2">Select Color 2:</label>
            <input className="input-color" type="color" id="startAnimationcolor0" defaultValue="#EEFFBE" />
          </div>
          <div className="dropdown-item" data-value="3">
            <label htmlFor="direction-select">Select Direction:</label>
            <select className="direction-select_list" id="direction-select0">
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="top-left">Top-Left</option>
              <option value="bottom-right">Bottom-Right</option>
              <option value="top-right">Top-Right</option>
              <option value="bottom-left">Bottom-Left</option>
            </select>
          </div>
          <div className="dropdown-item">
            <label htmlFor="speedInput">Animation Speed:</label>
            <input
              type="range"
              id="speedInput0"
              className="speed-select_list small-input"
              min="0.1"
              max="4.9"
              step="0.1"
              defaultValue="1"
            />
          </div>
          <div className="dropdown-item" data-value="4">
            <button className="start-button" id="startAnimationButton0">
              Start
            </button>
            <button className="stop-button" id="stopAnimationButton1" style={{ left: "8px" }}>
              Stop
            </button>
          </div>
        </Dropdown>

        {/* Additional Dropdowns */}
        <Dropdown id={1} icon="./assert/rainbow.png">
          <div className="dropdown-item">
            <label htmlFor="speedInput">Animation Speed:</label>
            <input
              type="range"
              id="speedInput7"
              className="speed-select_list small-input"
              min="0.1"
              max="4.9"
              step="0.1"
              defaultValue="1"
            />
          </div>
          <div className="dropdown-item">
            <input
              className="small-input"
              type="number"
              id="nodeCountInput"
              placeholder="Rainbow Length"
            />
          </div>
          <div className="dropdown-item">
            <input
              className="small-input"
              type="number"
              id="rainbowBandsInput"
              placeholder="Color Combination Length"
            />
          </div>
          <div className="dropdown-item" data-value="3">
            <button className="start-button" id="startRainbow">
              Start
            </button>
            <button className="stop-button" id="stopAnimationButton8" style={{ left: "8px" }}>
              Stop
            </button>
          </div>
        </Dropdown>

        {/* Add more Dropdown components as needed */}
      </div>
    </div>
  );
};

export default BottomNavbar;
