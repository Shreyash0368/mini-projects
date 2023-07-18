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
            let url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "video-stream.mp4";
            a.click();

            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 1000);
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

