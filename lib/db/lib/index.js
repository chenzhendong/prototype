var dao=require("./dao"),
    Mongoose=require("./Mongoose"),
    schemas=require("./schemas");

function DB(){
    
}

DB.prototype.dao = dao;
DB.prototype.Mongoose = Mongoose;
DB.prototype.schemas = schemas;

var db = exports = module.exports = new DB();