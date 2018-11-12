angular.module("app").factory("teamService", function($http){

	const _getAll = function(){
		return $http.get('/team');
	};

	const _createTeam = function(team){
		return $http.post('/team', team);
	};

	const _getTraineeTeams = function(idTrainee){
        return $http.get('/team/trainee/' + idTrainee);
	};

    const _haveWorkToday = function(idTeam){
        return $http.get('/team/haveWorkToday/' + idTeam);
    };

	return {
		getAll : _getAll,
		createTeam: _createTeam,
        getTraineeTeams : _getTraineeTeams,
        haveWorkToday : _haveWorkToday
	};

});