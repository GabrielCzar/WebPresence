'use strict';

module.exports = () => {

    const Role = require('mongoose').model('Role');

    console.log('Seeding data...');

    const TraineeRole = new Role({
        name: 'Trainee',
        type: 'TRAINEE'
    });

    const AdminRole = new Role({
        name: 'Admin',
        type: 'ADMIN'
    });

    Role.getRoleByType('TRAINEE', (err, res) => saveNewRoleIfNotExists(err, res, TraineeRole));
    Role.getRoleByType('ADMIN', (err, res) => saveNewRoleIfNotExists(err, res, AdminRole));

};

function saveNewRoleIfNotExists(err, roleFound, newRole) {
    if (err) console.error(`Error in save ${message}. ${err.message}`);
    else if (!roleFound) newRole.save(err => err ? console.debug(`Error in save Role ${newRole.name}. ${err.message}`) : console.debug(`Role ${newRole.name} saved.`));
    else console.debug(`Role ${newRole.name} has been created previously`);
}

