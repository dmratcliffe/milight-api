module.exports = function (app, light_state){
    app.get("/status", (req,res) => {
        res.send(light_state);
    });
}