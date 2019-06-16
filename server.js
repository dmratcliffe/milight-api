const express = require('express');

const app = express();
const port = 1337;

var light_state = [0,0,0,0,0];

app.use(express.json());
require('./app/routes')(app, light_state);
app.listen(port, ()=>{
    console.log("It lives, port " + port);
});