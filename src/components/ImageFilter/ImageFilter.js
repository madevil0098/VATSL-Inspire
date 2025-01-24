import React, { useState, useEffect } from "react";
import debounce from "lodash.debounce"; // Install lodash.debounce for debouncing
import applyAdjustments from "../../classes/FreezeOption/Filters";
import AdjustBrightness from "../../classes/FreezeOption/AdjustBrightness";
import AdjustContrast from "../../classes/FreezeOption/AdjustContrast";
import AdjustSaturation from "../../classes/FreezeOption/AdjustSaturation";
import "./Popup.css";

const ImageAdjusterPopup = () => {
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [saturation, setSaturation] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const closePopup = () => setIsPopupVisible(false);

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
              </div>
              <div className="right-side">
                <div className="control-list1">
                  <button id="reset" onClick={resetAdjustments}>
                    Reset
                  </button>
                  <button className="doneBtn" id="doneButton_pop2" onClick={applyAdjustments}>
                    Apply Adjustments
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
