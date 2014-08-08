var fs =require("fs");

function ConfigMgr(){
    
}

ConfigMgr.prototype.INIT_CONFIG_FILE = 'config_init.json';
ConfigMgr.prototype.CURRENT_CONFIG_FILE = 'config_current.json';

ConfigMgr.prototype.init = function(dirname) {
    var curFile = dirname+"/"+this.CURRENT_CONFIG_FILE;
    var initFile = fs.readFileSync(dirname+"/"+this.INIT_CONFIG_FILE);
    this.configFile = fs.existsSync(curFile)?curFile:initFile;
    this.config = JSON.parse(fs.readFileSync(this.configFile));
    
    if(!fs.existsSync(curFile)){
        this.saveConfigToFile(this.config);
    }
};

ConfigMgr.prototype.saveConfigToFile = function(config) {
    fs.writeFile(this.configFile, config, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The Config file was saved!");
        }
    }); 
}

module.exports = ConfigMgr;
