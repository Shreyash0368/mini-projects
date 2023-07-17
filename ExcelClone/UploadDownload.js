let downloadButton = document.querySelector(".file-download");
let uploadButton = document.querySelector(".file-upload");

downloadButton.addEventListener("click", (e) => {
    let sheetDataJSON = JSON.stringify([sheetDB, parentChildGraph])
    let file = new Blob([sheetDataJSON], { type: "application/json" });

    let a = document.createElement("a");
    let url = URL.createObjectURL(file);
    a.href = url;
    a.download = "SheetData.json";

    a.addEventListener("click", (e) => {
        setTimeout(() => {
            URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
        }, 100);
    })


    document.body.appendChild(a);
    a.click();
})

uploadButton.addEventListener("click", (e) => {
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let fileReader = new FileReader;
        let file = input.files[0];        

        fileReader.readAsText(file);
        fileReader.addEventListener("load", (e) => {
            let sheetData = JSON.parse(fileReader.result);

            sheetAddbutton.click();

            sheetDB = sheetData[0];
            parentChildGraph = sheetData[1];

            allSheetsDB[allSheetsDB.length - 1] = sheetDB
            allGrapghRelationsDB[allGrapghRelationsDB.length - 1] = parentChildGraph;

            updateCells();
        })


    })

})