let storedData = [];
let cellPair = [] // the array for storing the source and destination cells

let copyButton = document.querySelector(".copy");
let cutButton = document.querySelector(".cut");
let pasteButton = document.querySelector(".paste");

let allCellRows = document.querySelectorAll(".row-cont");
allCellRows.forEach((cellRow) => {
    cellRow.addEventListener("click", (e) => {
        if (e.ctrlKey) {
            if (cellPair.length === 2) {
                clearCellPair();
            }

            let [rowID, colID] = decodeAddress(addressDisplay.value);
            cellPair.push([rowID, colID]);
            let cell = document.querySelector(`.cell[row-id = "${rowID}"][col-id = "${colID}"]`);
            cell.classList.add("selected-cell");
        }
    })
})

copyButton.addEventListener("click", (e) => {
    if (cellPair.length < 2) return;
    storedData = [];

    let startRow = Math.min(cellPair[0][0], cellPair[1][0]);
    let startCol = Math.min(cellPair[0][1], cellPair[1][1]);
    let endRow = Math.max(cellPair[0][0], cellPair[1][0]);
    let endCol = Math.max(cellPair[0][1], cellPair[1][1]);

    // let [startRow, startCol, endRow, endCol] = [cellPair[0][0], cellPair[0][1], cellPair[1][0], cellPair[1][1]];
    for (let i = startRow; i <= endRow; i++) {
        let dataRow = [];
        for (let j = startCol; j <= endCol; j++) {
            dataRow.push(sheetDB[i][j]);
        }
        storedData.push(dataRow);
    }
    console.log(storedData);
})

cutButton.addEventListener("click", (e) => {
    if (cellPair.length < 2) return;
    storedData = [];

    let startRow = Math.min(cellPair[0][0], cellPair[1][0]);
    let startCol = Math.min(cellPair[0][1], cellPair[1][1]);
    let endRow = Math.max(cellPair[0][0], cellPair[1][0]);
    let endCol = Math.max(cellPair[0][1], cellPair[1][1]);

    for (let i = startRow; i <= endRow; i++) {
        let dataRow = [];
        for (let j = startCol; j <= endCol; j++) {
            let cell = document.querySelector(`.cell[row-id = "${i}"][col-id = "${j}"]`);
            dataRow.push(JSON.parse(JSON.stringify(sheetDB[i][j])));

            sheetDB[i][j].bold = false;
            sheetDB[i][j].italic = false;
            sheetDB[i][j].underline = false;
            sheetDB[i][j].fontFamily = "Sans-serif";
            sheetDB[i][j].fontSize = 16;
            sheetDB[i][j].fontColor = "#000000";
            sheetDB[i][j].backgroundColor = "#ececec";
            sheetDB[i][j].alignment = "left";
            sheetDB[i][j].value = "";
            cell.click();

        }
        storedData.push(dataRow);
    }
    console.log(storedData);

})

pasteButton.addEventListener("click", (e) => {
    if (cellPair.length < 2) return;

    let startRow = Math.min(cellPair[0][0], cellPair[1][0]);
    let startCol = Math.min(cellPair[0][1], cellPair[1][1]);
    let endRow = Math.max(cellPair[0][0], cellPair[1][0]);
    let endCol = Math.max(cellPair[0][1], cellPair[1][1]);
    let [currRow, currCol] = decodeAddress(addressDisplay.value);

    let rowDiff = endRow - startRow;
    let colDiff = endCol - startCol;
    // console.log(currRow, currCol);

    for (let i = currRow; i <= currRow + rowDiff; i++) {
        if (i >= 100) {
            continue;
        }
        for (let j = currCol; j <= currCol + colDiff; j++) {
            if (j >= 26) continue;
            console.log(i, j);
            let cell = document.querySelector(`.cell[row-id = "${i}"][col-id = "${j}"]`);

            let cellProp = storedData[i - currRow][j - currCol];
            sheetDB[i][j].bold = cellProp.bold;
            sheetDB[i][j].italic = cellProp.italic;
            sheetDB[i][j].underline = cellProp.underline;
            sheetDB[i][j].fontFamily = cellProp.fontFamily;
            sheetDB[i][j].fontSize = cellProp.fontSize;
            sheetDB[i][j].fontColor = cellProp.fontColor;
            sheetDB[i][j].backgroundColor = cellProp.backgroundColor;
            sheetDB[i][j].alignment = cellProp.alignment;
            sheetDB[i][j].value = cellProp.value;
            cell.click();
        }
    }
    clearCellPair();

})

document.addEventListener('keydown', function (event) {
    
    if (event.ctrlKey && event.key === 'c') {
        event.preventDefault();
        copyButton.click();
    }
});

document.addEventListener('keydown', function (event) {
    
    if (event.ctrlKey && event.key === 'x') {
        event.preventDefault();
        cutButton.click();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.ctrlKey && event.key === 'v') {
        event.preventDefault();
        pasteButton.click();
    }
});


function clearCellPair() {
    for (let i = 0; i < cellPair.length; i++) {
        let [rowID, colID] = cellPair[i];
        let cell = document.querySelector(`.cell[row-id = "${rowID}"][col-id = "${colID}"]`);
        cell.classList.remove("selected-cell");
    }
    cellPair = [];
}


