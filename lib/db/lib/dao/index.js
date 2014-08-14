exports.UserDao = require("./userDao");
//exports.UserDao = require("./loginDao");
/*
exports.saveAny = function (mongoose, name, value) {
    var AnyModel = mongoose.connection.model('any', new mongoose.ref.Schema({},{ collection: 'any' }));
    var any = new AnyModel();
    any.name = value;
    any.markModified(name);
    any.save(function(err){
        console.log(err);
    });
}*/