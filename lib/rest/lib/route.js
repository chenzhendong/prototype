var restify = require("restify")
var service = require("./service");

function Route(restServer, config) {
  this.restServer = restServer;
  var server = restServer.server;

  this.init(server);

  ['get', 'post', 'put', 'del'].forEach(function(action) {
    server[action](/^\/rest\/(.+)$/, function(req, res, next) {
      var pathElements = req.params[0].split('/');
      var version = pathElements.shift();
      var firstLevel = pathElements.shift();

      switch (firstLevel) {
      case 'user':
        var userService = new service.UserService(this.mongoose.userDao);
        req.action = action;
        userService.handleRequest(pathElements, req, res);
        break;

      default:
        // code
      }
      //res.send(200, pathElements);
      return next();
    });

    server[action](/^(?!\/rest\/)(.+)$/, function(req, res, next) {
      res.send(404, 'Not a valid URL to Resful Service.');
      return next();
    });
  });
}

Route.prototype.init = function(server) {
  /*
    server.use(restify.queryParser());
    server.use(restify.bodyParser());
    server.use(restify.CORS());
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.authorizationParser());
    server.use(restify.dateParser());
    server.use(restify.jsonp());
    server.use(restify.gzipResponse());
    server.use(restify.throttle({
      burst: 100,
      rate: 50,
      ip: true,
      overrides: {
        '192.168.1.1': {
          rate: 0,        // unlimited
          burst: 0
        }
      }
    }));
    server.use(restify.conditionalRequest());
    */
}


module.exports = Route;