import drawAllObjects from "../Selection/drawAllObjects";
export default function node_space_size_upd(e, type_for) {
    if (window.selectedObject && window.selectedObject.line && type_for === "line_nodeControl_distance") {
      const numOfDots = parseInt(e.target.value);
      window.selectedObject.numOfDots = numOfDots; // Update the spacing (affects number of nodes)
      window.selectedObject.line.numOfDots = numOfDots; // Update the spacing (affects number of nodes)
  
      drawAllObjects(); // Redraw with updated spacing
      
  
    } else if (window.selectedObject && window.selectedObject.line_data && type_for === "line_nodeControl_length") {
      const numOfDots = e.target.value;
      window.selectedObject.line_data.calculateRatio(numOfDots * 100); // Update the spacing (affects number of nodes)
      window.drawn_item.forEach((item) => {
        if (item.grid) {
          item.grid.updateRow_col(window.ctx);
        } else if (item.line) {
  
          item.line.updateRow_col(window.ctx);
        }
      });
      drawAllObjects(); // Redraw with updated spacing
    } else if (window.selectedObject && window.selectedObject.grid && type_for === "grid_length_nodeControl") {
      const numOfDots = parseInt(e.target.value);
      window.selectedObject.grid.rows = numOfDots; // Update the grid rows
      drawAllObjects(); // Redraw with updated grid
    } else if (window.selectedObject && window.selectedObject.grid && type_for === "grid_width_nodeControl") {
      const numOfDots = parseInt(e.target.value);
      window.selectedObject.grid.columns = numOfDots; // Update the grid columns
      drawAllObjects(); // Redraw with updated grid
    } else if (window.selectedObject && window.selectedObject.line_data && type_for === "grid_space_nodeControl2") {
      window.node_distance = parseInt(100 / e.target.value);
      window.drawn_item.forEach((item) => {
        if (item.grid) {
          item.grid.cellSize = window.node_distance
          item.grid.updateRow_col(window.ctx);
        } else if (item.line) {
          item.line.spacing = window.node_distance
          item.line.updateRow_col(window.ctx);
        }
      }); // Update the grid columns
      drawAllObjects(); // Redraw with updated grid
    }
  
  }