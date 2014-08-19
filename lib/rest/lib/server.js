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
        this.initAdmin(mongoose.userDao);
    }
    
}

Server.prototype.start = function() {
    var config = this.config;
    this.express.listen(config.server.hostPort.value, config.server.hostIp.value);
}

Server.prototype.initAdmin = function (userDao) {
    
    userDao.find({"login.username": "admin"}, {}, {}, function(err, users){
         if(err){
            console.log(err);
            process.exit(1);
         } else if (users.length === 0){
            var adminUser = {
                person: {first: 'Zhendong', last: 'Chen', birthday: new Date(1975, 08, 3)},
                address: {line1: '12308 Ambleside Dr', city: 'Potomac', state: 'MD', postalCode: '20854'},
                email: 'chenzhendong@yahoo.com',
                login: {username: 'admin', password: 'admin'}};
                
            userDao.create(adminUser, function(err, user) {
                console.log("create admin user with id:"+ user._id);
            });            
            
         } else if (users.length > 1){
            console.log("More than 1 admin user found.");
            process.exit(1); 
         } 
    });    
}

module.exports = Server;