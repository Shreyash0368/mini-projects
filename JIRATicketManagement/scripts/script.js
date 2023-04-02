// acquiring global objects
let addButton = document.querySelector('.add');
let removeButton = document.querySelector('.remove');
let addFlag = false;
let removeFlag = false;
let noteCreatorText = document.querySelector('.textarea-cont');
let noteCreator = document.querySelector('.note-creator');
let colorArray = ['lightpink', 'lightblue', 'lightgreen', 'black'];
let colorOptions = document.querySelectorAll('.color-pick');



// event listner for displaying the note creator
addButton.addEventListener('click', (e) => {
    addFlag = !addFlag;
    removeFlag = false;

    if (addFlag) {
        noteCreator.style.display = 'flex';
    }
    else {
        noteCreator.style.display = 'none';
    }
})

removeButton.addEventListener('click', (e) => {
    removeFlag = !removeFlag;
    if (removeFlag) {
        removeButton.style.backgroundColor= '#6a89cc';
    }
    else {
        removeButton.style.backgroundColor= '#2f3542';       
    }
    console.log(removeFlag);
    let allNotes = document.querySelectorAll('.note')
    allNotes.forEach((note) => {
        note.addEventListener('click', (e) => {
            if (removeFlag) {
                note.remove()
            }
        })
    })
    
})



// event listner for adding new note 
noteCreatorText.addEventListener('keydown', (e) => {
    let shiftPress = e.shiftKey;
    if (e.key === 'Enter' && shiftPress) {

        // geting values for the new ticket
        let ticketCont = noteCreatorText.value;
        let ticketColor = colorArray[getColor(colorOptions)];
        let ticketID = crypto.randomUUID().substring(1, 6);

        // generating ticket
        ticketCreator(ticketColor, ticketCont, ticketID);

        // removing display of note creator and reseting all values
        addFlag = false;
        noteCreator.style.display = 'none';
        noteCreatorText.value = null;
        colorOptions.forEach(element => {
            element.classList.remove('border');
        });
        colorOptions[3].classList.add('border');

        
    }
})



// event listner for node removal




// ticket creation function
function ticketCreator(ticketColor, ticketText, ticketID) {
    let noteConatiner = document.querySelector('.note-container');
    let note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
            <div class="note-color ${ticketColor} round-border"></div>
            <div class="note-ID">#${ticketID}</div>
            <div class="note-text round-border">${ticketText}</div> 
        `
    noteConatiner.appendChild(note);
}

// ticket removal 

// getting the color value choosed by user
function getColor(colorChoice) {
    for (let index = 0; index < colorChoice.length; index++) {
        if (colorChoice[index].classList.contains('border')) {
            return index;
        }
    }
}

// setting border for choosen color
colorOptions.forEach((color) => {
    color.addEventListener('click', (e) => {
        colorOptions.forEach(element => {
            element.classList.remove('border');
        });
        color.classList.add('border')
    })
})

