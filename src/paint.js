document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
  
    // Set default styles
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';
  
    function startDrawing(e) {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function draw(e) {
      if (!isDrawing) return;
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
    }
  
    function stopDrawing() {
      isDrawing = false;
    }
  
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
  
    // Toolbar functionality
    document.getElementById('pencil').addEventListener('click', () => {
      ctx.globalCompositeOperation = 'source-over';
    });
  
    document.getElementById('eraser').addEventListener('click', () => {
      ctx.globalCompositeOperation = 'destination-out';
    });
  
    document.getElementById('color-picker').addEventListener('change', (e) => {
      ctx.strokeStyle = e.target.value;
    });
  
    document.getElementById('line-width').addEventListener('change', (e) => {
      ctx.lineWidth = e.target.value;
    });
  
    document.getElementById('clear').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  
    // Canvas resizing functionality
    const canvasWidth = document.getElementById('canvas-width');
    const canvasHeight = document.getElementById('canvas-height');
    const resizeButton = document.getElementById('resize-canvas');
  
    resizeButton.addEventListener('click', () => {
      const newWidth = parseInt(canvasWidth.value);
      const newHeight = parseInt(canvasHeight.value);
      
      if (newWidth > 0 && newHeight > 0) {
        // Create a temporary canvas to hold the current image
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
  
        // Resize the main canvas
        canvas.width = newWidth;
        canvas.height = newHeight;
  
        // Clear the resized canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Redraw the original image onto the resized canvas
        ctx.drawImage(tempCanvas, 0, 0);
  
        // Reset the drawing context properties
        ctx.strokeStyle = document.getElementById('color-picker').value;
        ctx.lineWidth = document.getElementById('line-width').value;
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = 'source-over';
      }
    });
  });