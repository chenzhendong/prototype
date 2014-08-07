var service = require("./service");
var bodyParser = require('body-parser');

function Route(server, config) {
  this.server = server;
  var mongoose = server.mongoose;
  
  ['get', 'post', 'put', 'delete'].forEach(function(action) {
    server[action](/^\/rest\/(.+)$/, function(req, res) {
      var pathElements = req.params[0].split('/');
      var version = pathElements.shift();
      var firstLevel = pathElements.shift();

      switch (firstLevel) {
      case 'user':
        var userService = new service.UserService(mongoose.userDao);
        req.action = action;
        userService.handleRequest(pathElements, req, res);
        break;

      default:
        // code
      }
    });

    server[action](/^(?!\/rest\/)(.+)$/, function(req, res) {
      res.send(404, 'Not a valid URL to Resful Service.');
    });
  });
}


module.exports = Route;