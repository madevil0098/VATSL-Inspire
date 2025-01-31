import drawAllObjects from "./drawAllObjects";
import hideOptions from "./Hide_options";
import isMouseNearObject from "./IsMouseNearObject";
import showOptionsForSelectedObject from "./ShowOptionsForSelectedObject";
export default function handleObjectSelection(pos) {
    drawAllObjects(); // Redraw everything
    //selectedObject=null;
    let selectedIndex = -1;
    // Loop through drawn items to find a selectable object
    for (let i = 0; i < window.drawn_item.length; i++) {
      if (isMouseNearObject(pos.x, pos.y, window.drawn_item[i])) {
        window.selectedObject = window.drawn_item[i];
        selectedIndex = i;
  
        window.dragOffset = {
          x: pos.x,
          y: pos.y
        }; // Store the initial mouse position
        break;
      }
    }
  
    if (window.selectedObject) {
      // Move the selected object to the front of the array
      if (selectedIndex > -1) {
        window.drawn_item.splice(selectedIndex, 1); // Remove it from its current position
        window.drawn_item.unshift(window.selectedObject); // Add it to the front
      }
  
      showOptionsForSelectedObject(window.selectedObject);
      drawAllObjects(); // Redraw with updated order
    } else {
      hideOptions();
    }
  }