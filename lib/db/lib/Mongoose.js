var mongoose = require('mongoose'); 
var dao = require("./dao");
  
function Mongoose(dbUrl){
  
    this.ref = mongoose;  
    this.connection = mongoose.connection;
    mongoose.connect(dbUrl);
    
    // CONNECTION EVENTS
    // When successfully connected
    this.connection.on('connected', function () {
      console.log('Mongoose default connection open to ' + dbUrl);
    });
    
    // If the connection throws an error
    this.connection.on('error',function (err) {
      console.log('Mongoose default connection error: ' + err);
    });
    
    // When the connection is disconnected
    this.connection.on('disconnected', function () {
      console.log('Mongoose default connection disconnected');
    });
    
    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
      this.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
      });
    });
    
    var daos = {};
    for(var key in dao.schemas){
        var daoKey = key + "Dao";
        daos[daoKey] = new dao.commonDao(this, key);
    }
    this.daos =daos;
    
    /*Auto insert the admin account if the admin user not there*/
    this.initAdmin();
}


Mongoose.prototype.initAdmin = function () {
    
    var userDao = this.daos.userDao;
    userDao.find({"login.username": "admin"}, {}, {}, function(err, users){
         if(err){
            console.log(err);
            process.exit(1);
         } else if (users.length === 0){
            var adminUser = {
                person: {first: 'admin', last: 'admin', birthday: new Date(2000, 1, 1)},
                address: {line1: '123 main st', city: 'potomac', state: 'md', postalCode: '20854'},
                email: 'abc@yabc.com',
                login: {username: 'admin', password: 'admin'}};
                
            userDao.create(adminUser, function(err, user) {
                console.log("create admin user with id:"+ user._id);
            });            
            
         } else if (users.length > 1){
            console.log("More than 1 admin user found.");
            process.exit(1); 
         } 
    });    
}


module.exports = Mongoose;