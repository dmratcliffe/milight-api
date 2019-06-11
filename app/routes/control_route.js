module.exports = function(app){
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res)=>{
        type = req.params.type;
        zone = req.params.zone;
        res.send("Hello World");
    });
}