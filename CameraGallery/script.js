// aqciring the elements for photo and image capture
let video = document.querySelector(".camera-display");
let recordCont = document.querySelector(".record-cont");
let recordButton = document.querySelector(".record-button");
let captureCont = document.querySelector(".capture-cont");
let captureButton = document.querySelector(".capture-button");

// util variables for recording 
let recorder;
let recordFlag = false;
let recordedChunks = [];

// timer variables
let timer = document.querySelector(".record-timer");
let hrs = 0;
let mins = 0;
let sec = 0;
let interval;

// filter vars
let allFilters = document.querySelectorAll(".filter");
let filterColor = "rgba(0, 0, 0, 0)";
let filterDisplay = document.querySelector(".filter-display");

(async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        video.srcObject = stream;

        recorder = new MediaRecorder(stream);

        recorder.ondataavailable = (event) => {
            recordedChunks.push(event.data);
        };

        recorder.onstart = () => {
            recordedChunks = [];
        };

        recorder.onstop = () => {
            let blob = new Blob(recordedChunks, { type: "video/mp4" });
            const fileName = prompt("Enter the file name:");
            
            if (db) {
                const transaction = db.transaction(["video"], 'readwrite');
                const videoStore = transaction.objectStore("video");
                
                let id = crypto.randomUUID().substring(1, 6);
                videoStore.put({id: `${id}`, name: fileName, fileBlob: blob});                
            }           
            
        }

    } catch (error) {
        alert("Could not get video/audio data!\nPlease enable the required permissions in settings or check the device connection");
    }
})(); // this is an immediately invoked async function expression (IIFE)

recordCont.addEventListener("click", (e) => {
    if (video.srcObject === null) return;

    recordFlag = !recordFlag;

    if (recordFlag) {
        recordButton.classList.add("record-animation");
        recorder.start();
        startTimer();
    }
    else {
        recordButton.classList.remove("record-animation");
        recorder.stop();
        stopTimer();
    }
})

captureCont.addEventListener("click", (e) => {
    if (video.srcObject === null) return;
    captureButton.classList.add("capture-animation");

    setTimeout(function () {
        captureButton.classList.remove("capture-animation");
    }, 1100);

    let canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.fillStyle =filterColor;    
    context.fillRect(0, 0, canvas.width, canvas.height);

    const fileName = prompt("Enter the file name:");

    canvas.toBlob((blob) => {
        if (db) {
            const transaction = db.transaction(["image"], 'readwrite');
            const imageStore = transaction.objectStore("image");

            let id = crypto.randomUUID().substring(1, 6);
            imageStore.put({id: `${id}`, name: fileName, fileBlob: blob});                
        }
    });    
})

document.addEventListener('DOMContentLoaded', function () {
    var context = new AudioContext();
    context.suspend();
});


function startTimer() {
    hrs = sec = mins = 0;
    clearInterval(interval);
    interval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    timer.style.display = 'flex';

    sec++;
    if (sec === 60) {
        mins++;
        sec = 0;
    }
    if (mins === 60) {
        hrs++;
        mins = 0;
    }

    const time = `${padNumber(hrs)}:${padNumber(mins)}:${padNumber(sec)}`;
    // timer.innerText = time;
    timer.textContent = time;
}

function padNumber(number) {
    return number.toString().padStart(2, 0);
}

function stopTimer() {
    clearInterval(interval);
    hrs = mins = sec = 0;
    timer.textContent = "00:00:00";
    timer.style.display = 'none';
}

// applying filters to the images
allFilters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
        filterColor = getComputedStyle(filter).backgroundColor;
        console.log(filterColor);
        filterDisplay.style.backgroundColor = filterColor
    })
})