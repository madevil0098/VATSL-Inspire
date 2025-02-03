import drawResizeHandles from "./drawResizeHandles";

export default async function drawImage() {
    const { canvas, ctx, image_file, imgX, imgY, imgWidth, imgHeight } = window;

    // Only resize if absolutely necessary
    if (imgX + imgWidth + 30 > canvas.width || imgY + imgHeight + 30 > canvas.height) {
        canvas.width = Math.max(imgX + imgWidth + 30, canvas.width);
        canvas.height = Math.max(imgY + imgHeight + 30, canvas.height);
    }

    // Clear only the image region instead of the entire canvas
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height);
    

    // Draw the image
    ctx.drawImage(image_file, imgX, imgY, imgWidth, imgHeight);

    // Draw only relevant handles
    drawResizeHandles();

    
}
