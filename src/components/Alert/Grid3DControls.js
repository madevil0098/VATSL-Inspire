import React, { useState, useEffect,useRef } from "react";
import drawImage from "../../classes/ImageHandler/drawImage";
import { RefreshCcw } from "lucide-react";

const Grid3DControls = () => {
  const [rotationX, setRotationX] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [dragging, setDragging] = useState(false);
  const [sliderActive, setSliderActive] = useState(false); // Prevents dragging when true
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const popupRef = useRef(null);
  useEffect(() => {
    if (window.selectedObject?.grid) {
      window.selectedObject.grid.setRotation(rotationX, rotationY, rotationZ);
      drawImage()
    }
  }, [rotationX, rotationY, rotationZ]);
  const resetAdjustments=()=>{
    setRotationX(0);
    setRotationY(0);
    setRotationZ(0);
  }
  useEffect(() => {
    window.toggleGridPopup = (visible) => setIsVisible(visible);
  }, []);
const handleMouseDown = (event) => {
    console.log(sliderActive)
    if (!popupRef.current || sliderActive) return; // Prevent dragging if a slider is active
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
    setSliderActive(false); // Allow dragging again after slider interaction
    if (popupRef.current) popupRef.current.style.cursor = "grab";
  };

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, dragging]);

  return (
    <div>
      {isVisible && (
        <div className="alert-overlay" onClick={() => setIsVisible(false)}></div>
      )}
      {isVisible && (
        <div className="custom-alert" ref={popupRef}
        onMouseDown={handleMouseDown}
        style={{ position: "absolute", cursor: "grab" }}>
          <p>Adjust Grid Rotation</p>
          <div className="controls-grid">
          <button
                    className="reset"
                    onClick={()=>{
                    window.isFrozen=false;
                    resetAdjustments();
                    }}>
                    <RefreshCcw size={18} />
                  </button>
            {["X", "Y", "Z"].map((axis) => (
              <div key={axis}>
                <label>Rotate {axis}:</label>
                <input
                  type="range"
                  min="-180"
                  max="180"
                  onMouseEnter={() => setSliderActive(true)} // Disable dragging
                    onMouseLeave={() => setSliderActive(false)} // Re-enable dragging
                    onMouseDownCapture={() => setSliderActive(true)}
                    onMouseUpCapture={() => setSliderActive(false)}
                  value={axis === "X" ? rotationX : axis === "Y" ? rotationY : rotationZ}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (axis === "X") setRotationX(value);
                    if (axis === "Y") setRotationY(value);
                    if (axis === "Z") setRotationZ(value);
                  }}
                />
              </div>
            ))}
          </div>
          <button className="close-btn" onClick={() => setIsVisible(false)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Grid3DControls;
