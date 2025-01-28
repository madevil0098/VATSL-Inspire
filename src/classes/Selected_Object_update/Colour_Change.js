import drawAllObjects from "../Selection/drawAllObjects";

export default function color_ch(e) {
    if (window.selectedObject && window.selectedObject.line) {
      window.selectedObject.line.node_colour = e.target.value;
  
      window.selectedObject.colour = e.target.value; // Update node color
      for (let j = 0; j < window.selectedObject.line.drawn_node.length; j++) {
        window.selectedObject.line.drawn_node[j].node.colour = e.target.value;
      }
      drawAllObjects(); // Redraw canvas with updated color
    } else if (window.selectedObject && window.selectedObject.grid) {
      window.selectedObject.grid.node_colour_ = e.target.value;
      window.selectedObject.colour = e.target.value; // Update grid color
      for (let j = 0; j < window.selectedObject.grid.drawn_node.length; j++) {
        window.selectedObject.grid.drawn_node[j].node.colour = e.target.value;
      }
      drawAllObjects(); // Redraw canvas with updated color
    } else if (window.selectedObject && window.selectedObject.curve) {
      window.selectedObject.curve.nose_color = e.target.value;
      drawAllObjects(); // Redraw canvas with updated color
  
    } else if (window.selectednode && window.selectednode.node) {
      window.selectednode.node.colour = e.target.value;
      drawAllObjects();
    }
  }