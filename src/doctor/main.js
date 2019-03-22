// Frontend JS file for doctor
const socket = io.connect('http://localhost:8000');

let heartRateDisplay = document.getElementById("curHeartRate");
let displayElem = document.getElementById("patientVideo");
let initHeartRate = 70;
let videoImgData = [];

function updateCurHeartRate(heartRate) {
    heartRateDisplay.innerHTML = heartRate;
}

// if patient heart rate received from server
socket.on('patientHeartRate', function (data) {
    // update display to doctor
    updateCurHeartRate(data.heartRate);
});

socket.on('stream', function (binary_img) {
    videoImgData.push(binary_img);
    displayElem.setAttribute('src', window.btoa(videoImgData.pop()));
});