import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Popup.css";
import node_space_size_upd from "../../classes/Selected_Object_update/Node_Space_Size_upd";
import drawAllObjects from "../../classes/Selection/drawAllObjects";
const CustomPopup = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const popupRef = useRef(null);

  useEffect(() => {
    window.showCustomPopup = () => setIsPopupVisible(true);
    return () => delete window.showCustomPopup;
  }, []);

  const closeCustomPopup = useCallback(() => {
    setIsPopupVisible(false);
  }, []);

  const handleMouseDown = (event) => {
    if (!popupRef.current) return;
    setDragging(true);
    setStartX(event.clientX - popupRef.current.offsetLeft);
    setStartY(event.clientY - popupRef.current.offsetTop);
    popupRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (event) => {
    if (!dragging || !popupRef.current) return;
    popupRef.current.style.left = `${event.clientX - startX}px`;
    popupRef.current.style.top = `${event.clientY - startY}px`;
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (popupRef.current) popupRef.current.style.cursor = "grab";
  };

  const disablePopupDrag = () => setDragging(false);

  // Attach and remove event listeners based on popup visibility
  useEffect(() => {
    if (isPopupVisible) {
      document.addEventListener("mousedown", handleMouseDown);

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.addEventListener("mousedown", handleMouseDown);
      
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.addEventListener("mousedown", handleMouseDown);

      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPopupVisible, dragging, startX, startY]);

  return (
    <>
      {isPopupVisible && <div className="popup-overlay" onClick={closeCustomPopup} />}

      {isPopupVisible && (
        <div
          className="customPopup"
          ref={popupRef}
          onMouseDown={handleMouseDown}
          style={{ position: "absolute", cursor: "grab" }}
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
                style={{ width: "50px",marginRight:"20px" }}
                onChange={(e) => node_space_size_upd(e, "line_nodeControl_length")}
                onMouseDown={disablePopupDrag}
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
                onMouseDown={disablePopupDrag}
              />
            </div>

            <div /* style={{ width: "240px", paddingTop: "10px", paddingBottom: "15px" }} */>
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
