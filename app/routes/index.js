const basicContolRoute = require('./control_route');

module.exports = function(app, light_state){
    basicContolRoute(app, light_state);
}