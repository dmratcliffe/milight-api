module.exports = function(app){
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res)=>{
        var z_s = require('../classes/zone_sanitize');
        type = req.params.type;
        zone = req.params.zone;
        res.send(z_s.sanitize(zone));
    });
}