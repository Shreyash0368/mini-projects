const undoBtn = document.getElementById("undo");
const redobtn = document.getElementById("redo");

let undoStack = [];
let redoStack = [];

undoBtn.onclick = undo;
redobtn.onclick = redo;

function saveOldCnavas() {
    undoStack.push(canvas.toDataURL());
    redoStack = [];
}

function undo() {
    if (undoStack.length < 1) return;

    redoStack.push(canvas.toDataURL()); // pushing the current state into redo stack before changing to older one
    let oldState = new Image();
    oldState.src = undoStack.pop();
    oldState.onload = (e) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(oldState, 0, 0)
    }
    // redoStack.push(oldCanvasURL);
}

function redo() {
    if (redoStack.length < 1) return;

    undoStack.push(canvas.toDataURL());
    let newState = new Image();
    newState.src = redoStack.pop();
    newState.onload = (e) => {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(newState, 0, 0);
    }

}