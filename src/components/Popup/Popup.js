import React, { useState, useEffect } from "react";
import "./Popup.css"; // Optional for styling

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
              <input type="checkbox" id="checkButton_line_pop" defaultChecked />
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
