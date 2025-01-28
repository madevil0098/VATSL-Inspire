import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Canvas from "./components/Canvas/Canvas";
import "./App.css";
import "./setupGlobals";
function App() {
  return (
    <div id="container" className="contain" >
      <Navbar />
      <Canvas />
      
     
    </div>
  );
}

export default App;
