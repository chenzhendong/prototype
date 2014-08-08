
function UserService(userDao, helper) {
    this.userDao = userDao;
    this.helper = helper;
}

UserService.prototype.handleRequest = function(pathElements, req, res) {
    var action = req.action;
    var helper = this.helper;
    
    switch (action) {
    case 'get':
        this.handleGet(pathElements, req, res);
        break;
    case 'post':
        var id = pathElements.shift();
        if (!id) {
            this.userDao.create(req.body, function(err, user) {
                helper.restResponse(res, err, user);
            });
        }
        break;
    case 'put':
        id = pathElements.shift();
        if (id) {
            this.userDao.update({
                "_id": id
            }, req.body, function(err, user) {
                helper.restResponse(res, err, user);
            });
        }
        break;
    case 'delete':
        id = pathElements.shift();
        if (id) {
            this.userDao.delete({
                "_id": id
            }, function(err) {
                helper.restResponse(res, err);
            });
        }
        break;
    }

}

UserService.prototype.handleGet = function(pathElements, req, res) {
    var id = pathElements.shift();
    var helper = this.helper;
    var query = helper.buildQuery(req.query);
    
    if (!id) {
        this.userDao.find({}, function(err, users) {
            helper.restResponse(res, err, users);
        });
    }
    else {
        this.userDao.find({
            '_id': id
        }, function(err, users) {
            helper.restResponse(res, err, users[0]);
        });
    }
}

module.exports = UserService;