// display of note creator
let addButton = document.querySelector('.add');
let noteDisplay = false;
let noteCreator = document.querySelector('.note-creator')
let noteCreatorText = document.querySelector('.textarea-cont')
let noteConatiner = document.querySelector('.note-container') 

addButton.addEventListener('click', (e) => {
    noteDisplay = !noteDisplay;

    if (noteDisplay) {
        noteCreator.style.display = 'flex'
    }
    else {
        noteCreator.style.display = 'none'

    }
}) 

noteCreatorText.addEventListener('keydown', (e) => {    
    let shiftPress = e.shiftKey;
    if (e.key === 'Enter' && shiftPress) {
        let note = document.createElement('div');
        note.classList.add('note');
        note.innerHTML = `
            <div class="note-color lightblue round-border"></div>
            <div class="note-ID">#12dfgt</div>
            <div class="note-text round-border">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sint dolores totam
                ducimus laudantium dolor possimus non distinctio minima magni.</div> 
        `
        noteConatiner.appendChild(note)
        noteDisplay = false;
        noteCreator.style.display = 'none'
        noteCreatorText.value = null;
    }
})