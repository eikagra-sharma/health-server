# health-server

## About
This setup involves a patient sending mock heart rate data to the server using Socket.io. The server broadcasts this data to the doctor in real-time.

## Setup
- src folder contains the code for patient, server, and doctor
- patient folder has a js application that sends mock heart rate data to the server
- The server is just index.js
- doctor folder denotes the receiving end of heart rate data

## Installation
- Clone the repository
- Install Node.js
- Run npm install
- Run npm start

## Demo
- Visit localhost:8000/patient
- Visit localhost:8000/doctor
