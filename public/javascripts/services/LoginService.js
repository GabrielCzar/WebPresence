angular.module('app').factory('loginServiceAPI', function($http){

	const _checkLogin = function(user){
		return $http.post('/login', user);
	};

	const _getRoles = function(){
		return $http.get('/roles');
	};

	return {
		checkLogin : _checkLogin,
		getRoles : _getRoles
	}

});