var ConfigMgr = require("./configMgr");

function Common(){
    
}

Common.prototype.util = require("./util");
Common.prototype.configMgr = new ConfigMgr();
Common.prototype.singleton = {};

module.exports = new Common();