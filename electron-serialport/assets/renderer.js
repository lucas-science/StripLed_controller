// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const SerialPort = require("serialport")
const Readline = require("@serialport/parser-readline")
const electron = require('electron')
const remote = electron.remote;
const ipc = electron.ipcRenderer;
const fs = require("fs");

const express = require('express');
const app = express();

const Color_Input_Button = document.getElementById("color_input_submit")
const CLOSE_BUTTON = document.getElementById("CLOSE")


let REDslider = document.getElementById("RED_slider");
let GREENslider = document.getElementById("GREEN_slider");
let BLUEslider = document.getElementById("BLUE_slider");

let preview1 = document.getElementById("PREVIEW_COLOR_1")

// get data of json
let SettingDataRaw = fs.readFileSync("./settings/mode.json");
let SettingData = JSON.parse(SettingDataRaw);

// Get hold value in json file
let REDslider_Value = SettingData.mode1.RED
let Greenslider_Value = SettingData.mode1.GREEN
let Blueslider_Value = SettingData.mode1.BLUE
REDslider.value = REDslider_Value
GREENslider.value = Greenslider_Value
BLUEslider.value = Blueslider_Value

preview1.style = `background-color:rgb(${REDslider_Value},${Greenslider_Value},${Blueslider_Value});`

REDslider.oninput = function() {
    REDslider_Value = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value},${Greenslider_Value},${Blueslider_Value});`
}
GREENslider.oninput = function() {
    Greenslider_Value = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value},${Greenslider_Value},${Blueslider_Value});`
}
BLUEslider.oninput = function() {
    Blueslider_Value = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value},${Greenslider_Value},${Blueslider_Value});`
}


const port = new SerialPort("COM6", {
    baudRate: 9600
})
const lineStream = port.pipe(new Readline())

port.on('data', function(data) {
    console.log('Data:', data.toString())
})

Color_Input_Button.addEventListener('click', () => {
    data = {
        "RED": REDslider_Value,
        "GREEN": Greenslider_Value,
        "BLUE": Blueslider_Value
    }
    whatWrite(data)
    SettingData.mode1 = data
    let newData = JSON.stringify(SettingData);
    console.log(newData)

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });

})

CLOSE_BUTTON.addEventListener('click', () => {
    ipc.sendSync('close', "close_app");
})

function whatWrite(message) {
    const jsonStr = JSON.stringify(message);
    port.write(`${jsonStr}\n`, (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

}

app.get('/', (req, res, next) => {
    res.send("Hello world! Lala Seth is here!");
});
app.get('/LED_COLOR/:id', (req, res, next) => {
    const data = JSON.parse(req.params.id);
    res.send(data).status(202)
    whatWrite(data)
});
let server = app.listen(4000, function() {
    console.log('Express server listening on port ' + server.address().port);
});
module.exports = app;

// Set a timeout that will check for new serialPorts every 2 seconds.
// This timeout reschedules itself.