import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startGridTextScroll(
    objects_,
    text,
  
    interval = 200,
    scrollAxis = "horizontal"
  ) {
  if (!objects_) return;

    // Check if an animation for this object already exists
    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1); // Removes the object from the array
    }
  
    const gridNodes = objects_.grid.drawn_node;
    const columns = objects_.grid.rows;
    const rows = objects_.grid.columns;
    let twoDList = [];
  
    // Create a 2D array for grid nodes
    for (let row = 0; row < objects_.grid.columns; row++) {
      let rowArray = [];
      for (let col = 0; col < objects_.grid.rows; col++) {
        const index = row * objects_.grid.rows + col;
        rowArray.push(index < gridNodes.length ? gridNodes[index] : null);
      }
      twoDList.push(rowArray);
    }
  
    let offsetX = columns; // Initial offset for horizontal scrolling
    let offsetY = rows; // Initial offset for vertical scrolling
    let charIndex = 0; // To keep track of the current character in the text
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      text,
      color1: window.color1_4 || "#FF0000",
      color2: window.color2_4 || "#0000FF",
      interval: 100,
      direction: "horizontal",
      lastUpdateTime: Date.now(),
  
      async animate() {
        this.text = window.startTextButtontextInput;
        this.color1 = window.color1_4 || "#FF0000"; // Default color if empty
        this.color2 = window.color2_4 || "#0000FF"; // You can similarly add for the second color
  
        if (!this.isAnimating) return;
  
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime >= this.interval) {
          // Clear previous frame by setting all nodes to white
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
              if (twoDList[row][col]) {
                twoDList[row][col].node.colour = this.color2; // Reset to white
              }
            }
          }
  
          // Render the current character based on offsetX or offsetY
          await scrollText(this.text, this.color1, this.direction);
          drawAllObjects_img();
  
          // Update timing for the next frame
          this.lastUpdateTime = currentTime;
        }
  
        this.animationFrameId = await requestAnimationFrame(() => this.animate());
      },
  
      async start() {
        this.isAnimating = true;
        await this.animate();
      },
      setSpeed(newSpeed) {
        this.interval = (5 - newSpeed) * 100;
      },
      setdirectio(direction) {
        this.direction = direction; // Update speed for this animation instance
      },
      setcolor1(val) {
        this.color1 = val;
      },
      stop() {
        this.isAnimating = false;
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
      },
  
  
    };
  
  
  
    // Function to rotate character data by 90 degrees clockwise
    function rotateCharData90(charData) {
      const rotated = [];
      const cols = charData.length;
      const rows = charData[0].length;
  
      for (let col = 0; col < rows; col++) {
        rotated[col] = [];
        for (let row = cols - 1; row >= 0; row--) {
          rotated[col].push(charData[row][col]);
        }
      }
  
      return rotated;
    }
  
    function mirrorCharData(charData) {
      return charData.map((row) => row.slice().reverse()); // Flips each row to create a horizontal mirror effect
    }
    /**
       * Generates a binary matrix representing a character rendered using a custom font.
       
      @param {string} char - The character to render.
      * @param {string} fontUrl - The URL to the font file.
      * @param {number} matrixSize - The size of the binary matrix (e.g., 8 for 8x8).
      * @returns {Promise<number[][]>} A 2D binary matrix.
      */
    async function generateFontData(char, matrixSize = 8) {
      // Load the custom font
  
      // Set up the canvas
      const temcanvas = document.createElement("canvas");
      const temctx = temcanvas.getContext("2d");
  
      // Configure the temcanvas size and scaling
      const scaleFactor = 20; // Increase for better resolution
      const temcanvasSize = matrixSize * scaleFactor;
      temcanvas.width = temcanvasSize * char.length;
      temcanvas.height = temcanvasSize;
  
      // Configure the font
      temctx.font = `${temcanvasSize *0.73}px Times New Roman`;
      temctx.fillStyle = "black";
      temctx.textAlign = "center";
      temctx.textBaseline = "middle";
  
  
  
      // Clear the temcanvas and render the character
      temctx.clearRect(0, 0, temcanvas.width, temcanvas.height);
      temctx.fillStyle = "black";
      temctx.fillText(char, temcanvas.width / 2, temcanvas.height / 2);
  
      // Debugging: Attach the temcanvas to the document for visual inspection
  
  
      // Extract pixel data from the temcanvas
      const imageData = temctx.getImageData(0, 0, temcanvas.width, temcanvas.height).data;
  
      // Initialize the binary matrix
      const binaryMatrix = [];
      for (let y = 0; y < matrixSize; y++) {
        const row = [];
        for (let x = 0; x < matrixSize * char.length; x++) {
          const pixelX = Math.floor(x * scaleFactor);
          const pixelY = Math.floor(y * scaleFactor);
  
          // Get the alpha channel value
          const alphaIndex = (pixelY * temcanvas.width + pixelX) * 4 + 3;
          const alpha = imageData[alphaIndex];
  
          // Convert to binary (threshold: alpha > 128)
          row.push(alpha > 128 ? 1 : 0);
        }
        binaryMatrix.push(row);
      }
  
      return binaryMatrix;
    }
  
  
    async function scrollText(message, color1, scrollAxis) {
      let charData = await generateFontData(message, columns - 5);
      //console.log(charData)
  
  
  
      if (charData) {
        if (scrollAxis === "horizontal") {
          // Rotate character data for vertical scrolling
          charData = rotateCharData90(charData);
          charData = mirrorCharData(charData);
  
          let yPos = offsetY;
          for (let row = 0; row < charData.length; row++) {
            for (let col = 0; col < charData[row].length; col++) {
              if (charData[row][col] === 1) {
                const x = col + Math.floor((columns - charData[row].length) / 2);
                const y = yPos + row;
                if (y >= 0 && y < rows && twoDList[y] && twoDList[y][x]) {
                  twoDList[y][x].node.colour = color1; // Set color based on the provided color
                }
              }
            }
          }
  
          // Move to the next character if fully scrolled vertically
          offsetY -= 1;
          if (offsetY < -charData.length) {
            offsetY = rows; // Reset position for looping text
            charIndex = (charIndex + 1) % message.length;
          }
        } else if (scrollAxis === "vertical") {
          charData = rotateCharData90(charData);
          charData = mirrorCharData(charData);
          charData = rotateCharData90(charData);
          charData = rotateCharData90(charData);
          charData = rotateCharData90(charData);
  
          let xPos = offsetX;
          for (let row = 0; row < charData.length; row++) {
            for (let col = 0; col < charData[row].length; col++) {
              if (charData[row][col] === 1) {
                const x = xPos + col;
                const y = row + Math.floor((rows - charData.length) / 2);
  
                if (x >= 0 && x < columns && twoDList[y] && twoDList[y][x]) {
                  twoDList[y][x].node.colour = color1; // Set color based on the provided color
                }
              }
            }
          }
  
          // Move to the next character if fully scrolled horizontally
          offsetX -= 1;
          if (offsetX < -charData[0].length) {
            offsetX = columns; // Reset position for looping text
            charIndex = (charIndex + 1) % message.length;
          }
        }
      }
    }
    window.animations.push(animation);
    animation.start();
  }
  