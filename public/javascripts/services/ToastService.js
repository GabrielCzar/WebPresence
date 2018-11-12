angular.module('app').factory('toastService', function(){

    const _showMessage = function(message, duration){
       duration = !duration ? 2000 : duration;
       Materialize.toast(message, duration);
    };

    return {
        showMessage : _showMessage
    };
});
