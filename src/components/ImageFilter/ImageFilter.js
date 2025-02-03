import React, { useState, useEffect, useRef, useCallback } from "react";
import debounce from "lodash.debounce";

import drawImage from "../../classes/ImageHandler/drawImage";
import "./ImageFilter.css";
import canvaImagedown from "../../classes/ImageHandler/canvaImagedown";
import canvaImageup from "../../classes/ImageHandler/canvaImageup";
import canvaImagemove from "../../classes/ImageHandler/canvaImagemove";
import brightnessInput from "../../classes/FreezeOption/AdjustBrightness";
import contrastInput from "../../classes/FreezeOption/AdjustContrast";
import saturationInput from "../../classes/FreezeOption/AdjustSaturation";
import { RefreshCcw } from "lucide-react";
const ImageAdjusterPopup = () => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [sliderActive, setSliderActive] = useState(false); // Prevents dragging when true
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const popupRef = useRef(null);

  useEffect(() => {
    window.openPopup = () => {setIsPopupVisible(true);
      window.activateTool("Freeze")
    };
    return () => delete window.openPopup;
  }, []);

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    window.deactivateTool("Freeze")

  }, []);

  const closePopupDone = useCallback(() => {
    const buttonIds = ["drawLine_1", "drawLine", "drawGrid", "drawCurve"];
    buttonIds.forEach((id) => window.toggleButtonState(id, false));
    window.deactivateTool("Freeze")
    window.isFrozen = true;
    removePermission();
    setIsPopupVisible(false);
    drawImage();
  }, []);

  const handleBrightnessChange = debounce((value) => brightnessInput(value), 20);
  const handleContrastChange = debounce((value) => contrastInput(value), 20);
  const handleSaturationChange = debounce((value) => saturationInput(value), 20);
  const removePermission = () => {
    window.canvas.removeEventListener("mousedown", canvaImagedown);
    window.canvas.removeEventListener("mouseup", canvaImageup);
    window.canvas.removeEventListener("mousemove", canvaImagemove);
  };
  const AddPermission = () => {
    window.canvas.addEventListener("mousedown", canvaImagedown);
    window.canvas.addEventListener("mouseup", canvaImageup);
    window.canvas.addEventListener("mousemove", canvaImagemove);
  };

  const resetAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    window.brightness=0;
window.contrast=0;
window.saturation=0;
window.Hue=0;
    drawImage()
  };

  // Handle popup dragging
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
    if (isPopupVisible) {
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
  }, [isPopupVisible, dragging]);

  return (
    <div>
      {isPopupVisible && (
        <>
          <div id="overlay" className="fade-in" onClick={closePopup} />
          <div
            id="popup"
            className="popup fade-in"
            ref={popupRef}
            onMouseDown={handleMouseDown}
            style={{ position: "absolute", cursor: "grab" }}
          >
            
            <span className="close" onClick={closePopup}>&times;</span>

            <div className="controls">
              <div className="left-side">
                <div className="flex-control">
                  <label>Brightness:</label>
                  <input
                    type="range"
                    id="brightness"
                    min="-100"
                    max="100"
                    value={brightness}
                    onMouseEnter={() => setSliderActive(true)} // Disable dragging
                    onMouseLeave={() => setSliderActive(false)} // Re-enable dragging
                    onMouseDownCapture={() => setSliderActive(true)}
                    onMouseUpCapture={() => setSliderActive(false)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setBrightness(value);
                      handleBrightnessChange(value);
                    }}
                  />
                  <input className="three-digit-input"  type="numeical" value={brightness} onChange={(e) => {
                      const value = Number(e.target.value);
                      setBrightness(value);
                      handleBrightnessChange(value);
                    }}/>
                </div>

                <div className="flex-control">
                  <label>Contrast:</label>
                  <input
                    type="range"
                    id="contrast"
                    min="-150"
                    max="150"
                    value={contrast}
                    onMouseEnter={() => setSliderActive(true)} // Disable dragging
                    onMouseLeave={() => setSliderActive(false)} // Re-enable dragging
                    onMouseDownCapture={() => setSliderActive(true)}
                    onMouseUpCapture={() => setSliderActive(false)}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setContrast(value);
                      handleContrastChange(value);
                    }}
                  />
                  <input className="three-digit-input"  type="numeical" value={contrast} onChange={(e) => {
                      const value = Number(e.target.value);
                      setContrast(value);
                      handleContrastChange(value);
                    }}/>
                </div>

                <div className="flex-control">
                  <label>Saturation:</label>
                  <input
                    type="range"
                    id="saturation"
                    min="-150"
                    max="150"
                    value={saturation}
                    onMouseEnter={() => setSliderActive(true)} // Disable dragging
                    onMouseLeave={() => setSliderActive(false)} // Re-enable dragging
                    onMouseDownCapture={() => setSliderActive(true)}
                    onMouseUpCapture={() => setSliderActive(false)}
                    
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSaturation(value);
                      handleSaturationChange(value);
                    }}
                  />
                  <input className="three-digit-input"  type="numeical" value={saturation} onChange={(e) => {
                      const value = Number(e.target.value);
                      setSaturation(value);
                      handleSaturationChange(value);
                    }}/>
                </div>
            
                <label className="present-mode">Preset Modes:
                </label>
                <div className="control-list">
                  <button className="dropdown-item2 BBtn" id="nightmode" onClick={() => {
                    window.isFrozen=true;
                    resetAdjustments()

                    removePermission();
                    setBrightness("-60");
                      handleBrightnessChange("-60");
                      setContrast("40");
                      handleContrastChange("40");
                    }} data-value="2">Night Mode</button>
                  <button className="dropdown-item2 BBtn" id="freeze" onClick={() => {
                    window.isFrozen=true;
                    resetAdjustments()

                    removePermission();

                    setBrightness("-30");
                      handleBrightnessChange("-30");
                      
                    }} data-value="2">Dusk Mode</button>
                  <button className="dropdown-item3 BBtn" id="freeze_2" onClick={() => {
                    window.isFrozen=true;
                    resetAdjustments()

                    removePermission();

                    setBrightness("40");
                      handleBrightnessChange("40");
                      setContrast("50");
                      handleContrastChange("50");
                    }} data-value="2">Lunar Glow</button>
                </div>
              </div>

              <div className="right-side">
                <div className="control-list1">
                <button
                    className="reset"
                    onClick={()=>{
                    window.isFrozen=false;
                    resetAdjustments();
                      AddPermission();
                    }}>
                    <RefreshCcw size={18} />
                  </button>
                  
                </div>
                <div className="controls">
                  <button className="doneBtn" onClick={closePopupDone}>
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageAdjusterPopup;
