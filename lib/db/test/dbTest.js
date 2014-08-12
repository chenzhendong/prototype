var common = require("../../common");
var db = require("../lib");

var record = {
    person: {first: 'Zhendong', last: 'Chen', birthday: new Date(1975, 08, 3)},
    address: {line1: '12308 Ambleside Dr', city: 'Potomac', state: 'MD', postalCode: '20854'},
    email: 'chenzhendong@yahoo.com',
    login: {username: 'chenzhendong', password: '123456'}
};

var mongoose = new db.Mongoose(common.configMgr.config);
var userDao = new db.dao.UserDao(mongoose);


userDao.create(record, function(err, user){
   userDao.findById(user._id, function(err, finduser){
       console.log(finduser);
    });
});

userDao.count({email: 'chenzhendong@yahoo.com'}, function(err, count){
    console.log(count);
});

userDao.find({email: 'chenzhendong@yahoo.com'}, function(err, users){
    for(var i = 0; i< users.length; i++){
        console.log(users[i]._id);
    }
});

userDao.update({email: 'chenzhendong@yahoo.com'}, {email: 'chenzhendong@gmail.com'}, { multi: true }, function(err, numberAffected){
    console.log("update "+ numberAffected + " records!!!");
});

userDao.count({email: 'chenzhendong@gmail.com'}, function(err, count){
    console.log("Record with email chenzhendong@gmail.com: " + count);
});

userDao.update( {email: 'chenzhendong@gmail.com'}, {email: 'chenzhendong@yahoo.com'}, { multi: true }, function(err, numberAffected){
    console.log("update "+ numberAffected + " records!!!");
});

userDao.count({email: 'chenzhendong@yahoo.com'}, function(err, count){
    console.log("Record with email chenzhendong@yahoo.com: "+ count);
});

userDao.delete({email: 'chenzhendong@yahoo.com'}, function(err){
    console.log("Success delete the records with email chenzhendong@yahoo.com: ");
});