// ? adding intial indexing to address row & col
let row = 100;
let col = 26;

let addressCol = document.querySelector(".address-col"); 
let addressRow = document.querySelector(".address-row"); 
let cellCont = document.querySelector(".cell-container");

// adding row no
for (let i = 0; i < row; i++) {
    let div = document.createElement('div');
    div.innerText = i + 1;
    div.setAttribute("class", "col-index");
    addressCol.appendChild(div);   
}

// adding col no
for (let i = 0; i < col; i++) {
    let div = document.createElement('div');
    div.innerText = String.fromCharCode(65 + i);
    div.setAttribute("class", "row-index");
    addressRow.appendChild(div);   
}

// ? adding grid cells 
for (let i = 0; i < row; i++) {
    let rowCont = document.createElement("div");
    rowCont.setAttribute("class", "row-cont");
    for (let j = 0; j < col; j++) {
        let cell = document.createElement("div");
        cell.setAttribute("class", "cell");
        cell.setAttribute("contenteditable", "true")
        displayAddress(cell, i, j);
        
        rowCont.appendChild(cell);    
    }
    cellCont.appendChild(rowCont);
}

function displayAddress(cell, i, j) {
    cell.addEventListener('click', (e) => {
        let addressDisplay = document.querySelector(".address-display");        
        addressDisplay.innerText = `${String.fromCharCode(65 + j)}${i + 1}`;
    })
}
