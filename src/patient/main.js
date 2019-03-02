const socket = io.connect('http://localhost:8000');
let heartRateDisplay = document.getElementById("curHeartRate");
let initHeartRate = 70;

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

