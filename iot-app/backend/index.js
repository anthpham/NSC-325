const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const app = express();
const port = 5000;

app.use(cors());
app.get("/", (req, res) => {
  var dataToSend;
  const python = spawn("python", ["temp.py"]);
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script...");
    dataToSend = data.toString();
  });
  python.on("close", (code) => {
    console.log(`Child process close all stdio with code ${code}`);
    res.send(dataToSend);
  });
});
app.listen(port, () => console.log(`Example app listen on port ${port}!`));
