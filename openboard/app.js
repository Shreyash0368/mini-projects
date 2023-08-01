const express = require('express');
const socket = require('socket.io');

const app = express()
let port = 3000;

app(express.static('client'));

let server = app.listen(port, () => {
    console.log("listening to port 3000");
})