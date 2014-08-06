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
                        res.send(200, users);
                    });
            } else {
                var returnUser;
                this.userDao.find({'_id': id}, function(err, user){
                        res.send(200, user);
                    });
            }
            
            break;
    }
    
}

module.exports = UserService;