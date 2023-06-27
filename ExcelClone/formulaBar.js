let formulaBar = document.querySelector(".formula-input");

// event listner to store the value of cell within object in DB
allCell.forEach((cell) => {
    cell.addEventListener(('blur'), (e) => {
        let address = addressDisplay.value;
        let [cell, cellProp] = findCell(address);

        if (cellProp.value != cell.innerText) {
            cellProp.value = cell.innerText;

            removeChildFromGraph(cellProp.formula, address); // remove older relations 
            removeChildFromParent(cellProp.formula);
            cellProp.formula = "";
            // updating the values of all the children cell
            let children = cellProp.children;
            for (let i = 0; i < children.length; i++) {
                updateChildren(children[i]);
            }
        }
    })
})

formulaBar.addEventListener("keydown", (e) => {
    let formula = formulaBar.value;
    if (e.key === "Enter" && formula) {
        
        let address = addressDisplay.value;
        if (address === "") { // if no cell is selected before pressing Enter
            alert("Select a cell for the formula!!!!");
            return;
        }
        let [cell, cellProp] = findCell(address);

        if (cellProp.formula === formula) { // there is no change in formula then no need for new evaluation
            return;
        }

        removeChildFromGraph(cellProp.formula, address); // remove older relations 
        addChildTograph(formula, address); // adding new ones based on formula

        if (isGraphCyclic(parentChildGraph)) {
            removeChildFromGraph(formula, address);
            alert("The formula is cyclic!!");
            return
        }

        removeChildFromParent(cellProp.formula);
        let answer = evaluateFormula(formula, false);
        cell.innerText = answer;
        cellProp.value = answer;
        cellProp.formula = formula;

        for (let i = 0; i < cellProp.children.length; i++) {
            updateChildren(cellProp.children[i]);
        }
    }
})

// function for evaluating formula 
function evaluateFormula(formula, updateFlag) { // updateFlag tells if the child needs to appended in array or not
    let address = addressDisplay.value;         // true means that the function is called to update existing child

    formula = formula.split(" ");
    for (let i = 0; i < formula.length; i++) {
        let ASCII = formula[i].charCodeAt(0);
        if (ASCII >= 65 && ASCII <= 90) {
            let [parentCell, parentCellProp] = findCell(formula[i]);
            formula[i] = parentCellProp.value; // replacing the address in the input formula with the actual values stored inside the parent cell

            if (!updateFlag) {
                parentCellProp.children.push(address); // this helps in establishing a parent child relationship
            }
        }
    }

    let decodedFormula = formula.join(" ");
    return eval(decodedFormula); // the new formula can then be evaluated by the eval function
}

function updateChildren(address) {
    let [childCell, childCellProp] = findCell(address);
    let answer = evaluateFormula(childCellProp.formula, true);
    childCell.innerText = answer;
    childCellProp.value = answer;

    if (childCellProp.children.length === 0) {
        return;
    }

    childCellProp.children.forEach((child) => {
        updateChildren(child);
    })
}

// function for removing children from parent 
function removeChildFromParent(formula) {
    if (formula === "") {
        return;
    }
    let childAddress = addressDisplay.value;

    formula = formula.split(" ");
    for (let i = 0; i < formula.length; i++) {
        let ASCII = formula[i].charCodeAt(0);
        if (ASCII >= 65 && ASCII <= 90) {
            let [parentCell, parentCellProp] = findCell(formula[i]);
            let childIndx = parentCellProp.children.indexOf(childAddress);
            parentCellProp.children.splice(childIndx, 1);
        }
    }

}

function addChildTograph(formula, childAddress) {
    let [childRow, childCol] = decodeAddress(childAddress);

    formula = formula.split(" ");
    for (let i = 0; i < formula.length; i++) {
        let ASCII = formula[i].charCodeAt(0);
        if (ASCII >= 65 && ASCII <= 90) {
            let [parentRow, parentCol] = decodeAddress(formula[i]);
            parentChildGraph[parentRow][parentCol].push([childRow, childCol]);
        }
    }
}

function removeChildFromGraph(formula, childAddress) {
    let [childRow, childCol] = decodeAddress(childAddress);

    formula = formula.split(" ");
    for (let i = 0; i < formula.length; i++) {
        let ASCII = formula[i].charCodeAt(0);
        if (ASCII >= 65 && ASCII <= 90) {
            let [parentRow, parentCol] = decodeAddress(formula[i]);
            let childIdx = parentChildGraph[parentRow][parentCol].indexOf([childRow, childCol]);
            parentChildGraph[parentRow][parentCol].splice(childIdx, 1);
        }
    }
}