angular.module("app").controller("LoginController", function($scope, loginServiceAPI, $state, toastService){

    loginServiceAPI.getRoles().success(function(response){
        const result = response.result;

        if (result) {
            $scope.roles = response.data;
        } else {
            $scope.roles = [];
            console.error("Error get all Roles!");
        }
    });

    $scope.checkLogin = function(user){
        console.log("Sending the request...");

        if (user === null || user.role === null || user.role === undefined) {
            toastService.showMessage('Tipo de usuario invalido!', 4000);
            return;
        }

        loginServiceAPI.checkLogin(user).success(function(response){
            const result = response.result;

            if (!result){
                console.error('Result:', result, user.username);
                toastService.showMessage('Usuario e/ou Senha invalidos!', 4000);
                return;
            }

            // Get returned user
            const userLogged = response.data;

            // Checking the role selected
            const path = (user.role.type === 'ADMIN') ? "homeAdmin" : "homeTrainee";

            document.querySelector('#btnLogout').style.visibility = 'visible';
            $state.go(path, {userId : userLogged._id});

        }).error(function(response){
            console.error("Error: ", response);
        });
    };

});