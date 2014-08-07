var helper = require("./restResponseHelper");

function UserService(userDao){
    this.userDao = userDao;
}

UserService.prototype.handleRequest = function (pathElements, req, res) {
    var action = req.action;
    var id = pathElements.shift();
    switch(action){
        case 'get':
            if(!id){
                this.userDao.find({}, function(err, users){
                       helper.restResponse(res, err, users);
                    });
            } else {
                this.userDao.find({'_id': id}, function(err, users){
                        helper.restResponse(res, err, users[0]);
                    });
            }
            break;
        case 'post':
            if(!id){
                this.userDao.create(req.body, function(err, user){
                        helper.restResponse(res, err, user);
                    });
            }
            break;
        case 'put':
            if(id){
                this.userDao.update({"_id": id}, req.body, function(err, user){
                        helper.restResponse(res, err, user);
                    });
            }
            break;
        case 'delete':
            if(id){
                this.userDao.delete({"_id": id}, function(err){
                        helper.restResponse(res, err);
                    });
            }
            break;
    }
    
}

module.exports = UserService;