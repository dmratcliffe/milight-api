//Command looks like:
//set the brightness of {the bedroom} to {percent}


module.exports = function(app, light_state, light_controller, light_commands){
    app.get("/brightness/:zone/:percent", (req, res) => {
        curTime = new Date();
        console.log("BEGIN BRIGHTNESS COMMAND ->" + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds());
        
        zone = req.params.zone;
        percent = req.params.percent;
        var z_s = require('../classes/zone_sanitize');

        let zones = z_s.sanitize(zone);

        zones.forEach(zone => {
            light_state[zone].brightness = percent;
        });

        require('../classes/state_handler')(light_state, zones, light_controller, light_commands);

        res.send(light_state)

        console.log("END BRIGHTNESS COMMAND");
    });
}