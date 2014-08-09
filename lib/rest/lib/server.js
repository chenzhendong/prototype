var expressInstance = require('express');
var bodyParser = require('body-parser');
var Route = require("./route");
var db = require("../../db");
var path = require("path");
var common = require("../../common");

function Server() {
    var config = common.configMgr.config;
    var express = expressInstance();
    this.express = express;

    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({
        extended: true
    }));
    
    this.config = config;
    var mongoose = new db.Mongoose(config);
    mongoose.userDao = new db.dao.UserDao(mongoose);
    express.mongoose = mongoose;
    
    var publicPath = path.resolve(config.projectRoot,'public');
    express.use('/', expressInstance.static(publicPath));
    var route = new Route(express, config);
}

Server.prototype.start = function() {
    var config = this.config;
    this.express.listen(config.hostPort || process.env.PORT, config.hostIp || process.env.IP);
}

module.exports = Server;