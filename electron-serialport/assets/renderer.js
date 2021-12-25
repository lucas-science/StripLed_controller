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
let port
    // get data of json
let SettingDataRaw = fs.readFileSync("./settings/mode.json");
let SettingData = JSON.parse(SettingDataRaw);

const SelectPort = document.getElementById('SelectPort')

SerialPort.list().then(ports => {
    ports.forEach(port => {
        console.log(port.path)
        let opt = document.createElement('option');
        opt.value = port.path;
        opt.innerHTML = port.path;
        SelectPort.appendChild(opt);
    });
    if (SelectPort.options.length - 1 < SettingData.PORT) {
        SelectPort.options.selectedIndex = 0
    } else {
        SelectPort.options.selectedIndex = SettingData.PORT
    }
    // connect to the PORT
    try {
        port = new SerialPort(SelectPort.options[SettingData.PORT].text, {
            baudRate: 9600
        })
        const lineStream = port.pipe(new Readline())

        port.on('data', function(data) {
            console.log('Data:', data.toString())
        })
    } catch (e) {
        console.log(e)
    }

})

SelectPort.addEventListener('change', () => {
    SettingData.PORT = SelectPort.options.selectedIndex
    let newData = JSON.stringify(SettingData);

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });

    try {
        port = new SerialPort(SelectPort.options[SettingData.PORT].text, {
            baudRate: 9600
        })
        const lineStream = port.pipe(new Readline())

        port.on('data', function(data) {
            console.log('Data:', data.toString())
        })
    } catch (e) {
        console.log(e)
    }
})

// get DOM elements
const CLOSE_BUTTON = document.getElementById("CLOSE")
const Color_Input_Button1 = document.getElementById("color_input_submit1")
const Color_Input_Button2 = document.getElementById("color_input_submit2")
const Color_Input_Button3 = document.getElementById("color_input_submit3")


let REDslider1 = document.getElementById("RED_slider1");
let GREENslider1 = document.getElementById("GREEN_slider1");
let BLUEslider1 = document.getElementById("BLUE_slider1");
let REDslider2 = document.getElementById("RED_slider2");
let GREENslider2 = document.getElementById("GREEN_slider2");
let BLUEslider2 = document.getElementById("BLUE_slider2");
let REDslider3 = document.getElementById("RED_slider3");
let GREENslider3 = document.getElementById("GREEN_slider3");
let BLUEslider3 = document.getElementById("BLUE_slider3");

let preview1 = document.getElementById("PREVIEW_COLOR_1")
let preview2 = document.getElementById("PREVIEW_COLOR_2")
let preview3 = document.getElementById("PREVIEW_COLOR_3")


// Get hold value in json file
let REDslider_Value1 = SettingData.mode1.RED
let Greenslider_Value1 = SettingData.mode1.GREEN
let Blueslider_Value1 = SettingData.mode1.BLUE
let REDslider_Value2 = SettingData.mode2.RED
let Greenslider_Value2 = SettingData.mode2.GREEN
let Blueslider_Value2 = SettingData.mode2.BLUE
let REDslider_Value3 = SettingData.mode3.RED
let Greenslider_Value3 = SettingData.mode3.GREEN
let Blueslider_Value3 = SettingData.mode3.BLUE

REDslider1.value = REDslider_Value1
GREENslider1.value = Greenslider_Value1
BLUEslider1.value = Blueslider_Value1
REDslider2.value = REDslider_Value2
GREENslider2.value = Greenslider_Value2
BLUEslider2.value = Blueslider_Value2
REDslider3.value = REDslider_Value3
GREENslider3.value = Greenslider_Value3
BLUEslider3.value = Blueslider_Value3

preview1.style = `background-color:rgb(${REDslider_Value1},${Greenslider_Value1},${Blueslider_Value1});`
preview2.style = `background-color:rgb(${REDslider_Value2},${Greenslider_Value2},${Blueslider_Value2});`
preview3.style = `background-color:rgb(${REDslider_Value3},${Greenslider_Value3},${Blueslider_Value3});`

let Opacityslider = document.getElementById("Opacity");
let Opacityslider_Value
Opacityslider.value = SettingData.opacity

// on change SLIDER 1
REDslider1.oninput = function() {
    REDslider_Value1 = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value1},${Greenslider_Value1},${Blueslider_Value1});`
}
GREENslider1.oninput = function() {
    Greenslider_Value1 = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value1},${Greenslider_Value1},${Blueslider_Value1});`
}
BLUEslider1.oninput = function() {
    Blueslider_Value1 = this.value;
    preview1.style = `background-color:rgb(${REDslider_Value1},${Greenslider_Value1},${Blueslider_Value1});`
}

// on change SLIDER 2
REDslider2.oninput = function() {
    REDslider_Value2 = this.value;
    preview2.style = `background-color:rgb(${REDslider_Value2},${Greenslider_Value2},${Blueslider_Value2});`
}
GREENslider2.oninput = function() {
    Greenslider_Value2 = this.value;
    preview2.style = `background-color:rgb(${REDslider_Value2},${Greenslider_Value2},${Blueslider_Value2});`
}
BLUEslider2.oninput = function() {
    Blueslider_Value2 = this.value;
    preview2.style = `background-color:rgb(${REDslider_Value2},${Greenslider_Value2},${Blueslider_Value2});`
}

// on change SLIDER 3
REDslider3.oninput = function() {
    REDslider_Value3 = this.value;
    preview3.style = `background-color:rgb(${REDslider_Value3},${Greenslider_Value3},${Blueslider_Value3});`
}
GREENslider3.oninput = function() {
    Greenslider_Value3 = this.value;
    preview3.style = `background-color:rgb(${REDslider_Value3},${Greenslider_Value3},${Blueslider_Value3});`
}
BLUEslider3.oninput = function() {
    Blueslider_Value3 = this.value;
    preview3.style = `background-color:rgb(${REDslider_Value3},${Greenslider_Value3},${Blueslider_Value3});`
}

// change opacity of each preview
Opacityslider.oninput = function() {
    Opacityslider_Value = this.value;
    preview1.style = `background-color:rgba(${REDslider_Value1},${Greenslider_Value1},${Blueslider_Value1},${Opacityslider_Value/100});`
    preview2.style = `background-color:rgba(${REDslider_Value2},${Greenslider_Value2},${Blueslider_Value2},${Opacityslider_Value/100});`
    preview3.style = `background-color:rgba(${REDslider_Value3},${Greenslider_Value3},${Blueslider_Value3},${Opacityslider_Value/100});`
        /*
        data = {
            "TITLE": "OPACITY",
            "OPACITY": Opacityslider_Value
        }
        whatWrite(data)*/

    SettingData.opacity = Opacityslider_Value
    let newData = JSON.stringify(SettingData);
    console.log(newData)

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });
}



/**
 * Send data of each mode trough PORT
 */

Color_Input_Button1.addEventListener('click', () => {
    data = {
        "TITLE": "COLOR",
        "MODE": 1,
        "RED": REDslider_Value1,
        "GREEN": Greenslider_Value1,
        "BLUE": Blueslider_Value1
    }
    whatWrite(data)
    SettingData.mode1 = {
        "RED": REDslider_Value1,
        "GREEN": Greenslider_Value1,
        "BLUE": Blueslider_Value1
    }
    let newData = JSON.stringify(SettingData);
    console.log(newData)

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });
})

Color_Input_Button2.addEventListener('click', () => {
    data = {
        "TITLE": "COLOR",
        "MODE": 2,
        "RED": REDslider_Value2,
        "GREEN": Greenslider_Value2,
        "BLUE": Blueslider_Value2
    }
    whatWrite(data)
    SettingData.mode2 = {
        "RED": REDslider_Value2,
        "GREEN": Greenslider_Value2,
        "BLUE": Blueslider_Value2
    }
    let newData = JSON.stringify(SettingData);
    console.log(newData)

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });
})

Color_Input_Button3.addEventListener('click', () => {
    data = {
        "TITLE": "COLOR",
        "MODE": 3,
        "RED": REDslider_Value3,
        "GREEN": Greenslider_Value3,
        "BLUE": Blueslider_Value3
    }
    whatWrite(data)
    SettingData.mode3 = {
        "RED": REDslider_Value3,
        "GREEN": Greenslider_Value3,
        "BLUE": Blueslider_Value3
    }
    let newData = JSON.stringify(SettingData);
    console.log(newData)

    fs.writeFileSync("./settings/mode.json", newData, (err) => {
        if (err) throw err;
        console.log("New data added");
    });
})




// to close the app
CLOSE_BUTTON.addEventListener('click', () => {
    ipc.sendSync('close', "close_app");
})

// to send data trough PORT choose
function whatWrite(message) {
    const jsonStr = JSON.stringify(message);
    port.write(`${jsonStr}\n`, (err) => {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        console.log('message written');
    });

}

// set up web server, that is in local network
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