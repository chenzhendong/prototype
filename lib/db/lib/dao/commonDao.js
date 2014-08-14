
function CommonDao (){
}

CommonDao.prototype.create = function (record,callback){
	//var doc = new this.model(record);
	this.model.create(record, function (error, doc) {
		
		if(error) { 
			return callback(error);
		} else if (callback && doc) {
			return callback(null, doc);
		}
	});
};


CommonDao.prototype.findById = function (id, callback) {
	this.model.findById(id, function(error, doc){
		if(error) {
			return callback(error,null);
		} else if (callback && doc){
			return callback(null, doc);
		}
	});
};


CommonDao.prototype.count = function (query, callback) {
	this.model.count(query, function(error, doc){
		if(error) {
			return callback(error,null);
		}else if (callback && doc){
			return callback(null, doc);
		}
	});
};


CommonDao.prototype.find = function (query, fileds, opt, callback) {
	this.model.find(query, fileds, opt, function(error,docs){
		if(error) {
			return callback(error,null);
		} else if (callback && docs){
			return callback(null, docs);
		}
	});
};

CommonDao.prototype.findOne = function (query, fileds, opt, callback) {
	
	this.model.find(query, fileds, opt, function(error,docs){
		if(error || !docs) {
			return callback(error, null);
		} else {
			if(docs.length == 1){
				return callback(null, docs[0]);
			} else if (docs.length > 1){
				return callback("More than 1 record found, return 1st one.", docs[0]);
			} else {
				return callback("No record has been found.", null);
			}
		}
	});
};


CommonDao.prototype.delete = function (query, callback){
	this.model.remove(query, function(error){
		if(error) {
			return callback(error);
		} else if (callback){
			return callback(null);
		}
	});
};


CommonDao.prototype.update = function( conditions, update ,options, callback) {
	this.model.update(conditions, update, options, function (error, numberAffected) {
		if(error) {
			return callback(error);
		} else if (callback){
			return callback(null, numberAffected);
		}
	});
};


module.exports = CommonDao;