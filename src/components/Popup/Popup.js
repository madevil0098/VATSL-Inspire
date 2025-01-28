import React, { useState, useEffect } from "react";
import "./Popup.css"; // Optional for styling
import node_space_size_upd from "../../classes/Selected_Object_update/Node_Space_Size_upd";
import drawAllObjects from "../../classes/Selection/drawAllObjects";

const CustomPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    // Assign the function to the global `window` object
    window.showCustomPopup = () => {
      setIsPopupVisible(true);
    };
  }, []);

  // Function to close the popup
  const closeCustomPopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div>
      {/* Overlay */}
      {isPopupVisible && (
        <div
          id="PopupOverlay"
          className="popup-overlay"
          onClick={closeCustomPopup}
        ></div>
      )}

      {/* Custom Popup */}
      {isPopupVisible && (
        <div className="customPopup" id="customPopup">
          <span
            className="close"
            id="closePopup1"
            onClick={closeCustomPopup}
            aria-label="Close popup"
          >
            &times;
          </span>

          <div id="popoption22">
            <div className="grid-control grid-measure">
              <label style={{ display: "block", width: "240px" }}>
                Length of Building (In Meter)
              </label>
              <input
                type="number"
                id="line_nodeControl_length_pop"
                min="1"
                max="100"
                style={{ width: "37px" }}
                onChange={(e) => {
                  node_space_size_upd(e, "line_nodeControl_length")
                
                }}
              />
            </div>
            <div className="grid-control grid-measure">
              <label style={{ display: "inline-block", width: "240px" }}>
                Number of Lights (Per Meter)
              </label>
              <input
                type="number"
                id="grid_space_nodeControl2_pop"
                min="1"
                max="3000"
                style={{ width: "37px" }}
                onChange={(e) => {
                  node_space_size_upd(e, "grid_space_nodeControl2")
                
                }}
              />
            </div>
            <span
              style={{
                display: "inline-block",
                width: "240px",
                paddingTop: "10px",
                paddingBottom: "15px",
              }}
            >
              <input type="checkbox" id="checkButton_line_pop" defaultChecked 
              onChange={(e) => {
                                const value = e.target.checked ? 1 : 0; // Assign 1 if checked, 0 otherwise
                                window.selectedObject.line_data.transparency = value;
                                drawAllObjects();
                              }}/>
              <label>Hide Distance Line</label>
            </span>
          </div>

          <div className="controls">
            <button className="doneBtn" id="doneButton_pop" onClick={closeCustomPopup}>
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPopup;
