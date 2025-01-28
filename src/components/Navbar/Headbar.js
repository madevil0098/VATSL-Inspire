import React, { useState, useEffect } from "react";
import "./Headbar.css";

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

  // UseEffect to allow visibility control through the global `window` object
  useEffect(() => {
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

  return (
    <div className="main-container">
      <div className="main-navbar">
        <div className="flex-2">
          {renderSection("options", "options", (
            <div className="flex">
              <div id="dropdown-container" className="dropdown_container">
                <div
                  id="dropdown-toggle"
                  className="dropdown_toggle"
                  style={{
                    fontSize: "12px",
                    textAlign: "center",
                    marginRight: "20px",
                  }}
                >
                  Choose Product
                </div>
              </div>
            </div>
          ))}

          {renderSection("options1", "options1", (
            <div className="flex-1">
              <span>
                <input type="checkbox" id="checkButton" defaultChecked />
                <label>Hide Object Outline</label>
              </span>
              <span>
                <label>Current Line Color</label>
                <input type="color" id="changeColor" />
              </span>
              <span>
                <label>Node Size</label>
                <input
                  type="number"
                  id="nodeControl_size"
                  min="1"
                  max="100"
                  style={{ width: "37px" }} 
                />
              </span>
            </div>
          ))}

          {renderSection("options2", "options2", (
            <div className="flex">
              <span>
                <label style={{ display: "block" }}>Number of Nodes</label>
                <input
                  type="number"
                  id="line_nodeControl_distance"
                  min="2"
                  max="100"
                  style={{ width: "37px" }}
                />
              </span>
            </div>
          ))}

          {renderSection("options22", "options22", (
            <div className="flex">
              <span>
                <label style={{ display: "block" }}>Length of Building (In Meter)</label>
                <input type="number" id="line_nodeControl_length" min="2" style={{ width: "37px" }} />
              </span>
              <span>
                <label style={{ display: "block", whiteSpace: "nowrap" }}>Number of Lights (Per Meter)</label>
                <input type="number" id="grid_space_nodeControl2" min="10" max="30000" style={{ width: "37px" }} />
              </span>
              <span>
                <input type="checkbox" id="checkButton_line" checked={visibility.options1} // Assuming you control visibility with state
                  onChange={(e) => setVisibility(prev => ({
                    ...prev,
                    options1: e.target.checked,
                  }))}  />
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
                  max="30000"
                  style={{ width: "37px" }}
                />
              </span>
              <span>
                <label style={{ display: "inline-block" }}>Columns</label>
                <input
                  type="number"
                  id="grid_width_nodeControl"
                  min="2"
                  max="30000"
                  style={{ width: "37px" }}
                />
              </span>
            </div>
          ))}

          {renderSection("options5", "options5", (
            <div className="flex">
              <label>Alpha (Opacity)</label>
              <input
                type="range"
                id="changeAlpha"
                min="0"
                max="1"
                step="0.01"
              />
              <span id="alphaValue"></span>
              <span>
                <label style={{ display: "block" }}>Control Point</label>
                <input
                  type="number"
                  id="curve_length"
                  min="1"
                  max="300"
                  style={{ width: "37px" }}
                />
              </span>
              <span>
                <input type="checkbox" id="checkButton_curve" checked={visibility.options1} // Assuming you control visibility with state
                  onChange={(e) => setVisibility(prev => ({
                    ...prev,
                    options1: e.target.checked,
                  }))}  />
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
              }}
              id="doneButton"
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
