module.exports = function (app, light_state, light_promise, light_commands) {
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res) => {
        console.log("BEGIN CONTROL COMMAND");
        
        var z_s = require('../classes/zone_sanitize');
        type = req.params.type;
        zone = req.params.zone;

        let error_flag = 0;

        let zones = z_s.sanitize(zone);
        zones.forEach(zone => {
            //decide the state of the lights
            switch (type) {
                case "on":
                    light_state[zone] = 1;
                    break;
                case "off":
                    light_state[zone] = 0;
                    break;
                case "toggle":
                    light_state[zone] = !light_state[zone];
                    break;
                default:
                    error_flag++;
                    console.log("The command wasn't found. Check your documentation or spelling! ->" + light_state[zone] + " ->" + type);
                    break;
            }

            //act on the state of the lioght
            switch (light_state[zone]) {
                case true:
                case 1:
                    console.log("Turning on zone ->" + zone);
                    light_promise.sendCommands(light_commands.fullColor.on(zone));
                    break;
                case false:
                case 0:
                    console.log("Turning off zone ->" + zone);
                    light_promise.sendCommands(light_commands.fullColor.off(zone));
                    break;
                default:
                    error_flag++;
                    console.log("The light is in an invalid state! ->" + light_state[zone]);
                    break;
            }
        });
        let response = "Succesfully ran '" + type + "' on " + zones.length + " light(s)"
        if(error_flag)
            response = "There was multiple errors trying to execute your command. (" + error_flag + ")";
        
        console.log(response);
        res.send(response);

        console.log("END CONTROL COMMAND");
    });
}