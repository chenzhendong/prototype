var Route = require("./route");
var RestServer = require("./restServer");


function Rest(){
    
}

Rest.prototype.Route = Route;
Rest.prototype.RestServer = RestServer;

module.exports = new Rest();