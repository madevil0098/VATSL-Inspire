import drawAllObjects from "./drawAllObjects";
import hideOptions from "./Hide_options";
import selectNodeFromObject from "./SelectNodeFromObject";
export default function handleNodeSelection(pos) {
    window.selectednode = null; // Reset node selection
    drawAllObjects(); // Redraw canvas
  
    // Loop through all drawn items and find nodes to select
    for (let i = 0; i < window.drawn_item.length; i++) {
      if (window.drawn_item[i].line) {
        selectNodeFromObject(window.drawn_item[i].line, pos);
      } else if (window.drawn_item[i].grid) {
        selectNodeFromObject(window.drawn_item[i].grid, pos);
      }
  
      if (window.selectednode) break; // Stop if a node is selected
    }
  
    if (window.selectednode) {
      window.setSectionVisibility("options1",true); // Show options panel
      window.setSectionVisibility("options",true);
      window.setSectionVisibility("options4",true);
    } else {
      hideOptions();
    }
  }