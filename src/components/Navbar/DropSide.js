import { useState, useEffect, useRef } from "react";
import speedupd from "../../classes/AnimationControl/speedupd";
import stopTwoColorFadingForSelectedObject from "../../classes/AnimationControl/StopTwoColorFadingForSelectedObject";

const Bottombar = ({ id, icon, used_in,button_click, buttonid, color1,color1_val, color2,color2_val, dropdown }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!window.selectedObject) {
      return;
    }

    if (used_in.includes(window.selectedObject.type)) {
      setIsOpen((prev) => !prev);
    } else {
    }
  };

  return (
    <div ref={dropdownRef} className={`dropdown ${used_in}`} id={`dropdown-${id}`}>
      <div
        className={`dropdown-toggle ${isOpen ? "clicked" : ""}`}
        id={`toggle-${id}`}
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        <button className="btn btnm toggleButton btnm-fade">
          <img className="icon" src={icon} alt="" />
          <img
            className="btn"
            alt=""
            src="./assert/download.png"
            style={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
          />
        </button>
      </div>

      <div className={`dropdown-menu ${isOpen ? "show" : ""}`}>
        {color1 && (
          <div className="dropdown-item">
            <label className="color" htmlFor={`color1_${id}`}>
              Select Color 1:
            </label>
            <input className="input-color" type="color" id={`startAnimationcolor1_${id}`}  onChange={(e)=>{color1_val(e);}} value={color1} />
          </div>
        )}
        {color2 && (
          <div className="dropdown-item">
            <label className="color" htmlFor={`color2_${id}`}>
              Select Color 2:
            </label>
            <input className="input-color" type="color" id={`startAnimationcolor2_${id}`} value={color2} onChange={color2_val}/>
          </div>
        )}
        {dropdown && dropdown}

        <div className="dropdown-item">
          <label className="Animation-font" htmlFor={`speedInput${id}`}>
            Animation Speed
          </label>
          <input
            type="range"
            id={`speedInput${id}`}
            className="speed-select_list small-input"
            min="0.1"
            max="4.5"
            step="0.1"
            defaultValue="1"
            onChange={speedupd}
            style={{
              position: "sticky",
              top: "100%",
              bottom: "-100%",
            }}
          />
        </div>

        <div className="dropdown-item">
          <button className="start-button" id={buttonid} onClick={()=>{console.log("Start button clicked!");button_click(window.selectedObject)}}>
            Start
          </button>
          <button id={`stopAnimationButton${id}`} className="stop-button" onClick={() =>{stopTwoColorFadingForSelectedObject()}} style={{ left: "8px" }}>
            Stop
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bottombar;
