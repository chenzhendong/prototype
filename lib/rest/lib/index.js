var Route = require("./route");
var Server = require("./server");


function Rest(){
    
}

Rest.prototype.Route = Route;
Rest.prototype.Server = Server;

module.exports = new Rest();