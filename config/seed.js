module.exports = function () {
	var Role = require('mongoose').model('Role');

	console.log('Seeding data...');

	var Trainee = new Role({
		name: 'Trainee',
		type: 'TRAINEE'
	});

	var Admin = new Role({
		name: 'Admin',
		type: 'ADMIN'
	});

	Trainee.save(err => 
		err ? console.log('Error in save Trainee') : console.log('Save Trainee'));

	Admin.save(err => 
		err ? console.log('Error in save Admin') : console.log('Save Admin'));

}