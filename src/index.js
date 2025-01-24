import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client"
import App from "./App";
import "./index.css";


const root = ReactDOM.createRoot(document.body); // Create root directly on the body
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
