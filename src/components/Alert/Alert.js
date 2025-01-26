import React, { useState, useEffect } from "react";
import "./CustomAlert.css"; // Optional for styling

const CustomAlert = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  useEffect(() => {
    // Assign the function to the global `window` object
    window.showCustomAlert = (message) => {
      setAlertMessage(message);
      console.log("done");
      setIsAlertVisible(true);
    };
  }, []); // Empty dependency array ensures this runs once on component mount

  // Function to close the alert
  const closeCustomAlert = () => {
    window.isFrozen=false;

    setIsAlertVisible(false);
  };

  return (
    <div>
      {/* Overlay */}
      {isAlertVisible && (
        <div id="alertOverlay" className="alert-overlay" onClick={closeCustomAlert}></div>
      )}

      {/* Custom Alert */}
      {isAlertVisible && (
        <div className="custom-alert" id="customAlert">
          <p>{alertMessage}</p>
          <button className="doneBtn" onClick={closeCustomAlert}>
            OK
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomAlert;
