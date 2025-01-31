import Update_SelectionCursor from "../Selection_movement/Select_Object_Cursor";
import Selection_MouseDown from "../Selection_movement/Select_Object_Start";
import Selection_Stop from "../Selection_movement/Select_Object_Stop";
import Update_selected_Object from "../Selection_movement/Select_Object_Update";
import getMousePos from "../Start_Drawing/Mouse_position";
import handleNodeSelection from "./HandleNodeSelection";
import handleObjectSelection from "./handleObjectSelection";

export default function Select_Object(){
    if (window.canvas) {
          window.canvas.addEventListener("mousedown", (e) => {
            const pos = getMousePos(window.canvas, e);
            
            if (window.selectionMode) {
              handleObjectSelection(pos); // Handle object selection
            }
        
            if (window.selectednodeMode) {
              handleNodeSelection(pos); // Handle node selection
            }
          }
          
        );
        window.canvas.addEventListener("mousedown", Selection_MouseDown);
        window.canvas.addEventListener("mousemove", Update_SelectionCursor);
        window.canvas.addEventListener("mousemove", Update_selected_Object);
        window.canvas.addEventListener("mouseup", Selection_Stop);
      
        }
}