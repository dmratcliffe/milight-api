//Command looks like:
//set the brightness of {the bedroom} to {percent}


module.exports = function(app, light_state, light_controller, light_commands){
    app.get("/brightness/:zone/:percent", (req, res) => {
        zone = req.params.zone;
        percent = req.params.percent;
        var z_s = require('../classes/zone_sanitize');

        let zones = z_s.sanitize(zone);

        zones.forEach(zone => {
            light_state[zone].brightness = percent;
            light_controller.sendCommands(light_commands.fullColor.brightness(zone, percent));
        });
    });
}