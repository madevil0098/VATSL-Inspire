import isMouseNearObject from "./IsMouseNearObject";
export default function selectNodeFromObject(object, pos) {
    for (let j = 0; j < object.drawn_node.length; j++) {
      if (isMouseNearObject(pos.x, pos.y, object.drawn_node[j])) {
        window.selectednode = object.drawn_node[j]; // Select the node
        break;
      }
    }
  }