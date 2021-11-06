// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const electron = require('electron')
const remote = electron.remote;
// Import the ipcRenderer Module from Electron
const ipc = electron.ipcRenderer;

const Color_Input = document.querySelector("#color_input")
const Color_Input_Button = document.getElementById("color_input_submit")
const CLOSE_BUTTON = document.getElementById("CLOSE")

let REDslider = document.getElementById("RED_slider");
let GREENslider = document.getElementById("GREEN_slider");
let BLUEslider = document.getElementById("BLUE_slider");

let REDslider_Value
let Greenslider_Value
let Blueslider_Value
REDslider.oninput = function() {
    REDslider_Value = this.value;
}
GREENslider.oninput = function() {
    Greenslider_Value = this.value;
}
BLUEslider.oninput = function() {
    Blueslider_Value = this.value;
}

const serialport = require('serialport')

console.log("hello world")

const SerialPort = require("serialport")
const Readline = require("@serialport/parser-readline")

const port = new SerialPort("COM6", {
    baudRate: 9600
})

const lineStream = port.pipe(new Readline())


port.on('data', function(data) {
    console.log('Data:', data.toString())
})

Color_Input_Button.addEventListener('click', () => {
    whatWrite([REDslider_Value, Greenslider_Value, Blueslider_Value])
    data = {
        "RED": REDslider_Value,
        "GREEN": Greenslider_Value,
        "BLUE": Blueslider_Value
    }
    const jsonStr = JSON.stringify(data);
    whatWrite(jsonStr)
})


CLOSE_BUTTON.addEventListener('click', () => {
    ipc.sendSync('close', "close_app");
})


function whatWrite(message) {
    port.write(`${message}\n`, (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

}

const express = require('express');
const app = express();


app.get('/', function(req, res) {
    res.send("Hello world! Lala Seth is here!");
});
let server = app.listen(4000, function() {
    console.log('Express server listening on port ' + server.address().port);
});
module.exports = app;

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.