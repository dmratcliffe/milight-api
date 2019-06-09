const express = require('express');

const app = express();
const port = 1337;

app.use(express.json());
require('./app/routes')(app);
app.listen(port, ()=>{
    console.log("It lives, port " + port);
});