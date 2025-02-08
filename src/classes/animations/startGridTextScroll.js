import drawAllObjects_img from "../Selection/drawAllObjects_img";
export default function startGridTextScroll(
    objects_,
    text,
    interval = 200,
    scrollAxis = "horizontal",
    font = "Times New Roman"
  ) {
  if (!objects_) return;

    const existingAnimationIndex = window.animations.findIndex(
      (anim) => anim.objectId === objects_
    );
    if (existingAnimationIndex !== -1) {
      window.animations[existingAnimationIndex].stop();
      window.animations.splice(existingAnimationIndex, 1);
    }
  
    const gridNodes = objects_.grid.drawn_node;
    const columns = objects_.grid.rows;
    const rows = objects_.grid.columns;
    let twoDList = [];
  
    for (let row = 0; row < objects_.grid.columns; row++) {
      let rowArray = [];
      for (let col = 0; col < objects_.grid.rows; col++) {
        const index = row * objects_.grid.rows + col;
        rowArray.push(index < gridNodes.length ? gridNodes[index] : null);
      }
      twoDList.push(rowArray);
    }
  
    let offsetX = columns;
    let offsetY = rows;
    let charIndex = 0;
  
    const animation = {
      objectId: objects_,
      isAnimating: true,
      animationFrameId: null,
      text,
      font,
      color1: window.color1_4 || "#FF0000",
      color2: window.color2_4 || "#0000FF",
      interval: 800,
      direction: "horizontal",
      lastUpdateTime: Date.now(),
  
      async animate() {
        this.text = window.startTextButtontextInput;
        this.font = window.selectedFont || font;
        this.color1 = window.color1_4 || "#FF0000";
        this.color2 = window.color2_4 || "#0000FF";
  
        if (!this.isAnimating) return;
  
        const currentTime = Date.now();
        if (currentTime - this.lastUpdateTime >= this.interval) {
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < columns; col++) {
              if (twoDList[row][col]) {
                twoDList[row][col].node.colour = this.color2;
              }
            }
          }
  
          await scrollText(this.text, this.color1, this.direction, this.font);
          drawAllObjects_img();
  
          this.lastUpdateTime = currentTime;
        }
  
        this.animationFrameId = await requestAnimationFrame(() => this.animate());
      },
  
      async start() {
        this.isAnimating = true;
        await this.animate();
      },
      setSpeed(newSpeed) {
        this.interval = 0.7* (5 - newSpeed) * 100;
      },
      setFont(newFont) {
        this.font = newFont;
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
    async function generateFontData(char, matrixSize = 8, font = "Times New Roman") {
      const temcanvas = document.createElement("canvas");
      const temctx = temcanvas.getContext("2d");
      const scaleFactor = 20;
      const temcanvasSize = matrixSize * scaleFactor;
      temcanvas.width = temcanvasSize * char.length;
      temcanvas.height = temcanvasSize;
  
      temctx.font = `${temcanvasSize * 0.73}px ${font}`;
      temctx.fillStyle = "black";
      temctx.textAlign = "center";
      temctx.textBaseline = "middle";
  
      temctx.clearRect(0, 0, temcanvas.width, temcanvas.height);
      temctx.fillText(char, temcanvas.width / 2, temcanvas.height / 2);
  
      const imageData = temctx.getImageData(0, 0, temcanvas.width, temcanvas.height).data;
      const binaryMatrix = [];
      for (let y = 0; y < matrixSize; y++) {
        const row = [];
        for (let x = 0; x < matrixSize * char.length; x++) {
          const pixelX = Math.floor(x * scaleFactor);
          const pixelY = Math.floor(y * scaleFactor);
  
          const alphaIndex = (pixelY * temcanvas.width + pixelX) * 4 + 3;
          const alpha = imageData[alphaIndex];
  
          row.push(alpha > 128 ? 1 : 0);
        }
        binaryMatrix.push(row);
      }
  
      return binaryMatrix;
    }
  
    async function scrollText(message, color1, scrollAxis, font) {
      let charData = await generateFontData(message, columns - 5, font);if (charData) {
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
  