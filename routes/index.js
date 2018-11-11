module.exports = function(app){
	const home = app.controllers.home;

	app.get('/', home.index);
	app.get('/roles', home.getRoles);
	app.post('/login', home.checkLogin);
	app.get('/logout', home.logout);

};