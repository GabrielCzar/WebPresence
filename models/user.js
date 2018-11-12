module.exports = function(app){

	const mongoose = require('mongoose');
	const Schema =  mongoose.Schema;
    const Role = app.models.role;

	const user = Schema({
		name : 	{ type: String, required: true },
		phone_mac : [{ type: String }],
		email: String,
		username: { type: String, required: true, unique: true },
		pass: { type: String, required: true },
		roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
	});
	
	user.statics.checkLogin = function (user, callback) {
        const self = this;
        Role.getRoleByType(user.role.type, function(err, role){
        	const query = {username: user.username, pass: user.pass, 'roles' : role._id};
			self.findOne(query).populate('roles').exec(callback);
        });
	};

	user.statics.getAllTrainees = async function (callback) {
        const traineeRole = await Role.getRoleByType('TRAINEE');
        this.find({ roles: traineeRole._id }).populate('roles').exec(callback);
	};

	user.statics.insert = function (user, callback) {
		const _user = new this();

		Role.getRoleByType(user.role.type, (err, role) => {
			_user.name = user.name;
        	_user.pass = user.pass;
        	_user.email = user.email;
        	_user.username = user.username;
        	_user.roles = role._id;
        
        	_user.save(callback);
        });
		
	};

	return global.db.model('User', user);

};
