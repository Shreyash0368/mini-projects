//* acquiring global objects

// Aqcuiring add and remove button
let addButton = document.querySelector('.add');
let removeButton = document.querySelector('.remove');

let noteCreatorText = document.querySelector('.textarea-cont');
let noteCreator = document.querySelector('.note-creator');

// remove button flags
let addFlag = false;
let removeFlag = false;

// values for setting color properties
let colorArray = ['lightpink', 'lightblue', 'lightgreen', 'black'];
let colorOptions = document.querySelectorAll('.color-pick');

// array of notes 
let noteArray = [];

// //? loading old notes from local storage
if (localStorage.getItem('jiraTicket')) {
    noteArray = JSON.parse(localStorage.getItem('jiraTicket'));   
    noteArray.forEach((note,idx) => {
        ticketCreator(note.color, note.text, note.ID.substring(1,7), false);
    })    
}

console.log(noteArray);



// ! adding and removing notes

//? event listner for displaying the note creator
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

//?  event listner for node removal
removeButton.addEventListener('click', (e) => {
    removeFlag = !removeFlag;
    if (removeFlag) {
        removeButton.style.backgroundColor = '#6a89cc';
    }
    else {
        removeButton.style.backgroundColor = '#2f3542';
    }

    let allNotes = document.querySelectorAll('.note')
    allNotes.forEach((note) => {
        note.addEventListener('click', (e) => {
            if (removeFlag) {
                ticketRemover(note)
            }
        })
    })

})

//? event listner for adding new note 
noteCreatorText.addEventListener('keydown', (e) => {
    let shiftPress = e.shiftKey;
    if (e.key === 'Enter' && shiftPress) {

        // geting values for the new ticket
        let ticketCont = noteCreatorText.value;
        let ticketColor = colorArray[getColor(colorOptions)];
        let ticketID = crypto.randomUUID().substring(1, 6);

        // generating ticket
        ticketCreator(ticketColor, ticketCont, ticketID, true);

        // removing display of note creator and reseting all values
        addFlag = false;
        noteCreator.style.display = 'none';

        // setting all values to default
        noteCreatorText.value = null;
        colorOptions.forEach(element => {
            element.classList.remove('border');
        });
        colorOptions[3].classList.add('border');


    }
})

// ! sorting based on display
let allColorChoices = document.querySelectorAll('.colorChoice');
allColorChoices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        // getting color of the option clicked on
        let colorChoosed = e.target.classList.value.split(' ')[0]

        let allNoteColors = document.querySelectorAll('.note-color')
        allNoteColors.forEach(note => {
            // getting all classes in the color div and splitting the result string based on ' ' (space) which gives an array as result
            let colorOfNote = note.classList.value.split(' ')[1];
            let parentElmnt = note.parentElement;
            if (colorChoosed === colorOfNote) {
                parentElmnt.style.display = 'block';
            }
            else {
                parentElmnt.style.display = 'none';
            }

        })
    })


    choice.addEventListener("dblclick", (e) => {
        let noteArray = document.querySelectorAll('.note');
        noteArray.forEach(note => {
            note.style.display = 'block';
        })
    })
})


// ! functions

//* ticket creation function
function ticketCreator(ticketColor, ticketText, ticketID, newTicket) {
    

    let noteConatiner = document.querySelector('.note-container');
    let note = document.createElement('div');
    note.classList.add('note');
    note.innerHTML = `
            <div class="note-color ${ticketColor} round-border"></div>
            <div class="note-ID">#${ticketID}</div>
            <div class="note-text round-border">${ticketText}</div>         `
    noteConatiner.appendChild(note);

    if (newTicket) {
        noteArray.push({ color: ticketColor, ID: `#${ticketID}`, text: ticketText });
        console.log(noteArray);    
        localStorage.setItem('jiraTicket', JSON.stringify(noteArray));
    }
    
}

//* getting the color value choosed by user
function getColor(colorChoice) {
    for (let index = 0; index < colorChoice.length; index++) {
        if (colorChoice[index].classList.contains('border')) {
            return index;
        }
    }
}

//* setting border for choosen color
colorOptions.forEach((color) => {
    color.addEventListener('click', (e) => {
        colorOptions.forEach(element => {
            element.classList.remove('border');
        });
        color.classList.add('border')
    })
})

function ticketRemover(note) {
    let noteId = note.querySelector('.note-ID').innerText;
    for (let index = 0; index < noteArray.length; index++) {
        if (noteArray[index].ID === (noteId) ) {
            noteArray.splice(index, 1);
            console.log(noteArray);
        }
    }
    localStorage.setItem('jiraTicket', JSON.stringify(noteArray));    
    note.remove()
}