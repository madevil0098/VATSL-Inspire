import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import App from "./App";
import "./index.css";
import CustomAlert from "./components/Alert/Alert";
import ImageAdjusterPopup from "./components/ImageFilter/ImageFilter";
import CustomPopup from "./components/Popup/Popup";
import Headbar from "./components/Navbar/Headbar";

const root = ReactDOM.createRoot(document.body); // Create root directly on the body
root.render(
  <React.StrictMode>
    <CustomAlert />
    <CustomPopup />
    <Headbar/>
    <ImageAdjusterPopup />
    <App />
  </React.StrictMode>
);
