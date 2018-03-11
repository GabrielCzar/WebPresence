module.exports = function(app){
	var mongoose = require('mongoose');
	var Schema = mongoose.Schema;

	var role = Schema({
		name: String,
		type: String
	});

	role.statics.getRoleByType = function(type, callback) {
		this.findOne({ type: type }).exec(callback);
	};

	return global.db.model('Role', role);
}