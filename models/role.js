module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var role = Schema({
		type: String
	});

	role.statics.getRoleByType = function(type, callback) {
		this.findOne({ type: type }).exec(callback);
	};

	role.statics.create = function (role, callback) {
        var _role = new this();
        _day.type = role.type;
        return _role.save(callback);
    };

	return global.db.model('Role', role);
}