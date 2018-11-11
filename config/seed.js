'use strict';

module.exports = () => {
    console.log('Seeding data...');
    const mongoose = require('mongoose');

    createRoles(mongoose);
    createTeam(mongoose);

    console.log('End seeding data...');
};

function createTeam(mongoose) {
    const Team = mongoose.model('Team');

    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + 1);

    const GMTeam = new Team({
        date_init: new Date(),
        date_end: endDate,
        trainees: [],
        days: [],
        mac_ap : 'F0:C7:7F:EB:89:5E',
        name: 'GMTeam',
        distance: 10,
        percent: 75,
        detect_type: 'BLE'
    });

    GMTeam.save(err => saveCallback(err, 'Team', GMTeam.name));
}

function createRoles(mongoose) {
    const Role = mongoose.model('Role');

    const TraineeRole = new Role({
        name: 'Trainee',
        type: 'TRAINEE'
    });

    const AdminRole = new Role({
        name: 'Admin',
        type: 'ADMIN'
    });

    Role.getRoleByType('TRAINEE', (err, res) => saveIfNotExists(err, res, TraineeRole, 'Role'));
    Role.getRoleByType('ADMIN', (err, res) => saveIfNotExists(err, res, AdminRole, 'Role'));
}

function saveIfNotExists(err, found, newObj, type) {
    if (err) console.error(`Error in save ${message}. ${err.message}`);
    else if (!found) newObj.save(err => saveCallback(err, type, newObj.name));
    else console.debug(`${type} ${newObj.name} has been created previously`);
}

function saveCallback(err, where, name) {
    err ? console.debug(`Error in save ${where} ${name}. ${err.message}`) : console.debug(`${where} ${name} saved.`)
}