import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default async function importAndResizeImage(objects_, imageSource = "https://bcassetcdn.com/public/blog/wp-content/uploads/2021/11/06185453/Apple-1.png") {
  if (!objects_) return;

    let image = new Image();
    image.crossOrigin = "anonymous";
    // Determine if the source is a URL or a local file
    if (typeof imageSource === "string") {
      // Load from URL
      image.src = imageSource;
      image.onload = () => {
        importAndResize();
      };
      image.onerror = () => {
        console.error("Failed to load image from URL.");
      };
    } else if (imageSource instanceof File) {
      // Load from local file
      //console.log("Local image detected!");
  
      const reader = new FileReader();
      reader.onload = function (e) {
        image.src = e.target.result; // Set the data URL as the image source
        image.onload = () => {
          //console.log("Local image successfully loaded and ready for transformation!");
          importAndResize();
        };
        image.onerror = () => {
          console.error("Failed to load local image.");
        };
      };
      reader.onerror = () => {
        console.error("Failed to read the local file.");
      };
      reader.readAsDataURL(imageSource);
    } else {
      throw new Error("Invalid image source: must be a URL or File object.");
    }
  
  
    // Wait for the image to load
    async function importAndResize() {
  
      // Get grid dimensions
      const {
        rows,
        columns
      } = objects_.grid;
  
      let resizedImageData;
  
      // Use canvas only if resizing is necessary
      if (image.width !== columns || image.height !== rows) {
        const tempCanvas = document.createElement("canvas");
        const context = tempCanvas.getContext("2d");
  
        // Rescale the image first
        tempCanvas.width = columns; // Set canvas width to match grid columns
        tempCanvas.height = rows; // Set canvas height to match grid rows
  
        // Scale the image to fit the grid
        const widthRatio = columns / image.width;
        const heightRatio = rows / image.height;
        const scaleFactor = Math.min(widthRatio, heightRatio, 1);
  
        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;
  
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          (columns - scaledWidth) / 2,
          (rows - scaledHeight) / 2,
          scaledWidth,
          scaledHeight
        );
  
        // Save the scaled result before further transformations
        const scaledCanvas = document.createElement("canvas");
        scaledCanvas.width = columns;
        scaledCanvas.height = rows;
        const scaledContext = scaledCanvas.getContext("2d");
        scaledContext.drawImage(tempCanvas, 0, 0);
  
        // Apply rotation and mirroring on the scaled image
        context.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear the temporary canvas
        context.translate(tempCanvas.width / 2, tempCanvas.height / 2); // Move origin to the center
        context.rotate((-90 * Math.PI) / 180); // Rotate by -90 degrees
        context.scale(-1, 1); // Apply horizontal flip (mirror)
        context.drawImage(scaledCanvas, -tempCanvas.width / 2, -tempCanvas.height / 2);
  
        // Get the transformed image data
        resizedImageData = context.getImageData(0, 0, columns, rows).data;
        //console.log("Local image transformed and grid updated!",objects_.grid.drawn_node);
  
  
  
      } else {
        const tempCanvas = document.createElement("canvas");
        window.naturalCanvas.width = image.width;
        window.naturalCanvas.height = image.height;
        const context = window.naturalCanvas.getContext("2d");
        const widthRatio = columns / image.width;
        const heightRatio = rows / image.height;
        const scaleFactor = Math.min(widthRatio, heightRatio, 1);
  
        const scaledWidth = image.width * scaleFactor;
        const scaledHeight = image.height * scaleFactor;
  
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          (columns - scaledWidth) / 2,
          (rows - scaledHeight) / 2,
          scaledWidth,
          scaledHeight
        );
  
        // Save the scaled result before further transformations
  
  
        // Apply rotation and mirroring on the scaled image
        context.clearRect(0, 0, tempCanvas.width, tempCanvas.height); // Clear the temporary canvas
        context.translate(tempCanvas.width / 2, tempCanvas.height / 2); // Move origin to the center
        context.rotate((-90 * Math.PI) / 180); // Rotate by -90 degrees
        context.scale(-1, 1); // Apply horizontal flip (mirror)
  
        resizedImageData = context.getImageData(0, 0, image.width, image.height).data;
      }
      //console.log("Local image transformed and grid updated!",objects_.grid.drawn_node);
  
      // Color grid nodes based on image pixel data
      const gridNodes = objects_.grid.drawn_node;
      for (let row = 0; row < objects_.grid.columns; row++) {
  
        for (let col = 0; col < objects_.grid.rows; col++) {
  
  
          const index = row * objects_.grid.columns + col;
          if (index >= gridNodes.length) continue;
  
          const pixelIndex = (row * objects_.grid.columns + col) * 4; // 4 for RGBA
          const [r, g, b] = resizedImageData.slice(pixelIndex, pixelIndex + 3);
  
          if (gridNodes[index]?.node) {
            gridNodes[index].node.colour = `rgb(${r}, ${g}, ${b})`;
          }
        }
      }
      //console.log("Local image transformed and grid updated!");
  
      drawAllObjects_img(); // Refresh the grid with the updated colors
    }
  }