const basicContolRoute = require('./control_route');
const brightnessRoute = require('./brightness_route');
const statusRoute = require('./status_route');

module.exports = function(app, light_state, light_promise, light_commands){
    basicContolRoute(app, light_state, light_promise, light_commands);
    brightnessRoute(app, light_state, light_promise, light_commands);
    statusRoute(app, light_state);
}
