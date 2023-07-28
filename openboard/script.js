const canvas = document.getElementById("drawing-page");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width, canvas.height);

const toolDropdown = document.querySelector(".tool-box-dropdown");
const toolBox = document.querySelector(".tool-box");
let toolBoxFlag = false;

const pencil = document.querySelector(".fa-pencil");
const pencilEditPanel = document.querySelector(".pencil-edit");
const pencilColorInput = document.getElementById("pencil-color");
const pencilWidthInput = document.getElementById("pencil-width");

const eraser = document.querySelector(".fa-eraser");
const eraserEditPanel = document.querySelector(".eraser-edit");
const eraserWidthInput = document.getElementById("eraser-width");

let isDrawing = false;
let pencilFlag = false;
let eraserFlag = false;

let lastX = 0;
let lastY = 0;

let pencilWidth = 2;
let pencilColor = 'black';

// dropdown for toolbox display
toolDropdown.onclick = (e) => {
    toolBoxFlag = !toolBoxFlag
    if (toolBoxFlag) {
        toolBox.style.display = 'flex';
    }
    else {
        toolBox.style.display = 'none';
    }
}

// chnage canvas size with window
window.onresize = handleResize;

function handleResize() {
    // Store the current canvas content
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height;
    offscreenCtx.drawImage(canvas, 0, 0);

    // Resize the canvas to match the new window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Redraw the preserved contents back onto the resized canvas
    ctx.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height, 0, 0, canvas.width, canvas.height);
}

// pencil draw event listeners
pencil.onclick = (e) => {
    eraserFlag = false;
    eraser.classList.remove("in-use");
    eraserEditPanel.style.display = 'none';

    pencilColor = 'black';
    pencilWidth = 2;    

    if (!pencilFlag) {
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        pencil.classList.add("in-use");
        pencilEditPanel.style.display = 'flex';

    }
    else {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        pencil.classList.remove("in-use");
        pencilEditPanel.style.display = 'none';
    }

    pencilFlag = !pencilFlag;
}

// changing pencil color and width
pencilColorInput.onchange = changePencilColor;
pencilWidthInput.onchange = changePencilWidth;

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

    ctx.strokeStyle = pencilColor;
    ctx.lineWidth = Number(pencilWidth);
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

function changePencilColor(e) {
    pencilColor = pencilColorInput.value;
}

function changePencilWidth(e) {
    pencilWidth = Math.round(pencilWidthInput.valueAsNumber / 10);
}

// Eraser Implementation
eraser.onclick = (e) => {
    pencilFlag = false;
    pencil.classList.remove("in-use");
    pencilEditPanel.style.display = 'none';


    pencilColor = 'white';
    pencilWidth = 5;

    if (!eraserFlag) {
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        eraser.classList.add("in-use");
        eraserEditPanel.style.display = 'flex';

    }
    else {
        canvas.removeEventListener("mousedown", startDrawing);
        canvas.removeEventListener("mousemove", draw);
        canvas.removeEventListener("mouseup", stopDrawing);
        eraser.classList.remove("in-use");
        eraserEditPanel.style.display = 'none';
    }

    eraserFlag = !eraserFlag;
}

eraserWidthInput.onchange = (e) => {
    pencilWidth = Math.round(eraserWidthInput.valueAsNumber / 2);
}

