var restify = require('restify');
var Route = require("./route")
var db = require("../../db");

function RestServer(config){
    this.server = restify.createServer();
    this.config = config;
    var mongoose = new db.Mongoose(config);
    mongoose.userDao = new db.dao.UserDao(mongoose);
    this.server.mongoose = mongoose;
    var route = new Route(this, config);
}

RestServer.prototype.start = function () {
    var config = this.config;
    this.server.listen(config.hostPort, config.hostIp);
}

module.exports = RestServer;