var common = require("../../common");
var expressInstance = require('express');
var bodyParser = require('body-parser');
var Route = require("./route");
var db = require("../../db");
var path = require("path");


function Server() {
    
    if(common.singleton.server){
        return common.singleton.server;
    } else{
        
        this.config = common.configMgr.config;
        var express = expressInstance();
        this.express = express;
    
        express.use(bodyParser.json());
        express.use(bodyParser.urlencoded({
            extended: true
        }));
        
        
        var mongoose = new db.Mongoose();
        mongoose.userDao = new db.dao.UserDao(mongoose);
        express.mongoose = mongoose;
        
        var publicPath = path.resolve(this.config.common.projectRoot.value,'public');
        express.use('/', expressInstance.static(publicPath));
        this.route = new Route(express, this.config);
        common.singleton.server = this;
    }
    
}

Server.prototype.start = function() {
    var config = this.config;
    this.express.listen(config.server.hostPort.value, config.server.hostIp.value);
}

module.exports = Server;