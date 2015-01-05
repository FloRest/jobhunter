'use strict';

viewModule
    .controller('SignInController', ['$scope', '$location','toastService' ,'authService', function($scope, $location, toastService,authService) {
        $scope.user = authService.currentUser();
        $scope.login = function(field) {
            if (field)
                authService.login(field.email, field.password).success(function (data, err){
                    toastService.toast('Hi ' + data.name + ' !');
                    $location.path('/feed');
                });
        };
    }])
;