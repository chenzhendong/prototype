"use strict";
var rest = require("./rest");
var common = require("./common");

common.configMgr.init();
var server = new rest.Server();

server.start();