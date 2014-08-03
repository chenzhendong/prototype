var CommonDao = require("./commonDao");
var schemas = require("../schemas");

function UserDao(mongoose){
    var userSchema = mongoose.ref.Schema(schemas['user'], { collection: 'user' });
    this.model = mongoose.connection.model('User', userSchema);
}

UserDao.prototype =  new CommonDao();

module.exports = UserDao;
