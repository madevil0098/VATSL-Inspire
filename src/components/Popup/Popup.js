import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Popup.css"; // Optional for styling
import node_space_size_upd from "../../classes/Selected_Object_update/Node_Space_Size_upd";
import drawAllObjects from "../../classes/Selection/drawAllObjects";

const CustomPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const showPopup = () => setIsPopupVisible(true);
    window.showCustomPopup = showPopup;
    return () => {
      delete window.showCustomPopup; // Cleanup
    };
  }, []);

  const closeCustomPopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  // Mouse Down Handler (Start Dragging)
  const handleMouseDown = (event) => {
    if (popupRef.current) {
      offsetRef.current = {
        x: event.clientX - popupRef.current.offsetLeft,
        y: event.clientY - popupRef.current.offsetTop,
      };
      setDragging(true);
    }
  };

  // Mouse Move Handler (Dragging)
  const handleMouseMove = (event) => {
    if (dragging) {
      setPosition({
        x: event.clientX - offsetRef.current.x,
        y: event.clientY - offsetRef.current.y,
      });
    }
  };

  // Mouse Up Handler (Stop Dragging)
  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove]);

  return (
    <>
      {isPopupVisible && <div className="popup-overlay" onClick={closeCustomPopup} />}

      {isPopupVisible && (
        <div
          className="customPopup"
          ref={popupRef}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            cursor: dragging ? "grabbing" : "grab",
            position: "absolute",
          }}
          onMouseDown={handleMouseDown}
        >
          <span className="close" onClick={closeCustomPopup} aria-label="Close popup">
            &times;
          </span>

          <div id="popoption22">
            <div className="grid-control grid-measure">
              <label style={{ display: "block", width: "240px" }}>
                Length of Building (In Meter)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                style={{ width: "50px" }}
                onChange={(e) => node_space_size_upd(e, "line_nodeControl_length")}
              />
            </div>

            <div className="grid-control grid-measure">
              <label style={{ display: "inline-block", width: "240px" }}>
                Number of Lights (Per Meter)
              </label>
              <input
                type="number"
                min="1"
                max="3000"
                style={{ width: "50px" }}
                onChange={(e) => node_space_size_upd(e, "grid_space_nodeControl2")}
              />
            </div>

            <div style={{ width: "240px", paddingTop: "10px", paddingBottom: "15px" }}>
              <input
                type="checkbox"
                defaultChecked
                onChange={(e) => {
                  window.selectedObject.line_data.transparency = e.target.checked ? 1 : 0;
                  drawAllObjects();
                }}
              />
              <label>Hide Distance Line</label>
            </div>
          </div>

          <div className="controls">
            <button className="doneBtn" onClick={closeCustomPopup}>
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomPopup;
