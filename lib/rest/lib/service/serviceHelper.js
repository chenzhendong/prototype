function ServiceHelper(config){
    this.config = config;
}

ServiceHelper.prototype.restResponse = function(res, err, content) {
    if (err) {
        res.status(500).send(err);
    }
    else {
        if(content){
            res.status(200).send(content);
        } else {
            res.status(200).end();
        }
    }
}

ServiceHelper.prototype.buildQuery = function(query) {
    
}



module.exports = ServiceHelper;