import React, { useState, useEffect } from "react";
import drawAllObjects from "../../classes/Selection/drawAllObjects";
import handleObjectSelection from "../../classes/Selection/handleObjectSelection";
import handleNodeSelection from "../../classes/Selection/HandleNodeSelection";

// Dynamically import all images from the assets folder


const Dropdown = () => {
  const [files, setFiles] = useState([]);
  // eslint-disable-next-line no-unused-vars

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    if (!window.selectedObject) {
      return;
    }

   
    setDropdownVisible((prev) => !prev);
   
  };
  const handleItemClick = (clickedItem) => {
    const selectedValue = clickedItem.fullPath; // Get the filename

    if (window.selectedObject) {
      if (window.selectedObject.line) {
        console.log(window.selectedObject.line.img_dat)

        window.selectedObject.line.img_dat = selectedValue;
        for (let j = 0; j < window.selectedObject.line.drawn_node.length; j++) {
          window.selectedObject.line.drawn_node[j].node.img_dat = selectedValue;
        }
        console.log(window.selectedObject.line.img_dat)
        drawAllObjects();
        setTimeout(() => {
          handleObjectSelection(window.selectedObject.start);
        }, 100);
      } else if (window.selectedObject.grid) {
        window.selectedObject.grid.img_dat = selectedValue;

        for (let j = 0; j < window.selectedObject.grid.drawn_node.length; j++) {
          window.selectedObject.grid.drawn_node[j].node.img_dat = selectedValue;
        }
        drawAllObjects();
        setTimeout(() => {
          handleObjectSelection({
            x: window.selectedObject.start,
            y: window.selectedObject.end,
          });
        }, 100);
      }
    } else if (window.selectednode && window.selectednode.node) {
      window.selectednode.node.img_dat = selectedValue;
      drawAllObjects();
      setTimeout(() => {
        handleNodeSelection(window.selectednode.node);
      }, 100);
    }

    // Hide the dropdown after selection
    setTimeout(() => {
      setDropdownVisible(false);
    }, 100);
  };
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const fetchedFiles = await window.electronAPI.getFiles();
        setFiles(fetchedFiles.map((file) => ({
          filename: file.filename,
          fullPath: file.fullPath,
        })));
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
  
    fetchFiles();
  }, []);
  useEffect(() => {
    console.log("Updated files:", files);
  }, [files]);
  
  return (<><div
                      id="dropdow5n-toggle"
                      className={`dropdow5n-toggle ${isDropdownVisible ? "clicked" : ""}`}
                      style={{
                        fontSize: "12px",
                        textAlign: "center",
                        marginRight: "20px",
                      }}
                      onClick={toggleDropdown}
                    >

                      Choose Product
                    </div>
    <div className="dropdown-container">
      
      {isDropdownVisible && (
        <div className={`dropdow5n `}>
          {files.map((file) => (
            <div key={file.fullPath} className="dropdown-item_v"
            onClick={() => handleItemClick(file)}>
              <img
                src={file.fullPath}
                alt={file.filename}
                className="icon_"
                
              />
              <span>{file.filename.replace(/\.[^/.]+$/, "")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </>);
};

export default Dropdown;
