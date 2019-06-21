module.exports = function (app, light_state, light_promise, light_commands) {
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res) => {
        curTime = new Date();
        console.log("BEGIN CONTROL COMMAND ->" + curTime.getHours() + ":" + curTime.getMinutes() + ":" + curTime.getSeconds());
        
        var z_s = require('../classes/zone_sanitize');
        type = req.params.type;
        zone = req.params.zone;
        
        let zones = z_s.sanitize(zone);
        zones.forEach(zone => {
            //decide the state of the lights
            curState = light_state[zone].state;

            switch (type) {
                case "on":
                    curState = 1;
                    break;
                case "off":
                    curState = 0;
                    break;
                case "toggle":
                    curState = !curState;
                    curState = curState ? 1 : 0;
                    break;
                default:
                    error_flag++;
                    console.log("The command wasn't found. Check your documentation or spelling! ->" + light_state[zone] + " ->" + type);
                    break;
            }

            light_state[zone].state = curState;
        });

        require('../classes/state_handler')(light_state, zones, light_promise, light_commands);

        res.send(light_state);

        console.log("END CONTROL COMMAND");
    });
}