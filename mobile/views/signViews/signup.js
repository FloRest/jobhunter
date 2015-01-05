'use strict';

viewModule
    .controller('SignUpController', ['$scope', 'authService','usersService','toastService','$location',
        function($scope, authService, usersService, toastService, $location) {
        $scope.signup = function(field) {
            if (field && field.name && field.email && field.password)
                usersService.create(field).success(function () {
                    authService.login(field.email, field.password).success(function (data, err){
                        toastService.toast('Hi ' + data.name + ' !');
                        $location.path('/feed');
                    });
                }).error(function () {

                });
        };
    }])
;