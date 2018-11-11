module.exports = function(app){
	const trainee = app.controllers.user;

	app.get('/trainee', trainee.getAllTrainees);
	app.get('/trainee/presence/:idTeam/:idTrainee', trainee.getTeamPresence);
    app.post('/trainee/presence', trainee.checkPresence);
    app.post('/trainee/presence/device', trainee.checkPresenceDevice);
	app.post('/trainee', trainee.createAccount);

};