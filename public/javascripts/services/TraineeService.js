angular.module('app').factory('traineeService', function($http){

	const _getAllTrainees = function(){
        return $http.get('/trainee');
	};

	const _createAccount = function(trainee){
		return $http.post('/trainee', trainee);
	};

	const _getTeamPresence = function(idTeam, idTrainee){
        return $http.get('/trainee/presence/' + idTeam + '/' + idTrainee);
	};

    const _checkPresence = function(idTrainee, idTeam){
        return $http.post('/trainee/presence', { idTrainee: idTrainee, idTeam: idTeam });
    };

	return {
		getAllTrainees : _getAllTrainees,
		createAccount : _createAccount,
		getTeamPresence : _getTeamPresence,
        checkPresence : _checkPresence
	}
});