var express = require("express");
var bodyParser = require('body-parser');

/* create the restify server */
var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
  extended: true
}));

['get', 'post', 'put', 'delete'].forEach(function(action) {
    server[action](/\/rest\/v\d\/user/, function (req, res) {
       console.log(req);
       res.send(200, req.body);
     });
});

server.listen(process.env.PORT);
