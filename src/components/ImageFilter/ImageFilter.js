import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce"; // Install lodash.debounce for debouncing
import AdjustBrightness from "../../classes/FreezeOption/AdjustBrightness";
import AdjustContrast from "../../classes/FreezeOption/AdjustContrast";
import AdjustSaturation from "../../classes/FreezeOption/AdjustSaturation";
import drawImage from "../../classes/ImageHandler/drawImage";
import "./ImageFilter.css";
import canvaImagedown from "../../classes/ImageHandler/canvaImagedown";
import canvaImageup from "../../classes/ImageHandler/canvaImageup";
import canvaImagemove from "../../classes/ImageHandler/canvaImagemove";
const ImageAdjusterPopup = () => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const closePopup = () => setIsPopupVisible(false);
  const closePopup_done = () => {
    const buttonIds = ["drawLine_1", "drawLine", "drawGrid","drawCurve"];
  
    // Enable all buttons
    buttonIds.forEach((id) => {
      window.toggleButtonState(id,false);
      
    });
    window.isFrozen=true;
    remove_permition();
    setIsPopupVisible(false) 
    drawImage()
  };

  // Debounced handlers for smoother input
  const handleBrightnessChange = debounce(async (value) => {
    await AdjustBrightness.brightnessInput(value);
  }, 100);

  const handleContrastChange = debounce(async (value) => {
    await AdjustContrast.contrastInput(value);
  }, 100);

  const handleSaturationChange = debounce(async (value) => {
    await AdjustSaturation.saturationInput(value);
  }, 100);
  const remove_permition =() =>{
     window.canvas.removeEventListener("mousedown", canvaImagedown);
            window.canvas.removeEventListener("mouseup", canvaImageup);
            window.canvas.removeEventListener("mousemove", canvaImagemove);
  }
  const resetAdjustments = () => {
    setBrightness(0);
    setContrast(0);
    setSaturation(0);
    AdjustBrightness.brightnessInput(0);
    AdjustContrast.contrastInput(0);
    AdjustSaturation.saturationInput(0);
  };

  useEffect(() => {
    window.openPopup = () => setIsPopupVisible(true);
  }, []);

  return (
    <div>
      {isPopupVisible && (
        <>
          <div id="overlay" className="fade-in" onClick={closePopup} />
          <div id="popup" className="popup fade-in">
            <span className="close" onClick={closePopup}>&times;</span>
            <div className="controls">
              <div className="left-side">
                <div className="flex-control">
                  <label>Brightness:</label>
                  <input
                    type="range"
                    id="brightness"
                    min="-150"
                    max="150"
                    value={brightness}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setBrightness(value);
                      handleBrightnessChange(value);
                    }}
                  />
                </div>
                <div className="flex-control">
                  <label>Contrast:</label>
                  <input
                    type="range"
                    id="contrast"
                    min="-200"
                    max="200"
                    value={contrast}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setContrast(value);
                      handleContrastChange(value);
                    }}
                  />
                </div>
                <div className="flex-control">
                  <label>Saturation:</label>
                  <input
                    type="range"
                    id="saturation"
                    min="-200"
                    max="200"
                    value={saturation}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setSaturation(value);
                      handleSaturationChange(value);
                    }}
                  />
                </div>
                <label className="present-mode">Preset Modes:
                </label>
                <div className="control-list">
                  <button className="dropdown-item2 BBtn" id="nightmode" onClick={() => {
                    window.isFrozen=true;
                    remove_permition();
                    setBrightness("-120");
                      handleBrightnessChange("-120");
                      setContrast("40");
                      handleContrastChange("40");
                    }} data-value="2">Night Mode</button>
                  <button className="dropdown-item2 BBtn" id="freeze" onClick={() => {
                    window.isFrozen=true;
                    remove_permition();

                    setBrightness("-60");
                      handleBrightnessChange("-60");
                      
                    }} data-value="2">Dusk Mode</button>
                  <button className="dropdown-item3 BBtn" id="freeze_2" onClick={() => {
                    window.isFrozen=true;
                    remove_permition();

                    setBrightness("40");
                      handleBrightnessChange("40");
                      setContrast("50");
                      handleContrastChange("50");
                    }} data-value="2">Lunar Glow</button>
                </div>
              </div>
              <div className="right-side">
                <div className="control-list1">
                  <button id="reset" onClick={resetAdjustments}>
                    Reset
                  </button>
                  <button className="doneBtn" id="doneButton_pop2" onClick={drawImage}>
                    freeze
                  </button>
                </div>
                <div className="controls" >
                  <button className="doneBtn" id="doneButton_pop2" onClick={closePopup_done}>
                    Done
                  </button></div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageAdjusterPopup;
