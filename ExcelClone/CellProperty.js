//  creating the array for cell data
let allSheetsDB = [];
let sheetDB = [];

// for (let i = 0; i < row; i++) {
//     let cellRow = [];
//     for (let i = 0; i < col; i++) {
//         // default values of all cells
//         let cellObj = {
//             bold : false,
//             italic : false,
//             underline : false,
//             fontFamily : "Sans-serif",
//             fontSize : 16,
//             fontColor : "#000000",
//             backgroundColor : "#ececec",
//             alignment : "left",
//             value : "",
//             formula : "",
//             children : [],
//         }
//         cellRow.push(cellObj);        
//     }
//     sheetDB.push(cellRow);
// }

// allSheetsDB.push(sheetDB);

//  query selector for all the different cell properties
let fontFamilyProp = document.getElementById("font-family");
let fontSizeProp = document.getElementById("font-size");
let boldProp = document.querySelector(".bold");
let italicProp = document.querySelector(".italic");
let underlineProp = document.querySelector(".underline");
let alignLeftProp = document.querySelector(".align-left");
let alignRightProp = document.querySelector(".align-right");
let alignCenterProp = document.querySelector(".align-center");
let fontColorProp = document.querySelector("input.text-color");
let bgColorProp = document.querySelector("input.bg-color");

// cell Prop colors
let inActiveColor = "#ececec";
let activeColor = "#dbd8e3" 


// ! all property eventlistners start here

fontSizeProp.addEventListener("change", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.fontSize = fontSizeProp.value;

    // modifying text in cell
    // cell.style.fontSize = cellProp.fontSize + "px";
    cell.style.removeProperty('font-size');
    cell.style.setProperty('font-size', cellProp.fontSize + "px");
    
    // changing the select value in UI 
    fontSizeProp.value = cellProp.fontSize
})

fontFamilyProp.addEventListener("change", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.fontFamily = fontFamilyProp.value;

    // modifying text in cell
    cell.style.fontFamily = cellProp.fontFamily;
    cell.style.removeProperty('font-family');
    cell.style.setProperty('font-family', cellProp.fontFamily);
    
    
    // changing the boldprop button 
    fontFamilyProp.value = cellProp.fontFamily;
})

boldProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.bold = !cellProp.bold

    // modifying text in cell
    cell.style.removeProperty("font-weight");
    cell.style.fontWeight = (cellProp.bold ? "bold" : "normal");
    
    // changing the boldprop button 
    boldProp.style.backgroundColor = (cellProp.bold ? activeColor : inActiveColor);
})

italicProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.italic = !cellProp.italic

    // modifying text in cell
    cell.style.fontStyle = (cellProp.italic ? "italic" : "normal");
    
    // changing the prop button 
    italicProp.style.backgroundColor = (cellProp.italic ? activeColor : inActiveColor);
})

underlineProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.underline = !cellProp.underline

    // modifying text in cell
    cell.style.textDecoration = (cellProp.underline ? "underline" : "none");
    
    // changing the prop button 
    underlineProp.style.backgroundColor = (cellProp.underline ? activeColor : inActiveColor);
})

alignLeftProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.alignment = "left";

    // modifying text in cell
    cell.style.textAlign = "left";
    
    // changing the boldprop button 
    alignCenterProp.style.backgroundColor = (cellProp.alignment === "center" ? activeColor : inActiveColor);
    alignLeftProp.style.backgroundColor = (cellProp.alignment === "left" ? activeColor : inActiveColor);
    alignRightProp.style.backgroundColor = (cellProp.alignment === "right" ? activeColor : inActiveColor);
})

alignRightProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.alignment = "right";

    // modifying text in cell
    cell.style.textAlign = "right";
    
    // changing the boldprop button 
    alignCenterProp.style.backgroundColor = (cellProp.alignment === "center" ? activeColor : inActiveColor);
    alignLeftProp.style.backgroundColor = (cellProp.alignment === "left" ? activeColor : inActiveColor);
    alignRightProp.style.backgroundColor = (cellProp.alignment === "right" ? activeColor : inActiveColor);
})

alignCenterProp.addEventListener("click", (e) => {
    let address = addressDisplay.value;    
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.alignment = "center";

    // modifying text in cell
    cell.style.textAlign = "center";
    
    // changing the boldprop button 
    alignCenterProp.style.backgroundColor = (cellProp.alignment === "center" ? activeColor : inActiveColor);
    alignLeftProp.style.backgroundColor = (cellProp.alignment === "left" ? activeColor : inActiveColor);
    alignRightProp.style.backgroundColor = (cellProp.alignment === "right" ? activeColor : inActiveColor);
})


fontColorProp.addEventListener("change", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.fontColor = fontColorProp.value;

    // modifying text in cell
    cell.style.removeProperty('color');
    cell.style.setProperty('color', cellProp.fontColor);
    
    
    // changing the boldprop button 
    fontColorProp.value = cellProp.fontColor;
})

bgColorProp.addEventListener("change", (e) => {
    let address = addressDisplay.value;
    let [cell, cellProp] = findCell(address); 
    
    // changing the data in sheet 
    cellProp.backgroundColor = bgColorProp.value;

    // modifying text in cell
    cell.style.removeProperty('background-color');
    cell.style.setProperty('background-color', cellProp.backgroundColor);
    // cell.style.set = cellProp.backgroundColor;
    
    // changing the boldprop button 
    bgColorProp.value = cellProp.backgroundColor;
})

// ! all property eventlistners start here


// ? changing values based on cell clicked
let allCell = document.querySelectorAll(".cell");
allCell.forEach((cell) => {
    cell.addEventListener("click", (e) => {
        let address = addressDisplay.value;
        let [rowIdx, colIdx] = decodeAddress(address);
        let cellProp = sheetDB[rowIdx][colIdx];
        
        boldProp.style.backgroundColor = (cellProp.bold ? activeColor : inActiveColor);
        (cellProp.bold === false ? cell.style.removeProperty('font-weight') : cell.style.setProperty('font-weight', 'bold'));

        italicProp.style.backgroundColor = (cellProp.italic ? activeColor : inActiveColor);
        (cellProp.italic === false ? cell.style.removeProperty('font-style') : cell.style.setProperty('font-style', 'italic'));
        
        underlineProp.style.backgroundColor = (cellProp.underline ? activeColor : inActiveColor);
        (cellProp.underline === false ? cell.style.removeProperty('text-decoration') : cell.style.setProperty('text-decoration', 'underline'));
        
        cell.style.removeProperty('font-size');
        fontSizeProp.value = cellProp.fontSize
        // console.log(typeof fontSizeProp.value);
        cell.style.setProperty('font-size', fontSizeProp.value + "px");
        
        cell.style.removeProperty('font-family');
        fontFamilyProp.value = cellProp.fontFamily;
        cell.style.setProperty('font-family', fontFamilyProp.value);

        cell.style.removeProperty('color');
        fontColorProp.value = cellProp.fontColor;
        cell.style.setProperty('color', cellProp.fontColor);

        cell.style.removeProperty('background-color');
        bgColorProp.value = cellProp.backgroundColor;
        cell.style.setProperty('background-color', bgColorProp.value);

        alignCenterProp.style.backgroundColor = (cellProp.alignment === "center" ? activeColor : inActiveColor);
        if (cellProp.alignment === 'center') cell.style.setProperty('text-align', 'center');
        alignLeftProp.style.backgroundColor = (cellProp.alignment === "left" ? activeColor : inActiveColor);
        if (cellProp.alignment === 'left') cell.style.setProperty('text-align', 'left');
        alignRightProp.style.backgroundColor = (cellProp.alignment === "right" ? activeColor : inActiveColor);
        if (cellProp.alignment === 'right') cell.style.setProperty('text-align', 'right');
       
        formulaBar.value = cellProp.formula; 
        cell.innerText = cellProp.value;   
    })
})

// ? address decode function
function decodeAddress(address) {   
    let colID = address.split("")[0];
    colID = colID.charCodeAt(0) - 65;
    let rowID = Number(address.substring(1));

    return [rowID - 1, colID];
}

// ? function to get the required cell in UI and object of same from DB
function findCell (address) {
    let [rowIdx, colIdx] = decodeAddress(address);
    let cell = document.querySelector(`.cell[row-id = "${rowIdx}"][col-id = "${colIdx}"]`);
    let cellProp = sheetDB[rowIdx][colIdx];

    return [cell, cellProp];
}