module.exports = function (light_state, zones, light_controller, light_commands){
    zones.forEach(zone => {
        currentLight = light_state[zone]

        switch (currentLight.state) {
            case true:
            case 1:
                console.log("Turning on zone ->" + zone);
                light_controller.sendCommands(light_commands.fullColor.on(zone));
                break;
            case false:
            case 0:
                console.log("Turning off zone ->" + zone);
                light_controller.sendCommands(light_commands.fullColor.off(zone));
                break;
            default:
                console.log("The light is in an invalid state! ->" + light_state[zone]);
                break;
        }

        console.log("Setting zone ->" + zone + " brightness ->" + currentLight.brightness);
        light_controller.sendCommands(light_commands.fullColor.brightness(zone, currentLight.brightness));
    });
    
    console.log("Light state: ");
    console.log(light_state)
}