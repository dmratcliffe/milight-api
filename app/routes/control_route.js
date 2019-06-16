module.exports = function(app, light_state){
    //type will be something like on, off, toggle
    //where zone will be the zone we want.
    app.get('/control/:type/:zone', (req, res)=>{
        var z_s = require('../classes/zone_sanitize');
        type = req.params.type;
        zone = req.params.zone;

        let zones = z_s.sanitize(zone);
        let response = "Success";
        zones.forEach(element => {
            //decide the state of the lights
            switch (type){
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
                    response = "Invalid command. Check documentation or spelling!";
                    break;
            }

            //act on the state of the lioght
        });

        //res.send(z_s.sanitize(zone));
        //res.send(light_state);
        res.send(light_state);
    });
}