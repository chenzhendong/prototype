"use strict";

var rest = require("./rest");

var server = new rest.RestServer({
    hostIp: process.env.IP, 
    hostPort: process.env.PORT,
    mongoDbUrl: 'mongodb://localhost/popyoyo'
});

server.start();