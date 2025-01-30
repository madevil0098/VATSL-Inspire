import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Canvas from "./components/Canvas/Canvas";
import "./App.css";
import "./setupGlobals";
import Sidebar from "./components/Navbar/Sidebar";
function App() {
  return (
    <div id="container" className="contain" >
      <Navbar />
      <Canvas />
      <Sidebar />
      
    </div>
  );
}

export default App;
