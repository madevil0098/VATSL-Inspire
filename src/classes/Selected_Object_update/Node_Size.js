import drawAllObjects from "../Selection/drawAllObjects";


export default function node_size(e) {
    if (window.selectedObject && window.selectedObject.line) {
      window.selectedObject.line.node_size = e.target.value;
  
      window.selectedObject.lineWidth = e.target.value; // Update node color
      for (let j = 0; j < window.selectedObject.line.drawn_node.length; j++) {
        window.selectedObject.line.drawn_node[j].node.size = e.target.value;
      }
      drawAllObjects(); // Redraw canvas with updated color
    } else if (window.selectedObject && window.selectedObject.grid) {
      window.selectedObject.grid.node_size = e.target.value;
      window.selectedObject.node_size = e.target.value; // Update grid color
      for (let j = 0; j < window.selectedObject.grid.drawn_node.length; j++) {
        window.selectedObject.grid.drawn_node[j].node.size = e.target.value;
      }
      drawAllObjects(); // Redraw canvas with updated color
    } else if (window.selectednode && window.selectednode.node) {
      window.selectednode.node.size = e.target.value;
      drawAllObjects();
    } else if (window.selectedObject && window.selectedObject.curve) {
      const numOfDots = parseInt(e.target.value);
      window.selectedObject.curve.node_size = Math.max(3, numOfDots); // Update the grid rows
      window.selectedObject.curve.updateRow_col();
      drawAllObjects();
    }
  }