export default async function saveOnlyImage() {
    if (!window.image_file) {
      return;
    }
    window.activateTool("saveCanvas")

    // Get window.canvas context and image data
    const ctx = window.canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, window.canvas.width, window.canvas.height).data;
  
    // Calculate bounds of non-transparent pixels
    let top = null,
      left = null,
      right = null,
      bottom = null;
    for (let y = 0; y < window.canvas.height; y++) {
      for (let x = 0; x < window.canvas.width; x++) {
        const alpha = imageData[(y * window.canvas.width + x) * 4 + 3]; // Get alpha value
        if (alpha > 0) {
          // Non-transparent pixel found
          if (top === null) top = y;
          if (left === null || x < left) left = x;
          if (right === null || x > right) right = x;
          bottom = y;
        }
      }
    }
  
    // If no non-transparent area is found, return
    if (top === null) {
      return;
    }
  
    // Calculate width and height of the cropped area
    const croppedWidth = right - left + 1;
    const croppedHeight = bottom - top + 1;
  
    // Create an offscreen window.canvas to draw the cropped image
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = croppedWidth;
    croppedCanvas.height = croppedHeight;
    const croppedCtx = croppedCanvas.getContext("2d");
    const base64Image = croppedCanvas.toDataURL("image/png");
  
    // Draw the cropped image onto the offscreen window.canvas
    croppedCtx.drawImage(
      window.canvas,
      left,
      top,
      croppedWidth,
      croppedHeight,
      0,
      0,
      croppedWidth,
      croppedHeight
    );
  
    // Convert the cropped window.canvas to a blob
    const blob = await new Promise((resolve) =>
      croppedCanvas.toBlob(resolve, "image/png")
    );
  
    // Prompt user with file save options
    const options = {
      types: [{
        description: "PNG Image",
        accept: {
          "image/png": [".png"]
        },
      }, ],
    };
    try {
      const fileHandle = await window.showSaveFilePicker(options);
      const writable = await fileHandle.createWritable();
      await writable.write(blob);
      await writable.close();
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("User cancelled the save dialog.");
      } else if (error.message.includes("showSaveFilePicker")) {} else {
        console.error("Save cancelled or failed:", error);
      }
    }
    const jsonData = {
      bounds: {
        top,
        left,
        right,
        bottom
      },
      croppedWidth,
      croppedHeight,
      timestamp: new Date().toISOString(),
      drawnItems: window.drawn_item, // Add the drawn_item data here
      imageData: base64Image, // Add the Base64 image data here
      animations: window.animations,
    };
  
    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
  
    // Prompt user to save the JSON file
    const optionsJson = {
      types: [{
        description: "JSON File",
        accept: {
          "application/json": [".json"]
        },
      }, ],
    };
    try {
      const fileHandleJson = await window.showSaveFilePicker(optionsJson);
      const writableJson = await fileHandleJson.createWritable();
      await writableJson.write(jsonBlob);
      await writableJson.close();
  
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("User cancelled the save dialog for the JSON file.");
      } else if (error.message.includes("showSaveFilePicker")) {
        console.warn("File Picker API not supported.");
      } else {
        console.error("Save cancelled or failed:", error);
      }
    }
    setTimeout(() => {
      window.deactivateTool("saveCanvas")
  
    }, 100);
  }
  