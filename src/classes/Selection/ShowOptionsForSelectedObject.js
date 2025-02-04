import hideOptions from "./Hide_options";
export default function showOptionsForSelectedObject(object) {
    hideOptions()
  
    if (object.line) {
      window.setSectionVisibility("options",true); // Show options panel
      window.setSectionVisibility("options1",true); // Show options panel
      object.line.transparency = 1;
  
      window.setSectionVisibility("options4",true); // Show options panel
  
      //window.setSectionVisibility("options5",true);
      window.setSectionVisibility("options2",true);
      //window.setSectionVisibility("changeColor").value = object.line.node_colour;
      //window.setSectionVisibility("line_nodeControl_distance").value = parseInt(object.line.numOfDots);
      //window.setSectionVisibility("nodeControl_size").value = parseInt(object.line.node_size);
  
    } else if (object.line_data) {
      window.setSectionVisibility("options22",true);
  
      window.setSectionVisibility("options4",true);
  
      //window.setSectionVisibility("options5",true);
    } else if (object.grid) {
      window.setSectionVisibility("options",true); // Show options panel
      window.setSectionVisibility("options1",true); // Show options panel
  
      window.setSectionVisibility("options4",true); // Show options panel
  
      window.setSectionVisibility("options3",true);
      //window.setSectionVisibility("nodeControl_size").value = parseInt(object.grid.node_size);
  
      //window.setSectionVisibility("options5",true);
  
      //window.setSectionVisibility("changeColor").value = object.grid.node_colour_;
  
      //window.setSectionVisibility("grid_length_nodeControl").value = object.grid.rows;
      //window.setSectionVisibility("grid_width_nodeControl").value = object.grid.columns;
    } else if (object.curve) {
      window.setSectionVisibility("options5",true); // Show options panel
      window.setSectionVisibility("options4",true); // Show options panel
      window.setSectionVisibility("options1",true); // Show options panel
      //window.setSectionVisibility("nodeControl_size").value = parseInt(object.curve.node_size);
      //window.setSectionVisibility("curve_length").value = parseInt(object.curve.controlPointCount);
      //window.setSectionVisibility("changeAlpha").value = parseInt(object.curve.transparency_line);
      object.curve.transparency = 1;
  
      //window.setSectionVisibility("checkButton_curve").checked = object.curve.transparency === 1;
  
  
  
    }
  }