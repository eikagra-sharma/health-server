const socket = io.connect('http://localhost:8000');
let heartRateDisplay = document.getElementById("curHeartRate");
let initHeartRate = 70;
const FPS = 20; // frames per second

let videoElm = document.getElementById("video");
var canvas = document.getElementById("preview");
var canvasContext = canvas.getContext("2d");
canvas.width = 480;
canvas.height = 350;
canvasContext.width = canvas.width;
canvasContext.height = canvas.height;

function handleLocalMediaStreamError() {
    console.log("Camera not connected");
}
function gotLocalMediaStream(mediaStream) {
    videoElm.srcObject = mediaStream;
    // videoElm.src = window.URL.createObjectURL(stream);
}
function sendLiveVideo(video, context) {
    context.drawImage(video,0,0);
    socket.emit('stream', canvas.toDataURL('image/png'));
}

function updateCurHeartRate(heartRate) {
    heartRateDisplay.innerHTML = heartRate;
}

setInterval(() => {
    initHeartRate = Math.max(70, (initHeartRate + 1) % 130);
    updateCurHeartRate(initHeartRate)
    socket.emit('patientHeartRate', {
        heartRate: initHeartRate
    });
}, 1000);

const mediaStreamConstraints = {
    video: true,
    audio: false
};

window.onload = function() {
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
        .then(gotLocalMediaStream).catch(handleLocalMediaStreamError);

    setInterval(function () {
        sendLiveVideo(videoElm, canvasContext);
    }, 1000 / FPS);
}

