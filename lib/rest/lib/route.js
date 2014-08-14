var service = require("./service");
var bodyParser = require('body-parser');

function Route(server, config) {
  this.server = server;
  var mongoose = server.mongoose;
  var helper = new service.ServiceHelper(config);
  var userService = new service.UserService(mongoose, helper);
        
  ['get', 'post', 'put', 'delete', 'patch'].forEach(function(action) {
    server[action](/^\/rest\/(.+)$/, function(req, res) {
      var pathElements = req.params[0].split('/');
      var version = pathElements.shift();
      var firstLevel = pathElements.shift();
      
      if(firstLevel === 'login'){
        userService.login(req, res);
        return;
      } else {
        var passed = userService.authByToken(req);
        if(!passed){
          res.status(401).send("Invalid authentication token, please login.");
          return;
        }
      }
      
      switch (firstLevel) {
      case 'user':
        req.action = action;
        userService.handleRequest(pathElements, req, res);
        break;
      
      default:
        // code
      }
    });

    /*server[action](/^(?!\/rest\/)(.+)$/, function(req, res) {
      res.status(404).send('Not a valid URL to Resful Service.');
    });*/
  });
}


module.exports = Route;