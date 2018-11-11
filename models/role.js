module.exports = (app) => {
    const mongoose = require('mongoose');
	const Schema = mongoose.Schema;

	const roleSchema = Schema({
		name: { type: String, required: true },
		type: { type: String, required: true, unique: true }
	});

	roleSchema.statics.getRoleByType = function(type, callback) {
		return this.findOne({ type: type }).exec(callback);
	};

	return mongoose.model('Role', roleSchema);
};