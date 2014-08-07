var express = require('express');
var bodyParser = require('body-parser');
var Route = require("./route")
var db = require("../../db");

function RestServer(config) {
    var server = express();
    this.server = server;

    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    }));

    this.config = config;
    var mongoose = new db.Mongoose(config);
    mongoose.userDao = new db.dao.UserDao(mongoose);
    server.mongoose = mongoose;
    
    var route = new Route(server, config);
}

RestServer.prototype.start = function() {
    var config = this.config;
    this.server.listen(config.hostPort, config.hostIp);
}

module.exports = RestServer;