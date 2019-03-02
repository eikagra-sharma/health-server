// Frontend JS file for doctor
const socket = io.connect('http://localhost:8000');

let heartRateDisplay = document.getElementById("curHeartRate");
let initHeartRate = 70;

function updateCurHeartRate(heartRate) {
    heartRateDisplay.innerHTML = heartRate;
}

// if patient heart rate received from server
socket.on('patientHeartRate', function (data) {
    // update display to doctor
    updateCurHeartRate(data.heartRate);
});
