var dao=require("./dao"),
    Mongoose=require("./Mongoose");
    
function DB(){
    
}

DB.prototype.dao = dao;
DB.prototype.Mongoose = Mongoose;

var db = exports = module.exports = new DB();