const express = require('express');
var light_promise = require('node-milight-promise').MilightController;
var light_commands = require('node-milight-promise').commandsV6;



var light_controller = new light_promise({
    ip: "192.168.1.100",
    delayBetweenCommands: 1,
    type: 'v6'
  });

const app = express();
const port = 1337;

var light_state = [0,0,0,0,0];

app.use(express.json());
require('./app/routes')(app, light_state, light_controller, light_commands);
app.listen(port, ()=>{
    console.log("It lives, port " + port);
});