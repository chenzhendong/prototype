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
    var id;

    switch (action) {
        case 'get':
            this.handleGet(pathElements, req, res);
            break;
        case 'post':
            this.handlePost(pathElements, req, res);
            break;
        case 'put':
        case 'patch':
            this.handlePut(pathElements, req, res);
            break;
        case 'delete':
            this.handleDelete(pathElements, req, res);
            break;
    }
}


UserService.prototype.handleGet = function(pathElements, req, res) {
    var id = pathElements.shift();
    var helper = this.helper;

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

UserService.prototype.handlePost = function(pathElements, req, res) {
    var id = pathElements.shift();
    var helper = this.helper;
    var userDao = this.userDao;

    if (!id) {
        var newUser = req.body;

        /*validate post data*/
        if (!(newUser.login && newUser.login.username)) {
            helper.restResponse(res, "Invalid post data.");
            return;
        }

        /*check unique username*/
        userDao.find({
            "login:username": newUser.login.username
        }, {}, {}, function(err, users) {
            if (users.length === 0) {

                /*Save post user data*/
                userDao.create(req.body, function(err, user) {
                    helper.restResponse(res, err, user);
                });
            }
            else {
                helper.restResponse(res, "Duplicate user login name.");
            }
        });

    }
    else {
        helper.restResponse(res, "Invalid url, the id is not required for user post operation.");
    }
}

UserService.prototype.handlePut = function(pathElements, req, res) {
    var id = pathElements.shift();
    var helper = this.helper;
    var userDao = this.userDao;

    if (id) {
        userDao.update({
            "_id": id
        }, req.body, function(err, numberAffected) {
            var content;
            if (numberAffected > 0) {
                content = numberAffected + " record updated!";
            }
            helper.restResponse(res, err, content);
        });
    }
}

UserService.prototype.handleDelete = function(pathElements, req, res) {
    var id = pathElements.shift();
    var helper = this.helper;
    var userDao = this.userDao;

    if (id) {
        this.userDao.delete({
            "_id": id
        }, function(err) {
            helper.restResponse(res, err);
        });
    }
}

UserService.prototype.login = function(req, res) {
    var loginInfo = req.body;
    var activeTokenList = this.activeTokenList;

    this.userDao.findOne({
        "login.username": loginInfo.username
    }, {}, {}, function(err, user) {
        if (err || err !== null) {
            res.status(500).send(err);
        }
        else {
            if (loginInfo.password === user.login.password) {
                var resBody = {};
                resBody.token = uuid.v4();
                user.login.token = resBody.token;
                user.login.lastVisit = moment();
                user.login.tokenVaildThrough = moment(user.login.lastVisit).add(30, 'minutes');
                user.save();

                activeTokenList[resBody.token] = user.login.tokenVaildThrough;
                res.status(200).send(resBody);
            }
            else {
                res.status(401).send("Invalid username and passowrd pair, login failed.");
            }
        }
    });
}

UserService.prototype.authByToken = function(req, res) {
    var token = req.get('Authorization');

    if (!token) {
        return false;
    }

    var validThrough = this.activeTokenList[token];

    if (validThrough) {
        if (moment().isBefore(validThrough)) {
            this.userDao.findOne({
                "login.token": token
            }, {}, {}, function(err, user) {
                if (!err && err !== null) {
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