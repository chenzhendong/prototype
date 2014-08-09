var fs = require("fs");
var path = require("path");

function ConfigMgr(){
    
}

ConfigMgr.prototype.INIT_CONFIG_FILE = 'config_init.json';
ConfigMgr.prototype.CURRENT_CONFIG_FILE = 'config_current.json';

ConfigMgr.prototype.init = function() {
    var prjRoot = path.resolve(__dirname, '..', '..', '..');
    var curFile = path.resolve(prjRoot, 'lib', this.CURRENT_CONFIG_FILE);
    var initFile = path.resolve(prjRoot, 'lib',this.INIT_CONFIG_FILE);
    
    if(!fs.existsSync(curFile)){
        this.configFile = initFile;
    } else {
        this.configFile = curFile;
    }
    var content = fs.readFileSync(this.configFile);
    this.config = JSON.parse(content);
    this.config.projectRoot = prjRoot;
    
    if(!fs.existsSync(curFile)){
        this.saveConfigToFile(curFile, this.config);
    }
};

ConfigMgr.prototype.saveConfigToFile = function(path, config) {
    fs.writeFile(path, JSON.stringify(config), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("The Config file was saved!");
        }
    }); 
}

module.exports = ConfigMgr;
