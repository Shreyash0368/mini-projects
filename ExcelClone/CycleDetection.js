let allGrapghRelationsDB = [];
let parentChildGraph = [];
// for (let i = 0; i < row; i++) {  // creating 2D array to store the children of all cells in graph form
//     let rowArr = []
//     for (let j = 0; j < col; j++) {
//         rowArr.push([])
//     }
//     parentChildGraph.push(rowArr);
// }

// allGrapghRelationsDB.push(parentChildGraph);

function isGraphCyclic(parentChildGraph) {
    // creating 2D auxilary arrays for the detecting cycle
    let visited = []; // used for keeping track of which nodes have been visited overall
    let dfsVisited = []; // keeps track of cells in call stack


    for (let i = 0; i < row; i++) {
        let visitRow = [];
        let dfsRow = [];
        for (let j = 0; j < col; j++) {
            visitRow.push(false);
            dfsRow.push(false);
        }
        visited.push(visitRow);
        dfsVisited.push(dfsRow);
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (visited[i][j] === false) {
                if (detectCycle(parentChildGraph, i, j, visited, dfsVisited)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function detectCycle(parentChildGraph, i, j, visited, dfsVisited) {
    visited[i][j] = true;
    dfsVisited[i][j] = true;

    for (let children = 0; children < parentChildGraph[i][j].length; children++) {
        let [childRow, childCol] = parentChildGraph[i][j][children];

        if (visited[childRow][childCol] === false) {
            if (detectCycle(parentChildGraph, childRow, childCol, visited, dfsVisited)) {
                return true;
            }
        }
        else if (dfsVisited[childRow][childCol] === true) {
            return true;
        }
    }

    dfsVisited[i][j] = false;
    return false;
}