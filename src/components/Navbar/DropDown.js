import React, { useState, useEffect } from "react";

// Dynamically import all images from the assets folder
const importAll = (r) => r.keys().map((key) => ({
  filename: key.replace("./", ""),
  fullPath: r(key),
}));

const Dropdown = () => {
  const [files, setFiles] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const fetchedFiles = importAll(require.context("/assets", false, /\.(png|jpe?g|gif)$/));
    setFiles(fetchedFiles);
  }, []);

  return (
    <div className="dropdown-container">
      
      {isDropdownVisible && (
        <div className="dropdown">
          {files.map((file) => (
            <div key={file.fullPath} className="dropdown-item">
              <img
                src={file.fullPath}
                alt={file.filename}
                className="icon"
              />
              <span>{file.filename.replace(/\.[^/.]+$/, "")}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
