const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const app = express();
const port = 5000;
const fs = require('fs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const DEVICE_NAMES = './../data/device-names.json';
const DEVICE_LIST = './../data/sample-data.json';
const DEVICE_LIST_2 = './../data/sample-data-2.json';


app.use(cors());
app.get("/names", (req, res) => {
  fs.readFile(DEVICE_NAMES, 'utf8', (err, deviceData) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const devices = JSON.parse(deviceData);
        res.send(devices);
    }
  });
});
app.use(cors());
app.get("/devices", (req, res) => {
  fs.readFile(DEVICE_LIST, 'utf8', (err, deviceData) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const devices = JSON.parse(deviceData);
        res.send(devices);
    }
  });
});
app.get("/devices2", (req, res) => {
  fs.readFile(DEVICE_LIST_2, 'utf8', (err, deviceData) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        const devices = JSON.parse(deviceData);
        res.send(devices);
    }
  });
});
app.get("/close", (req, res) => {
  fs.readFile(NEW_DEVICE_NAMES, 'utf8', (err, deviceData) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
      fs.writeFile(DEVICE_NAMES, deviceData, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
      });
    }
  });
});
app.post('/updatename', (req, res) => {  
  response = {
    mac: req.body.mac,
    name: req.body.name,
  };

  fs.readFile(DEVICE_NAMES, 'utf8', (err, deviceData) => {
    if (err) {
        console.log(`Error reading file from disk: ${err}`);
    } else {
        deviceNames = JSON.parse(deviceData);
        deviceNames[response.mac] = response.name;
        newDeviceNames = JSON.stringify(deviceNames);
        fs.writeFile(NEW_DEVICE_NAMES, newDeviceNames, (err) => {
          if (err)
            console.log(err);
          else {
            console.log("File written successfully\n");
          }
        });
    }
  });
})  

app.listen(port, () => console.log(`Example app listen on port ${port}!`));
