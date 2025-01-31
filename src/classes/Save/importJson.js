import drawImage from "../ImageHandler/drawImage";
import drawAllObjects from "../Selection/drawAllObjects";

export default async function importJson() {
    window.activateTool("importJson");

    const options = {
      types: [{
        description: "JSON Files",
        accept: {
          "application/json": [".json"]
        },
      }, ],
    };
  
    try {
      const [fileHandle] = await window.showOpenFilePicker(options);
      const file = await fileHandle.getFile();
      const jsonData = JSON.parse(await file.text());
  
      // Validate JSON structure
      if (
        !jsonData.imageData ||
        !jsonData.croppedWidth ||
        !jsonData.croppedHeight
      ) {
        throw new Error("Invalid JSON format: Missing required properties.");
      }
  
      // Draw the Base64 image onto the canvas
      await drawImageFromJson(jsonData);
  
      // Draw additional elements if present
      if (jsonData.drawnItems) {
        // drawn_item = jsonData.drawnItems;
        drawAllObjects();
      } else {
        console.warn("No drawn items found in JSON.");
      }
  
      // Start animations if present
      if (jsonData.animations) {
        //animations = jsonData.animations;
        //animations.forEach(item => item.start());
      } else {
        console.warn("No animations found in JSON.");
      }
      setTimeout(() => {
        window.deactivateTool("importJson");
    }, 100);
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn("User cancelled the file selection.");
      } else {
        console.error("Failed to load JSON file:", error);
      }
    }
  }
  
  async function drawImageFromJson(jsonData) {
    const img = new Image();
    img.src = jsonData.imageData; // Set the source to the Base64 image data
    await img.decode();
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    // Ensure canvas and context are initialized
    img.onload = function () {
      // Clear the canvas and set its size
      canvas.width = jsonData.croppedWidth;
      canvas.height = jsonData.croppedHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw the image
      ctx.drawImage(img, 0, 0, jsonData.croppedWidth, jsonData.croppedHeight);
    };
    drawImage();
  }
  