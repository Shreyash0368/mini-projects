const noteHeader = document.querySelector(".header");
const note = document.querySelector(".sticky-note");
const contentArea = document.querySelector(".content-area");
const noteButton = document.getElementById("note");
const minimize = document.getElementById("minimize");
const remove = document.getElementById("remove");
let noteFlag = false;
let minimizeFlag = false;

noteButton.onclick = (e) => {
    noteFlag = !noteFlag;
    if (noteFlag) {
        note.style.display = 'block';
        noteButton.classList.add("in-use");
    }
    else {
        note.style.display = 'none';
        noteButton.classList.remove("in-use");
    }
}

minimize.onclick = (e) => {
    minimizeFlag = !minimizeFlag;
    if (minimizeFlag) {
        contentArea.style.display = 'none';
    }
    else {
        contentArea.style.display = 'block';
    }
}

remove.onclick = (e) => {
    noteButton.click();
}

noteHeader.onmousedown = function (event) {

    let shiftX = event.clientX - note.getBoundingClientRect().left;
    let shiftY = event.clientY - note.getBoundingClientRect().top;

    note.style.position = 'absolute';
    note.style.zIndex = 1000;
    document.body.append(note);

    moveAt(event.pageX, event.pageY);

    // moves the noteHeader at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        note.style.left = pageX - shiftX + 'px';
        note.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the noteHeader on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the noteHeader, remove unneeded handlers
    noteHeader.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        note.onmouseup = null;
    };
};

noteHeader.ondragstart = function () {
    return false;
};