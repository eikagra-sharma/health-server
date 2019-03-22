var express = require('express');
var app = express();
var path = require('path');
var http = require("http").Server(app);
var io = require('socket.io').listen(http);

var port = process.env.port || 8000;

app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
app.use('/patient', express.static(path.join(__dirname, 'patient')));
app.use('/doctor', express.static(path.join(__dirname, 'doctor')));

// viewed at http://localhost:8000/patient
app.get('/patient', function (req, res) {
    res.sendFile(path.join(__dirname + '/patient/index.html'));
});

// viewed at http://localhost:8000/doctor
app.get('/doctor', function (req, res) {
    res.sendFile(path.join(__dirname + '/doctor/index.html'));
});

// what to do when connection happens
io.sockets.on('connection', function (socket) {
    // if patientHeartRate received
    socket.on('patientHeartRate', function (data) {
        // emit the rate to all connections except the patient
        socket.broadcast.emit('patientHeartRate', {
            'heartRate' : data.heartRate
        });
    });

    // if stream received
    socket.on('stream', function(image) {
        // emit stream to all other connections i.e. doctor
        socket.broadcast.emit('stream', image);
    });
});

http.listen(port, function() {
    console.log("Server running at port " + port);
});