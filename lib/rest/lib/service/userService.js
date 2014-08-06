function UserService(userDao){
    this.userDao = userDao;
}

UserService.prototype.parseRequest = function (pathElements, req) {
     
}

module.exports = UserService;