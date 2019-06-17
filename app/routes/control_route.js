module.exports = function (app, light_state) {
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res) => {
        console.log("BEGIN CONTROL COMMAND");
        
        var z_s = require('../classes/zone_sanitize');
        type = req.params.type;
        zone = req.params.zone;

        let error_flag = 0;

        let zones = z_s.sanitize(zone);
        zones.forEach(element => {
            //decide the state of the lights
            switch (type) {
                case "on":
                    light_state[element] = 1;
                    break;
                case "off":
                    light_state[element] = 0;
                    break;
                case "toggle":
                    light_state[element] = !light_state[element];
                    break;
                default:
                    error_flag++;
                    console.log("The command wasn't found. Check your documentation or spelling! ->" + light_state[element] + " ->" + type);
                    break;
            }

            //act on the state of the lioght
            switch (light_state[element]) {
                case true:
                case 1:
                    console.log(true);
                    break;
                case false:
                case 0:
                    console.log(false);
                    break;
                default:
                    error_flag++;
                    console.log("The light is in an invalid state! ->" + light_state[element]);
                    break;
            }
        });
        if(error_flag)
            res.send("There was multiple errors trying to execute your command. (" + error_flag + ")");
        else
            res.send("Succesfully ran '" + type + "' on " + zones.length + " light(s)");

        console.log("END CONTROL COMMAND");
    });
}