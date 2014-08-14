var uuid = require("uuid");
var moment = require("moment");

function UserService(mongoose, helper) {
    this.userDao = mongoose.userDao;
    this.helper = helper;
    this.activeTokenList = {};
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
    case 'patch':
        id = pathElements.shift();
        if (id) {
            this.userDao.update({
                "_id": id
            }, req.body, function(err, numberAffected) {
                var content;
                if(numberAffected > 0){
                    content = numberAffected + " record updated!";
                }
                helper.restResponse(res, err, content);
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
        this.userDao.find({}, {}, {}, function(err, users) {
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

UserService.prototype.login = function(req, res){
    var loginInfo = req.body;
    var activeTokenList = this.activeTokenList;
    
    this.userDao.findOne({"login.username": loginInfo.username}, {}, {}, function(err, user){
        if (err || err !== null) {
            res.status(500).send(err);
        }
        else {
            if(loginInfo.password === user.login.password){
                var resBody = {};
                resBody.token = uuid.v4();
                user.login.token = resBody.token;
                user.login.lastVisit = moment();
                user.login.tokenVaildThrough = moment(user.login.lastVisit).add(30, 'minutes');
                user.save();
                
                activeTokenList[resBody.token] = user.login.tokenVaildThrough;
                res.status(200).send(resBody);
            } else {
                res.status(401).send("Invalid username and passowrd pair, login failed.");
            }
        }
    });    
}

UserService.prototype.authByToken = function(req, res){
    var token = req.get('Authorization');
    
    if(!token){
        return false;
    }
    
    console.log(this.activeTokenList);
    
    var validThrough = this.activeTokenList[token];
    console.log(validThrough);
    if(validThrough){
        if(moment().isBefore(validThrough)){
            this.userDao.findOne({"login.token": token}, {}, {}, function(err, user) {
                if ( !err && err !== null) {
                    user.login.lastVisit = moment();
                    user.save();
                }
            });
            return true;
        }
    }
    return false;
}

module.exports = UserService;