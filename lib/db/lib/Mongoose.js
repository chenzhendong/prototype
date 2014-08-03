var mongoose = require('mongoose'); 
  
function Mongoose(dbURI){

  this.ref = mongoose;  
  this.connection = mongoose.connection;
  mongoose.connect(dbURI);
  
  // CONNECTION EVENTS
  // When successfully connected
  this.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
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
}


module.exports = Mongoose;