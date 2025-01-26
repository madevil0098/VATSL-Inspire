import startDraw from "./Start_Element";
import continueDraw from "./Continue_Element";
import endDraw from "./End_Element";

export default function clearEventListeners() {
    window.canvas.removeEventListener("mousedown", startDraw);
    window.canvas.removeEventListener("mousemove", continueDraw);
    window.canvas.removeEventListener("mouseup", endDraw);
    //canvas.removeEventListener("click", handleMultiPointLine);
  
  }