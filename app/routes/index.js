const basicContolRoute = require('./control_route');

module.exports = function(app, light_state, light_promise, light_commands){
    basicContolRoute(app, light_state, light_promise, light_commands);
}