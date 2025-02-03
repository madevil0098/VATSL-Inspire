import React, { useRef, useEffect } from "react";
import "./Canvas.css";

const Canvas = () => {
  const canvasRef = useRef(null);
  const workArea = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    window.canvas = canvas;
    window.ctx = window.canvas.getContext("2d");
    window.workArea =canvasRef.current;
    

    
  }, []);

  return <div id="work-area" ref={workArea} className="canvas-container">
        <canvas id="canvas" ref={canvasRef} ></canvas>
        <img id="logo" src="./assert/LOGO_Rounded.png" alt="Logo" />
      </div>
};

export default Canvas;
