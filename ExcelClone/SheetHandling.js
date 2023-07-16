let sheetAddbutton = document.querySelector(".sheet-add");

sheetAddbutton.addEventListener("click", (e) => {
    let sheetFolder = document.querySelector(".sheet-folder");
    let sheet = document.createElement("div");
    let sheetList = sheetFolder.querySelectorAll(".sheet-cont");

    sheet.setAttribute("class", "sheet-cont");
    sheet.setAttribute("id", sheetList.length);
    sheet.innerText = `Sheet-${sheetList.length + 1}`;
    sheetFolder.appendChild(sheet);

    // adding sheet to DB
    createSheetDB();
    createCycleRelationDB();

    // setting new sheet in DB 
    sheetDB = allSheetsDB[sheetList.length];
    parentChildGraph = allGrapghRelationsDB[sheetList.length]


    // setting UI for selected sheet
    setSheetUI(sheet);
    sheet.click();

    // adding deletion function
    deleteSheet(sheet);


})

function createSheetDB() {
    let sheetDB = [];

    for (let i = 0; i < row; i++) {
        let cellRow = [];
        for (let i = 0; i < col; i++) {
            // default values of all cells
            let cellObj = {
                bold: false,
                italic: false,
                underline: false,
                fontFamily: "Sans-serif",
                fontSize: 16,
                fontColor: "#000000",
                backgroundColor: "#ececec",
                alignment: "left",
                value: "",
                formula: "",
                children: [],
            }
            cellRow.push(cellObj);
        }
        sheetDB.push(cellRow);
    }

    allSheetsDB.push(sheetDB);
}

function createCycleRelationDB() {
    let parentChildGraph = [];
    for (let i = 0; i < row; i++) {  // creating 2D array to store the children of all cells in graph form
        let rowArr = []
        for (let j = 0; j < col; j++) {
            rowArr.push([])
        }
        parentChildGraph.push(rowArr);
    }

    allGrapghRelationsDB.push(parentChildGraph);
}

function setSheetUI(sheet) {
    sheet.addEventListener("click", (e) => {
        let allSheets = document.querySelectorAll(".sheet-cont");
        for (let index = 0; index < allSheets.length; index++) {
            allSheets[index].style.backgroundColor = "transparent";

        }

        sheet.style.backgroundColor = "#b7b7b7"
        let sheetIdx = sheet.getAttribute("id");

        sheetDB = allSheetsDB[sheetIdx];
        parentChildGraph = allGrapghRelationsDB[sheetIdx];
        updateCells();
    })
}

function updateCells() {
    for (let rowIdx = 0; rowIdx < row; rowIdx++) {
        for (let colIdx = 0; colIdx < col; colIdx++) {
            let cell = document.querySelector(`.cell[row-id = "${rowIdx}"][col-id = "${colIdx}"]`);
            cell.classList.remove('selected-cell');
            cell.click();
        }
    }
    let cell = document.querySelector(`.cell[row-id = "0"][col-id = "0"]`);
    cell.click();

}

{
    sheetAddbutton.click();
}

function deleteSheet(sheet) {
    sheet.addEventListener("mousedown", (e) => {
        if (e.button !== 2) return;
        e.preventDefault(); // Prevent the default right-click context menu

        let sheetList = document.querySelectorAll(".sheet-cont");
        if (sheetList.length === 1) {
            alert("You need to have at least 1 sheet");
            return;
        }

        const confirmation = confirm("Are you sure you want to delete the sheet?");
        if (confirmation === false) return;

        sheet.remove();

        sheetList = document.querySelectorAll(".sheet-cont");

        for (let i = 0; i < sheetList.length; i++) {
            sheetList[i].setAttribute("id", `${i}`);
            sheetList[i].innerText = `Sheet-${i + 1}`;
            
        }

        sheetList[0].click(); // Simulate click on the first element
    });
}
