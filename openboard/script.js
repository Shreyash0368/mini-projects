const canvas = document.querySelector(".drawing-page");
const ctx = canvas.getContext('2d');
const drawButton = document.querySelector(".fa-pencil");

let isDrawing = false;
let drawButtonFlag = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.onresize = handleResize();

drawButton.onclick = (e) => {
    if (!drawButtonFlag) {
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        drawButton.classList.add("in-use");
    }
    else {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        drawButton.classList.remove("in-use");
        [lastX, lastY] = [0, 0];
    }

    console.log("draw button clicked", drawButtonFlag);

    drawButtonFlag = !drawButtonFlag;
}

drawButton.addEventListener('mousedown', (event) => {
    if (event.button === 2) { // Right mouse button
        event.preventDefault(); // Prevent the default context menu from showing


        console.log('Right-click event triggered!');
    }
});



function startDrawing(e) {
    // Adjust mouse event coordinates to the current canvas size
    const rect = canvas.getBoundingClientRect();
    lastX = (e.clientX - rect.left) * (canvas.width / rect.width);
    lastY = (e.clientY - rect.top) * (canvas.height / rect.height);
    isDrawing = true;
}

function draw(e) {
    if (!isDrawing) return;
    // Adjust mouse event coordinates to the current canvas size
    const rect = canvas.getBoundingClientRect();
    let currentX = (e.clientX - rect.left) * (canvas.width / rect.width);
    let currentY = (e.clientY - rect.top) * (canvas.height / rect.height);

    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    [lastX, lastY] = [currentX, currentY];
}

function stopDrawing() {
    isDrawing = false;
}

function handleResize() {
    // Store the current canvas content
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 2;
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    offscreenCtx.drawImage(canvas, 0, 0);

    // Resize the canvas to match the new window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw the preserved contents back onto the resized canvas
    ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
}