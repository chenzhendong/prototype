var CommonDao = require("./commonDao");
var schemas = require("../schemas");

function UserDao(mongoose){
    var userSchema = mongoose.ref.Schema(schemas['user'], { collection: 'user' });
    this.model = mongoose.connection.model('user', userSchema);
}

UserDao.prototype =  new CommonDao();

module.exports = UserDao;
